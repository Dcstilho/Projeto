// src/controllers/bankController.ts
import { FastifyReply, FastifyRequest } from 'fastify';
import { bankService } from '../services/bankService';
import { createBankSchema } from '../schemas/bankSchema';

export const bankController = {
  create: async (req: FastifyRequest, reply: FastifyReply) => {
    const parsed = createBankSchema.safeParse(req.body);
    if (!parsed.success) return reply.status(400).send(parsed.error);

    const bank = await bankService.createBank(parsed.data);
    return reply.status(201).send(bank);
  },

  list: async (_req: FastifyRequest, reply: FastifyReply) => {
    const banks = await bankService.getBanks();
    return reply.send(banks);
  },

  get: async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    const bank = await bankService.getBankById(req.params.id);
    if (!bank) return reply.status(404).send({ message: 'Not found' });
    return reply.send(bank);
  },

  update: async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    const parsed = createBankSchema.partial().safeParse(req.body);
    if (!parsed.success) return reply.status(400).send(parsed.error);

    const bank = await bankService.updateBank(req.params.id, parsed.data);
    return reply.send(bank);
  },

  delete: async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    await bankService.deleteBank(req.params.id);
    return reply.status(204).send();
  },
};