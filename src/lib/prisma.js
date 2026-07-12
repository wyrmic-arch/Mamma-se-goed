const globalForPrisma = globalThis

function createPrisma() {
  const url = process.env.DATABASE_URL
  if (!url) return null

  try {
    const { PrismaClient } = require('@/generated/prisma/client')
    const { PrismaPg } = require('@prisma/adapter-pg')
    return new PrismaClient({ adapter: new PrismaPg({ connectionString: url }) })
  } catch {
    return null
  }
}

const prisma = globalForPrisma.prisma ?? createPrisma()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
