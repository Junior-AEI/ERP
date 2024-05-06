import express from 'express'
import documentTypeController from '../controller/documentType.controller'

const router = express.Router()

router.get('/', documentTypeController.getAll)
router.get('/:typeId', documentTypeController.getByPk)
router.post('/', documentTypeController.create)
router.put('/:typeId', documentTypeController.update)
router.delete('/:typeId', documentTypeController.del)

export default router
