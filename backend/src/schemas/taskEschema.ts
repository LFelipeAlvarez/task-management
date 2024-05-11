import { z } from 'zod'

export const taskSchema = z.object({
  id: z.number().min(1),
  title: z.string().min(1, 'Title is required'),
  description: z.string().nullish().optional(),
  status: z.number().int().min(1).max(3),
  icon: z.string().nullish().optional(),
  board_id: z.string().min(1, 'Board ID is required')
})

export const noIdTaskSchema = taskSchema.omit({ id: true })
export const noBoardIdTaskSchema = taskSchema.omit({ board_id: true })

export const boardSchema = z.object({
  id: z.string().min(1, 'Board ID is required')
})
