import { useRouter } from 'expo-router';
import { nanoid } from 'nanoid/non-secure';
import { useRef, useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

import CheckIcon from '@/assets/icons-svg/checkmark.svg';
import { FeedbackScreen } from '@/components/feedbacks/FeedbackScreen';
import { CustomSuccessIcon } from '@/components/icons/CustomSuccessIcon';

export default function VerifyCode() {
  const router = useRouter();
  const setaEsquerda = require('~/assets/arrow-left.png');
  const [showFeedback, setShowFeedback] = useState(false);

  // Estado para armazenar os 6 dígitos
  const [code, setCode] = useState<string[]>(Array(6).fill('1'));

  // Array de refs para inputs
  const inputRefs = useRef<(TextInput | null)[]>([]);

  // Gerar IDs únicas para cada input (uma vez)
  const inputKeys = useRef(Array.from({ length: 6 }, () => nanoid()));

  // Atualiza valor e foca próximo input
  const handleChange = (text: string, idx: number) => {
    if (!/^\d*$/.test(text)) return; // aceita apenas números

    const newCode = [...code];
    newCode[idx] = text;
    setCode(newCode);

    // Move foco para próximo input se houver texto
    if (text && idx < 5) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  // Função para lidar com backspace
  const handleKeyPress = (e: any, idx: number) => {
    if (e.nativeEvent.key === 'Backspace' && !code[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  };

  // Validar se o código está completo
  const isCodeComplete = code.every((digit) => digit !== '');

  // Função de envio do código
  const handleSubmit = () => {
    if (!isCodeComplete) return;

    const verificationCode = code.join('');
    console.log('Código digitado:', verificationCode);

    // Aqui você pode chamar sua API para validação
    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
      router.replace('/(auth)/corretor/onboard');
    }, 500);
  };

  // Se showFeedback for true, renderiza apenas o FeedbackScreen
  if (showFeedback) {
    return (
      <FeedbackScreen
        icon={<CustomSuccessIcon width={54} height={54} />}
        title="Cadastro concluído!"
        description="Agora vamos te mostrar como tirar o máximo do app."
        onClose={() => setShowFeedback(false)}
        showCloseButton
      />
    );
  }

  return (
    <View className="flex-1 bg-[#F6F6F6] px-4">
      {/* Header fixo */}
      <View className="mt-[80px]">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7} className="mr-2">
            <Image source={setaEsquerda} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>

          <Text className="flex-1 text-center text-[20px] font-bold">Verificação do Corretor</Text>

          {/* Spacer para centralizar o título */}
          <View style={{ width: 40 }} />
        </View>
      </View>

      {/* Conteúdo principal */}
      <View className="flex-1 pt-[58px]">
        {/* Círculo com ícone de check */}
        <View className="items-center">
          <View className="relative items-center justify-center" style={{ width: 81, height: 81 }}>
            <View className="h-full w-full rounded-full bg-[#ACEFC8]" />
            <View className="absolute">
              <CheckIcon width={24} height={24} />
            </View>
          </View>
        </View>

        {/* Mensagens de instrução */}
        <View className="mt-[66px] items-center px-2">
          <Text className="text-center font-mulish-bold text-[17px] leading-[22px] text-black">
            Enviamos um código para o email cadastrado!
          </Text>

          <View className="mt-8 items-start">
            <Text className="text-center font-mulish-bold text-[17px] text-black">
              Verifique a sua caixa de entrada.
            </Text>
            <Text className="mt-2 text-start font-mulish-light text-[15px] leading-5 text-texto-c-primario">
              Insira no campo abaixo o código de verificação que enviamos para o seu email.
            </Text>
          </View>
        </View>

        {/* Inputs de verificação (6 dígitos) */}
        <View className="mt-[45px] flex-row justify-between gap-2 px-2">
          {code.map((value, idx) => (
            <TextInput
              key={inputKeys.current[idx]}
              ref={(el) => {
                inputRefs.current[idx] = el;
              }}
              inputMode="numeric"
              maxLength={1}
              value={value}
              onChangeText={(text) => handleChange(text, idx)}
              onKeyPress={(e) => handleKeyPress(e, idx)}
              className="h-[52px] flex-1 rounded-[8px] border border-gray-300 text-center text-xl text-black"
              placeholder="-"
              placeholderTextColor="#D1D5DB"
            />
          ))}
        </View>

        {/* Informações adicionais */}
        <View className="mt-3 px-[6px]">
          <Text className="font-mulish-medium text-[12px] text-cor-primaria">
            código expira em 5 minutos
          </Text>
          <Text className="mt-5 font-mulish-light text-[12px] leading-4 text-[#3E3C3E]">
            Caso não encontre o email na sua caixa de entrada, verifique a pasta de spam.
          </Text>
        </View>
      </View>

      {/* Botão de enviar - fixo na parte inferior */}
      <View className="pb-[58px]">
        <TouchableOpacity
          className={`btn-azul w-full rounded p-3 ${!isCodeComplete ? 'opacity-50' : ''}`}
          onPress={handleSubmit}
          disabled={!isCodeComplete}
          activeOpacity={0.8}>
          <Text className="text-center font-mulish-medium text-[16px] text-white">Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
