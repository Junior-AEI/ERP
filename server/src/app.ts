import dotenv from 'dotenv'
dotenv.config()
import express, { Application } from 'express'
import bodyParser from 'body-parser'
import routes from './routes/routes'
import cors from 'cors'

let app: Application = express()

app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }))
app.use('/api', routes)

export default app
