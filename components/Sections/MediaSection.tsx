import { View, Text, TouchableOpacity } from "react-native";
import { Control, Controller } from "react-hook-form";
import { FormSectionTitle } from "@/components/Form/FormSectionTitle";
import AddImage from "@/assets/icons-svg/add-images.svg";
import UploadIcon from "@/assets/icons-svg/upload-photos.svg";
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
            <View className="flex-row gap-[12px] pt-[12px] items-center justify-center">
              {value?.length
                ? value.map((_, index) => <AddImage key={index} />)
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
                  // Exemplo: adicionando "placeholder" no array
                  if ((value?.length ?? 0) < 10) {
                    onChange([...(value ?? []), "nova-midia"]);
                  }
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
