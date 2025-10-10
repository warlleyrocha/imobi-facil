import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';

import Header from '@/components/Header';
import { ButtonOutline } from '~/components/ButtonOutline';
import { FormInput } from '~/components/Form/FormInput';

export default function EditBio() {
  const router = useRouter();

  const [descricao, setDescricao] = useState('');
  const [isFocused, setIsFocused] = useState(false); // controla foco do input

  const handleSave = () => {
    // aqui você pode salvar no backend, no contexto global ou AsyncStorage
    console.log('Nova bio:', descricao);

    // volta pra tela anterior
    router.back();
  };
  return (
    <View className="flex-1 px-[16px]">
      <Header title="Resumo da Bio" />

      <FormInput
        label="Descrição"
        placeholder="Fale brevemente sobre seu perfil profissional."
        multiline
        containerClassName="gap-[7px] pb-[8px]"
        maxLength={112}
        style={{ height: 94, textAlignVertical: 'top' }}
        value={descricao}
        onChangeText={setDescricao}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      <View className="w-full items-end">
        <Text className="font-mulish text-[14px] text-texto-c-primario">
          {descricao?.length || 0}/112
        </Text>
      </View>

      {isFocused && (
        <View className="mx-[75px] mt-[175px]">
          <ButtonOutline
            title="Salvar Alterações"
            onPress={handleSave}
            variant="outline"
            className="self-center"
          />
        </View>
      )}
    </View>
  );
}
