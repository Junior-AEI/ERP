import express from 'express'
import notificationController from '../controller/notification.controller'

const router = express.Router()

router.get('/', notificationController.getAll)
router.get('/:notificationId', notificationController.getByPk)
router.post('/', notificationController.create)
router.put('/:notificationId', notificationController.update)
router.delete('/:notificationId', notificationController.del)

export default router
