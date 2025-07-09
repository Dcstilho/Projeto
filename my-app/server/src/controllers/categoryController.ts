// src/controllers/categoryController.ts
import { FastifyReply, FastifyRequest } from 'fastify';
import { categoryService } from '../services/categoryService';
import { createCategorySchema } from '../schemas/categorySchema';

export const categoryController = {
  create: async (req: FastifyRequest, reply: FastifyReply) => {
    const parsed = createCategorySchema.safeParse(req.body);
    if (!parsed.success) return reply.status(400).send(parsed.error);

    const category = await categoryService.createCategory(parsed.data);
    return reply.status(201).send(category);
  },

  list: async (_req: FastifyRequest, reply: FastifyReply) => {
    const categories = await categoryService.getCategories();
    return reply.send(categories);
  },

  get: async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    const category = await categoryService.getCategoryById(req.params.id);
    if (!category) return reply.status(404).send({ message: 'Not found' });
    return reply.send(category);
  },

  update: async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    const parsed = createCategorySchema.partial().safeParse(req.body);
    if (!parsed.success) return reply.status(400).send(parsed.error);

    const category = await categoryService.updateCategory(req.params.id, parsed.data);
    return reply.send(category);
  },

  delete: async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    await categoryService.deleteCategory(req.params.id);
    return reply.status(204).send();
  },
};