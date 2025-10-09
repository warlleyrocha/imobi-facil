import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

import { CustomSuccessIcon } from '@/components/Icons/CustomSuccessIcon';
import { useGoogleAuth } from '@/hooks/useGoogleAuth';

export default function Success() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { handleCallback, loading, error } = useGoogleAuth();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const processCallback = async () => {
      const code = params.code as string;
      const oauthError = params.error as string;

      // Se veio de um erro do OAuth
      if (oauthError) {
        console.error('Erro OAuth:', oauthError);
        alert('Erro ao fazer login com Google');
        router.replace('/sign-in');
        return;
      }

      // Se veio o código de autorização
      if (code) {
        console.log('Código OAuth recebido:', code);

        const data = await handleCallback(code);

        if (data) {
          console.log('Login bem-sucedido!', data.user);

          // Aguarda 2 segundos mostrando a mensagem de sucesso
          setTimeout(() => {
            // Verifica se usuário precisa completar perfil
            if (data.user.role === 'TEMP') {
              router.replace('/(auth)/select-profile');
            } else {
              router.replace('/(auth)/onboard'); // ou sua home
            }
          }, 2000);
        } else {
          console.error('Falha no callback');
          alert('Erro ao processar autenticação');
          router.replace('/sign-in');
        }
      } else {
        // Acesso direto à página sem parâmetros
        console.log('Acesso direto - redirecionando');
        setTimeout(() => {
          router.replace('/(auth)/select-profile');
        }, 1000);
      }

      setIsProcessing(false);
    };

    processCallback();
  }, [params, handleCallback, router]);

  // Mostra loading enquanto processa
  if (isProcessing || loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-[16px] py-[10px]">
        <View className="relative h-[350px] w-[343px] items-center justify-center gap-[12px] rounded-[5px] bg-[#F9FAFB]">
          <ActivityIndicator size="large" color="#262626" />
          <Text className="mt-4 text-center text-[16px] text-[#606268]">
            Processando autenticação...
          </Text>
        </View>
      </View>
    );
  }

  // Mostra erro se houver
  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-[16px] py-[10px]">
        <View className="relative h-[350px] w-[343px] items-center justify-center gap-[12px] rounded-[5px] bg-[#F9FAFB]">
          <Ionicons name="alert-circle" size={54} color="#EF4444" />
          <Text className="px-[40px] text-center text-[20px] font-bold text-[#262626]">
            Erro na autenticação
          </Text>
          <Text className="px-[100px] text-center text-[14px] text-[#606268]">{error}</Text>
          <TouchableOpacity
            onPress={() => router.replace('/sign-in')}
            className="mt-4 rounded-md bg-[#262626] px-6 py-3">
            <Text className="text-white">Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Mostra sucesso
  return (
    <View className="flex-1 items-center justify-center bg-white px-[16px] py-[10px]">
      <View className="relative h-[350px] w-[343px] items-center justify-center gap-[12px] rounded-[5px] bg-[#F9FAFB]">
        {/* Ícone de fechar no canto superior direito */}
        <TouchableOpacity
          className="absolute right-[12px] top-[12px] z-10"
          onPress={() => router.replace('/(auth)/select-profile')}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>

        <View className="relative">
          <View className="inset-0 items-center justify-center">
            <View className="rounded-full bg-[#ACEFC8] p-3 shadow-lg">
              <CustomSuccessIcon width={54} height={54} />
            </View>
          </View>
        </View>

        <Text className="px-[40px] text-center text-[20px] font-bold text-[#262626]">
          Login realizado com Sucesso!
        </Text>
        <Text className="px-[100px] text-center text-[14px] text-[#606268]">
          Redirecionando para completar seu perfil
        </Text>
      </View>
    </View>
  );
}
