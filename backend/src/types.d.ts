import { z } from 'zod'
import { boardSchema, noBoardIdTaskSchema, noIdTaskSchema, taskSchema } from './schemas/taskEschema'

// export interface Task {
//   title: string
//   description: string
//   status: TaskStatus
//   board_id: string
// }

export type Task = z.infer<typeof taskSchema>
export type TaskForCreate = z.infer<typeof noIdTaskSchema>
export type TaskForUpdate = z.infer<typeof noBoardIdTaskSchema>
export type Board = z.infer<typeof boardSchema>
