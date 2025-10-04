import AsyncStorage from '@react-native-async-storage/async-storage';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ArrowLeftIcon from '@/assets/icons-svg/arrow-left.svg';
import ChatBtnIcon from '@/assets/icons-svg/chat-btn.svg';
import CloudUploadIcon from '@/assets/icons-svg/cloud-upload.svg';
import LocationOnIcon from '@/assets/icons-svg/location_on.svg';
import OptionIconBlack from '@/assets/icons-svg/option.svg';
import OptionIcon from '@/assets/icons-svg/option-primary-color.svg';
import PencilIcon from '@/assets/icons-svg/pencil-alt-primary-color.svg';
import SearchIcon from '@/assets/icons-svg/search-alt.svg';
import { GridAltIcon, LayoutAltIcon, LayoutAltSecondIcon } from '@/components/Icons/TabGroup';
import { PurposeBadge } from '@/components/PurposeBadge';
import { FormDataWithId } from '@/types/formProperty';

interface TabItem {
  id: string;
  label: string;
  icon: (color: string) => React.ReactElement;
}

const TabItemData: TabItem[] = [
  { id: '1', icon: (color: string) => <GridAltIcon color={color} />, label: 'Reduzido' },
  { id: '2', icon: (color: string) => <LayoutAltSecondIcon color={color} />, label: 'Médio' },
  { id: '3', icon: (color: string) => <LayoutAltIcon color={color} />, label: 'Ampliado' },
];

