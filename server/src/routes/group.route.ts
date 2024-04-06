import express from 'express'
import groupController from '../controller/group.controller'
import { group } from 'console'

const router = express.Router()

router.get('/:nom', groupController.getByPk)
router.get('/', groupController.getAll)
router.post('/', groupController.create)
router.post('/', groupController.update)
router.delete('/:nom', groupController.del)

export default router
