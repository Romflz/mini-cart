import { seedProducts, seedUsers } from '../models'

// Seed database with sample data
export async function seedDatabase() {
  await seedProducts()
  await seedUsers()
  console.log('Database seeded with sample data')
}
