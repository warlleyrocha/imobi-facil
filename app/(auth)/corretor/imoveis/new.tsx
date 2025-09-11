import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { FormData } from '@/types/formProperty';
import { BasicInfoSection } from '~/components/Sections/BasicInfoSection';
import { LocationSection } from '~/components/Sections/LocationSection';
import { MediaSection } from '~/components/Sections/MediaSection';

const setaEsquerda = require('~/assets/arrow-left.png');

export default function FormProperty() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      titulo: '',
      finalidade: '',
      tipo: '',
      preco: '',
      area: '',
      descricao: '',
      cep: '',
      rua: '',
      numero: '',
      bairro: '',
      complemento: '',
      cidade: '',
      estado: '',
      midias: [], // <- inicializa vazio
    },
  });

  const onSubmit = (data: FormData) => {
    console.log('Enviando para API:', data);
  };

  return (
    <View className="flex-1 bg-[#F6F6F6]">
      <ScrollView
        className="px-[16px] pt-[55px]"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 64 }}>
        {/* Header */}
        <View className="relative flex-row items-center justify-center pb-[35px]">
          <TouchableOpacity onPress={() => router.back()} className="absolute left-0 top-1">
            <Image source={setaEsquerda} className="h-6 w-6" />
          </TouchableOpacity>

          <Text className="font-mulish-bold text-[20px] text-dark">Novo Imóvel</Text>
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
            Object.keys(errors).length > 0 ? 'bg-gray-400' : 'bg-cor-primaria'
          }`}
          onPress={handleSubmit(onSubmit)}>
          <Text className="font-mulish-medium text-[16px] text-white">Cadastrar imóvel</Text>
        </TouchableOpacity>

        {/* Mensagem de erro geral */}
        {Object.keys(errors).length > 0 && (
          <Text className="mt-2 text-center text-red-500">
            Preencha todos os campos obrigatórios antes de continuar
          </Text>
        )}
      </ScrollView>
    </View>
  );
}
