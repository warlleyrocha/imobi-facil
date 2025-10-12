import AsyncStorage from '@react-native-async-storage/async-storage';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ArrowLeftIcon from '@/assets/icons-svg/arrow-left.svg';
import ChatBtnIcon from '@/assets/icons-svg/chat-btn.svg';
import CloudUploadIcon from '@/assets/icons-svg/cloud-upload.svg';
import OptionIcon from '@/assets/icons-svg/option-primary-color.svg';
import PencilIcon from '@/assets/icons-svg/pencil-alt-primary-color.svg';
import SearchIcon from '@/assets/icons-svg/search-alt.svg';
import { DeleteConfirmModal } from '@/components/DeleteConfirmModal';
import { MyAccountModal } from '@/components/MyAccountModal';
import { PhotoUploadModal } from '@/components/PhotoUploadModal';
import { FormDataWithId } from '@/types/formProperty';
import { PropertyList } from '~/components/Profile/PropertyList';
import { TabList } from '~/components/Profile/TabList';

export default function Profile() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('1');
  const [propertyList, setPropertyList] = useState<FormDataWithId[]>([]);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [showMyAccountModal, setShowMyAccountModal] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState('https://i.pravatar.cc/150?img=12');
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null);
  const [menuVisible, setMenuVisible] = useState<string | null>(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

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

  const handleDeleteClick = (propertyId: string) => {
    setPropertyToDelete(propertyId);
    setDeleteConfirmVisible(true);
  };

  const confirmDelete = async () => {
    if (!propertyToDelete) return;

    try {
      const updatedList = propertyList.filter((p) => p.id !== propertyToDelete);
      await AsyncStorage.setItem('formPropertyData', JSON.stringify(updatedList));
      setPropertyList(updatedList);
      console.log('Imóvel deletado:', propertyToDelete);
      setDeleteConfirmVisible(false);
      setPropertyToDelete(null);
    } catch (error) {
      console.error('Erro ao deletar imóvel:', error);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmVisible(false);
    setPropertyToDelete(null);
  };

  const handleEditProfile = () => {
    router.push('/(auth)/corretor/profile/editProfile');
  };

  const handleEditProperty = (propertyId: string) => {
    console.log('Editar imóvel:', propertyId);
    // Navegar para tela de edição
    router.push({
      pathname: '/(auth)/corretor/imoveis/new',
      params: { id: propertyId },
    });
  };

  const handleAddToFolder = (propertyId: string) => {
    console.log('Adicionar à pasta:', propertyId);
    // Implementar lógica de adicionar à pasta
  };

  const handlePhotoSelected = async (uri: string) => {
    if (uri === '') {
      // Usuário excluiu a foto, usar imagem padrão
      setProfilePhoto('https://i.pravatar.cc/150?img=12');
    } else {
      setProfilePhoto(uri);
    }
    // Aqui você pode salvar no AsyncStorage ou fazer upload para API
    // await AsyncStorage.setItem('profilePhoto', uri);
    // ou await api.uploadProfilePhoto(uri);
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
          <Image source={{ uri: profilePhoto }} className="h-[114px] w-[115px] rounded-full" />

          {/* Informações do Perfil */}
          <View className="ml-4 flex-1 pt-[14px]">
            <View className="flex-row items-center justify-between pb-[2px]">
              <Text className="font-inter-bold text-[20px] leading-[22px] text-dark">
                Carlos Souza
              </Text>

              <TouchableOpacity
                className="rounded-full border-[1.2px] border-cor-primaria px-[6px] py-[10px]"
                onPress={() => setShowMyAccountModal(true)}>
                <OptionIcon />
              </TouchableOpacity>
            </View>

            <Text className="font-mulish text-[16px] leading-[18px] text-dark-2">
              CRECI: 12345-F/SP
            </Text>

            <TouchableOpacity
              onPress={() => setShowPhotoModal(true)}
              className="mt-1 flex-row items-center gap-[7px]">
              <Text className="font-mulish text-[16px] leading-[18px] text-cor-primaria underline">
                Alterar Foto
              </Text>

              <CloudUploadIcon />
            </TouchableOpacity>
          </View>
        </View>

        {/* Botão Editar Perfil */}
        <View className="ml-[22px] mt-[8px] items-center">
          <TouchableOpacity
            className="w-[163px] flex-row gap-[8px] rounded-[24px] border border-cor-primaria bg-cor-primaria/10 px-[24px] py-[10px]"
            onPress={handleEditProfile}>
            <PencilIcon />
            <Text className="font-mulish-medium text-[16px] leading-[18px] text-cor-primaria">
              Editar Perfil
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View className="px-[20px] pt-[18px]">
        <TabList selectedTab={activeTab} onSelect={setActiveTab} />
      </View>

      {/* Conteúdo de imóveis */}
      <View className="flex-1 px-[16px] pt-[6px]">
        <PropertyList
          data={propertyList}
          activeTab={activeTab}
          menuVisible={menuVisible}
          menuPosition={menuPosition}
          setMenuVisible={setMenuVisible}
          setMenuPosition={setMenuPosition}
          onEdit={handleEditProperty}
          onAddToFolder={handleAddToFolder}
          onDelete={handleDeleteClick}
        />
      </View>

      <TouchableOpacity
        className="absolute bottom-10 right-[19px] rounded-[16px] bg-blue-light-5 p-[8px] shadow"
        onPress={() => console.log('Clicado')}>
        <ChatBtnIcon />
      </TouchableOpacity>

      <PhotoUploadModal
        visible={showPhotoModal}
        onClose={() => setShowPhotoModal(false)}
        onPhotoSelected={handlePhotoSelected}
        currentPhotoUri={profilePhoto}
      />

      <MyAccountModal visible={showMyAccountModal} onClose={() => setShowMyAccountModal(false)} />

      {/* Modal de Confirmação de Exclusão */}
      <DeleteConfirmModal
        visible={deleteConfirmVisible}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
      />
    </View>
  );
}
