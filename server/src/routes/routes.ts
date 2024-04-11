import express from 'express'
import personRouter from './person.route'
import clientRouter from './client.route'
import memberRouter from './member.route'
import userRouter from './user.route'
import authRoutes from './auth.route'
import companyRouter from './company.route'
import addressRouter from './address.route'
import belongerRouter from './belonger.route'
import groupRouter from './group.route'
import concernedRouter from './concerned.route'
import permissionRouter from './permission.route'
import documentRouter from './document.route'

import { getUsername, verifyAuthentication } from '../middlewares/auth.middleware'

const router = express.Router()

router.use(authRoutes)
router.use('/person', getUsername, verifyAuthentication, personRouter)
router.use('/client', getUsername, verifyAuthentication, clientRouter)
router.use('/member', getUsername, verifyAuthentication, memberRouter)
router.use('/user', getUsername, verifyAuthentication, userRouter)
router.use('/company', getUsername, verifyAuthentication, companyRouter)
router.use('/address', getUsername, verifyAuthentication, addressRouter)
router.use('/belonger', getUsername, verifyAuthentication, belongerRouter)
router.use('/group', getUsername, verifyAuthentication, groupRouter)
router.use('/concerned', getUsername, verifyAuthentication, concernedRouter)
router.use('/permission', getUsername, verifyAuthentication, permissionRouter)
router.use('/document', getUsername, verifyAuthentication, documentRouter)

export default router
