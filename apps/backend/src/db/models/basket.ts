import pool from '../client'

// Create Basket table
export async function createBasketTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS Basket (
      ID SERIAL PRIMARY KEY,
      ProductID INTEGER NOT NULL REFERENCES Product(ID) ON DELETE CASCADE,
      UserID INTEGER NOT NULL REFERENCES "User"(UserID) ON DELETE CASCADE,
      Quantity INTEGER NOT NULL DEFAULT 1,
      UNIQUE(ProductID, UserID)
    )
  `)
}

// Drop Basket table
export async function dropBasketTable() {
  await pool.query(`DROP TABLE IF EXISTS Basket`)
}
