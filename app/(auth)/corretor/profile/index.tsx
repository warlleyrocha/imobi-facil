import AsyncStorage from '@react-native-async-storage/async-storage';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
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
import OptionIcon from '@/assets/icons-svg/option-primary-color.svg';
import PencilIcon from '@/assets/icons-svg/pencil-alt-primary-color.svg';
import SearchIcon from '@/assets/icons-svg/search-alt.svg';
import { usePropertyManagement } from '@/hooks/usePropertyManagement';
import { FormDataWithId } from '@/types/formProperty';
import Header from '~/components/layouts/Header';
import { DeleteConfirmModal } from '~/components/modals/DeleteConfirmModal';
import { MyAccountModal } from '~/components/modals/MyAccountModal';
import { PhotoUploadModal } from '~/components/modals/PhotoUploadModal';
import { PropertyList } from '~/components/profile/PropertyList';
import { TabList } from '~/components/profile/TabList';

export default function Profile() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [activeTab, setActiveTab] = useState('1');
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [showMyAccountModal, setShowMyAccountModal] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState('https://i.pravatar.cc/150?img=12');
  const [isViewingBio, setIsViewingBio] = useState(false);

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
  } = usePropertyManagement();

  // Dados da bio (você pode buscar do AsyncStorage ou de uma API)
  const [bioData, setBioData] = useState({
    name: 'Carlos Souza',
    creci: '12345-F/SP',
    bio: 'Corretor especializado em imóveis residenciais e comerciais, com foco em entender as necessidades do cliente.',
    phone: '(11) 98765-4321',
    email: 'carlos.souza@email.com',
  });

  const bioAnimation = useRef(new Animated.Value(0)).current;

  // Carregar imóveis do AsyncStorage
  useEffect(() => {
    const loadProperties = async () => {
      try {
        const savedData = await AsyncStorage.getItem('formPropertyData');
        console.log('Carregando imóveis na tela PERFIL', savedData);

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
    loadProperties();
  }, [setPropertyList]);

  const handleEditProfile = () => {
    router.push('/(auth)/corretor/profile/editProfile');
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

  const handleViewBio = () => {
    setIsViewingBio(true);
    Animated.timing(bioAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true, // importante para performance
    }).start();
  };

  const handleCloseBio = () => {
    Animated.timing(bioAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setIsViewingBio(false));
  };

  const handleEditBio = () => {
    router.push('/(auth)/corretor/profile/editBio'); // Navega para a tela
  };
  return (
    <View className="flex-1">
      {!isViewingBio && <StatusBar style="light" translucent backgroundColor="transparent" />}

      {!isViewingBio ? (
        <>
          <ImageBackground
            source={require('@/assets/bg-profile-corretor.png')}
            className="h-[201px] w-full"
            resizeMode="cover">
            <View className="px-4" style={{ paddingTop: insets.top + 27 }}>
              <View className="flex-row items-center gap-5 pt-[20px]">
                {/* Botão Voltar */}
                <TouchableOpacity
                  onPress={() => {
                    if (router.canGoBack()) {
                      router.back();
                    } else {
                      router.replace('/corretor/home'); // volta pra Home ou qualquer aba principal
                    }
                  }}>
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
          <View className="-mt-[62px] rounded-tl-[24px] bg-white px-[16px] pt-[14px]">
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
        </>
      ) : (
        // Layout de Visualização da Bio
        <Animated.View
          style={{
            opacity: bioAnimation,
            transform: [
              {
                translateY: bioAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0], // sobe 20px ao aparecer
                }),
              },
            ],
          }}
          className="px-[16px]">
          <Header
            title="Perfil do Corretor"
            paddingTopClass="pt-[66px]"
            paddingBottomClass="pb-[24px]"
            onBackPress={handleCloseBio}
          />

          <View className="mb-[15px] flex-row items-start">
            {/* Foto de Perfil */}
            <Image source={{ uri: profilePhoto }} className="h-[71px] w-[71px] rounded-full" />

            {/* Informações do Perfil */}
            <View className="ml-4 flex-1">
              <View className="flex-row items-center justify-between pb-[2px]">
                <Text className="font-inter-bold text-[20px] leading-[22px] text-dark">
                  {bioData.name}
                </Text>
              </View>

              <Text className="font-mulish text-[16px] leading-[18px] text-dark-2">
                CRECI: {bioData.creci}
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

          {/* Bio e Informações */}
          <View className="gap-[10px]">
            <Text className="font-mulish-medium text-[16px] leading-[18px] text-dark-5">
              Biografia
            </Text>

            <TouchableOpacity
              className="rounded-[6px] border border-stroke p-[18px]"
              onPress={handleEditBio}>
              <Text className="font-mulish text-[16px] leading-[18px] text-[#9098A3]">
                {bioData.bio}
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}

      {/* Tabs */}
      <View className="bg-white px-[20px] pt-[16px]">
        <TabList selectedTab={activeTab} onSelect={setActiveTab} />
      </View>

      {/* Conteúdo de imóveis */}
      <View className="flex-1 bg-[##f3f4f6] px-[16px] pt-[20px]">
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

      <MyAccountModal
        visible={showMyAccountModal}
        onClose={() => setShowMyAccountModal(false)}
        onViewBio={handleViewBio}
      />

      {/* Modal de Confirmação de Exclusão */}
      <DeleteConfirmModal
        visible={deleteConfirmVisible}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
      />
    </View>
  );
}
