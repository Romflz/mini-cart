import pool from './client'
import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10

// Initialize database tables
export async function initDatabase() {
  const client = await pool.connect()
  try {
    // Create Product table
    await client.query(`
      CREATE TABLE IF NOT EXISTS Product (
        ID SERIAL PRIMARY KEY,
        Name VARCHAR(32) NOT NULL,
        Type VARCHAR(8) NOT NULL CHECK(Type IN ('Books', 'Music', 'Games')),
        Description VARCHAR(100)
      )
    `)

    // Create "User" table (quoted since User is reserved in PostgreSQL)
    await client.query(`
      CREATE TABLE IF NOT EXISTS "User" (
        UserID SERIAL PRIMARY KEY,
        LoginName VARCHAR(20) NOT NULL UNIQUE,
        Password VARCHAR(100) NOT NULL
      )
    `)

    // Create Basket table
    await client.query(`
      CREATE TABLE IF NOT EXISTS Basket (
        ID SERIAL PRIMARY KEY,
        ProductID INTEGER NOT NULL REFERENCES Product(ID) ON DELETE CASCADE,
        UserID INTEGER NOT NULL REFERENCES "User"(UserID) ON DELETE CASCADE,
        Quantity INTEGER NOT NULL DEFAULT 1,
        UNIQUE(ProductID, UserID)
      )
    `)

    console.log('DB tables created')
  } finally {
    client.release()
  }
}

// Seed database with sample data
export async function seedDatabase() {
  const client = await pool.connect()
  try {
    // Insert sample products
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
      await client.query(
        `INSERT INTO Product (Name, Type, Description) 
         VALUES ($1, $2, $3) 
         ON CONFLICT DO NOTHING`,
        [name, type, description]
      )
    }

    // Insert sample users with hashed passwords
    const hashedPassword1 = await bcrypt.hash('password123', SALT_ROUNDS)

    await client.query(
      `INSERT INTO "User" (LoginName, Password) 
       VALUES ($1, $2) 
       ON CONFLICT (LoginName) DO NOTHING`,
      ['demo_user', hashedPassword1]
    )

    console.log('Database seeded with sample data')
  } finally {
    client.release()
  }
}

// Reset database (drop all tables)
export async function resetDatabase(): Promise<void> {
  const client = await pool.connect()
  try {
    await client.query(`DROP TABLE IF EXISTS Basket`)
    await client.query(`DROP TABLE IF EXISTS Product`)
    await client.query(`DROP TABLE IF EXISTS "User"`)
    console.log('Database tables dropped')
  } finally {
    client.release()
  }
}
