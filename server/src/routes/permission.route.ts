import express from 'express'
import permissionController from '../controller/permission.controller'

const router = express.Router()

router.get('/', permissionController.getAll)
// router.get('/:permissionId', permissionController.getByPk)
// router.post('/', permissionController.create)
// router.put('/:permissionId', permissionController.update)
// router.delete('/:permissionId', permissionController.del)

export default router
