import express from 'express'
import concernedController from '../controller/concerned.controller'

const router = express.Router()

router.get('/', concernedController.getAll)
router.get('/:concernedId', concernedController.getByPk)
router.post('/', concernedController.create)
router.put('/:concernedId', concernedController.update)
router.delete('/:concernedId', concernedController.del)

export default router
