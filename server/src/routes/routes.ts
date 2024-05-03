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
import projectRouter from './project.route'
import projectNoteRouter from './projectNote.route'
import contributorRouter from './contributor.route'
import projectManagerRouter from './projectManager.route'
import documentRouter from './document.route'
import documentTypeRouter from './documentType.route'
import eventRouter from './event.route'
import partnerRouter from './partner.route'
import eventGroupConcernedRouter from './eventGroupConcerned.route'
import taskRouter from './task.route'
import itTicketRouter from './itTicket.route'
import expenseAccountRouter from './expenseAccount.route'

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
router.use('/project', getUsername, verifyAuthentication, projectRouter)
router.use('/projectManager', getUsername, verifyAuthentication, projectManagerRouter)
router.use('/contributor', getUsername, verifyAuthentication, contributorRouter)
router.use('/projectNote', getUsername, verifyAuthentication, projectNoteRouter)
router.use('/document', getUsername, verifyAuthentication, documentRouter)
router.use('/documentType', getUsername, verifyAuthentication, documentTypeRouter)
router.use('/event', getUsername, verifyAuthentication, eventRouter)
router.use('/partner', getUsername, verifyAuthentication, partnerRouter)
router.use('/eventGroupConcerned', getUsername, verifyAuthentication, eventGroupConcernedRouter)
router.use('/task', getUsername, verifyAuthentication, taskRouter)
router.use('/itTicket', getUsername, verifyAuthentication, itTicketRouter)
router.use('/expenseAccount', getUsername, verifyAuthentication, expenseAccountRouter)

export default router
