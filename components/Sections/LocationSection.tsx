import { Control, Controller } from 'react-hook-form';
import { View } from 'react-native';

import { FormInput } from '@/components/Form/FormInput';
import { FormSectionTitle } from '@/components/Form/FormSectionTitle';
import { FormData } from '@/types/formProperty';

type Props = {
  readonly control: Control<FormData>;
};

export function LocationSection({ control }: Props) {
  return (
    <View className="pt-[32px]">
      <FormSectionTitle title="Localização" />

      {/* CEP */}
      <Controller
        control={control}
        name="cep"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <FormInput
            label="CEP"
            required
            placeholder="Digite o CEP"
            containerClassName="pt-[12px]"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      {/* Rua e Número */}
      <View className="flex-row gap-[20px]">
        <Controller
          control={control}
          name="rua"
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <FormInput
              label="Rua"
              required
              placeholder="Rua, avenida..."
              containerClassName="flex-[3]"
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="numero"
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <FormInput
              label="Número"
              required
              placeholder="000"
              containerClassName="flex-[2]"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
      </View>

      {/* Bairro */}
      <Controller
        control={control}
        name="bairro"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <FormInput
            label="Bairro"
            required
            placeholder="Nome do bairro"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      {/* Complemento (opcional) */}
      <Controller
        control={control}
        name="complemento"
        render={({ field: { onChange, value } }) => (
          <FormInput
            label="Complemento"
            placeholder="Complemento"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      {/* Cidade e Estado */}
      <View className="flex-row gap-[20px]">
        <Controller
          control={control}
          name="cidade"
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <FormInput
              label="Cidade"
              required
              placeholder="Cidade"
              containerClassName="flex-[3]"
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="estado"
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <FormInput
              label="Estado"
              required
              placeholder="UF"
              containerClassName="flex-[2]"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
      </View>
    </View>
  );
}
