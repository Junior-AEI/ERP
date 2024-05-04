import express from 'express'
import contributorController from '../controller/contributor.controller'

const router = express.Router()

router.get('/', contributorController.getAll)
router.get('/:contributorId', contributorController.getByPk)
router.post('/', contributorController.create)
router.put('/:contributorId', contributorController.update)
router.delete('/:contributorId', contributorController.del)

export default router
