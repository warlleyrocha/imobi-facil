import CreateFolderIcon from '@/assets/icons-svg/create_new_folder.svg';
import { useRouter } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const setaEsquerda = require('~/assets/arrow-left.png');

export default function DetailsImovel() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white px-[16px]">
      {/* Header */}
      <View className="flex-row items-center  pt-[62px]">
        {/* Botão voltar */}
        <TouchableOpacity onPress={() => router.back()} className="mr-[12px]">
          <Image source={setaEsquerda} className="h-6 w-6" />
        </TouchableOpacity>

        {/* Texto mais à esquerda, logo após a seta */}
        <Text className="font-mulish-bold text-[20px] text-dark">Detalhes do Imóvel</Text>

        {/* Ícone à direita (empurrado com margin-left:auto) */}
        <TouchableOpacity
          onPress={() => router.push('/(auth)/corretor/imoveis')}
          className="ml-auto">
          <CreateFolderIcon width={24} height={24} fill="#000" />
        </TouchableOpacity>
      </View>

      <View className="mx-auto mt-[20px] h-[335px] w-[343px] rounded-lg bg-gray-3"></View>

      <Text className="font-mulish-semibold text-[24px] leading-[31px] text-dark">
        Apartamento com 2 quartos e varanda
      </Text>
    </View>
  );
}
