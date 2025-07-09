// src/services/categoryService.ts
import { categoryRepository } from '../repositories/categoryRepository';

export const categoryService = {
  createCategory: categoryRepository.create,
  getCategories: categoryRepository.findAll,
  getCategoryById: categoryRepository.findById,
  updateCategory: categoryRepository.update,
  deleteCategory: categoryRepository.delete,
};