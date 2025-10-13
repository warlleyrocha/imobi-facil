import { Dimensions, ImageBackground, Platform, Text, TouchableOpacity, View } from 'react-native';

import CompanyIcon from '@/assets/icons-svg/company.svg';
import Auth from '~/components/ui/buttons/Auth';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '~/contexts/authContext';
import type { User } from '~/types/authTypes';

const { width, height } = Dimensions.get('window');

export default function SignIn() {
  const { user, login } = useAuth();

  useEffect(() => {
    //+Feature:Pega os parametros da URL e checa se existe algum token. Se existir, faz o login automático
    // Se o usuário já estiver logado, não faz nada
    // Até o momento só funciona na web
    if (Platform.OS !== 'web' || user) return;
    const searchParams = new URLSearchParams(window.location.search);
    const userParams = searchParams.get('user');
    const accessToken = searchParams.get('token');
    if (userParams && accessToken) {
      (async () => {
        // Decodifica o user que veio na URL e faz o login
        const decodedUser: User = JSON.parse(decodeURIComponent(userParams));
        console.log({
          id: decodedUser.id,
          email: decodedUser.email,
          name: decodedUser.name,
          accessToken,
        });
        await login({ ...decodedUser, accessToken });
      })();
    }
    return () => {
      //Simulação de limpeza após sair da página
      console.log('Unmount sign-in');
    };
  }, []);
  return (
    <View className="flex-1 bg-white">
      <ImageBackground
        source={require('@/assets/background-login.png')}
        style={{
          height: height * 0.5,
          width: '100%',
        }}
        className="items-center justify-center"
        resizeMode="cover">
        <View className="flex-1 items-center justify-center gap-[24px]">
          <View className="h-[81px] w-[81px] items-center justify-center rounded-full bg-[#111928]">
            <CompanyIcon />
          </View>

          <Text
            className="text-center font-inter-bold text-white"
            style={{
              fontSize: width > 400 ? 25 : 24,
              lineHeight: width > 400 ? 28 : 24,
              paddingHorizontal: width * 0.1,
            }}>
            Bem vindo ao {'\n'} ImobiFácil
          </Text>
        </View>
      </ImageBackground>

      {/* View com sobreposição */}
      <View
        className="flex-1 items-center rounded-t-[24px] bg-white px-4 pb-4"
        style={{
          marginTop: -40, // Sobreposição sobre o background
          paddingTop: 48, // Espaço para compensar a sobreposição
          minHeight: height * 0.5, // Mínimo 50% da altura
        }}>
        <Text
          className="pb-4 font-inter-bold text-[#111928]"
          style={{ fontSize: width > 400 ? 22 : 20 }}>
          Conheça nosso APP
        </Text>

        <Text
          className="text-center font-mulish-medium text-[#111928]"
          style={{
            fontSize: width > 400 ? 16 : 14,
            lineHeight: width > 400 ? 24 : 22,
            paddingHorizontal: width * 0.03,
            maxWidth: 400,
          }}>
          Faça login de forma rápida e segura usando sua conta Google. Assim você acessa o
          ImobiFácil sem precisar lembrar de senhas.
        </Text>

        {/* Botão responsivo */}
        <TouchableOpacity
          className="flex-row items-center justify-center rounded-[5px] bg-[#E6E6E6]"
          style={{
            height: 50,
            width: Math.min(width * 0.9, 345), // 90% da largura ou máximo 345px
            gap: 23,
            marginTop: 'auto',
            marginBottom: 52,
          }}>
          <Auth />
        </TouchableOpacity>
      </View>
    </View>
  );
}
