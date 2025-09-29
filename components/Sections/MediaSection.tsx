import * as ImagePicker from "expo-image-picker";
import { Control, Controller } from "react-hook-form";
import { Alert,Image, Text, TouchableOpacity, View } from "react-native";

import AddImage from "@/assets/icons-svg/add-images.svg";
import UploadIcon from "@/assets/icons-svg/upload-photos.svg";
import { FormSectionTitle } from "@/components/Form/FormSectionTitle";
import CloseIcon from "@/components/Icons/Close";
import { FormData } from "@/types/formProperty";

type Props = {
  control: Control<FormData>;
};

export function MediaSection({ control }: Props) {
  return (
    <View className="pt-[24px]">
      <FormSectionTitle title="Midias do Imóvel" />

      <Text className="font-mulish-medium text-dark-5 text-[16px] pt-[12px]">
        Envie de 3 a 10 arquivos (fotos ou vídeos).
      </Text>

      <Controller
        control={control}
        name="midias"
        render={({ field: { value, onChange } }) => (
          <>
            <View className="flex-row gap-[12px] pt-[12px] items-center justify-center flex-wrap">
              {value?.length
                ? value.map((uri, index) => (
                    <View key={index} style={{ position: "relative" }}>
                      {/* Imagem */}
                      <Image
                        source={{ uri }}
                        style={{ width: 100, height: 100, borderRadius: 8 }}
                      />

                      {/* Botão de remover */}
                      <TouchableOpacity
                        onPress={() => {
                          // Remove a imagem desse índice
                          const newValue = value.filter((_, i) => i !== index);
                          onChange(newValue);
                        }}
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          borderRadius: 12,
                          width: 20,
                          height: 20,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                      <CloseIcon width={16} height={16} />
                      </TouchableOpacity>
                    </View>
                  ))
                : Array.from({ length: 3 }).map((_, index) => (
                    <AddImage key={index} />
                  ))}
            </View>


            <View className="w-full px-[8px] items-end pt-[10px] pb-[12px]">
              <Text className="font-mulish text-[14px] text-texto-c-primario">
                {value?.length ?? 0}/10
              </Text>
            </View>

            <View className="justify-center items-center pb-[24px]">
             <TouchableOpacity
                className="py-[12px] gap-[8px] px-[24px] flex-row items-center justify-center w-[148px] h-[44px] border border-cor-primaria bg-cor-primaria-10 rounded-[24px]"
                onPress={() => {
                if ((value?.length ?? 0) >= 10) return;

                Alert.alert(
                "Adicionar mídia",
                "Escolha uma opção",
                [
                  {
                    text: "📷 Tirar foto",
                    onPress: async () => {
                      const result = await ImagePicker.launchCameraAsync({
                        mediaTypes: ["images"],
                        allowsEditing: true,
                        quality: 1,
                      });
                      if (!result.canceled) {
                        onChange([...(value ?? []), result.assets[0].uri]);
                      }
                    },
                  },
                  {
                    text: "🖼️ Escolher da galeria",
                    onPress: async () => {
                      const result = await ImagePicker.launchImageLibraryAsync({
                         mediaTypes: ["images"],
                        allowsEditing: true,
                        quality: 1,
                      });
                      if (!result.canceled) {
                        onChange([...(value ?? []), result.assets[0].uri]);
                      }
                    },
                  },
                  { text: "Cancelar", style: "cancel" },
                ],
                { cancelable: true }
                );
                }}
                >
                <UploadIcon />
                <Text className="font-mulish-medium text-[16px] text-cor-primaria">
                  Adicionar
                </Text>
              </TouchableOpacity>

            </View>
          </>
        )}
      />
    </View>
  );
}
