import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { Container } from '~/components/Container';
import { router } from 'expo-router';

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

  const handleSubmit = async () => {
    try {
      router.push('/(auth)/corretor/verificacao' as any);
    } catch (error) {
      console.error(error);
    }
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <View className="m-0 p-0 flex-1 bg-white">
      <Container>
        <View className="w-full flex-1 items-start justify-center">
          <View className="mt-10 flex-row items-center justify-between gap-12">
            <Image source={setaEsquerda} style={{ width: 24, height: 24 }} className="text-left" />
            <Text className="text-center text-xl font-bold">Cadastro do Corretor</Text>
          </View>
          <View>
            <TouchableOpacity className="full-width mt-8 w-full">
              <View>
                <View className="full-width mt-8 w-full">
                  <View>
                    <Text className="form-title mb-2 block text-sm font-medium text-gray-700">
                      Nome*
                    </Text>
                    <TextInput
                      value={formData.firstname}
                      onChangeText={(value) =>
                        setFormData((prevData) => ({ ...prevData, firstname: value }))
                      }
                      className="form-input:focus w-full rounded border border-gray-300 p-2 text-black"
                      placeholder="Digite o seu Nome"
                    />
                  </View>
                  <Text className="form-title mb-2 mt-4 block text-sm font-medium text-gray-700">
                    Sobrenome*
                  </Text>
                  <TextInput
                    value={formData.lastname}
                    onChangeText={(value) =>
                      setFormData((prevData) => ({ ...prevData, lastname: value }))
                    }
                    className="form-input:focus w-full rounded border border-gray-300 p-2 text-black"
                    placeholder="Digite o seu Nome Completo"
                  />
                </View>

                <View>
                  <Text className="form-title mb-2 mt-4 block text-sm font-medium text-gray-700">
                    Data de Nascimento*
                  </Text>
                  <TextInput
                    value={String(formData.birthdate)}
                    onChangeText={(value) =>
                      setFormData((prevData) => ({ ...prevData, birthdate: value }))
                    }
                    className="form-input:focus w-full rounded border border-gray-300 p-2 text-black"
                    placeholder="DD/MM/AAAA"
                  />
                </View>
                <View>
                  <Text className="form-title mb-2 mt-4 block text-sm font-medium text-gray-700">
                    CPF*
                  </Text>
                  <TextInput
                    value={String(formData.cpf)}
                    onChangeText={(value) =>
                      setFormData((prevData) => ({ ...prevData, cpf: value }))
                    }
                    keyboardType="numeric"
                    className="form-input:focus w-full rounded border border-gray-300 p-2 text-black"
                    placeholder="000.000.000-00"
                  />
                </View>

                <View>
                  <Text className="form-title mb-2 mt-4 block text-sm font-medium text-gray-700">
                    CRECI/Estado*
                  </Text>
                  <TextInput
                    value={formData.creci}
                    onChangeText={(value) =>
                      setFormData((prevData) => ({ ...prevData, creci: value }))
                    }
                    className="form-input:focus w-full rounded border border-gray-300 p-2 text-black"
                    placeholder="Digite o seu CRECI"
                  />
                </View>
              </View>
            </TouchableOpacity>
            <View className="mt-32 flex w-full justify-end">
              <View className="flex flex-row items-center gap-2 text-center">
                <TouchableOpacity onPress={handleCheckboxChange} style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View
                    style={{
                      height: 24,
                      width: 24,
                      borderRadius: 4,
                      borderWidth: 2,
                      borderColor: '#81b0ff',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: isChecked ? '#007bff' : '#fff',
                    }}
                  >
                    {isChecked && (
                      // Ícone de "certo" usando SVG
                      <View style={{ position: 'absolute', left: 2, top: 1 }}>
                        <svg width="16" height="16" viewBox="0 0 16 16">
                          <polyline
                            points="3,9 7,13 13,5"
                            fill="none"
                            stroke="#fff"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
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
              </View>
              <TouchableOpacity
                className="btn-azul mt-4 w-full rounded p-3 font-mulish-medium text-base text-white"
                onPress={handleSubmit}>
                Cadastrar
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Container>
    </View>
  );
}