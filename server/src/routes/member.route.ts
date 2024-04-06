import express from 'express'
import memberController from '../controller/member.controller'
import { verifyPermission } from '../middlewares/permission.middleware'

const router = express.Router()

router.get('/', memberController.getAll)
router.get('/:id', memberController.getByPk)
router.post('/', verifyPermission('createMember'), memberController.create)
router.put('/', memberController.update)
router.delete('/:id', memberController.del)

export default router;
