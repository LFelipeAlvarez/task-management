/* eslint-disable @typescript-eslint/no-extraneous-class */
import { Request, Response } from 'express'
import { TaskModel } from '../models/TaskModel'
import { noBoardIdTaskSchema, noIdTaskSchema } from '../schemas/taskEschema'
import { z } from 'zod'

export class TaskController {
  static async getTasksByBoardId(req: Request, res: Response): Promise<void> {
    if (typeof req.query?.board === 'string') {
      const boardId = req.query.board
      const tasks = await TaskModel.getTasksByBoardId(boardId)
      res.json(tasks)
    }
  }

  static async createTask(req: Request, res: Response): Promise<void> {
    try {
      const validatedBody = noIdTaskSchema.parse(req.body)
      const response = await TaskModel.createTask(validatedBody)
      res.status(201).json(response)
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors })
      }
    }
  }

  static async deleteTask(req: Request, res: Response): Promise<void> {
    try {
      const taskId = req.params.id
      const task = await TaskModel.getTaskById(+taskId)
      if (task === null) res.status(404).json({ error: 'Task not found' })
      else {
        await TaskModel.deleteTask(+taskId)
        res.status(204).end()
      }
    } catch (error) {
      res.status(500).json({ error: 'Error trying to delete a task' })
    }
  }

  static async updateTask(req: Request, res: Response): Promise<void> {
    try {
      const taskId = req.params.id
      const [foundTask] = await TaskModel.getTaskById(+taskId)
      if (foundTask === undefined) res.status(404).json({ error: 'Task not found' })
      else {
        const validatedTask = noBoardIdTaskSchema.parse({ ...req.body, id: foundTask.id })
        const updatedTask = await TaskModel.updateTask(validatedTask)
        res.json(updatedTask)
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors })
      } else res.status(500).json({ error: 'Error trying to delete a task' })
    }
  }
}
