import express from 'express'
import userController from '../controller/user.controller'

const router = express.Router()

router.get('/', userController.getAll)
router.get('/:userId', userController.getByPk)
router.post('/', userController.create)
router.put('/:userId', userController.update)
router.delete('/:userId', userController.del)

export default router
