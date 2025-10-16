import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Alert, Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import CreateFolderIcon from '@/assets/icons-svg/create_new_folder.svg';
import Pencil from '@/assets/icons-svg/pencil.svg';
import { FormDataWithId } from '@/types/formProperty';
import SlideIndicators from '~/components/ui/SlideIndicator';

const setaEsquerda = require('~/assets/arrow-left.png');

export default function DetailsImovel() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [propertyData, setPropertyData] = useState<FormDataWithId | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const { width: screenWidth } = Dimensions.get('window');

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / (screenWidth * 0.85 + 15)); // 0.85 largura da tela + marginRight
    setCurrentIndex(index);
  };

  //Carregar dados do AsyncStorage sempre que iniciar a página
  useEffect(() => {
    if (id) {
      loadPropertyData(id);
      console.log('Carregando dados para o imóvel ID:', id);
    }
  }, [id]);

  const loadPropertyData = async (id: string) => {
    try {
      const savedData = await AsyncStorage.getItem('formPropertyData');
      console.log('Raw do AsyncStorage:', savedData);

      if (!savedData) return;

      let parsedList: FormDataWithId[] = JSON.parse(savedData);
      if (!Array.isArray(parsedList)) parsedList = [parsedList];

      const selected = parsedList.find((item) => item.id === id);
      if (!selected) {
        Alert.alert('Erro', 'Imóvel não encontrado');
        return;
      }

      setPropertyData(selected);
      console.log('Imóvel carregado:', selected);
    } catch (error) {
      console.error('Erro ao carregar imóvel:', error);
    }
  };

  //Função para editar
  const handleEdit = () => {
    if (!propertyData) return;
    router.push({
      pathname: '/(auth)/corretor/(tabs)/imoveis/formProperty',
      params: { id: propertyData.id },
    });
  };

  return (
    <View className="flex-1 bg-white px-[16px]">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row items-center  pt-[62px]">
          {/* Botão voltar */}
          <TouchableOpacity
            onPress={() => router.replace('/(auth)/corretor/(tabs)/imoveis')}
            className="mr-[12px]">
            <Image source={setaEsquerda} className="h-6 w-6" />
          </TouchableOpacity>

          {/* Texto mais à esquerda, logo após a seta */}
          <Text className="font-mulish-bold text-[20px] text-dark">Detalhes do Imóvel</Text>

          {/* Ícone à direita (empurrado com margin-left:auto) */}
          <TouchableOpacity
            onPress={() => router.push('/(auth)/corretor/(tabs)/imoveis')}
            className="ml-auto">
            <CreateFolderIcon width={24} height={24} fill="#000" />
          </TouchableOpacity>
        </View>

        {/*Media Section View */}
        {propertyData?.midias && propertyData?.midias.length > 0 && (
          <View className="mb-3 mt-6 ">
            <ScrollView
              ref={scrollViewRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              pagingEnabled>
              {propertyData?.midias.map((imageUri: string) => (
                <Image
                  key={imageUri}
                  source={{ uri: imageUri }}
                  style={{
                    width: screenWidth * 0.85, // % da tela
                    height: 321, // Altura fixa
                    // OU use: width: 250, height: 200 para tamanho fixo maior
                    // OU use: width: 120, height: 120 para thumbnails
                    marginRight: 15,
                    borderRadius: 12,
                  }}
                  resizeMode="cover"
                />
              ))}
            </ScrollView>

            <SlideIndicators
              totalItems={propertyData?.midias.length}
              currentIndex={currentIndex}
              onIndicatorPress={(index) => {
                scrollViewRef.current?.scrollTo({
                  x: index * (screenWidth * 0.85 + 15),
                  animated: true,
                });

                setCurrentIndex(index);
              }}
            />
          </View>
        )}

        {/*Property Title and Price */}
        <Text className="pb-[2px] font-mulish-semibold text-[24px] leading-[31px] text-dark">
          {propertyData?.titulo}
        </Text>

        <Text className="items-end pb-[32px] text-right font-inter-semibold text-[20px] text-cor-primaria">
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(Number(propertyData?.preco))}
        </Text>

        {/*Detalhes */}
        <View className="flex border-b border-t border-gray-200">
          <View className="flex-row justify-between py-[12px]">
            <Text className="font-mulish text-[14px] leading-[18px] text-dark-3">Finalidade</Text>
            <Text className="font-mulish-semibold text-[14px] leading-[18px] text-dark">
              {propertyData?.finalidade
                ? propertyData.finalidade.charAt(0).toUpperCase() +
                  propertyData.finalidade.slice(1).toLowerCase()
                : ''}
            </Text>
          </View>

          <View className="flex-row justify-between py-[12px]">
            <Text className="font-mulish text-[14px] leading-[18px] text-dark-3">Tipo</Text>
            <Text className="font-mulish-semibold text-[14px] leading-[18px] text-dark">
              {propertyData?.tipo}
            </Text>
          </View>

          <View className="flex-row justify-between py-[12px]">
            <Text className="font-mulish text-[14px] leading-[18px] text-dark-3">Área útil</Text>
            <Text className="font-mulish-semibold text-[14px] leading-[18px] text-dark">
              {propertyData?.area} m²
            </Text>
          </View>

          <View className="flex-row justify-between py-[12px]">
            <Text className="font-mulish text-[14px] leading-[18px] text-dark-3">ID</Text>
            <Text className="font-mulish-semibold text-[14px] leading-[18px] text-dark">
              {propertyData?.id}
            </Text>
          </View>
        </View>

        {/*Description */}
        <View className="gap-[16px] py-[32px]">
          <Text className="font-inter-medium text-[18px] leading-[22px] text-dark-3">
            Descrição
          </Text>
          <Text className="font-mulish text-[16px] leading-[18px] text-dark-2">
            {propertyData?.descricao}
          </Text>
        </View>

        {/*Location */}
        <View className="flex py-[12px]">
          <Text className="mb-4 font-inter-medium text-[18px] leading-[22px] text-dark-3">
            Localização
          </Text>

          <View className="-mx-2 flex-row flex-wrap">
            {/* CEP */}
            <View className="w-1/2 gap-[12px] px-3 py-[12px]">
              <Text className="font-mulish text-[14px] leading-[18px] text-dark-3">CEP</Text>
              <Text className="font-mulish-semibold text-[14px] leading-[18px] text-dark">
                {propertyData?.cep}
              </Text>
            </View>

            {/* Rua */}
            <View className="w-1/2 gap-[12px] px-3 py-[12px]">
              <Text className="font-mulish text-[14px] leading-[18px] text-dark-3">Rua</Text>
              <Text className="font-mulish-semibold text-[14px] leading-[18px] text-dark">
                {propertyData?.rua}
              </Text>
            </View>

            <View className="h-[1px] w-full bg-gray-200" />

            {/* Número */}
            <View className="w-1/2 gap-[12px] px-3 py-[12px]">
              <Text className="font-mulish text-[14px] leading-[18px] text-dark-3">Número</Text>
              <Text className="font-mulish-semibold text-[14px] leading-[18px] text-dark">
                {propertyData?.numero}
              </Text>
            </View>

            {/* Bairro */}
            <View className="w-1/2 gap-[12px] px-3 py-[12px]">
              <Text className="font-mulish text-[14px] leading-[18px] text-dark-3">Bairro</Text>
              <Text className="font-mulish-semibold text-[14px] leading-[18px] text-dark">
                {propertyData?.bairro}
              </Text>
            </View>

            <View className="h-[1px] w-full bg-gray-200" />

            {/* Cidade */}
            <View className="w-1/2 gap-[12px] px-3 py-[12px]">
              <Text className="font-mulish text-[14px] leading-[18px] text-dark-3">Cidade</Text>
              <Text className="font-mulish-semibold text-[14px] leading-[18px] text-dark">
                {propertyData?.cidade}
              </Text>
            </View>

            {/* Estado */}
            <View className="w-1/2 gap-[12px] px-3 py-[12px]">
              <Text className="font-mulish text-[14px] leading-[18px] text-dark-3">Estado</Text>
              <Text className="font-mulish-semibold text-[14px] leading-[18px] text-dark">
                {propertyData?.estado}
              </Text>
            </View>

            <View className="h-[1px] w-full bg-gray-200" />
          </View>
        </View>

        {/*Button edit */}
        <View className="w-full flex-row justify-end pb-[40px] pt-[32px]">
          <TouchableOpacity
            onPress={handleEdit}
            className="h-[44px] w-[128px] flex-row items-center justify-center gap-[10px] rounded-[50px] bg-cor-primaria px-[24px] py-[12]">
            <Pencil />
            <Text className="text-center font-mulish-medium text-[16px] leading-[18px] text-white">
              Editar
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
