import { sequelizeInit } from './config/database.config'
import dotenv from 'dotenv'

import app from "./app";

dotenv.config()

function startServer() {
    app.listen(5000, () => {
        console.log(`Express app listening on port 5000`)
    })
    sequelizeInit()
}

if (process.env.NODE_ENV !== 'test') startServer()