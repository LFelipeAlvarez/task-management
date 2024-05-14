import { Pool, createPool } from 'mysql2/promise'
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from '../config/enviromentVars'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Database {
  private static pool: Pool

  public static async ConnectToDatabase (): Promise<Pool> {
    try {
      this.pool = createPool({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        port: +DB_PORT,
        database: DB_NAME
      })
    } catch (error) {
      console.error('Error connecting to the database')
    }

    return this.pool
  }
}
