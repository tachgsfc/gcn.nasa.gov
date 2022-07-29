/*!
 * Copyright © 2022 United States Government as represented by the Administrator
 * of the National Aeronautics and Space Administration. No copyright is claimed
 * in the United States under Title 17, U.S. Code. All Other Rights Reserved.
 *
 * SPDX-License-Identifier: NASA-1.3
 */

import { redirect } from '@remix-run/node'
import { ClientCredentialVendingMachine } from '~/routes/user/client_credentials.server'

export function getEnvOrDie(key: string) {
  const result = process.env[key]
  if (!result) throw new Error(`environment variable ${key} must be set`)
  return result
}

export function getEnvOrDieInProduction(key: string) {
  const result = process.env[key]
  if (!result) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error(`environment variable ${key} must be set`)
    }
    console.warn(
      `environment variable ${key} must be set for production. Proceeding anyway since we are in ${process.env.NODE_ENV}`
    )
  }
  return result
}

export function getFormDataString(formData: FormData, key: string) {
  const value = formData.get(key)
  if (typeof value === 'string') {
    return value
  } else if (value === null) {
    return undefined
  } else {
    throw new Response(`expected ${key} to be a string`, { status: 400 })
  }
}

export async function verifyRecaptcha(response?: string) {
  const secret = getEnvOrDieInProduction('RECAPTCHA_SITE_SECRET')
  if (!secret) return

  const params = new URLSearchParams()
  if (response) {
    params.set('response', response)
  }
  params.set('secret', secret)
  const verifyResponse = await fetch(
    'https://www.google.com/recaptcha/api/siteverify',
    { method: 'POST', body: params }
  )
  const { success } = await verifyResponse.json()
  if (!success) throw new Response('ReCAPTCHA was invalid', { status: 400 })
}

export async function handleCredentialActions(request:Request, redirectSource:string){
  const [data, machine] = await Promise.all([
    request.formData(),
    ClientCredentialVendingMachine.create(request),
  ])

  switch (getFormDataString(data, 'intent')) {
    case 'create':
      const name = getFormDataString(data, 'name')
      const scope = getFormDataString(data, 'scope')
      const recaptchaResponse = getFormDataString(data, 'g-recaptcha-response')
      await verifyRecaptcha(recaptchaResponse)
      const { client_id } = await machine.createClientCredential(name, scope)
      let redirectTarget = ''
      if (redirectSource == "quickstart") {
        redirectTarget = `/quickstart/alerts?clientId=${encodeURIComponent(client_id)}`
      }
      else if(redirectSource == "user"){
        redirectTarget = '/user/credentials'
      }

      return redirect(redirectTarget)

    case 'delete':
      const clientId = getFormDataString(data, 'clientId')
      if (!clientId) {
        throw new Response('clientId not present', { status: 400 })
      }
      await machine.deleteClientCredential(clientId)
      return null

    default:
      throw new Response('unknown intent', { status: 400 })
  }
}