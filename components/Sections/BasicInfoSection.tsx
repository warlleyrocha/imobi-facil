import { View, Text } from "react-native";
import { FormInput } from "@/components/Form/FormInput";
import { FormSelect } from "@/components/Form/FormSelect";
import { FormSectionTitle } from "@/components/Form/FormSectionTitle";
import { RadioGroup } from "~/components/RadioButton/RadioGroup";

type Props = {
  finalidade: string | null;
  setFinalidade: (val: string) => void;
  tipo: string | null;
  setTipo: (val: string) => void;
};

export function BasicInfoSection({ finalidade, setFinalidade, tipo, setTipo }: Props) {
  return (
    <View>
      <FormSectionTitle title="Informações Básicas" />

      <View className="pt-[10px]">
        <FormInput label="Título do Imóvel" required placeholder="Ex: Casa com 3 quartos" />
      </View>
      

      <Text className="font-mulish-medium pb-[10px] text-[16px] text-dark-5">Finalidade*</Text>
      <RadioGroup
        options={[
          { label: "Venda", value: "venda" },
          { label: "Aluguel", value: "aluguel" },
        ]}
        selectedValue={finalidade}
        onSelect={setFinalidade}
        layout="row"
      />

      <FormSelect
        label="Tipo de Imóvel"
        required
        options={[
          { label: "Apartamento", value: "Apartamento" },
          { label: "Casa", value: "Casa" },
          { label: "Terreno", value: "Terreno" },
          { label: "Studio", value: "Studio" },
          { label: "Comercial", value: "Comercial" },
        ]}
        value={tipo}
        onChange={setTipo}
      />

      <View className="flex-row gap-[20px]">
        <FormInput
          label="Preço"
          required
          placeholder="0.00"
          containerClassName="flex-1"
        />
        <FormInput
          label="Área útil"
          required
          placeholder="000m²"
          containerClassName="flex-1"
        />
      </View>
        
      <FormInput
        label="Descrição"
        placeholder="Ex: Casa ampla com quintal, pronta para morar."
        multiline
        containerClassName="gap-[7px] pb-[8px]"
        maxLength={50}
        style={{ height: 120, textAlignVertical: "top" }}
      />
      
      <View className="w-full items-end">
        <Text className="font-mulish text-[14px] text-texto-c-primario">0/50</Text>
      </View>
    </View>
  );
}
