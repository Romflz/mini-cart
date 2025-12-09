import pool from '../client'
import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10

// Create User table
export async function createUserTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS "User" (
      UserID SERIAL PRIMARY KEY,
      LoginName VARCHAR(20) NOT NULL UNIQUE,
      Password VARCHAR(100) NOT NULL
    )
  `)
}

// Drop User table
export async function dropUserTable() {
  await pool.query(`DROP TABLE IF EXISTS "User"`)
}

// Seed User table
export async function seedUsers() {
  const hashedPassword = await bcrypt.hash('Password123', SALT_ROUNDS)

  await pool.query(
    `INSERT INTO "User" (LoginName, Password) 
     VALUES ($1, $2) 
     ON CONFLICT (LoginName) DO NOTHING`,
    ['demo_user', hashedPassword]
  )
}
