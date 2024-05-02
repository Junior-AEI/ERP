import express from 'express'
import taskController from '../controller/task.controller'

const router = express.Router()
// const subRouter_byUser = express.Router()


// subRouter_byUser.get('/:taskUser', taskController.getByUser)  

// router.use('/byUser', subRouter_byUser)
router.get('/', taskController.getAll)
router.get('/:taskId', taskController.getByPk)
router.get('/byUser/:taskUser', taskController.getByUser)
router.post('/', taskController.create)
router.put('/:taskId', taskController.update)
router.delete('/:taskId', taskController.del)

export default router
