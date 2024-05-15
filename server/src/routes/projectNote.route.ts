import express from 'express'
import projectNoteController from '../controller/projectNote.controller'

const router = express.Router()

router.get('/', projectNoteController.getAll)
router.get('/:projectNoteId', projectNoteController.getByPk)
router.get('/byProject/:projectId', projectNoteController.getByProject)
router.get('/:projectId/lastNote', projectNoteController.getLastNoteByProject)
router.post('/search',projectNoteController.search)
router.post('/', projectNoteController.create)
router.put('/:projectNoteId', projectNoteController.update)
router.delete('/:projectNoteId', projectNoteController.del)

export default router
