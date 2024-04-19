import express from 'express'
import personController from '../controller/person.controller'

const router = express.Router()

router.get('/', personController.getAll)
router.get('/:personId', personController.getByPk)
router.post('/', personController.create)
router.put('/:personId', personController.update)
router.delete('/:personId', personController.del)

export default router
