import express from 'express'
import expenseAccountController from '../controller/expenseAccount.controller'

const router = express.Router()

router.get('/', expenseAccountController.getAll)
router.get('/:expenseId', expenseAccountController.getByPk)
router.post('/', expenseAccountController.create)
router.put('/:expenseId', expenseAccountController.update)
router.delete('/:expenseId', expenseAccountController.del)

export default router
