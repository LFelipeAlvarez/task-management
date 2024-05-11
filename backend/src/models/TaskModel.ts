/* eslint-disable @typescript-eslint/no-extraneous-class */
import { QueryResult, ResultSetHeader, RowDataPacket } from 'mysql2'
import { Task, TaskForCreate, TaskForUpdate } from '../types'
import { Database } from './Database'

export class TaskModel {
  static async getTasksByBoardId(id: string): Promise<QueryResult> {
    const pool = await Database.ConnectToDatabase()
    const query = 'SELECT * FROM task WHERE board_id = ?'
    const [rows] = await pool.execute(query, [id])
    return rows
  }

  static async getTaskById(id: number): Promise<Array<Record<string, string | number>>> {
    const pool = await Database.ConnectToDatabase()
    const query = 'SELECT * FROM task WHERE id = ?'
    const [rows] = await pool.execute<RowDataPacket[]>(query, [id])
    return rows
  }

  static async createTask({ title, description = null, status, icon = null, board_id: boardId }: TaskForCreate): Promise<Task> {
    const pool = await Database.ConnectToDatabase()
    const query = 'INSERT INTO task (title, description, status, icon, board_id) VALUES (?, ?, ?, ?, ?)'
    const [result] = await pool.execute<ResultSetHeader>(query, [title, description, status, icon, boardId])
    return { id: result.insertId, title, description, status, icon, board_id: boardId }
  }

  static async updateTask({ id, title, description = null, status, icon = null }: TaskForUpdate): Promise<TaskForUpdate> {
    const pool = await Database.ConnectToDatabase()
    const query = 'UPDATE task SET title = ?, description = ?, status = ?, icon = ? WHERE id = ?'
    await pool.execute(query, [title, description, status, icon, id])
    return { id, title, description, status, icon }
  }

  static async deleteTask(id: number): Promise<void> {
    const pool = await Database.ConnectToDatabase()
    const query = 'DELETE FROM task WHERE id = ?'
    await pool.execute<ResultSetHeader>(query, [id])
  }
}
;
