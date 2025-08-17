import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { Container } from '~/components/Container';
import axios from 'axios';
import { useRouter } from 'expo-router';

export default function Corretor() {
  const setaEsquerda = require('~/assets/arrow-left.png');

  interface SignUpFormState {
    firstname: string;
    lastname: string;
    birthdate: string | number; // Pode ser string ou number dependendo do formato
    // Se for string, pode ser uma data no formato ISO ou outro formato de data
    // Se for number, pode ser um timestamp ou outro formato numérico
    // Aqui, estou usando string | number para permitir ambos os formatos
    cpf: string | number; // CPF pode ser string ou number dependendo do formato
    // Se for string, pode ser um CPF formatado com pontos e traços
    // Se for number, pode ser um CPF numérico sem formatação
    creci: string;
  }

  const [formData, setFormData] = useState<SignUpFormState>({
    // Estado inicial do formulário
    firstname: '',
    lastname: '',
    birthdate: '',
    cpf: '',
    creci: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value })); // Atualiza o estado do formulário com o novo valor
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    // Previne o comportamento padrão do formulário
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/apiv1/signup', formData);
      console.log(response); // Exibe a resposta da requisição no console
      // Redireciona após cadastro bem-sucedido
      window.location.href = '/(auth)/verificacao';
    } catch (error) {
      console.error(error); // Exibe o erro no console
    }
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const router = useRouter();
  function handleBack() {
    router.push('/(auth)/corretor/verificacao'); // Navega para a página anterior
  }

  return (
    <View className="m-0 p-0">
      <Container>
        <View className="w-full flex-1 items-start justify-center">
          <View className="mt-10 flex-row items-center justify-between gap-12">
            <Image source={setaEsquerda} style={{ width: 24, height: 24 }} className="text-left" />
            <Text className="text-center text-xl font-bold">Cadastro do Corretor</Text>
          </View>
          <View>
            <form className="full-width mt-8 w-full" onSubmit={handleSubmit}>
              <div>
                <label className="form-title mb-2 block text-sm font-medium text-gray-700">
                  Nome*
                </label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  required
                  maxLength={50}
                  className="form-input:focus w-full rounded border border-gray-300 p-2 text-black"
                  placeholder="Digite o seu Nome"
                />
              </div>

              <div>
                <label className="form-title mb-2 mt-4 block text-sm font-medium text-gray-700">
                  Sobrenome*
                </label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  required
                  maxLength={50}
                  className="form-input:focus w-full rounded border border-gray-300 p-2 text-black"
                  placeholder="Digite o seu Nome Completo"
                />
              </div>

              <div>
                <label className="form-title mb-2 mt-4 block text-sm font-medium text-gray-700">
                  Data de Nascimento*
                </label>
                <input
                  type="date"
                  name="birthdate"
                  value={formData.birthdate}
                  onChange={handleChange}
                  required
                  className="form-input:focus w-full rounded border border-gray-300 p-2 text-black"
                  placeholder="DD/MM/AAAA"
                />
              </div>
              <div>
                <label className="form-title mb-2 mt-4 block text-sm font-medium text-gray-700">
                  CPF*
                </label>
                <input
                  type="text"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleChange}
                  required
                  maxLength={11}
                  className="form-input:focus w-full rounded border border-gray-300 p-2 text-black"
                  placeholder="000.000.000-00"
                />
              </div>

              <div>
                <label className="form-title mb-2 mt-4 block text-sm font-medium text-gray-700">
                  CRECI/Estado*
                </label>
                <input
                  type="text"
                  name="creci"
                  value={formData.creci}
                  onChange={handleChange}
                  required
                  maxLength={20}
                  className="form-input:focus w-full rounded border border-gray-300 p-2 text-black"
                  placeholder="Digite o seu CRECI"
                />
              </div>
            </form>
          </View>
          <View className="mt-32 flex w-full justify-end">
            <div className="flex items-center gap-2 text-center">
              <label>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  className="h-6 w-6 appearance-none rounded text-cor-primaria"
                />
              </label>
              <Text className="font-mulish-light text-sm text-gray-500">
                Concordo com os nossos{' '}
                <a
                  href="/termos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cor-primaria underline">
                  Termos
                </a>{' '}
                e{' '}
                <a
                  href="/politicas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cor-primaria underline">
                  Políticas.
                </a>{' '}
              </Text>
            </div>
            <button
              type="submit"
              className="btn-azul mt-4 w-full rounded p-3 font-mulish-medium text-base text-white"
              onClick={handleBack}>
              Cadastrar
            </button>
          </View>
        </View>
      </Container>
    </View>
  );
}