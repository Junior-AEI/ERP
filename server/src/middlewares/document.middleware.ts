// Copyright (C) 2023 Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD

// Authors: Nesrine ABID, Nadjime BARTEAU, Mathieu DUPOUX, Léo-Paul MAZIÈRE, Maël PAUL, Antoine RAOULT, Lisa VEILLAT, Marine VOVARD
// Maintainer: contact@junior-aei.com

// This file is part of LATIME.

// LATIME is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

// LATIME is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License along with LATIME. If not, see <https://www.gnu.org/licenses/>.
import { createHash } from 'crypto'
import { Request } from 'express'
import multer, { Multer } from 'multer'
import { getExtension } from 'mime'

const basedir = 'database/documents'

const storage = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
        cb(null, basedir)
    },
    filename: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
        cb(
            null,
            `${createHash('sha256')
                .update(file.originalname + new Date())
                .digest('hex')}.${getExtension(file.mimetype)}`
        )
    }
})

export const upload: Multer = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        // Check if the file meets your requirements
        if (file.mimetype !== 'application/pdf') {
            return cb(new Error('Invalid file type'))
        }
        cb(null, true)
    }
})
