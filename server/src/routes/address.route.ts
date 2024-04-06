import express from 'express'
import addressController from '../controller/address.controller'

const router = express.Router()

router.get('/', addressController.getAll)
router.get('/:id', addressController.getByPk)
router.post('/', addressController.create)
router.put('/', addressController.update)
router.delete('/:id', addressController.del)

export default router
