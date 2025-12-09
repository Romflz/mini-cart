import {
  createProductTable,
  createUserTable,
  createBasketTable,
  dropBasketTable,
  dropProductTable,
  dropUserTable,
} from '../models'

// Initialize all database tables
export async function initDatabase() {
  // Order matters due to foreign key constraints
  await createProductTable()
  await createUserTable()
  await createBasketTable()
  console.log('Database tables created')
}

// Reset database (drop all tables)
export async function resetDatabase() {
  // Order matters due to foreign key constraints (drop dependent tables first)
  await dropBasketTable()
  await dropProductTable()
  await dropUserTable()
  console.log('Database tables dropped')
}
