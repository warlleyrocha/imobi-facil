import { FormData } from '@/types/formProperty';
import { useRouter } from 'expo-router';
import { useForm, useWatch } from 'react-hook-form';
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { BasicInfoSection } from '~/components/Sections/BasicInfoSection';
import { LocationSection } from '~/components/Sections/LocationSection';
import { MediaSection } from '~/components/Sections/MediaSection';
import { isFormValid } from '~/utils/validationsFormProperty'; // ajuste o caminho

const setaEsquerda = require('~/assets/arrow-left.png');

export default function FormProperty() {
  const router = useRouter();

  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      titulo: 'Apartamento amplo',
      finalidade: 'venda',
      tipo: 'Apartamento',
      preco: '500000',
      area: '30',
      descricao: 'Apt amplo e arejado',
      cep: '36570043',
      rua: 'Rua Floriano Peixoto',
      numero: '151',
      bairro: 'Centro',
      complemento: 'Ap 101',
      cidade: 'Viçosa',
      estado: 'MG',
      midias: [], // <- inicializa vazio
    },
  });

  // Observa mudanças nos campos em tempo real
  const watchedValues = useWatch({ control });

  // Verifica se o formulário está válido
  const formIsValid = isFormValid(watchedValues);

  const onSubmit = (data: FormData) => {
    if (!isFormValid(data)) {
      Alert.alert('Formulário incompleto');
      return;
    }

    console.log('Enviando para API:', data);

    // Simular que o backend retornou um ID para o imóvel cadastrado
    const novoImovelId = Date.now().toString(); // ou qualquer lógica para gerar ID

    // Navegar para addSuccess passando o ID como parâmetro
    router.push({
      pathname: '/(auth)/corretor/imoveis/addSuccess',
      params: { propertyId: novoImovelId, ...data }, // passando todos os dados do imóvel
    });
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
            !formIsValid ? 'bg-gray-3' : 'bg-cor-primaria'
          }`}
          onPress={handleSubmit(onSubmit)}
          disabled={!formIsValid}>
          <Text
            className={`font-mulish-medium text-[16px] ${
              !formIsValid ? 'text-dark-5' : 'text-white'
            }`}>
            Cadastrar imóvel
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
