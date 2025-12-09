import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { Hono } from 'hono'

const app = new Hono()

// API routes
const api = new Hono()

api.post('/auth/login', async c => {
  const { username, password } = await c.req.json()
  // TODO: Check with DB hashed password
  if (username === 'demo_user' && password === 'Password123') {
    // Return a fake JWT for demo
    return c.json({ token: 'demo.jwt.token' })
  }
  return c.json({ error: 'Invalid credentials' }, 401)
})

api.get('/auth/me', c => {
  const auth = c.req.header('authorization')
  // TODO: Check the JWT
  if (auth === 'Bearer demo.jwt.token') {
    return c.json({ username: 'demo_user' })
  }
  return c.json({ error: 'Unauthorized' }, 401)
})

app.route('/api', api)

// Serve static files from public folder
app.use('*', serveStatic({ root: './public' }))
app.use('*', serveStatic({ root: './public', path: 'index.html' }))

serve({ fetch: app.fetch, port: 3000 }, info => {
  console.log(`Server running on http://localhost:${info.port}`)
})
