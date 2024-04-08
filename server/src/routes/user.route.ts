import express from 'express'
import userController from '../controller/user.controller'

const router = express.Router()

router.get('/', userController.getAll)
router.get('/:id', userController.getByPk)
router.post('/', userController.create)
router.put('/:id', userController.update)
router.delete('/:id', userController.del)

export default router
