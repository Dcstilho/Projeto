// src/routes/categoryRoutes.ts
import { FastifyInstance } from 'fastify';
import { categoryController } from '../controllers/categoryController';

export async function categoryRoutes(fastify: FastifyInstance) {
  fastify.post('/categories', categoryController.create);
  fastify.get('/categories', categoryController.list);
  fastify.get('/categories/:id', categoryController.get);
  fastify.patch('/categories/:id', categoryController.update);
  fastify.delete('/categories/:id', categoryController.delete);
}