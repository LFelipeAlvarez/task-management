import { Router } from 'express'
import { TaskController } from '../controllers/TasksController'
import { validateBoardQuery } from '../middlewares/queries'

const tasksRouter = Router()

tasksRouter.get('/', validateBoardQuery, (req, res) => {
  (async () => {
    await TaskController.getTasksByBoardId(req, res)
  })().catch(e => console.error(e))
})
// tasksRouter.get('/', validateBoardQuery, TaskController.getTasksByBoardId)

tasksRouter.post('/', (req, res) => {
  (async () => {
    await TaskController.createTask(req, res)
  })().catch(e => console.error(e))
})
// tasksRouter.post('/', TaskController.createTask)

tasksRouter.put('/:id', (req, res) => {
  (async () => {
    await TaskController.updateTask(req, res)
  })().catch(e => console.error(e))
})

tasksRouter.delete('/:id', (req, res) => {
  (async () => {
    await TaskController.deleteTask(req, res)
  })().catch(e => console.error(e))
})

export default tasksRouter
