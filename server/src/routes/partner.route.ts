import express from 'express'
import partnerController from '../controller/partner.controller'

const router = express.Router()

router.get('/', partnerController.getAll)
router.get('/:partnerId', partnerController.getByPk)
router.post('/', partnerController.create)
router.put('/:partnerId', partnerController.update)
router.delete('/:partnerId', partnerController.del)

export default router
