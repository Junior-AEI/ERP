import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import bodyParser from 'body-parser'
import routes from './routes/routes'
import cors from 'cors'
import { sequelizeInit } from './config/database.config'

const app = express()
app.use(cors())

app.use(bodyParser.json({ limit: '50mb' }))

app.use('/api', routes)

const port = process.env.PORT

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Express app listening on port ${port}`)
    })
    sequelizeInit()
}

export default app
