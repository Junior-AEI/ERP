import express from 'express'
import authController from '../controller/auth.controller'

const router = express.Router()

router.post('/login', authController.login)
router.post('/forget', authController.forgetPassword)
router.post('/new-password', authController.askNewPassword)

export default router
