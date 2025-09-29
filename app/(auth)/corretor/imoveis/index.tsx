import CirclePlusIcon from '@/assets/icons-svg/circle-plus.svg';
import ForSaleImage from '@/assets/icons-svg/for-sale.svg';
import { useRouter } from 'expo-router';
import { Image, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FormDataWithId } from '@/types/formProperty';
import LocationOnIcon from '@/assets/icons-svg/location_on.svg';
import OptionIcon from '@/assets/icons-svg/option.svg';

export default function MyProperties() {
  const router = useRouter();
  const setaEsquerda = require('~/assets/arrow-left.png');

  const [propertyList, setPropertyList] = useState<FormDataWithId[]>([]);

  // Carregar imóveis do AsyncStorage sempre que a tela for focada
  useEffect(() => {
    const loadProperties = async () => {
      try {
        const savedData = await AsyncStorage.getItem('formPropertyData');
        console.log('Raw do AsyncStorage:', savedData);

        if (savedData) {
          let parsedList: FormDataWithId[] = JSON.parse(savedData);

          // Se não for array (cadastrado antes como único), transforma em array
          if (!Array.isArray(parsedList)) {
            parsedList = [parsedList];
          }

          setPropertyList(parsedList);
        } else {
          setPropertyList([]);
        }
      } catch (error) {
        console.error('Erro ao carregar imóveis:', error);
      }
    };

    loadProperties();
  }, []); // Você pode adicionar dependência para re-carregar quando voltar da tela de detalhes

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="px-[16px] pt-[55px]">
        <View className="relative flex-row items-center justify-center pb-[32px]">
          <TouchableOpacity onPress={() => router.back()} className="absolute left-0 top-1">
            <Image source={setaEsquerda} className="h-6 w-6" />
          </TouchableOpacity>

          <Text className="font-mulish-bold text-[20px] text-dark">Meus Imóveis</Text>
        </View>

        {/* Lista de imóveis */}
        <View className="gap-[16px]">
          {propertyList.length === 0 && <ForSaleImage />}

          {propertyList.map((property) => (
            <TouchableOpacity
              key={property.id}
              onPress={() =>
                router.push({
                  pathname: '/(auth)/corretor/imoveis/[id]',
                  params: { id: property.id },
                })
              }
              className="flex-row gap-4 rounded-[8px]  border border-stroke bg-white shadow-md">
              {/* Imagem */}
              {property.midias?.[0] && (
                <Image
                  source={{ uri: property.midias[0] }}
                  style={{ width: 132, height: 136, borderRadius: 8 }}
                />
              )}

              {/* Conteúdo */}
              <View className="flex-1 flex-col justify-between py-[8px] pr-[12px]">
                <View className="flex-row justify-between">
                  <Text
                    className="flex-shrink font-inter-semibold text-[12px] text-dark"
                    numberOfLines={2}>
                    {property.titulo}
                  </Text>
                  <OptionIcon />
                </View>

                {/* Localização */}
                <View className="flex-row items-center justify-start gap-[4px] pt-[14px]">
                  <LocationOnIcon />
                  <Text className="w-[92px] font-inter text-[12px] text-dark">
                    {property.cidade}, {property.estado}
                  </Text>
                  <View className="h-[24px] items-center justify-center rounded-full bg-green-light px-[10px]">
                    <Text className="font-inter-medium text-[10px] text-green-dark">
                      {property.finalidade}
                    </Text>
                  </View>
                </View>

                {/* Preço */}
                <Text className="mt-auto font-inter-semibold text-[16px] text-cor-primaria">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(Number(property.preco))}
                </Text>
              </View>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            className="h-[44px] w-full flex-row items-center justify-center gap-[8px] rounded-lg bg-cor-primaria px-[24px] py-[12px]"
            onPress={() => router.push('/(auth)/corretor/imoveis/new')}>
            <CirclePlusIcon />
            <Text className="font-mulish-medium text-[16px] text-white">Novo imóvel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
