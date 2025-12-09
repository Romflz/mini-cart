import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { Hono } from 'hono'
import { authenticateUser, findUserById } from './db/users'
import { createToken, verifyToken, extractToken } from './utils/jwt'

const app = new Hono()

// API routes (We make a new Hono intance, unlike express that often runs on single instance. This is idiomatic)
// For more info please look at: https://hono.dev/examples/grouping-routes-rpc
const api = new Hono()

api.post('/auth/login', async c => {
  const { username, password } = await c.req.json()

  const user = await authenticateUser(username, password)
  if (!user) {
    return c.json({ error: 'Invalid credentials' }, 401)
  }

  const token = await createToken(user)
  return c.json({ token, user })
})

api.get('/auth/me', async c => {
  const token = extractToken(c.req.header('authorization'))
  if (!token) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  const payload = await verifyToken(token)
  if (!payload) {
    return c.json({ error: 'Invalid token' }, 401)
  }

  const user = await findUserById(payload.sub)
  if (!user) {
    return c.json({ error: 'User not found' }, 401)
  }

  return c.json({ user })
})

app.route('/api', api)

// Serve static files from public folder
app.use('*', serveStatic({ root: './public' }))
app.use('*', serveStatic({ root: './public', path: 'index.html' }))

serve({ fetch: app.fetch, port: 3000 }, info => {
  console.log(`Server running on http://localhost:${info.port}`)
})
