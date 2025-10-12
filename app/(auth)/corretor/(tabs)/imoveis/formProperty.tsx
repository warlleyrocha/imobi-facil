import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { FormData, FormDataWithId } from '@/types/formProperty';
import { BasicInfoSection } from '~/components/layouts/Sections/BasicInfoSection';
import { LocationSection } from '~/components/layouts/Sections/LocationSection';
import { MediaSection } from '~/components/layouts/Sections/MediaSection';
import { isFormValid } from '~/utils/validationsFormProperty'; // ajuste o caminho

const setaEsquerda = require('~/assets/arrow-left.png');

export default function FormProperty() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>(); // <-- aqui você obtém o ID

  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      titulo: 'Apartamento com 2 quartos e varanda',
      finalidade: 'venda',
      tipo: 'Apartamento',
      preco: '72000000',
      area: '74',
      descricao: 'Apartamento térreo com excelente iluminação natural.',
      cep: '01001-000',
      rua: 'Praça da Sé',
      numero: '35',
      bairro: 'Sé',
      complemento: 'Apto 101',
      cidade: 'São Paulo',
      estado: 'SP',
      midias: [], // <- inicializa vazio
    },
  });

  // Preencher o formulário caso seja edição
  useEffect(() => {
    if (!id) return; // Novo cadastro

    const loadPropertyForEdit = async () => {
      try {
        const savedData = await AsyncStorage.getItem('formPropertyData');
        if (!savedData) return;

        let list: FormDataWithId[] = JSON.parse(savedData);
        if (!Array.isArray(list)) list = [list];

        const selected = list.find((item) => item.id === id);
        if (!selected) {
          Alert.alert('Erro', 'Imóvel não encontrado');
          return;
        }

        // Atualiza o react-hook-form com os valores do imóvel
        reset(selected);
      } catch (error) {
        console.error('Erro ao carregar imóvel para edição:', error);
      }
    };

    loadPropertyForEdit();
  }, [id, reset]);

  // Observa mudanças nos campos em tempo real
  const watchedValues = useWatch({ control });

  // Verifica se o formulário está válido
  const formIsValid = isFormValid(watchedValues);

  const onSubmit = async (data: FormData) => {
    // Validação antes do envio
    if (!isFormValid(data)) {
      Alert.alert('Formulário incompleto');
      return;
    }

    try {
      const propertySaves = await AsyncStorage.getItem('formPropertyData');
      let listPropertys: FormDataWithId[] = [];

      if (propertySaves) {
        const parsedData = JSON.parse(propertySaves);
        listPropertys = Array.isArray(parsedData) ? parsedData : [parsedData];
      }

      let dataComId: FormDataWithId;

      if (id) {
        // Edição: usa o mesmo ID
        dataComId = { id, ...data };
        const index = listPropertys.findIndex((item) => item.id === id);
        if (index >= 0) {
          listPropertys[index] = dataComId;
        } else {
          listPropertys.push(dataComId);
        }
      } else {
        // Novo cadastro
        const novoImovelId = (listPropertys.length + 1).toString();
        dataComId = { id: novoImovelId, ...data };
        listPropertys.push(dataComId);
      }

      await AsyncStorage.setItem('formPropertyData', JSON.stringify(listPropertys));

      console.log('Enviando para API:', dataComId);

      // Navegar para addSuccess ou lista de imóveis
      router.replace({
        pathname: '/(auth)/corretor/(tabs)/imoveis/addSuccess',
        params: { propertyId: dataComId.id, ...dataComId },
      });
    } catch (error) {
      console.error('Erro ao salvar os dados do formulário:', error);
    }
  };

  return (
    <View className="flex-1 bg-[#F6F6F6]">
      <ScrollView
        className="px-[16px] pt-[55px]"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 64 }}>
        {/* Header */}
        <View className="relative flex-row items-center justify-center pb-[35px]">
          <TouchableOpacity
            onPress={() => {
              if (router.canGoBack()) {
                router.back();
              } else {
                router.replace('/(auth)/corretor/(tabs)/imoveis'); // 🔙 força retorno pra aba correta
              }
            }}
            className="absolute left-0 top-1">
            <Image source={setaEsquerda} className="h-6 w-6" />
          </TouchableOpacity>

          <Text className="font-mulish-bold text-[20px] text-dark">
            {id ? 'Editar Imóvel' : 'Novo Imóvel'}
          </Text>
        </View>

        {/* Basic infos */}
        <BasicInfoSection control={control} />

        {/* Location infos */}
        <LocationSection control={control} />

        {/* Midias */}
        <MediaSection control={control} />

        {/* Botão final */}
        <TouchableOpacity
          className={`h-[44px] w-full flex-row items-center justify-center gap-[8px] rounded-lg px-[24px] py-[12px] ${
            !formIsValid ? 'bg-gray-3' : 'bg-cor-primaria'
          }`}
          onPress={handleSubmit(onSubmit)}
          disabled={!formIsValid}>
          <Text
            className={`font-mulish-medium text-[16px] ${
              !formIsValid ? 'text-dark-5' : 'text-white'
            }`}>
            {id ? 'Salvar alterações' : 'Cadastrar imóvel'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
