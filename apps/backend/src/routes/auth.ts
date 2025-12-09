import { Hono } from 'hono'
import { authenticateUser } from '../db/queries'
import { createToken } from '../utils/jwt'
import { authMiddleware } from '../middleware/auth'

const auth = new Hono()

// Login - public route
auth.post('/login', async c => {
  const { username, password } = await c.req.json()

  const user = await authenticateUser(username, password)
  if (!user) {
    return c.json({ error: 'Invalid credentials' }, 401)
  }

  const token = await createToken(user)
  return c.json({ token, user })
})

// Get current user - protected route
auth.get('/me', authMiddleware, c => {
  const user = c.get('user')
  return c.json({ user })
})

export default auth
