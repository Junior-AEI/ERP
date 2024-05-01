import express from 'express'
import companyController from '../controller/company.controller'

const router = express.Router()

router.get('/', companyController.getAll)
router.get('/:companyId', companyController.getByPk)
router.post('/', companyController.create)
router.put('/:companyId', companyController.update)
router.delete('/:companyId', companyController.del)

export default router
