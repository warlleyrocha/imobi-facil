import CirclePlusIcon from '@/assets/icons-svg/circle-plus.svg';
import ForSaleImage from '@/assets/icons-svg/for-sale.svg';
import { useRouter } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';

export default function MyProperties() {
  const router = useRouter();
  const setaEsquerda = require('~/assets/arrow-left.png');

  return (
    <View className="flex-1">
      <View className="px-[16px] pt-[55px]">
        <View className="relative flex-row items-center justify-center pb-[142px]">
          <TouchableOpacity onPress={() => router.back()} className="absolute left-0 top-1">
            <Image source={setaEsquerda} className="h-6 w-6" />
          </TouchableOpacity>

          <Text className="font-mulish-bold text-[20px] text-dark">Meus Imóveis</Text>
        </View>

        <View className="items-center gap-[32px]">
          <ForSaleImage />

          <TouchableOpacity
            className="h-[44px] w-full flex-row items-center justify-center gap-[8px] rounded-lg bg-cor-primaria px-[24px] py-[12px]"
            onPress={() => router.push('/(auth)/corretor/imoveis/new')}>
            <CirclePlusIcon />
            <Text className="font-mulish-medium text-[16px] text-white">Novo imóvel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
