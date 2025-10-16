import { SignUpFormState } from '@/types/corretorTypes';

export interface FormFieldConfig {
  name: keyof SignUpFormState;
  label: string;
  placeholder: string;
  keyboardType?: 'default' | 'numeric' | 'email-address';
}

export const corretorFormFields: FormFieldConfig[] = [
  {
    name: 'firstname',
    label: 'Nome',
    placeholder: 'Digite o seu Nome',
  },
  {
    name: 'lastname',
    label: 'Sobrenome',
    placeholder: 'Digite o seu Sobrenome',
  },
  {
    name: 'birthdate',
    label: 'Data de Nascimento',
    placeholder: 'DD/MM/AAAA',
    keyboardType: 'numeric',
  },
  {
    name: 'cpf',
    label: 'CPF',
    placeholder: '000.000.000-00',
    keyboardType: 'numeric',
  },
  {
    name: 'creci',
    label: 'CRECI/Estado',
    placeholder: 'Digite o seu CRECI',
  },
];

/**
 * Verifica se todos os campos estão preenchidos
 * @param data - Dados do formulário (aceita parciais devido ao useWatch)
 * @returns true se todos os campos estão preenchidos, false caso contrário
 */
export const isFormValid = (data: Partial<SignUpFormState>): boolean => {
  return Object.values(data).every((value) => {
    return value !== undefined && value !== null && String(value).trim() !== '';
  });
};
