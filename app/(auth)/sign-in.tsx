import { View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';
import Auth from '../../components/Auth';

export default function SignIn() {
  return (
    <View className="flex-1 bg-white">
      <View className="w-full flex-1 bg-[#111928]">
        <ImageBackground
          source={require('../../assets/background-login.png')}
          className="h-full w-full flex-1 overflow-hidden pt-[8vh]"
          resizeMode="cover">
          <Image className="mt-[56px] self-center" source={require('../../assets/splash.png')} />
          <Text className="line-height-[28px] px-[55px] pt-[24px] text-center font-inter-bold text-[24px] text-white">
            Bem vindo ao ImobiFácil
          </Text>
        </ImageBackground>
      </View>

      <View className="absolute bottom-0 left-0 right-0 h-[55%] items-center overflow-hidden rounded-t-[24px] bg-white px-[16px] pb-[52px]">
        <View className="flex-1 items-center gap-[16px] pt-[52px]">
          <Text className="line-height-[22px] font-inter-bold text-[20px] text-[#111928]" />

          {/* Container para o conteúdo do login */}
          <View className="z-10 -mt-[10px] flex-1 items-center justify-center gap-[10px] rounded-t-[30px] bg-white px-[16px]">
            <Text className="text-[20px] font-bold text-[#111928]">Conheça nosso APP</Text>

            <Text className="line-height-[22px] px-[8px] text-center font-mulish-medium text-[14px] text-[#111928]">
              Faça login de forma rápida e segura usando sua conta Google. Assim você acessa o
              ImobiFácil sem precisar lembrar de senhas.
            </Text>
          </View>

          <TouchableOpacity className="h-[50px] w-[345px] flex-row items-center justify-center gap-[23px] rounded-[5px] bg-[#E6E6E6]">
            <Auth />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
