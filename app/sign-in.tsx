import { View, Text, Image, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import Auth from '../components/Auth';

const { width, height } = Dimensions.get('window');

export default function SignIn() {
  return (
    <View className="flex-1 bg-white">
      <ImageBackground
        source={require('../assets/background-login.png')}
        style={{
          height: height * 0.5,
          width: '100%',
        }}
        className="items-center justify-center"
        resizeMode="cover">
        <View className="flex-1 items-center justify-center">
          <Image className="mb-4" source={require('../assets/splash.png')} resizeMode="contain" />
          <Text
            className="text-center font-inter-bold text-white"
            style={{
              fontSize: width > 400 ? 24 : 22,
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
          paddingTop: 50, // Espaço para compensar a sobreposição
          minHeight: height * 0.5, // Mínimo 50% da altura
        }}>
        <Text
          className="pb-4 font-inter-bold text-[#111928]"
          style={{ fontSize: width > 400 ? 20 : 18 }}>
          Conheça nosso APP
        </Text>

        <Text
          className="text-center font-mulish-medium text-[#111928]"
          style={{
            fontSize: width > 400 ? 16 : 14,
            lineHeight: width > 400 ? 22 : 18,
            paddingHorizontal: width * 0.05,
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
            marginBottom: 40,
          }}>
          <Auth />
        </TouchableOpacity>
      </View>
    </View>
  );
}
