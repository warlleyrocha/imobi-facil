import { useState } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';

import { FeedbackScreen } from '@/components/FeedbackScreen';
import Header from '@/components/Header';
import { CustomSuccessIcon } from '@/components/Icons/CustomSuccessIcon';
import { ButtonOutline } from '~/components/ButtonOutline';
import { FormInput } from '~/components/Form/FormInput';

export default function EditProfile() {
  const [showFeedback, setShowFeedback] = useState(false);
  const [name, setName] = useState('');
  const [creci, setCreci] = useState('');

  const handleSaveChanges = () => {
    // Aqui você faria a lógica de salvar (API call, etc)
    // Por enquanto, apenas mostra o feedback
    setShowFeedback(true);

    // Opcional: fechar o feedback automaticamente após alguns segundos
    setTimeout(() => {
      setShowFeedback(false);
    }, 3000);
  };

  if (showFeedback) {
    return (
      <FeedbackScreen
        icon={<CustomSuccessIcon width={54} height={54} />}
        title="Perfil atualizado!"
        description="Suas alterações foram salvas com sucesso"
        onClose={() => setShowFeedback(false)}
        showCloseButton
      />
    );
  }

  return (
    <KeyboardAvoidingView className="flex-1" behavior="padding">
      <View className="flex-1 px-[16px]">
        <Header title="Editar Perfil" />

        <FormInput
          label="Nome"
          required
          placeholder="Digite seu nome"
          textInputClassName="h-[52px]"
          value={name}
          onChangeText={setName}
        />

        <FormInput
          label="CRECI"
          required
          placeholder="Digite seu Creci"
          textInputClassName="h-[52px]"
          value={creci}
          onChangeText={setCreci}
        />

        <View className="h-[145px]" />

        <View className="mx-[75px]">
          <ButtonOutline
            title="Salvar Alterações"
            variant="outline"
            className="self-center"
            onPress={handleSaveChanges}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
