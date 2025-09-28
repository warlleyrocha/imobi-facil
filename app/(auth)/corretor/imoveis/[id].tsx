import CreateFolderIcon from '@/assets/icons-svg/create_new_folder.svg';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect, useState, useRef } from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Button,
  ScrollView,
  Dimensions,
} from 'react-native';
import { FormDataWithId } from '@/types/formProperty';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SlideIndicators from '@/components/SlideIndicator';

const setaEsquerda = require('~/assets/arrow-left.png');

export default function DetailsImovel() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>(); // ⚠ usar exatamente "id"
  const [propertyData, setPropertyData] = useState<FormDataWithId | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isScrollingProgrammatically = useRef(false);
  const { width: screenWidth } = Dimensions.get('window');

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

  return (
    <View className="flex-1 bg-white px-[16px]">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row items-center  pt-[62px]">
          {/* Botão voltar */}
          <TouchableOpacity
            onPress={() => router.replace('/(auth)/corretor/imoveis')}
            className="mr-[12px]">
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

        {/*Media Section View */}
        {propertyData?.midias && propertyData?.midias.length > 0 && (
          <View className="mb-3 mt-6 ">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {propertyData?.midias.map((imageUri: string, index: number) => (
                <Image
                  key={index}
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
                isScrollingProgrammatically.current = true;
                setCurrentIndex(index);
              }}
            />
          </View>
        )}

        <Text className="font-mulish-semibold text-[24px] leading-[31px] text-dark">
          {propertyData?.titulo}
        </Text>

        <Text className="items-end pt-[10px] text-right font-inter-semibold text-[20px] text-cor-primaria">
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(Number(propertyData?.preco))}
        </Text>

        {/*Detalhes */}
        <View className="flex">
          <View className="flex-row justify-between">
            <Text>Finalidade</Text>
            <Text>{propertyData?.finalidade}</Text>
          </View>

          <View className="flex-row justify-between">
            <Text>Tipo</Text>
            <Text>{propertyData?.tipo}</Text>
          </View>

          <View className="flex-row justify-between">
            <Text>Área útil</Text>
            <Text>{propertyData?.area}</Text>
          </View>

          <View className="flex-row justify-between">
            <Text>ID</Text>
            <Text>{propertyData?.id}</Text>
          </View>
        </View>

        <Text>Descrição</Text>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
          {propertyData?.descricao}
        </Text>

        <View>
          <Text>CEP</Text>
          <Text>{propertyData?.cep}</Text>
          <Text>Rua</Text>
          <Text>{propertyData?.rua}</Text>
          <Text>Número</Text>
          <Text>{propertyData?.numero}</Text>
          <Text>Bairro</Text>
          <Text>{propertyData?.bairro}</Text>
          <Text>Cidade</Text>
          <Text>{propertyData?.cidade}</Text>
          <Text>Estado</Text>
          <Text>{propertyData?.estado}</Text>
        </View>

        <Button title="Editar"></Button>
      </ScrollView>
    </View>
  );
}
