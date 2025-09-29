import { BlurView } from 'expo-blur';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
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
import CloudUploadIcon from '@/assets/icons-svg/cloud-upload.svg';
import OptionIcon from '@/assets/icons-svg/option-primary-color.svg';
import PencilIcon from '@/assets/icons-svg/pencil-alt-primary-color.svg';
import SearchIcon from '@/assets/icons-svg/search-alt.svg';
import { GridAltIcon, LayoutAltIcon, LayoutAltSecondIcon } from '@/components/Icons/TabGroup';

interface TabItem {
  id: string;
  label: string;
  icon: React.ReactElement;
}

const TabItemData: TabItem[] = [
  { id: '1', icon: <GridAltIcon />, label: 'Reduzido' },
  { id: '2', icon: <LayoutAltSecondIcon />, label: 'Médio' },
  { id: '3', icon: <LayoutAltIcon />, label: 'Ampliado' },
];

export default function App() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('1');

  const renderTabItem = ({ item }: { item: TabItem }) => {
    const isActive = item.id === activeTab;

    return (
      <View>
        <TouchableOpacity
          className={`flex-row gap-[10px] py-[15px] ${isActive ? 'border-b-2 border-b-cor-primaria' : ''}`}
          onPress={() => setActiveTab(item.id)}>
          {item.icon}
          <Text className="font-mulish-medium text-[16px] leading-[18px] text-texto-c-primario">
            {item.label}
          </Text>
        </TouchableOpacity>
      </View>
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
            <TouchableOpacity>
              <ArrowLeftIcon />
            </TouchableOpacity>

            {/* Search Bar */}
            <View className="flex-1 overflow-hidden rounded-full border border-white ">
              <BlurView intensity={30} tint="dark" className="flex-row items-center px-[24px] ">
                <SearchIcon />
                <TextInput
                  placeholder="Busque por um imóvel"
                  placeholderTextColor="#FAFAFA"
                  className="ml-2 flex-1 font-mulish-medium text-[16px] leading-[18px]"
                />
              </BlurView>
            </View>
          </View>
        </View>
      </ImageBackground>

      {/* Card de Perfil que sobrepõe */}
      <View className="-mt-16 rounded-t-2xl bg-white px-[16px] pt-[14px]" style={{ elevation: 8 }}>
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
              <Text className="font-mulish text-[16px] leading-[18px] text-cor-primaria">
                Alterar Foto
              </Text>
              <CloudUploadIcon />
            </TouchableOpacity>
          </View>
        </View>

        {/* Botão Editar Perfil */}
        <View className="ml-[22px] items-center">
          <TouchableOpacity className="w-[163px] flex-row gap-[8px] rounded-[24px] border border-cor-primaria bg-cor-primaria/10 px-[24px] py-[10px]">
            <PencilIcon />
            <Text className="font-mulish-medium text-[16px] leading-[18px] text-cor-primaria">
              Editar Perfil
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View className="flex-row px-[20px] pt-[28px]">
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
    </View>
  );
}
