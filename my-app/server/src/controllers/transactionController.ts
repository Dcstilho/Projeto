// src/controllers/transactionController.ts
import { FastifyReply, FastifyRequest } from 'fastify';
import { transactionService } from '../services/transactionService';
import { createTransactionSchema } from '../schemas/transactionSchema';

export const transactionController = {
  create: async (req: FastifyRequest, reply: FastifyReply) => {
    const parsed = createTransactionSchema.safeParse(req.body);
    if (!parsed.success) return reply.status(400).send(parsed.error);

    const transaction = await transactionService.createTransaction(parsed.data);
    return reply.status(201).send(transaction);
  },

  list: async (_req: FastifyRequest, reply: FastifyReply) => {
    const transactions = await transactionService.getTransactions();
    return reply.send(transactions);
  },

  get: async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    const transaction = await transactionService.getTransactionById(req.params.id);
    if (!transaction) return reply.status(404).send({ message: 'Not found' });
    return reply.send(transaction);
  },

  update: async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    const parsed = createTransactionSchema.partial().safeParse(req.body);
    if (!parsed.success) return reply.status(400).send(parsed.error);

    const transaction = await transactionService.updateTransaction(req.params.id, parsed.data);
    return reply.send(transaction);
  },

  delete: async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    await transactionService.deleteTransaction(req.params.id);
    return reply.status(204).send();
  },
};