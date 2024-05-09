import express from 'express'
import groupController from '../controller/group.controller'

const router = express.Router()

router.get('/', groupController.getAll)
router.get('/:groupId', groupController.getByPk)
router.post('/', groupController.create)
router.put('/:groupId', groupController.update)
router.delete('/:groupId', groupController.del)

export default router
