// src/repositories/categoryRepository.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const categoryRepository = {
  create: (data: { name: string; description?: string }) =>
    prisma.category.create({ data }),
  findAll: () => prisma.category.findMany(),
  findById: (id: string) => prisma.category.findUnique({ where: { id } }),
  update: (id: string, data: { name?: string; description?: string }) =>
    prisma.category.update({ where: { id }, data }),
  delete: (id: string) => prisma.category.delete({ where: { id } }),
};