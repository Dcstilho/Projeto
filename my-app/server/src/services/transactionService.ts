// src/services/transactionService.ts
import { PrismaClient } from '@prisma/client';
import { transactionRepository } from '../repositories/transactionRepository';
import { bankRepository } from '../repositories/bankRepository';

const prisma = new PrismaClient();

export const transactionService = {
  createTransaction: async (data: { amount: number; type: string; categoryId: string; bankId: string }) => {
    // Inicie uma transação do banco de dados para garantir atomicidade
    return await prisma.$transaction(async (tx) => {
      // Cria a transação normalmente
      const transaction = await tx.transaction.create({ data });

      // Busca o banco relacionado
      const bank = await tx.bank.findUnique({ where: { id: data.bankId } });
      if (!bank) throw new Error('Bank not found');

      // Atualiza o balance conforme o tipo
      let newBalance = bank.balance;
      if (data.type === 'expense') {
        newBalance -= data.amount;
      } else if (data.type === 'income') {
        newBalance += data.amount;
      }

      // Atualiza o banco
      await tx.bank.update({
        where: { id: data.bankId },
        data: { balance: newBalance },
      });

      return transaction;
    });
  },

  getTransactions: transactionRepository.findAll,
  getTransactionById: transactionRepository.findById,
  updateTransaction: transactionRepository.update,

  // Novo método para deletar transação e atualizar saldo do banco
  deleteTransaction: async (id: string) => {
    return await prisma.$transaction(async (tx) => {
      // 1. Busca a transação
      const transaction = await tx.transaction.findUnique({ where: { id } });
      if (!transaction) throw new Error('Transaction not found');

      // 2. Busca o banco relacionado
      const bank = await tx.bank.findUnique({ where: { id: transaction.bankId } });
      if (!bank) throw new Error('Bank not found');

      // 3. Atualiza o saldo do banco
      let newBalance = bank.balance;
      if (transaction.type === 'expense') {
        newBalance += transaction.amount; // devolve o valor
      } else if (transaction.type === 'income') {
        newBalance -= transaction.amount; // retira o valor
      }

      await tx.bank.update({
        where: { id: transaction.bankId },
        data: { balance: newBalance },
      });

      // 4. Deleta a transação
      await tx.transaction.delete({ where: { id } });

      return { message: 'Transaction deleted and bank balance updated.' };
    });
  },
};