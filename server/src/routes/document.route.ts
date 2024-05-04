import documentController from '../controller/document.controller'
import express from 'express'
//import { upload } from '../middlewares/document.middleware'

const router = express.Router()
router.get('/', documentController.getAll)
router.get('/:documentId', documentController.getByPk)
router.post('/', documentController.create)
router.put('/:documentId', documentController.update)
router.delete('/:documentId', documentController.del)

export default router
