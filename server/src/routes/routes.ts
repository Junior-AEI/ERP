import express from 'express'
import userRouter from './user.route'
import authRoutes from './auth.route'
import poleRoute from './group.route'
import addressRouter from './address.route'
import memberRoute from './member.route'
import entrepriseRoute from './company.route'
import clientRoute from './client.route'
import documentRouter from './document.route'

import { getUsername, verifyAuthentication } from '../middlewares/auth.middleware'

const router = express.Router()

router.use(authRoutes)
router.use('/user', getUsername, verifyAuthentication, userRouter)
router.use('/address', getUsername, verifyAuthentication, addressRouter)

/**
router.use('/adherent', getUsername, verifyAuthentication, memberRoute)
router.use('/entreprise', getUsername, verifyAuthentication, entrepriseRoute)
router.use('/client', getUsername, verifyAuthentication, clientRoute)
router.use('/document', getUsername, verifyAuthentication, documentRouter)
**/

export default router
