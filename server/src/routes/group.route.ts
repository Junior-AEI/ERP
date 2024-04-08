import express from 'express'
import groupController from '../controller/group.controller'
import { group } from 'console'

const router = express.Router()

router.get('/:groupName', groupController.getByPk)
router.get('/', groupController.getAll)
router.post('/', groupController.create)
router.post('/', groupController.update)
router.delete('/:groupName', groupController.del)

export default router
