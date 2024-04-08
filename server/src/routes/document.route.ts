import documentController from '../controller/document.controller'
import express from 'express'
import { upload } from '../middlewares/document.middleware'

const router = express.Router()
router.get('/', documentController.getAll)
router.post('/', documentController.create)
router.get('/:id', documentController.getByPk)
router.post('/:id', documentController.update)
router.post('/:id', documentController.del)

export default router
