import { Pool } from 'pg'

// Database connection pool (In real prod app, we would use env. For now I will use fallbacks for this demo)
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'task_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'root',
})

// Close pool (for scripts and graceful shutdown)
export async function closeDatabase(): Promise<void> {
  await pool.end()
}

export default pool
