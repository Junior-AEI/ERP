import { Application } from 'express';
import { sequelizeInit } from './config/database.config'
import dotenv from 'dotenv'

import app from "./app";

dotenv.config()
const port = process.env.PORT

function startServer() {
    app.listen(port, () => {
        console.log(`Express app listening on port ${port}`)
    })
    sequelizeInit()
}

if (process.env.NODE_ENV !== 'test') startServer()