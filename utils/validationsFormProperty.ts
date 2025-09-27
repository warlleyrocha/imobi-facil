import { FormData } from '@/types/formProperty';

/**
 * Verifica se todos os campos estão preenchidos
 * @param data - Dados do formulário (aceita parciais devido ao useWatch)
 * @returns true se todos os campos estão preenchidos, false caso contrário
 */
export const isFormValid = (data: Partial<FormData>): boolean => {
  return Object.values(data).every((value) => {
    if (Array.isArray(value)) {
      return value.length > 0; // Para o campo 'midias'
    }
    return value !== undefined && value !== null && String(value).trim() !== '';
  });
};
