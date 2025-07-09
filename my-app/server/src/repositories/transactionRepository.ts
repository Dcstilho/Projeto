// src/repositories/transactionRepository.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const transactionRepository = {
  create: (data: { amount: number; type: string; categoryId: string; bankId: string }) =>
    prisma.transaction.create({ data }),
  findAll: () => prisma.transaction.findMany({ include: { Category: true, Bank: true } }),
  findById: (id: string) =>
    prisma.transaction.findUnique({ where: { id }, include: { Category: true, Bank: true } }),
  update: (id: string, data: Partial<{ amount: number; type: string; categoryId: string; bankId: string }>) =>
    prisma.transaction.update({ where: { id }, data }),
  delete: (id: string) => prisma.transaction.delete({ where: { id } }),
};