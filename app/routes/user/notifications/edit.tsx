import type { DataFunctionArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { Form, Link, useLoaderData } from '@remix-run/react'
import {
  Button,
  ButtonGroup,
  Checkbox,
  Label,
  TextInput,
} from '@trussworks/react-uswds'
import { NoticeFormat } from '~/components/NoticeFormat'
import { NoticeTypeCheckboxes } from '~/components/NoticeTypeCheckboxes'

export async function action({ request }: DataFunctionArgs) {
  const [data] = await Promise.all([request.formData()])
  const { id, intent, name, recipient, noticeFormat, active, ...rest } =
    Object.fromEntries(data)
  const noticeTypes = Object.keys(rest)

  switch (intent) {
    case 'create':
      console.log('Creating:')
      console.log(active)
      console.log(intent)
      console.log(name)
      console.log(recipient)
      console.log(noticeFormat)
      console.log(noticeTypes)
      return redirect('/user/notifications')
    case 'update':
      console.log('Updating:')
      console.log(active)
      console.log(intent)
      console.log(name)
      console.log(recipient)
      console.log(noticeFormat)
      console.log(noticeTypes)
      return redirect('/user/notifications')
    case 'delete':
      return null

    default:
      throw new Response('unknown intent', { status: 400 })
  }
}

export async function loader({ request }: DataFunctionArgs) {
  const { id } = Object.fromEntries(new URL(request.url).searchParams)
  let intent = 'create'
  // Placeholder until models are defined
  let active = true
  if (id != undefined) {
    intent = 'update'
  }
  return {
    id: id,
    intent: intent,
    active: active,
  }
}

export default function Edit() {
  const { id, intent, active } = useLoaderData<typeof loader>()

  return (
    <Form method="post">
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="intent" value={intent} />
      {intent == 'update' ? (
        <>
          <Label htmlFor="active">Status</Label>
          <Checkbox
            id="active"
            name="active"
            label={'Set Active'}
            defaultChecked={active}
          />
        </>
      ) : (
        <input type="hidden" name="active" value={'on'} defaultChecked />
      )}
      <Label htmlFor="name">Name</Label>
      <TextInput id="name" name="name" type="text" inputSize="small" />
      <Label htmlFor="recipient">Recipient</Label>
      <TextInput id="recipient" name="recipient" type="email" />
      <Label htmlFor="format">Format</Label>
      <NoticeFormat name="noticeFormat" value="text" />
      <Label htmlFor="noticeTypes">Types</Label>
      <NoticeTypeCheckboxes></NoticeTypeCheckboxes>
      <ButtonGroup>
        <Link to=".." type="button" className="usa-button usa-button--outline">
          Cancel
        </Link>
        <Button type="submit">Save</Button>
      </ButtonGroup>
    </Form>
  )
}
