import express from 'express'
import itTicketController from '../controller/itTicket.controller'

const router = express.Router()

router.get('/', itTicketController.getAll)
router.get('/:itTicketId', itTicketController.getByPk)
router.post('/', itTicketController.create)
router.put('/:itTicketId', itTicketController.update)
router.delete('/:itTicketId', itTicketController.del)

export default router
