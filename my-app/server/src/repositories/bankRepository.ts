// src/repositories/bankRepository.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const bankRepository = {
  create: (data: { name: string; balance: number }) =>
    prisma.bank.create({ data }),
  findAll: () => prisma.bank.findMany(),
  findById: (id: string) => prisma.bank.findUnique({ where: { id } }),
  update: (id: string, data: { name?: string; balance?: number }) =>
    prisma.bank.update({ where: { id }, data }),
  delete: (id: string) => prisma.bank.delete({ where: { id } }),
};