import express from 'express'
import documentTypeController from '../controller/documentType.controller'

const router = express.Router()

router.get('/', documentTypeController.getAll)
router.get('/:nameDocumentType', documentTypeController.getByPk)
router.post('/', documentTypeController.create)
router.put('/:nameDocumentType', documentTypeController.update)
router.delete('/:nameDocumentType', documentTypeController.del)

export default router
