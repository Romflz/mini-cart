import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { Hono } from 'hono'
import { authenticateUser } from './db/users'
import { createToken } from './utils/jwt'
import { authMiddleware } from './middleware/auth'

const app = new Hono()

// API routes (We make a new Hono intance, unlike express that often runs on single instance. This is idiomatic)
// For more info please look at: https://hono.dev/examples/grouping-routes-rpc
const api = new Hono()

// Public routes (no auth required)
api.post('/auth/login', async c => {
  const { username, password } = await c.req.json()

  const user = await authenticateUser(username, password)
  if (!user) {
    return c.json({ error: 'Invalid credentials' }, 401)
  }

  const token = await createToken(user)
  return c.json({ token, user })
})

// Protected routes (auth required)
api.get('/auth/me', authMiddleware, c => {
  const user = c.get('user')
  return c.json({ user })
})

app.route('/api', api)

// Serve static files from public folder
app.use('*', serveStatic({ root: './public' }))
app.use('*', serveStatic({ root: './public', path: 'index.html' }))

serve({ fetch: app.fetch, port: 3000 }, info => {
  console.log(`Server running on http://localhost:${info.port}`)
})
