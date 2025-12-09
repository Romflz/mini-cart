import pool from '../client'

// Create Product table
export async function createProductTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS Product (
      ID SERIAL PRIMARY KEY,
      Name VARCHAR(32) NOT NULL,
      Type VARCHAR(8) NOT NULL CHECK(Type IN ('Books', 'Music', 'Games')),
      Description VARCHAR(100)
    )
  `)
}

// Drop Product table
export async function dropProductTable() {
  await pool.query(`DROP TABLE IF EXISTS Product`)
}

// Seed Product table
export async function seedProducts() {
  const products = [
    // Books
    ['The Great Gatsby', 'Books', 'Classic novel by F. Scott Fitzgerald'],
    ['1984', 'Books', 'Dystopian novel by George Orwell'],
    ['To Kill a Mockingbird', 'Books', 'Novel by Harper Lee'],

    // Music
    ['Stadium Arcadium', 'Music', 'Album by Red Hot Chili Peppers'],
    ['Thriller', 'Music', 'Album by Michael Jackson'],
    ['And Justice for All', 'Music', 'Album by Metallica'],

    // Games
    ['The Legend of Zelda', 'Games', 'Action-adventure game series'],
    ['Super Mario Bros', 'Games', 'Platform game by Nintendo'],
    ['Minecraft', 'Games', 'Sandbox video game'],
  ]

  for (const [name, type, description] of products) {
    await pool.query(
      `INSERT INTO Product (Name, Type, Description) 
       VALUES ($1, $2, $3) 
       ON CONFLICT DO NOTHING`,
      [name, type, description]
    )
  }
}
