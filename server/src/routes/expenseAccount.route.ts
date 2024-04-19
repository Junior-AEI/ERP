import express from 'express'
import expenseAccountController from '../controller/expenseAccount.controller'

const router = express.Router()

router.get('/', expenseAccountController.getAll)
router.get('/:expenseAccountId', expenseAccountController.getByPk)
router.post('/', expenseAccountController.create)
router.put('/:expenseAccountId', expenseAccountController.update)
router.delete('/:expenseAccountId', expenseAccountController.del)

export default router
