// src/services/bankService.ts
import { bankRepository } from '../repositories/bankRepository';

export const bankService = {
  createBank: bankRepository.create,
  getBanks: bankRepository.findAll,
  getBankById: bankRepository.findById,
  updateBank: bankRepository.update,
  deleteBank: bankRepository.delete,
};