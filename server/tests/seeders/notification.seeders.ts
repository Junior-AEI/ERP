import Notifications from '../../src/models/notification.model'
import { notifications } from './data/notification.data'
import { createUser } from './user.seeders'

export const createNotification = async (n: number) => {
    const notif = 'notif' + n

    const userId = await createUser('john.doe')

    const notification = await Notifications.create({
        userId: userId,
        ...notifications[notif]
    })

    return notification.notificationId
}
