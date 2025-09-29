export type FormData = {
  titulo: string;
  finalidade: string;
  tipo: string;
  preco: string;
  area: string;
  descricao: string;

  cep: string;
  rua: string;
  numero: string;
  bairro: string;
  complemento?: string;
  cidade: string;
  estado: string;

  midias?: string[]; // pode ser vazio, mas deve existir
};

export interface FormDataWithId extends FormData {
  id: string; // ID do imóvel
}
