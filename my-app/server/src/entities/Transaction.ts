// src/entities/Transaction.ts
import { Category } from './Category';
import { Bank } from './Bank';

export interface Transaction {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  categoryId: string;
  bankId: string;
  createdAt: Date;
  Category?: Category;
  Bank?: Bank;
}