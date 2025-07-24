import { View, Text, Image, TouchableOpacity, ImageBackground } from "react-native";
import Svg, { Path } from 'react-native-svg';

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

export default function SignIn() {
  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 bg-[#111928] w-full">
      <ImageBackground 
        source={require("../../assets/background-login.png")}
        className="flex-1 w-full h-full pt-[8vh] overflow-hidden"
        resizeMode="cover">
            <Image
            className="self-center mt-[56px]"
            source={require("../../assets/splash.png")}/>
            <Text className="text-[24px] pt-[24px] font-inter-bold text-white px-[55px] text-center line-height-[28px]">
                Bem vindo ao ImobiFácil
            </Text>
        </ImageBackground>
      </View>

      <View className="absolute bottom-0 left-0 right-0 h-[55%] px-[16px] pb-[52px] items-center bg-white rounded-t-[24px] overflow-hidden">
          <View className="flex-1 items-center pt-[52px] gap-[16px]">
            <Text className="text-[20px] text-[#111928] font-inter-bold line-height-[22px]">
                Conheça nosso APP
            </Text>

            <Text className="text-[14px] px-[8px] text-[#111928] font-mulish-medium text-center line-height-[22px]">
            Faça login de forma rápida e segura usando sua conta Google. Assim você acessa o ImobiFácil sem precisar lembrar de senhas.
            </Text>
          </View>           

          <TouchableOpacity className="flex-row gap-[23px] bg-[#E6E6E6] w-[345px] h-[50px] rounded-[5px] items-center justify-center">
            <GoogleIcon size={20} />
            <Text className="text-[#111928] font-inter-light">Continue com o Google</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
}