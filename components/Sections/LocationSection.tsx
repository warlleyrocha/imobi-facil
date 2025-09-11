import { View } from "react-native";
import { FormInput } from "@/components/Form/FormInput";
import { FormSectionTitle } from "@/components/Form/FormSectionTitle";

export function LocationSection() {
  return (
    <View className="pt-[32px]">
      <FormSectionTitle title="Localização" />

      <FormInput label="CEP" containerClassName="pt-[12px]" required placeholder="Digite o CEP" />

      <View className="flex-row gap-[20px]">
        <FormInput
          label="Rua"
          required
          placeholder="Rua, avenida..."
          containerClassName="flex-[3]"
        />
        <FormInput
          label="Número"
          required
          placeholder="000"
          containerClassName="flex-[2]"
        />
      </View>

      <FormInput label="Bairro" required placeholder="Nome do bairro" />
      <FormInput label="Complemento" placeholder="Complemento" />

      <View className="flex-row gap-[20px]">
        <FormInput
          label="Cidade"
          required
          placeholder="Cidade"
          containerClassName="flex-[3]"
        />
        <FormInput
          label="Estado"
          required
          placeholder="UF"
          containerClassName="flex-[2]"
        />
      </View>
    </View>
  );
}
