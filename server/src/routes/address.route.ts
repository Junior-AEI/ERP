import express from 'express'
import addressController from '../controller/address.controller'

const router = express.Router()

router.get('/', addressController.getAll)
router.get('/:addressId', addressController.getByPk)
router.post('/', addressController.create)
router.put('/:addressId', addressController.update)
router.delete('/:addressId', addressController.del)

export default router
