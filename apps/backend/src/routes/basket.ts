import { Hono } from 'hono'
import {
  getBasketByUserId,
  isProductInBasket,
  addToBasket,
  removeFromBasket,
} from '../db/queries'
import { authMiddleware } from '../middleware/auth'

const basket = new Hono()

// All basket routes are protected
basket.use('*', authMiddleware)

// Get user's basket
basket.get('/', async c => {
  const user = c.get('user')
  const items = await getBasketByUserId(user.userId)
  return c.json({ items })
})

// Add item to basket
basket.post('/', async c => {
  const user = c.get('user')
  const { productId, quantity } = await c.req.json()

  // Check if product already in basket
  const exists = await isProductInBasket(user.userId, productId)
  if (exists) {
    return c.json({ error: 'Product already in basket' }, 400)
  }

  const id = await addToBasket(user.userId, productId, quantity)
  return c.json({ id }, 201)
})

// Remove item from basket
basket.delete('/:id', async c => {
  const user = c.get('user')
  const basketId = parseInt(c.req.param('id'))

  const deleted = await removeFromBasket(basketId, user.userId)
  if (!deleted) {
    return c.json({ error: 'Item not found' }, 404)
  }

  return c.json({ success: true })
})

export default basket
