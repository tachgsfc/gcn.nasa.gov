/*!
 * Copyright © 2022 United States Government as represented by the Administrator
 * of the National Aeronautics and Space Administration. No copyright is claimed
 * in the United States under Title 17, U.S. Code. All Other Rights Reserved.
 *
 * SPDX-License-Identifier: NASA-1.3
 */

import {
  CognitoIdentityProviderClient,
  CreateUserPoolClientCommand,
  DeleteUserPoolClientCommand,
} from '@aws-sdk/client-cognito-identity-provider'
import type { SmithyException } from '@aws-sdk/types'
import { tables } from '@architect/functions'
import { generate } from 'generate-password'
import { getUser } from '../__auth/user.server'

const cognitoIdentityProviderClient = new CognitoIdentityProviderClient({})

const errorsAllowedInDev = [
  'ExpiredTokenException',
  'UnrecognizedClientException',
]

export class ClientCredentialVendingMachine {
  #sub: string
  #groups: string[]

  private constructor(sub: string, groups: string[]) {
    this.#sub = sub
    this.#groups = groups
  }

  static async create(request: Request) {
    const user = await getUser(request)
    if (!user) throw new Response(null, { status: 403 })
    return new this(user.sub, user.groups)
  }

  get groups() {
    return this.#groups
  }

  async getClientCredentials() {
    const db = await tables()
    const results = await db.client_credentials.query({
      KeyConditionExpression: '#sub = :sub',
      ExpressionAttributeNames: {
        '#name': 'name',
        '#scope': 'scope',
        '#sub': 'sub',
      },
      ExpressionAttributeValues: {
        ':sub': this.#sub,
      },
      ProjectionExpression: 'client_id, #name, #scope, created',
    })
    return results.Items as {
      client_id: string
      name: string
      scope: string
      created: number
    }[]
  }

  async deleteClientCredential(client_id: string) {
    const db = await tables()

    // Make sure that the user actually owns the given client ID before
    // we try to delete it
    const item = await db.client_credentials.get({
      sub: this.#sub,
      client_id,
    })
    if (!item) throw new Response(null, { status: 404 })

    await Promise.all([
      this.#deleteClientCredentialInternal(client_id),
      db.client_credentials.delete({ sub: this.#sub, client_id }),
    ])
  }

  async createClientCredential(name?: string, scope?: string) {
    if (!name) throw new Response('name must not be empty', { status: 400 })
    if (!scope) throw new Response('scope must not be empty', { status: 400 })
    if (!this.#groups.includes(scope))
      throw new Response('user does not belong to the requested group', {
        status: 403,
      })

    const { client_id, client_secret } =
      await this.#createClientCredentialInternal(scope)
    const created = Date.now()

    const db = await tables()
    await db.client_credentials.put({
      name,
      created,
      client_id,
      scope,
      sub: this.#sub,
    })

    return { name, created, client_id, client_secret, scope }
  }

  async #createClientCredentialInternal(scope: string) {
    const command = new CreateUserPoolClientCommand({
      AllowedOAuthFlows: ['client_credentials'],
      AllowedOAuthFlowsUserPoolClient: true,
      AllowedOAuthScopes: [scope],
      ClientName: 'auto-generated',
      GenerateSecret: true,
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
    })

    let response
    try {
      response = await cognitoIdentityProviderClient.send(command)
    } catch (e) {
      const name = (e as SmithyException).name
      if (
        !errorsAllowedInDev.includes(name) ||
        process.env.NODE_ENV === 'production'
      )
        throw e
      console.warn(
        `Cognito threw ${name}. This would be an error in production. Since we are in ${process.env.NODE_ENV}, creating fake client credentials.`
      )
      const client_id = generate({ length: 26 })
      const client_secret = generate({ length: 51 })
      return { client_id, client_secret }
    }

    const client_id = response.UserPoolClient?.ClientId
    const client_secret = response.UserPoolClient?.ClientSecret
    if (!client_id) throw new Error('AWS SDK must return ClientId')
    if (!client_secret) throw new Error('AWS SDK must return ClientSecret')
    return { client_id, client_secret }
  }

  async #deleteClientCredentialInternal(client_id: string) {
    const command = new DeleteUserPoolClientCommand({
      ClientId: client_id,
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
    })

    try {
      await cognitoIdentityProviderClient.send(command)
    } catch (e) {
      const name = (e as SmithyException).name
      if (
        !errorsAllowedInDev.includes(name) ||
        process.env.NODE_ENV === 'production'
      )
        throw e
      console.warn(
        `Cognito threw ${name}. This would be an error in production. Since we are in ${process.env.NODE_ENV}, deleting fake client credentials.`
      )
    }
  }
}
