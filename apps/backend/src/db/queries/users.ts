import pool from '../client'
import bcrypt from 'bcrypt'
import type { SafeUser } from '@cep/shared'

// Authenticate user (login)
export async function authenticateUser(
  loginName: string,
  password: string
): Promise<SafeUser | null> {
  const result = await pool.query<{
    userid: number
    loginname: string
    password: string
  }>(
    'SELECT UserID as userid, LoginName as loginname, Password as password FROM "User" WHERE LoginName = $1',
    [loginName]
  )

  const user = result.rows[0]
  if (!user) {
    return null
  }

  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) {
    return null
  }

  return {
    userId: user.userid,
    loginName: user.loginname,
  }
}

// Get user by ID. We use this after verifying JWT to validate session
export async function findUserById(userId: number): Promise<SafeUser | null> {
  const result = await pool.query<{ userid: number; loginname: string }>(
    'SELECT UserID as userid, LoginName as loginname FROM "User" WHERE UserID = $1',
    [userId]
  )
  const row = result.rows[0]
  return row ? { userId: row.userid, loginName: row.loginname } : null
}
