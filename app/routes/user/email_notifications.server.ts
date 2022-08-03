/*!
 * Copyright © 2022 United States Government as represented by the Administrator
 * of the National Aeronautics and Space Administration. No copyright is claimed
 * in the United States under Title 17, U.S. Code. All Other Rights Reserved.
 *
 * SPDX-License-Identifier: NASA-1.3
 */
import { tables } from '@architect/functions'
import { mapTopicsToFormatAndNoticeType } from '~/lib/utils'
import { getUser } from '~/routes/__auth/user.server'

// db model
export type EmailNotification = {
  name: string
  recipient: string
  created: number
  active: boolean
  uuid?: string
  topics: string[]
}

// view model
export type EmailNotificationVM = EmailNotification & {
  format: string
  noticeTypes: string[]
}

export class EmailNotificationVendingMachine {
  #sub: string

  private constructor(sub: string) {
    this.#sub = sub
  }

  // Init machine
  static async create(request: Request) {
    const user = await getUser(request)
    if (!user) throw new Response('not signed in', { status: 403 })
    return new this(user.sub)
  }

  // Create
  async createEmailNotification(notification: EmailNotification) {
    if (!notification.name)
      throw new Response('name must not be empty', { status: 400 })
    if (!notification.recipient)
      throw new Response('recipient must not be empty', { status: 400 })
    if (!notification.topics)
      throw new Response('topics must not be empty', { status: 400 })

    const created = Date.now()
    const uuid = crypto.randomUUID()

    const db = await tables()
    await db.email_notification.put({
      sub: this.#sub,
      uuid,
      name: notification.name,
      created,
      topics: notification.topics,
      active: true,
      recipient: notification.recipient,
    })

    // Materialized view
    for (const topic of notification.topics) {
      await db.email_notification_subscription.put({
        uuid,
        topic,
        recipient: notification.recipient,
      })
    }
  }

  // Read
  async getEmailNotifications() {
    const db = await tables()
    const results = await db.email_notification.query({
      KeyConditionExpression: '#sub = :sub',
      ExpressionAttributeNames: {
        '#sub': 'sub',
        '#uuid': 'uuid',
        '#name': 'name',
        '#created': 'created',
        '#topics': 'topics',
        '#recipient': 'recipient',
      },
      ExpressionAttributeValues: {
        ':sub': this.#sub,
      },
      ProjectionExpression: '#uuid, #created, #name, #topics, #recipient',
    })
    const emailNotifications = results.Items as EmailNotificationVM[]
    for (const notice of emailNotifications) {
      let formats = []
      notice.noticeTypes = []
      for (const topic of notice.topics) {
        let mappedData = mapTopicsToFormatAndNoticeType(topic)
        formats.push(mappedData.noticeFormat)
        notice.noticeTypes.push(mappedData.noticeType)
      }
      notice.format = [...new Set(formats)][0]
    }
    emailNotifications.sort((a, b) => a.created - b.created)
    return emailNotifications
  }

  async getEmailNotification(uuid: string): Promise<EmailNotificationVM> {
    const db = await tables()
    const item = (await db.email_notification.get({
      sub: this.#sub,
      uuid,
    })) as ({ sub: string } & EmailNotificationVM) | null
    if (!item) throw new Response(null, { status: 404 })
    let formats = []
    item.noticeTypes = []
    for (const topic of item.topics) {
      let mappedData = mapTopicsToFormatAndNoticeType(topic)
      formats.push(mappedData.noticeFormat)
      item.noticeTypes.push(mappedData.noticeType)
    }
    item.format = [...new Set(formats)][0]
    const { sub, ...notification } = item
    return {
      uuid,
      ...notification,
    }
  }

  // Update
  async updateEmailNotification(email_notification: EmailNotification) {
    if (!email_notification.uuid) return null
    const db = await tables()
    db.email_notification.update(
      {
        Key: { sub: this.#sub, uuid: email_notification.uuid },
        UpdateExpression:
          'set #name = :name, #recipient = :recipient, #topics = :topics, #active = :active ',
        ExpressionAttributeNames: {
          '#name': 'name',
          '#topics': 'topics',
          '#recipient': 'recipient',
          '#active': 'active',
        },
        ExpressionAttributeValues: {
          ':name': email_notification.name,
          ':recipient': email_notification.recipient,
          ':topics': email_notification.topics,
          ':active': email_notification.active,
        },
      },
      (err, data) => {
        if (err) console.log(err)
        else console.log(data)
      }
    )
    console.log('Updated base')
    // Update Materialized View
    const subscriptions = await db.email_notification_subscription.query({
      KeyConditionExpression: '#uuid = :uuid',
      ExpressionAttributeNames: {
        '#uuid': 'uuid',
      },
      ExpressionAttributeValues: {
        ':uuid': email_notification.uuid,
      },
    })
    for (const sub of subscriptions.Items) {
      await db.email_notification_subscription.delete({
        uuid: sub.uuid,
        topic: sub.topic,
      })
    }
    for (const topic of email_notification.topics) {
      await db.email_notification_subscription.put({
        uuid: email_notification.uuid,
        topic,
        recipient: email_notification.recipient,
      })
    }
  }

  // Delete
  async deleteEmailNotification(uuid: string) {
    const db = await tables()
    const item = await db.email_notification.get({
      sub: this.#sub,
      uuid,
    })
    if (!item) throw new Response(null, { status: 404 })
    await db.email_notification.delete({ sub: this.#sub, uuid })
    const subscriptions = await db.email_notification_subscription.query({
      KeyConditionExpression: '#uuid = :uuid',
      ExpressionAttributeNames: {
        '#uuid': 'uuid',
      },
      ExpressionAttributeValues: {
        ':uuid': uuid,
      },
    })
    for (const sub of subscriptions.Items) {
      await db.email_notification_subscription.delete({
        uuid: sub.uuid,
        topic: sub.topic,
      })
    }
  }
}
