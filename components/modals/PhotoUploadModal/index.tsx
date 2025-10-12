import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, Image, Modal, Text, TouchableOpacity, View } from 'react-native';

import CloseIcon from '@/assets/icons-svg/close.svg';
import UploadIcon from '@/assets/icons-svg/upload-photo-profile.svg';

interface PhotoUploadModalProps {
  readonly visible: boolean;
  readonly onClose: () => void;
  readonly onPhotoSelected: (uri: string) => void;
  readonly currentPhotoUri?: string;
}

export function PhotoUploadModal({
  visible,
  onClose,
  onPhotoSelected,
  currentPhotoUri,
}: PhotoUploadModalProps) {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

  const requestPermission = async (type: 'camera' | 'library') => {
    if (type === 'camera') {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'Precisamos de acesso à câmera para tirar fotos.');
        return false;
      }
    } else {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permissão necessária',
          'Precisamos de acesso à galeria para selecionar fotos.'
        );
        return false;
      }
    }
    return true;
  };

  const handlePickImage = async () => {
    const hasPermission = await requestPermission('library');
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    if (selectedImage) {
      onPhotoSelected(selectedImage);
      onClose();
    }
  };

  const handleClose = () => {
    setSelectedImage(currentPhotoUri);
    onClose();
  };

  const handleDelete = () => {
    setSelectedImage(undefined);
    onPhotoSelected('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
      <View className="flex-1 items-center justify-center bg-black/50 p-[16px]">
        <View className="w-full max-w-[400px] rounded-2xl bg-white p-[16px]">
          {/* Header */}
          <View className="mb-[10px] flex-row items-center justify-between">
            <Text className="font-mulish-bold text-[16px] leading-[18px] text-black">
              Alterar imagem
            </Text>
            <TouchableOpacity onPress={handleClose}>
              <CloseIcon />
            </TouchableOpacity>
          </View>

          {/* Opções */}
          <View className="mb-[10px]">
            <TouchableOpacity
              className="flex items-center gap-[8px] rounded-[8px] border border-dashed border-[#CECECE] bg-gray-50 p-4 pb-[30px]"
              onPress={handlePickImage}>
              {selectedImage ? (
                <Image
                  source={{ uri: selectedImage }}
                  className="h-[112px] w-[112px] rounded-lg"
                  resizeMode="cover"
                />
              ) : (
                <>
                  <View className="mt-3 flex h-[58px] w-[58px] items-center justify-center rounded-full bg-cor-primaria/5">
                    <UploadIcon />
                  </View>

                  <Text className="px-[20px] text-center font-mulish-medium text-[12px] leading-[14px] text-cor-primaria">
                    Envie uma imagem de 112x112px no formato JPG ou WEBP de até 50Kb
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          {/* Botões de ação */}
          <View className="flex-row gap-3">
            <TouchableOpacity className="flex-1 py-3 shadow" onPress={handleDelete}>
              <Text className="text-center font-mulish-medium text-[16px] text-cor-primaria">
                Excluir
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`flex-1 rounded-[8px] py-3 ${
                selectedImage ? 'bg-cor-primaria' : 'bg-gray-300'
              }`}
              onPress={handleSave}
              disabled={!selectedImage}>
              <Text className="text-center font-mulish-medium text-[16px] text-white">Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
