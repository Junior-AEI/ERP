// Copyright (C) 2023 Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD

// Authors: Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD
// Maintainer: contact@junior-aei.com

// This file is part of LATIME.

// LATIME is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// LATIME is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with LATIME. If not, see <https://www.gnu.org/licenses/>.
import express from 'express'
import utilisateurRouter from './utilisateur.route'
import authRoutes from './auth.route'
import posteRoute from './poste.route'
import poleRoute from './pole.route'
import adresseRoute from './adresse.route'
import memberRoute from './member.route'
import entrepriseRoute from './entreprise.route'
import clientRoute from './client.route'
import documentRouter from './document.route'

import { getUsername, verifyAuthentication } from '../middlewares/auth.middleware'

const router = express.Router()

router.use(authRoutes)
router.use('/pole', getUsername, verifyAuthentication, poleRoute)
router.use('/poste', getUsername, verifyAuthentication, posteRoute)
router.use('/utilisateur', getUsername, verifyAuthentication, utilisateurRouter)
router.use('/adresse', getUsername, verifyAuthentication, adresseRoute)
router.use('/adherent', getUsername, verifyAuthentication, memberRoute)
router.use('/entreprise', getUsername, verifyAuthentication, entrepriseRoute)
router.use('/client', getUsername, verifyAuthentication, clientRoute)
router.use('/document', getUsername, verifyAuthentication, documentRouter)
export default router
