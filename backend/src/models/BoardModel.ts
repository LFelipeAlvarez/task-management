/* eslint-disable @typescript-eslint/no-extraneous-class */
import { RowDataPacket } from 'mysql2'
import { Board } from '../types'
import { Database } from './Database'
import { v4 as uuidv4 } from 'uuid'

export class BoardModel {
  static async createBoard (): Promise<Board> {
    const boardId = uuidv4()
    const pool = await Database.ConnectToDatabase()
    const query = 'INSERT INTO board VALUES (?)'
    await pool.execute(query, [boardId])
    return { id: boardId }
  }

  static async getBoard (id: string): Promise<RowDataPacket[]> {
    const pool = await Database.ConnectToDatabase()
    const query = 'SELECT * FROM board WHERE id = ?'
    const [rows] = await pool.execute<RowDataPacket[]>(query, [id])
    return rows
  }
}
