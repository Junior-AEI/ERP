import documentController from '../controller/document.controller'
import express from 'express'
//import { upload } from '../middlewares/document.middleware'

const router = express.Router()
router.get('/', documentController.getAll)
router.post('/', documentController.create)
router.get('/:documentId', documentController.getByPk)
router.post('/:documentId', documentController.update)
router.post('/:documentId', documentController.del)

export default router
