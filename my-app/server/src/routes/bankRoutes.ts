// src/routes/bankRoutes.ts
import { FastifyInstance } from 'fastify';
import { bankController } from '../controllers/bankController';

export async function bankRoutes(fastify: FastifyInstance) {
  fastify.post('/banks', bankController.create);
  fastify.get('/banks', bankController.list);
  fastify.get('/banks/:id', bankController.get);
  fastify.patch('/banks/:id', bankController.update);
  fastify.delete('/banks/:id', bankController.delete);
}