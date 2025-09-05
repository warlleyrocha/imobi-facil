import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Container } from '~/components/Container';
import { useRouter } from 'expo-router';
import ForSaleImage from '@/assets/icons-svg/for-sale.svg';
import CirclePlusIcon from '@/assets/icons-svg/circle-plus.svg';

export default function MyProperties() {
  const router = useRouter();
  const setaEsquerda = require('~/assets/arrow-left.png');

  return (
    <View className="pt-[34px]">
      <Container>
        <View className="relative flex-row items-center justify-center pb-[144px]">
          <Text className="text-xl font-bold">Meus Imóveis</Text>

          <TouchableOpacity onPress={() => router.back()} className="absolute left-0">
            <Image source={setaEsquerda} className="h-6 w-6" />
          </TouchableOpacity>
        </View>

        <View className="items-center gap-[32px]">
          <ForSaleImage />

          <TouchableOpacity
            className="w-full flex-row items-center justify-center gap-[8px] rounded-lg bg-cor-primaria px-[24px] py-[12px]"
            onPress={() => router.push('/(auth)/corretor/imoveis/new')}>
            <CirclePlusIcon />
            <Text className="font-mulish-medium text-[16px] text-[#FAFAFA]">Novo imóvel</Text>
          </TouchableOpacity>
        </View>
      </Container>
    </View>
  );
}
