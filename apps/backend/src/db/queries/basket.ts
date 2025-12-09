import pool from '../client'
import type { BasketItem } from '@cep/shared'

// Get basket items for a user (with product details)
export async function getBasketByUserId(userId: number): Promise<BasketItem[]> {
  const result = await pool.query<{
    id: number
    productid: number
    userid: number
    quantity: number
    product_id: number
    product_name: string
    product_type: string
    product_description: string | null
  }>(
    `SELECT 
      b.ID as id, 
      b.ProductID as productid, 
      b.UserID as userid, 
      b.Quantity as quantity,
      p.ID as product_id,
      p.Name as product_name,
      p.Type as product_type,
      p.Description as product_description
    FROM Basket b
    JOIN Product p ON b.ProductID = p.ID
    WHERE b.UserID = $1`,
    [userId]
  )

  return result.rows.map(row => ({
    id: row.id,
    productId: row.productid,
    userId: row.userid,
    quantity: row.quantity,
    product: {
      id: row.product_id,
      name: row.product_name,
      type: row.product_type as BasketItem['product']['type'],
      description: row.product_description,
    },
  }))
}

// Check if product is already in user basket
export async function isProductInBasket(
  userId: number,
  productId: number
): Promise<boolean> {
  const result = await pool.query<{ count: string }>(
    'SELECT COUNT(*) as count FROM Basket WHERE UserID = $1 AND ProductID = $2',
    [userId, productId]
  )
  return parseInt(result.rows[0].count) > 0
}

// Add product to basket
export async function addToBasket(
  userId: number,
  productId: number,
  quantity: number
): Promise<number> {
  const result = await pool.query<{ id: number }>(
    'INSERT INTO Basket (ProductID, UserID, Quantity) VALUES ($1, $2, $3) RETURNING ID as id',
    [productId, userId, quantity]
  )
  return result.rows[0].id
}

// Remove item from basket
export async function removeFromBasket(
  basketId: number,
  userId: number
): Promise<boolean> {
  const result = await pool.query(
    'DELETE FROM Basket WHERE ID = $1 AND UserID = $2',
    [basketId, userId]
  )
  return result.rowCount !== null && result.rowCount > 0
}
