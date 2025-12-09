import { resetDatabase, initDatabase, seedDatabase } from './init'
import { closeDatabase } from './client'

async function main() {
  console.log('Initializing db...')
  await resetDatabase()
  await initDatabase()
  await seedDatabase()

  console.log('Database init complete')
  await closeDatabase()
}

main().catch(err => {
  console.error('Error initializing database:', err)
  process.exit(1)
})
