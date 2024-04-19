import express from 'express'
import eventController from '../controller/event.controller'

const router = express.Router()

router.get('/', eventController.getAll)
router.get('/:eventId', eventController.getByPk)
router.post('/', eventController.create)
router.put('/:eventId', eventController.update)
router.delete('/:eventId', eventController.del)

export default router
