import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Container } from '~/components/Container';
import { useRouter } from 'expo-router';
import ForSaleImage from '@/assets/icons-svg/for-sale.svg';
import CirclePlusIcon from '@/assets/icons-svg/circle-plus.svg';

export default function MyProperties() {
  const router = useRouter();
  const setaEsquerda = require('~/assets/arrow-left.png');

  return (
    <View className="flex-1">
      <View className='pt-[55px] px-[16px]'>
        <View className="relative flex-row items-center justify-center pb-[142px]">
          <TouchableOpacity onPress={() => router.back()} className="absolute left-0 top-1">
            <Image source={setaEsquerda} className="h-6 w-6" />
          </TouchableOpacity>

          <Text className="text-[20px] font-mulish-bold text-dark">Meus Imóveis</Text>
        </View>

        <View className="items-center gap-[32px]">
          <ForSaleImage />

          <TouchableOpacity
            className="w-full h-[44px] flex-row items-center justify-center gap-[8px] rounded-lg bg-cor-primaria px-[24px] py-[12px]"
            onPress={() => router.push('/(auth)/corretor/imoveis/new')}>
            <CirclePlusIcon />
            <Text className="font-mulish-medium text-[16px] text-white">Novo imóvel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
