import express from 'express'
import projectNotesController from '../controller/projectNotes.controller'

const router = express.Router()

router.get('/', projectNotesController.getAll)
router.get('/:projectNotesId', projectNotesController.getByPk)
router.post('/', projectNotesController.create)
router.put('/:projectNotesId', projectNotesController.update)
router.delete('/:projectNotesId', projectNotesController.del)

export default router

