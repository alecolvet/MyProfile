import { TaskFormData } from '../types/task';

export interface ValidationResult {
  isValid: boolean;
  errors: {
    title?: string;
    description?: string;
    category?: string;
  };
}

export const validateTaskForm = (data: TaskFormData): ValidationResult => {
  const errors: ValidationResult['errors'] = {};

  const trimmedTitle = data.title.trim();
  if (!trimmedTitle) {
    errors.title = 'O título é obrigatório e não pode conter apenas espaços.';
  } else if (trimmedTitle.length < 3) {
    errors.title = 'O título deve ter pelo menos 3 caracteres.';
  }

  const trimmedDesc = data.description.trim();
  if (!trimmedDesc) {
    errors.description = 'A descrição é obrigatória.';
  } else if (trimmedDesc.length < 5) {
    errors.description = 'A descrição deve ter pelo menos 5 caracteres.';
  }

  if (!data.category.trim()) {
    errors.category = 'Selecione uma categoria válida.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};