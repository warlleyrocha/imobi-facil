import { View, Text } from "react-native";
import { Controller, Control } from "react-hook-form";

import { FormInput } from "@/components/Form/FormInput";
import { FormSelect } from "@/components/Form/FormSelect";
import { FormSectionTitle } from "@/components/Form/FormSectionTitle";
import { RadioGroup } from "~/components/RadioButton/RadioGroup";

import { FormData } from "@/types/formProperty";

type Props = {
  control: Control<FormData>;
};

export function BasicInfoSection({ control }: Props) {
  return (
    <View>
      <FormSectionTitle title="Informações Básicas" />

      {/* Título */}
      <Controller
        control={control}
        name="titulo"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <View className="pt-[10px]">
            <FormInput
            label="Título do Imóvel"
            required
            placeholder="Ex: Casa com 3 quartos"
            value={value}
            onChangeText={onChange}
            />
          </View>
        )}
      />

      {/* Finalidade */}
      <Text className="font-mulish-medium pb-[10px] text-[16px] text-dark-5">
        Finalidade*
      </Text>
      <Controller
        control={control}
        name="finalidade"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <RadioGroup
            options={[
              { label: "Venda", value: "venda" },
              { label: "Aluguel", value: "aluguel" },
            ]}
            selectedValue={value}
            onSelect={onChange}
            layout="row"
          />
        )}
      />

      {/* Tipo de Imóvel */}
      <Controller
        control={control}
        name="tipo"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
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
            value={value}
            onChange={onChange}
          />
        )}
      />

      {/* Preço + Área */}
      <View className="flex-row gap-[20px]">
        <Controller
          control={control}
          name="preco"
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <FormInput
              label="Preço"
              required
              placeholder="0.00"
              containerClassName="flex-1"
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="area"
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <FormInput
              label="Área útil"
              required
              placeholder="000m²"
              containerClassName="flex-1"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
      </View>

      {/* Descrição */}
      <Controller
        control={control}
        name="descricao"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <FormInput
            label="Descrição"
            placeholder="Ex: Casa ampla com quintal, pronta para morar."
            multiline
            containerClassName="gap-[7px] pb-[8px]"
            maxLength={50}
            style={{ height: 120, textAlignVertical: "top" }}
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      <View className="w-full items-end">
        <Text className="font-mulish text-[14px] text-texto-c-primario">
          {/* Exemplo simples de contador */}
          {control._formValues.descricao?.length || 0}/50
        </Text>
      </View>
    </View>
  );
}
