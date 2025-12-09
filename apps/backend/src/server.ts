import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { Hono } from 'hono'
import auth from './routes/auth'
import products from './routes/products'
import basket from './routes/basket'

const app = new Hono()

// API routes
const api = new Hono()

api.route('/auth', auth)
api.route('/products', products)
api.route('/basket', basket)

app.route('/api', api)

// Serve static files from public folder
// When we build, our frontend dist will be in the backend public directory
app.use('*', serveStatic({ root: './public' }))
app.use('*', serveStatic({ root: './public', path: 'index.html' }))

serve({ fetch: app.fetch, port: 3000 }, info => {
  console.log(`Server running on http://localhost:${info.port}`)
})
