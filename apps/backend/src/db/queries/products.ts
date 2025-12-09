import pool from '../client'
import type { Product } from '@cep/shared'

// Get all products
// Generally, for big projects, you would implement search product and not get the whole thing + pagination
// But im using Vue store to cache it for this project purpose. To not over complicate it
export async function getAllProducts(): Promise<Product[]> {
  const result = await pool.query<{
    id: number
    name: string
    type: string
    description: string | null
  }>(
    'SELECT ID as id, Name as name, Type as type, Description as description FROM Product'
  )

  return result.rows.map(row => ({
    id: row.id,
    name: row.name,
    type: row.type as Product['type'],
    description: row.description,
  }))
}
