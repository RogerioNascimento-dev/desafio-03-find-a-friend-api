import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import { Environment } from 'vitest/environments'
import { prisma } from '~/configs/prisma'
import { env } from '~/env'
export default <Environment>{
  name: 'prisma',
  async setup(){
    console.log('🧪 Start setup environment test.')
    const schema = `test-${randomUUID()}`
    process.env.DATABASE_URL = generateDatabaseUrl(schema)
    console.log(`🧪 Creating schema ${schema} and run migrate.`)
    execSync(`npx prisma migrate deploy`)
    return {
      async teardown(){
        console.log('🧪 Finished tests.')
        console.log(`🧪 Drop schema ${schema}.`)
        await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)
        await prisma.$disconnect()
      }
    }
  },
  transformMode: 'ssr'
}


function generateDatabaseUrl(schema: string){
  if(!env.DATABASE_URL){
    throw new Error('❌ DATABASE_URL is not defined.')
  }
  const url = new URL(env.DATABASE_URL)  
  url.searchParams.set('schema', schema)
  return url.toString()
}