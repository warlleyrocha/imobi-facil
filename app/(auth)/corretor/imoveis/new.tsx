import { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { BasicInfoSection } from '~/components/Sections/BasicInfoSection';
import { LocationSection } from '~/components/Sections/LocationSection';
import { MediaSection } from '~/components/Sections/MediaSection';

const setaEsquerda = require('~/assets/arrow-left.png');

export default function FormProperty() {
  const router = useRouter();
  const [finalidade, setFinalidade] = useState<string | null>(null);
  const [tipo, setTipo] = useState<string | null>(null);

  return (
    <View className="flex-1 bg-[#F6F6F6]">
      <ScrollView className="px-[16px] pt-[55px]" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 64 }} >
        {/*Header */}
        <View className="relative flex-row items-center justify-center pb-[35px]">
          <TouchableOpacity onPress={() => router.back()} className="absolute left-0 top-1">
            <Image source={setaEsquerda} className="h-6 w-6" />
          </TouchableOpacity>

          <Text className="text-[20px] font-mulish-bold text-dark">Novo Imóvel</Text>
        </View>

        {/*Basic infos */}
       <BasicInfoSection 
          finalidade={finalidade}
          setFinalidade={setFinalidade}
          tipo={tipo}
          setTipo={setTipo}
        />

        {/*Location infos */}
        <LocationSection />

        {/*Midias do imovel */}
       <MediaSection />

        <TouchableOpacity
            className="w-full h-[44px] flex-row items-center justify-center gap-[8px] rounded-lg bg-cor-primaria px-[24px] py-[12px]"
            onPress={() => router.push('/(auth)/corretor/imoveis/new')}>
            
            <Text className="font-mulish-medium text-[16px] text-white">Cadastrar imóvel</Text>
          </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
