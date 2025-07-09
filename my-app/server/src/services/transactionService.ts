// src/services/transactionService.ts
import { transactionRepository } from '../repositories/transactionRepository';

export const transactionService = {
  createTransaction: transactionRepository.create,
  getTransactions: transactionRepository.findAll,
  getTransactionById: transactionRepository.findById,
  updateTransaction: transactionRepository.update,
  deleteTransaction: transactionRepository.delete,
};