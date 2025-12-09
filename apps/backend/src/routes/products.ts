import { Hono } from 'hono'
import { getAllProducts } from '../db/queries'
import { authMiddleware } from '../middleware/auth'

const products = new Hono()

// Get all products - protected route
products.get('/', authMiddleware, async c => {
  const productList = await getAllProducts()
  return c.json({ products: productList })
})

export default products
