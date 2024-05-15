/* eslint-disable @typescript-eslint/no-extraneous-class */
import { Request, Response } from 'express'
import { BoardModel } from '../models/BoardModel'

export class BoardController {
  static async CreateBoard (_req: Request, res: Response): Promise<void> {
    const response = await BoardModel.createBoard()
    res.status(201).json(response)
  }

  static async getBoard (req: Request, res: Response): Promise<void> {
    if (typeof req.params?.boardId === 'string') {
      const boardId = req.params.boardId
      const board = await BoardModel.getBoard(boardId)
      res.json(board)
    }
  }
}
