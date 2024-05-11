import { Pool, createPool } from 'mysql2/promise'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Database {
  private static pool: Pool

  public static async ConnectToDatabase (): Promise<Pool> {
    try {
      this.pool = createPool({
        host: 'localhost',
        user: 'root',
        password: 'lf1204',
        port: 3306,
        database: 'tasks_management'
      })
    } catch (error) {
      console.error('Error connecting to the database')
    }

    return this.pool
  }
}
