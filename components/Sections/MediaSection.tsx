import * as ImagePicker from 'expo-image-picker';
import { nanoid } from 'nanoid';
import { useCallback } from 'react';
import { Control, Controller } from 'react-hook-form';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';

import AddImage from '@/assets/icons-svg/add-images.svg';
import UploadIcon from '@/assets/icons-svg/upload-photos.svg';
import { FormSectionTitle } from '@/components/Form/FormSectionTitle';
import CloseIcon from '@/components/Icons/Close';
import { FormData } from '@/types/formProperty';

type Props = {
  readonly control: Control<FormData>;
};

export function MediaSection({ control }: Props) {
  const handleTakePhoto = useCallback(
    async (current: string[], onChange: (val: string[]) => void) => {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 1,
      });
      if (!result.canceled) onChange([...current, result.assets[0].uri]);
    },
    []
  );

  const handlePickImage = useCallback(
    async (current: string[], onChange: (val: string[]) => void) => {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 1,
      });
      if (!result.canceled) onChange([...current, result.assets[0].uri]);
    },
    []
  );

  const handleAddMedia = useCallback(
    (current: string[], onChange: (val: string[]) => void) => {
      if (current.length >= 10) return;
      Alert.alert('Adicionar mídia', 'Escolha uma opção', [
        {
          text: '📷 Tirar foto',
          onPress: () => void handleTakePhoto(current, onChange),
        },
        {
          text: '🖼️ Escolher da galeria',
          onPress: () => void handlePickImage(current, onChange),
        },
        { text: 'Cancelar', style: 'cancel' },
      ]);
    },
    [handleTakePhoto, handlePickImage]
  );

  const handleRemoveImage = useCallback(
    (current: string[], uri: string, onChange: (val: string[]) => void) => {
      const newList = current.filter((item) => item !== uri);
      onChange(newList);
    },
    []
  );

  return (
    <View className="pt-[24px]">
      <FormSectionTitle title="Midias do Imóvel" />
      <Text className="pt-[12px] font-mulish-medium text-[16px] text-dark-5">
        Envie de 3 a 10 arquivos (fotos ou vídeos).
      </Text>

      <Controller
        control={control}
        name="midias"
        render={({ field: { value, onChange } }) => {
          const midias = value ?? []; // garante array
          return (
            <>
              <View className="flex-row flex-wrap items-center justify-center gap-[12px] pt-[12px]">
                {midias.length
                  ? midias.map((uri) => (
                      <View key={uri} style={{ position: 'relative' }}>
                        <Image
                          source={{ uri }}
                          style={{ width: 100, height: 100, borderRadius: 8 }}
                        />
                        <TouchableOpacity
                          onPress={() => handleRemoveImage(midias, uri, onChange)}
                          style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            borderRadius: 12,
                            width: 20,
                            height: 20,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <CloseIcon width={16} height={16} />
                        </TouchableOpacity>
                      </View>
                    ))
                  : Array.from({ length: 3 }, () => nanoid()).map((id) => <AddImage key={id} />)}
              </View>

              <View className="w-full items-end px-[8px] pb-[12px] pt-[10px]">
                <Text className="font-mulish text-[14px] text-texto-c-primario">
                  {midias.length}/10
                </Text>
              </View>

              <View className="items-center justify-center pb-[24px]">
                <TouchableOpacity
                  className="h-[44px] w-[148px] flex-row items-center justify-center gap-[8px] rounded-[24px] border border-cor-primaria bg-cor-primaria-10 px-[24px] py-[12px]"
                  onPress={() => handleAddMedia(midias, onChange)}>
                  <UploadIcon />
                  <Text className="font-mulish-medium text-[16px] text-cor-primaria">
                    Adicionar
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          );
        }}
      />
    </View>
  );
}
