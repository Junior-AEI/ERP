import express from 'express'
import taskController from '../controller/task.controller'

const router = express.Router()

router.get('/', taskController.getAll)
router.get('/:taskId', taskController.getByPk)
router.post('/', taskController.create)
router.put('/:taskId', taskController.update)
router.delete('/:taskId', taskController.del)

export default router
