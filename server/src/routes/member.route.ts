import express from 'express'
import memberController from '../controller/member.controller'

const router = express.Router()

router.get('/', memberController.getAll)
router.get('/:memberId', memberController.getByPk)
// router.post('/', verifyPermission('createMember'), memberController.create)
router.post('/', memberController.create)
router.put('/:memberId', memberController.update)
router.delete('/:memberId', memberController.del)

export default router
