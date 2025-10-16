import { useRouter } from 'expo-router';
import { nanoid } from 'nanoid/non-secure';
import { useRef, useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function VerifyCode() {
  const router = useRouter();
  const setaEsquerda = require('~/assets/arrow-left.png');

  // Estado para armazenar os 6 dígitos
  const [code, setCode] = useState(Array(6).fill('111111'));

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

    // Move foco para próximo input
    if (text && idx < 5) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  // Função de envio do código
  const handleSubmit = () => {
    const verificationCode = code.join('');
    console.log('Código digitado:', verificationCode);
    // Aqui você pode chamar sua API para validação
    router.replace('/(auth)/corretor/signup/feedback' as any);
  };

  return (
    <View className="flex-1 bg-[#F6F6F6] px-[16px]">
      <View className="flex-1">
        <View className="w-full flex-1 items-start justify-center">
          {/* Header */}
          <View className="flex-row items-center justify-between gap-12">
            <TouchableOpacity onPress={() => router.back()}>
              <Image source={setaEsquerda} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>

            <Text className="text-center text-[20px] font-bold">Verificação do Corretor</Text>
          </View>

          {/* Círculo com check */}
          <View className="mt-[20px] w-full items-center">
            <View
              className="relative items-center justify-center"
              style={{ width: 96, height: 96 }}>
              <View className="h-full w-full rounded-full bg-[#ACEFC8]" />
            </View>
          </View>

          {/* Mensagem de verificação */}
          <View className="flex w-full items-center justify-center gap-4 pt-[64px]">
            <Text className="text-center font-mulish-bold text-[16px] text-[#111928]">
              Enviamos um código para o email cadastrado!
            </Text>
            <View className="mt-4 text-center font-mulish-semibold text-base text-[#111928]">
              <Text className="font-mulish-bold text-[16px] text-[#111928]">
                Verifique a sua caixa de entrada.
              </Text>
              <Text className="mt-1 font-mulish-light text-sm text-[#637381]">
                Insira no campo abaixo o código de verificação que enviamos para o seu email.
              </Text>
            </View>

            {/* Inputs de 6 dígitos */}
            <View className="mt-4 flex w-full flex-row justify-between gap-2">
              {code.map((value, idx) => (
                <TextInput
                  key={inputKeys.current[idx]} // ✅ nanoid garante key única
                  ref={(el) => {
                    inputRefs.current[idx] = el;
                  }}
                  inputMode="numeric"
                  maxLength={1}
                  value={value}
                  onChangeText={(text) => handleChange(text, idx)}
                  className="h-[52px] w-11 flex-1 rounded border border-gray-300 px-3 text-center text-xl text-black"
                  placeholder=""
                />
              ))}
            </View>

            {/* Texto de expiração */}
            <View className="mt-0 flex w-full items-start justify-center gap-2">
              <Text className="font-mulish-medium text-xs text-cor-primaria">
                código expira em 15 minutos
              </Text>
              <Text className="mt-1 font-mulish-light text-xs text-[#3E3C3E]">
                Caso não encontre o email na sua caixa de entrada, verifique a pasta de spam.
              </Text>
            </View>
          </View>

          {/* Botão de enviar */}
          <View className="mt-32 flex w-full justify-end">
            <TouchableOpacity
              className="btn-azul mt-4 w-full rounded p-3 font-mulish-medium text-base text-white"
              onPress={handleSubmit}>
              <Text className="text-center font-mulish-medium text-base text-white">Enviar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
