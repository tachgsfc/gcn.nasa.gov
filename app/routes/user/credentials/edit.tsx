/*!
 * Copyright © 2022 United States Government as represented by the Administrator
 * of the National Aeronautics and Space Administration. No copyright is claimed
 * in the United States under Title 17, U.S. Code. All Other Rights Reserved.
 *
 * SPDX-License-Identifier: NASA-1.3
 */

import type { DataFunctionArgs } from '@remix-run/node'
import {
  handleCredentialActions,
  NewCredentialForm,
} from '~/components/NewCredentialForm'
import { getEnvOrDieInProduction } from '~/lib/env'
import { ClientCredentialVendingMachine } from '../client_credentials.server'

export async function loader({ request }: DataFunctionArgs) {
  const machine = await ClientCredentialVendingMachine.create(request)
  const client_credentials = await machine.getClientCredentials()
  const groups = machine.groups
  const recaptchaSiteKey = getEnvOrDieInProduction('RECAPTCHA_SITE_KEY')
  return { client_credentials, recaptchaSiteKey, groups }
}

export async function action({ request }: DataFunctionArgs) {
  return handleCredentialActions(request, 'user')
}

export default function Edit() {
  return <NewCredentialForm />
}
