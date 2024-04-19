import express from 'express'
import projectController from '../controller/project.controller'

const router = express.Router()

router.get('/', projectController.getAll)
router.get('/:projectId', projectController.getByPk)
router.post('/', projectController.create)
router.put('/:projectId', projectController.update)
router.delete('/:projectId', projectController.del)

export default router
