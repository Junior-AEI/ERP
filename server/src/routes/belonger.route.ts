import express from 'express'
import belongerController from '../controller/belonger.controller'

const router = express.Router()

router.get('/', belongerController.getAll)
router.get('/:belongerId', belongerController.getByPk)
router.post('/', belongerController.create)
router.put('/:belongerId', belongerController.update)
router.delete('/:belongerId', belongerController.del)

export default router
