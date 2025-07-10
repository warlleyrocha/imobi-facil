// app/login.tsx
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { TestColors } from '../components/Container';

export default function Login() {
  return (
    <ImageBackground
      source={require('../assets/Rectangle-167.png')}
      style={{ flex: 1, width: '100%' }}
      resizeMode="cover">
      {/* Header com logo e texto de boas-vindas */}
      <View className="items-center justify-center gap-[23px] pb-[20px] pt-[22px]">
        <Image source={require('../assets/image.png')} style={{ width: 81, height: 81 }} />
        <Text className="text-center text-2xl font-bold text-white">
          Bem vindo ao{'\n'}ImobiFacil
        </Text>
      </View>

      <TestColors />

      {/*FORM DE LOGIN */}
      <View className="h-[606px] w-full flex-1 gap-3 rounded-3xl bg-white px-4 pb-4">
        <Text className="pb-[20px] pt-[32px] text-center text-[20px] font-bold">
          Criar Perfil de Corretor
        </Text>
        <View className="flex-1 gap-1 ">
          <Text className="text-[#6B7280]">Email*</Text>
          <TextInput
            placeholder="Email"
            className="mb-2.5 rounded-lg border border-[#DFE4EA] py-[12px] pl-[20px] pr-[16px] text-[#6B7280]"
          />
          <Text className="text-[#6B7280]">Senha*</Text>
          <TextInput
            placeholder="Password"
            secureTextEntry
            className="mb-2.5 rounded-lg border border-[#DFE4EA] py-[12px] pl-[20px] pr-[16px] text-[#6B7280]"
          />
        </View>
        <TouchableOpacity
          className="h-[48px] w-full items-center justify-center rounded-lg border border-[#3758F9] bg-[#3758F9] px-[122px] py-[17px]"
          onPress={() => {}}>
          <Text className="text-base font-semibold text-white">Entrar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
