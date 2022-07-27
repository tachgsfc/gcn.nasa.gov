/*!
 * Copyright © 2022 United States Government as represented by the Administrator
 * of the National Aeronautics and Space Administration. No copyright is claimed
 * in the United States under Title 17, U.S. Code. All Other Rights Reserved.
 *
 * SPDX-License-Identifier: NASA-1.3
 */

import { useLoaderData } from '@remix-run/react'
import { ClientCredentialVendingMachine } from '../user/client_credentials.server'
import type { DataFunctionArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { getEnvOrDieInProduction } from '~/lib/env'
import SegmentedCards from '~/components/SegmentedCards'
import { NewCredentialForm } from '~/components/NewCredentialForm'
import CredentialCard from '~/components/CredentialCard'

export async function loader({ request }: DataFunctionArgs) {
  const machine = await ClientCredentialVendingMachine.create(request)
  const client_credentials = await machine.getClientCredentials()
  const groups = machine.groups
  const recaptchaSiteKey = getEnvOrDieInProduction('RECAPTCHA_SITE_KEY')
  return { client_credentials, recaptchaSiteKey, groups }
}

async function verifyRecaptcha(response?: string) {
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

function getFormDataString(formData: FormData, key: string) {
  const value = formData.get(key)
  if (typeof value === 'string') {
    return value
  } else if (value === null) {
    return undefined
  } else {
    throw new Response(`expected ${key} to be a string`, { status: 400 })
  }
}

export async function action({ request }: DataFunctionArgs) {
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
      return redirect(
        `/quickstart/alerts?clientId=${encodeURIComponent(client_id)}`
      )

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

export default function Credentials() {
  const { client_credentials } = useLoaderData<typeof loader>()

  const explanation = (
    <>
      Client credentials allow your scripts to interact with GCN on your behalf.
    </>
  )

  return (
    <>
      {client_credentials.length > 0 ? (
        <>
          <p>
            {explanation} Select one of your existing client credentials, or
            create a new one.
          </p>
          <SegmentedCards>
            {client_credentials.map((credential) => (
              <CredentialCard
                key={credential.client_id}
                {...credential}
                selectable
              />
            ))}
          </SegmentedCards>
          <div className="padding-2" key="new">
            <strong>New client credentials....</strong>
            <NewCredentialForm />
          </div>
        </>
      ) : (
        <>
          <p>{explanation}</p>
          <NewCredentialForm />
        </>
      )}
    </>
  )
}
