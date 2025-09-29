import CirclePlusIcon from '@/assets/icons-svg/circle-plus.svg';
import ForSaleImage from '@/assets/icons-svg/for-sale.svg';
import { useRouter } from 'expo-router';
import { Image, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FormDataWithId } from '@/types/formProperty';

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

        <View className="mb-6 items-center gap-[32px]">
          <ForSaleImage />

          <TouchableOpacity
            className="h-[44px] w-full flex-row items-center justify-center gap-[8px] rounded-lg bg-cor-primaria px-[24px] py-[12px]"
            onPress={() => router.push('/(auth)/corretor/imoveis/new')}>
            <CirclePlusIcon />
            <Text className="font-mulish-medium text-[16px] text-white">Novo imóvel</Text>
          </TouchableOpacity>
        </View>

        {/* Lista de imóveis */}
        <View className="gap-[16px]">
          {propertyList.length === 0 && (
            <Text className="text-center text-gray-400">Nenhum imóvel cadastrado.</Text>
          )}

          {propertyList.map((property) => (
            <TouchableOpacity
              key={property.id}
              onPress={() =>
                router.push({
                  pathname: '/(auth)/corretor/imoveis/[id]',
                  params: { id: property.id },
                })
              }
              className="flex-row items-center gap-4 rounded-lg bg-gray-100 p-4">
              {property.midias?.[0] && (
                <Image
                  source={{ uri: property.midias[0] }}
                  style={{ width: 60, height: 60, borderRadius: 8 }}
                />
              )}
              <View className="flex-1">
                <Text className="font-mulish-bold text-[16px]">{property.titulo}</Text>
                <Text className="text-gray-600">
                  {property.tipo} - {property.finalidade}
                </Text>
                <Text className="text-gray-600">ID: {property.id}</Text>
                <Text className="font-inter-semibold text-cor-primaria">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(Number(property.preco))}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
