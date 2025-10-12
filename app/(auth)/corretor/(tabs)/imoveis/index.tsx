import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import CirclePlusIcon from '@/assets/icons-svg/circle-plus.svg';
import ForSaleImage from '@/assets/icons-svg/for-sale.svg';
import LocationOnIcon from '@/assets/icons-svg/location_on.svg';
import OptionIcon from '@/assets/icons-svg/option.svg';
import { usePropertyManagement } from '@/hooks/usePropertyManagement';
import { FormDataWithId } from '@/types/formProperty';
import { DeleteConfirmModal } from '~/components/modals/DeleteConfirmModal';
import { SuspenseMenuModal } from '~/components/modals/SuspenseMenuModal';
import { PurposeBadge } from '~/components/ui/PurposeBadge';

export default function MyProperties() {
  const router = useRouter();
  const setaEsquerda = require('~/assets/arrow-left.png');

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const {
    propertyList,
    setPropertyList,
    menuVisible,
    setMenuVisible,
    menuPosition,
    setMenuPosition,
    deleteConfirmVisible,
    handleEditProperty,
    handleAddToFolder,
    handleDeleteClick,
    confirmDelete,
    cancelDelete,
  } = usePropertyManagement({
    onDeleteSuccess: () => {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    },
  });

  // Carregar imóveis do AsyncStorage sempre que a tela for focada
  useEffect(() => {
    const loadProperties = async () => {
      try {
        const savedData = await AsyncStorage.getItem('formPropertyData');
        console.log('Carregando imóveis na tela MEUS IMÓVEIS', savedData);

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
  }, [setPropertyList]); // Você pode adicionar dependência para re-carregar quando voltar da tela de detalhes

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="px-[16px] pt-[55px]">
        <View className="relative flex-row items-center justify-center pb-[32px]">
          <TouchableOpacity
            onPress={() => {
              if (router.canGoBack()) {
                router.back();
              } else {
                router.replace('/corretor/home'); // ou qualquer aba padrão
              }
            }}
            className="absolute left-0 top-1">
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
                  pathname: '/(auth)/corretor/(tabs)/imoveis/[id]',
                  params: { id: property.id },
                })
              }
              className="flex-row gap-4 rounded-[8px] border border-stroke bg-white shadow-md">
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
                  <TouchableOpacity
                    onPress={(e) => {
                      e.stopPropagation(); // Evita abrir os detalhes do imóvel
                    }}
                    onPressIn={(event) => {
                      const target = event.currentTarget as any;
                      target.measure(
                        (
                          x: number,
                          y: number,
                          width: number,
                          height: number,
                          pageX: number,
                          pageY: number
                        ) => {
                          setMenuPosition({ x: pageX, y: pageY + height });
                          setMenuVisible(property.id);
                        }
                      );
                    }}>
                    <OptionIcon />
                  </TouchableOpacity>
                </View>

                {/* Localização */}
                <View className="flex-row items-center justify-start gap-[4px] pt-[14px]">
                  <LocationOnIcon />
                  <Text className="w-[92px] font-inter text-[12px] text-dark">
                    {property.cidade}, {property.estado}
                  </Text>
                  <PurposeBadge className="" finalidade={property.finalidade} />
                </View>

                {/* Preço */}
                <Text className="mt-auto font-inter-semibold text-[16px] text-cor-primaria">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(Number(property.preco))}
                </Text>
              </View>

              {/* Modal do Menu Suspenso */}
              <SuspenseMenuModal
                visible={menuVisible === property.id}
                onClose={() => setMenuVisible(null)}
                position={menuPosition}
                onEdit={() => handleEditProperty(property.id)}
                onAddToFolder={() => handleAddToFolder(property.id)}
                onDelete={() => handleDeleteClick(property.id)}
              />
            </TouchableOpacity>
          ))}

          {/* Mensagem de Sucesso */}
          {showSuccessMessage && (
            <View className="h-[34px] w-[343px] items-center justify-center rounded-[4px] bg-[#E1E2E3] py-[8px]">
              <Text className="font-mulish text-[16px] leading-[18px] text-dark">
                Imóvel excluído com sucesso!
              </Text>
            </View>
          )}

          <TouchableOpacity
            className="h-[44px] w-full flex-row items-center justify-center gap-[8px] rounded-lg bg-cor-primaria px-[24px] py-[12px]"
            onPress={() => router.push('/(auth)/corretor/(tabs)/imoveis/formProperty')}>
            <CirclePlusIcon />
            <Text className="font-mulish-medium text-[16px] text-white">Novo imóvel</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal de Confirmação de Exclusão */}
      <DeleteConfirmModal
        visible={deleteConfirmVisible}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
      />
    </ScrollView>
  );
}
