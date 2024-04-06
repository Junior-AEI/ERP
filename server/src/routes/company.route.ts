import express from 'express'
import companyController from '../controller/company.controller'

const router = express.Router()

router.get('/', companyController.getAll)
router.get('/:id', companyController.getByPk)
router.post('/', companyController.create)
router.put('/', companyController.update)
router.delete('/:id', companyController.del)

export default router
