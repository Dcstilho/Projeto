// src/routes/transactionRoutes.ts
import { FastifyInstance } from 'fastify';
import { transactionController } from '../controllers/transactionController';

export async function transactionRoutes(fastify: FastifyInstance) {
  fastify.post('/transactions', transactionController.create);
  fastify.get('/transactions', transactionController.list);
  fastify.get('/transactions/:id', transactionController.get);
  fastify.patch('/transactions/:id', transactionController.update);
  fastify.delete('/transactions/:id', transactionController.delete);
}