export default function Profile() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('1');
  const [propertyList, setPropertyList] = useState<FormDataWithId[]>([]);

  // Carregar imóveis do AsyncStorage
  const loadProperties = async () => {
    try {
      const savedData = await AsyncStorage.getItem('formPropertyData');
      if (savedData) {
        let parsedList: FormDataWithId[] = JSON.parse(savedData);
        if (!Array.isArray(parsedList)) parsedList = [parsedList];
        setPropertyList(parsedList);
      } else {
        setPropertyList([]);
      }
    } catch (error) {
      console.error('Erro ao carregar imóveis:', error);
    }
  };

  useEffect(() => {
    loadProperties();
  }, []);

  const renderTabItem = ({ item }: { item: TabItem }) => {
    const isActive = item.id === activeTab;
    const iconColor = isActive ? '#3758F9' : '#637381'; // cor padrão dos ícones

    return (
      <View>
        <TouchableOpacity
          className={`flex-row gap-[10px] py-[15px] ${isActive ? 'border-b-2 border-b-cor-primaria' : ''}`}
          onPress={() => setActiveTab(item.id)}>
          {item.icon(iconColor)}
          <Text
            className={`font-mulish-medium text-[16px] leading-[18px] ${isActive ? 'text-cor-primaria' : 'text-texto-c-primario'}`}>
            {item.label}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Renderizadores de lista por tipo
  const renderReducedItem = ({ item }: { item: FormDataWithId }) => (
    <TouchableOpacity className="w-[108px]">
      <View className="relative w-full">
        <Image
          source={{ uri: item.midias?.[0] || 'https://via.placeholder.com/100' }}
          className="h-[110px] w-full rounded-lg"
          resizeMode="cover"
        />
        {/* Overlay escuro com gradiente */}
        <BlurView
          intensity={40}
          tint="dark"
          className="absolute bottom-0 left-0 right-0 h-[36px] justify-center overflow-hidden"
          style={{
            borderRadius: 8,
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.18)',
          }}>
          <Text className="text-center font-mulish-black text-[14px] leading-[18.2px] text-white">
            ID: {item.id || '123456'}
          </Text>
        </BlurView>
      </View>
    </TouchableOpacity>
  );

  const renderMediumItem = ({ item }: { item: FormDataWithId }) => (
    <TouchableOpacity className="mb-4 h-[140px] flex-row overflow-hidden rounded-xl border border-gray-200 bg-white">
      {/* Imagem à esquerda */}
      <Image
        source={{ uri: item.midias?.[0] || 'https://via.placeholder.com/300' }}
        className="h-full w-[140px]"
        resizeMode="cover"
      />
      <View className="absolute left-3 top-2 h-[26px] min-w-[50px] justify-center rounded-[8px] bg-black/10 px-[4px]">
        <Text className="text-center font-mulish-black text-[14px] leading-[18.2px] text-white">
          ID: {item.id || '123456'}
        </Text>
      </View>

      {/* Informações à direita */}
      <View className="flex-1 justify-between p-[12px]">
        <View className="flex-row justify-between">
          <Text className="w-[160px] font-inter-semibold text-[12px] text-dark" numberOfLines={2}>
            {item.titulo || 'Sem título'}
          </Text>
          <OptionIconBlack />
        </View>

        <View className="flex-row items-center justify-between">
          {/* Grupo: Ícone + Texto (ficam juntos à esquerda) */}
          <View className="flex-1 flex-row items-center gap-1">
            <LocationOnIcon />
            <Text className="font-inter text-[12px] text-dark" numberOfLines={1}>
              {item.cidade}, {item.estado}
            </Text>
          </View>

          {/* Finalidade (fica à direita) */}

          <PurposeBadge finalidade={item.finalidade} />
        </View>

        <Text className="font-mulish-bold text-[16px] text-cor-primaria">
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(Number(item.preco))}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderExpandedItem = ({ item }: { item: FormDataWithId }) => (
    <TouchableOpacity className="mb-4 h-[354px] w-[232px] overflow-hidden rounded-[8px] border border-stroke bg-white shadow">
      <View>
        <Image
          source={{ uri: item.midias?.[0] || 'https://via.placeholder.com/400' }}
          className="h-[189.5px] w-full"
          resizeMode="cover"
        />
        {/* Overlay escuro com gradiente */}
        <View className="absolute left-4 top-4 h-[26px] min-w-[50px] justify-center rounded-[8px] bg-black/10 px-[4px]">
          <Text className="text-center font-mulish-black text-[14px] leading-[18.2px] text-white">
            ID: {item.id || '123456'}
          </Text>
        </View>
      </View>

      <View className="px-[12px] pt-[10px]">
        <View className="flex-row justify-between">
          <Text className="w-[180px] font-inter-semibold text-[12px] text-dark" numberOfLines={2}>
            {item.titulo || 'Sem título'}
          </Text>
          <OptionIconBlack />
        </View>

        <View className="flex-row items-center gap-1 pb-[18px] pt-[5px]">
          <LocationOnIcon />
          <Text className="font-inter text-[12px] text-dark">
            {item.cidade}, {item.estado}
          </Text>
        </View>

        <PurposeBadge className="w-[56px]" finalidade={item.finalidade} />

        <View className="mt-[22px] flex-row items-center justify-between">
          <Text className="font-mulish-bold text-[18px] text-cor-primaria">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(Number(item.preco))}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderPropertyList = () => {
    if (propertyList.length === 0) {
      return (
        <View className="flex-1 items-center justify-center py-10">
          <Text className="font-mulish text-[16px] text-dark-2">Nenhum imóvel cadastrado</Text>
        </View>
      );
    }

    let renderItem;
    let numColumns = 1;
    let horizontal = false;

    switch (activeTab) {
      case '1': // Reduzido
        renderItem = renderReducedItem;
        numColumns = 3;
        break;
      case '2': // Médio
        renderItem = renderMediumItem;
        break;
      case '3': // Ampliado
        renderItem = renderExpandedItem;
        horizontal = true;
        break;
      default:
        renderItem = renderMediumItem;
    }

    return (
      <FlatList
        data={propertyList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        key={activeTab}
        horizontal={horizontal}
        numColumns={horizontal ? undefined : numColumns}
        columnWrapperStyle={numColumns > 1 ? { gap: 8 } : undefined}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={
          horizontal
            ? { paddingBottom: 20, gap: 12 } // Gap entre itens horizontais
            : { paddingBottom: 20, gap: 8 }
        }
      />
    );
  };

  return (
    <View className="flex-1">
      <StatusBar style="light" translucent backgroundColor="transparent" />

      <ImageBackground
        source={require('@/assets/bg-profile-corretor.png')}
        className="h-[201px] w-full"
        resizeMode="cover">
        <View className="px-4" style={{ paddingTop: insets.top + 16 }}>
          <View className="flex-row items-center gap-5 pt-[20px]">
            {/* Botão Voltar */}
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeftIcon />
            </TouchableOpacity>

            {/* Search Bar */}
            <View className="flex-1 overflow-hidden rounded-full border border-white ">
              <BlurView intensity={30} tint="dark" className="flex-row items-center px-[24px] ">
                <SearchIcon />
                <TextInput
                  placeholder="Busque por um imóvel"
                  placeholderTextColor="#FAFAFA"
                  className="ml-2 flex-1 font-mulish-medium text-[16px] leading-[18px] text-white"
                />
              </BlurView>
            </View>
          </View>
        </View>
      </ImageBackground>

      {/* Card de Perfil que sobrepõe */}
      <View className="-mt-[62px] rounded-t-2xl bg-white px-[16px] pt-[14px]">
        <View className="flex-row">
          {/* Foto de Perfil */}
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
            className="h-[114px] w-[115px] rounded-full"
          />

          {/* Informações do Perfil */}
          <View className="ml-4 flex-1 pt-[14px]">
            <View className="flex-row items-center justify-between pb-[2px]">
              <Text className="font-inter-bold text-[20px] leading-[22px] text-dark">
                Carlos Souza
              </Text>
              <TouchableOpacity className="rounded-full border-[1.2px] border-cor-primaria px-[6px] py-[10px]">
                <OptionIcon />
              </TouchableOpacity>
            </View>
            <Text className="font-mulish text-[16px] leading-[18px] text-dark-2">
              CRECI: 12345-F/SP
            </Text>
            <TouchableOpacity className="mt-1 flex-row items-center gap-[7px]">
              <Text className="font-mulish text-[16px] leading-[18px] text-cor-primaria underline">
                Alterar Foto
              </Text>
              <CloudUploadIcon />
            </TouchableOpacity>
          </View>
        </View>

        {/* Botão Editar Perfil */}
        <View className="ml-[22px] mt-[8px] items-center">
          <TouchableOpacity className="w-[163px] flex-row gap-[8px] rounded-[24px] border border-cor-primaria bg-cor-primaria/10 px-[24px] py-[10px]">
            <PencilIcon />
            <Text className="font-mulish-medium text-[16px] leading-[18px] text-cor-primaria">
              Editar Perfil
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View className="flex-row px-[20px] pt-[18px]">
        <FlatList
          data={TabItemData}
          renderItem={renderTabItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{ gap: 24 }}
        />
      </View>

      {/* Lista de Imóveis */}
      <View className="flex-1 px-[16px] pt-4">{renderPropertyList()}</View>

      <TouchableOpacity className="bg-blue-light-5 absolute bottom-10 right-[19px] rounded-[16px] p-[8px] shadow">
        <ChatBtnIcon />
      </TouchableOpacity>
    </View>
  );
}
