// src/schemas/transactionSchema.ts
import { z } from 'zod';

export const createTransactionSchema = z.object({
  amount: z.number(),
  type: z.enum(['income', 'expense']),
  categoryId: z.string().uuid(),
  bankId: z.string().uuid(),
});