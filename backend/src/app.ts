import express from 'express'
import 'dotenv/config'
import tasksRouter from './routes/tasks'
import boardRouter from './routes/board'
import { corsOptions } from './config/corsConfig'
import cors from 'cors'

const app = express()
app.use(cors(corsOptions))
app.use(express.json())
app.use('/tasks', tasksRouter)
app.use('/board', boardRouter)

app.use((_req, res) => {
  res.status(404).send('Sorry cant find that!')
})

export default app
