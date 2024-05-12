import express from 'express'
import projectManagerController from '../controller/projectManager.controller'

const router = express.Router()

router.get('/', projectManagerController.getAll)
router.get('/:projectManagerId', projectManagerController.getByPk)
router.get('/byProject/:projectId', projectManagerController.getByProject)
router.post('/', projectManagerController.create)
router.put('/:projectManagerId', projectManagerController.update)
router.delete('/:projectManagerId', projectManagerController.del)

export default router
