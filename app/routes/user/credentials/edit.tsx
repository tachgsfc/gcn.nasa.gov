import type { DataFunctionArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { NewCredentialForm } from '~/components/NewCredentialForm'
import { getEnvOrDieInProduction } from '~/lib/env'
import { ClientCredentialVendingMachine } from '../client_credentials.server'

export async function loader({ request }: DataFunctionArgs) {
  const machine = await ClientCredentialVendingMachine.create(request)
  const client_credentials = await machine.getClientCredentials()
  const groups = machine.groups
  const recaptchaSiteKey = getEnvOrDieInProduction('RECAPTCHA_SITE_KEY')
  return { client_credentials, recaptchaSiteKey, groups }
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
      await machine.createClientCredential(name, scope)
      return redirect('/user/credentials')

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

export default function Edit() {
  return <NewCredentialForm />
}
