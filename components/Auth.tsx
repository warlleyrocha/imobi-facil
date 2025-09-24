import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useGoogleAuth } from '../hooks/useGoogleAuth';

// Componente do ícone do Google
const GoogleIcon = ({ size = 20 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <Path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <Path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <Path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </Svg>
);

const Auth = () => {
  const router = useRouter();
  const { response, isLoading, error } = useGoogleAuth(); // após integração com a api, retornar *promptAsync*, para usar no onPress

  useEffect(() => {
    if (response?.type === 'success') {
      router.replace('/(auth)/feedback/success/page');
    } else if (response?.type === 'error') {
      router.push('/error/page');
    }
  }, [response, router]);

  const loginQATestTemporary = () => {
    // Função temporária para testes QA, simula login sem autenticação real
    router.replace('/(auth)/feedback/success/page');
  };

  return (
    <View>
      <TouchableOpacity
        disabled={isLoading}
        onPress={() => loginQATestTemporary()} //mudar para promptAsync()
        className="h-[50px] w-[345px] flex-row items-center justify-center gap-[19px] rounded-[5px] bg-[#E6E6E6]">
        <GoogleIcon size={20} />
        {isLoading ? (
          <ActivityIndicator size="small" color="#111928" />
        ) : (
          <Text className="font-inter-light text-[#111928]">Continue com o Google</Text>
        )}
      </TouchableOpacity>
      {error && <Text className="mt-2 text-red-600">{error}</Text>}
    </View>
  );
};

export default Auth;
