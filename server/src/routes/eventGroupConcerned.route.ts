import express from 'express'
import eventGroupConcernedController from '../controller/eventGroupConcerned.controller'

const router = express.Router()

router.get('/', eventGroupConcernedController.getAll)
router.get('/:eventGroupConcernedId', eventGroupConcernedController.getByPk)
router.post('/', eventGroupConcernedController.create)
router.put('/:eventGroupConcernedId', eventGroupConcernedController.update)
router.delete('/:eventGroupConcernedId', eventGroupConcernedController.del)

export default router
