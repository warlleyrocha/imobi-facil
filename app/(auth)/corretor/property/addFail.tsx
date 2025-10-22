import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Svg from 'react-native-svg';

// Add componente SVG customizado do Figma
const CustomFailIcon = ({ width = 44, height = 44 }) => (
  <Svg width={width} height={height} viewBox="0 0 54 54" fill="none">
    <Ionicons name="close" size={24} color="black" />
  </Svg>
);

const imovelImage = require('@/assets/img-imovel-cadastrado.png');

export default function SuccessForm() {
  return (
    <View className="flex-1 items-center justify-center bg-white px-[16px] py-[10px]">
      <View className="relative h-[632px] w-[343px] items-center justify-center gap-[12px] rounded-[8px] border border-[#DFE4EA] bg-[#white]">
        {/* Ícone de fechar no canto superior direito */}
        <TouchableOpacity
          className="absolute right-[12px] top-[12px] z-10"
          onPress={() => router.push('/(auth)/corretor/home')}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>

        <View className="relative">
          <View className="inset-0 flex flex-row items-center gap-1 px-2 pl-5 pt-14">
            <View className="rounded-full bg-[#F89090] p-3">
              <CustomFailIcon width={20} height={20} />
            </View>
            <Text className="px-[20px] text-center text-[20px] font-bold text-[#262626]">
              Não foi possível concluir o cadastro
            </Text>
          </View>

          <View className="mt-4 w-full px-4">
            <View className="items-center rounded-[8px] border border-[#E4E4E7] bg-white">
              <Image
                source={imovelImage}
                style={{
                  width: 311,
                  height: 230,
                  resizeMode: 'contain',
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                }}
              />

              <Text className="mb-4 mt-8 px-4 text-center font-mulish-semibold text-[20px] text-[#111928]">
                Verifique os campos obrigatórios ou sua conexão e tente novamente.
              </Text>

              <TouchableOpacity
                className="my-2 w-[170px] rounded-[50px] border border-blue-500 bg-transparent px-4 py-2 hover:bg-blue-500"
                onPress={() => router.push('/(auth)/corretor/property/formProperty')}>
                <Text className="text-center font-mulish text-[16px] text-blue-500 hover:text-white">
                  Tentar novamente
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="w-full bg-transparent px-4"
                onPress={() => router.push('/(auth)/corretor/property/formProperty')}>
                <Text className="mb-2 mt-4 px-6 pb-6 text-center font-mulish text-[14px] text-[#6B7280] hover:text-blue-500">
                  Voltar ao formulário
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
