import { Router } from 'express'
import { BoardController } from '../controllers/BoardController'

const boardRouter = Router()

boardRouter.get('/:boardId', BoardController.getBoard)
boardRouter.post('/', BoardController.CreateBoard)

export default boardRouter
