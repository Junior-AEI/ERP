import express from 'express'
import clientController from '../controller/client.controller'

const router = express.Router()

router.get('/', clientController.getAll)
router.get('/:clientId', clientController.getByPk)
router.post('/', clientController.create)
router.put('/', clientController.update)
router.delete('/:clientId', clientController.del)

export default router
