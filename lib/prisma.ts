import { PrismaClient } from '@prisma/client'

// Declare a global variable without modifying the global type
declare const global: { prisma?: PrismaClient }

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}

export default prisma
