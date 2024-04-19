import express from 'express'
import eventTypeController from '../controller/eventType.controller'

const router = express.Router()

router.get('/', eventTypeController.getAll)
router.get('/:eventTypeId', eventTypeController.getByPk)
router.post('/', eventTypeController.create)
router.put('/:eventTypeId', eventTypeController.update)
router.delete('/:eventTypeId', eventTypeController.del)

export default router
