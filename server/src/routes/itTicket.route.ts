import express from 'express'
import itTicketController from '../controller/itTicket.controller'

const router = express.Router()

router.get('/', itTicketController.getAll)
router.get('/:ticketId', itTicketController.getByPk)
router.post('/', itTicketController.create)
router.put('/:ticketId', itTicketController.update)
router.delete('/:ticketId', itTicketController.del)

export default router
