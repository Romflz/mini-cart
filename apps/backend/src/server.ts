import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { Hono } from 'hono'

const app = new Hono()

// API routes
const api = new Hono().get('/hello', c => c.json({ message: 'Hello from API' }))

app.route('/api', api)

// Serve static files from public folder
app.use('*', serveStatic({ root: './public' }))
app.use('*', serveStatic({ root: './public', path: 'index.html' }))

serve({ fetch: app.fetch, port: 3000 }, info => {
  console.log(`Server running on http://localhost:${info.port}`)
})
