let PrismaClientImpl: any;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  PrismaClientImpl = require('@prisma/client').PrismaClient;
} catch (err) {
  throw new Error("@prisma/client is not available. Run 'npx prisma generate' or 'npm run prisma:generate' and try again.\nOriginal error: " + (err as Error).message);
}

// Create a single PrismaClient instance and export it. Use a global to avoid
// multiple instances during hot-reload in development.
declare global {
  // eslint-disable-next-line no-var
  var prisma: InstanceType<typeof PrismaClientImpl> | undefined;
}

export const prisma = global.prisma ?? new PrismaClientImpl();
if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export default prisma;
