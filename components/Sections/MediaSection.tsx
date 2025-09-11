import { View, Text, TouchableOpacity } from "react-native";
import { FormSectionTitle } from "@/components/Form/FormSectionTitle";
import AddImage from "@/assets/icons-svg/add-images.svg";
import UploadIcon from "@/assets/icons-svg/upload-photos.svg";

export function MediaSection() {
  return (
    <View className="pt-[24px]">
      <FormSectionTitle title="Midias do Imóvel" />

      <Text className="font-mulish-medium text-dark-5 text-[16px] pt-[12px]">
        Envie de 3 a 10 arquivos (fotos ou vídeos).
      </Text>

      {/* Ícones de placeholder */}
      <View className="flex-row gap-[12px] pt-[12px] items-center justify-center">
        {Array.from({ length: 3 }).map((_, index) => (
          <AddImage key={index} />
        ))}
      </View>

      <View className="w-full px-[8px] items-end pt-[10px] pb-[12px]">
        <Text className="font-mulish text-[14px] text-texto-c-primario">0/10</Text>
      </View>

      <View className="justify-center items-center pb-[24px]">
        <TouchableOpacity className="py-[12px] gap-[8px] px-[24px] flex-row items-center justify-center w-[148px] h-[44px] border border-cor-primaria bg-cor-primaria-10 rounded-[24px]">
          <UploadIcon />
          <Text className="font-mulish-medium text-[16px] text-cor-primaria">
            Adicionar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
