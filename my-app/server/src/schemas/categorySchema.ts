// src/schemas/categorySchema.ts
import { z } from 'zod';

export const createCategorySchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
});