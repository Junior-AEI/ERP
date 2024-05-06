import express from 'express'
import projectNotesController from '../controller/projectNotes.controller'

const router = express.Router()

router.get('/', projectNotesController.getAll)
router.get('/:projectNotesId', projectNotesController.getByPk)
router.get('/byProject/:projectNotesProject', projectNotesController.getByProject)
router.get('/:projectId/lastNote', projectNotesController.getLastNoteByProject)
router.post('/', projectNotesController.create)
router.post('/search',projectNotesController.search)
router.put('/:projectNotesId', projectNotesController.update)
router.delete('/:projectNotesId', projectNotesController.del)

export default router

