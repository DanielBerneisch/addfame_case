import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prismaExtended = new PrismaClient().$extends(withAccelerate());

type PrismaExtendedClient = typeof prismaExtended;

// Define globalForPrisma on the global object
const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaExtendedClient;
};

export const prisma = globalForPrisma.prisma ?? prismaExtended;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
