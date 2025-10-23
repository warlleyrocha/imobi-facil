import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Text, TouchableOpacity,View } from 'react-native';
import { Path,Svg } from 'react-native-svg';

// Componente SVG customizado do Figma
const CustomErrorIcon = ({ width = 44, height = 44 }) => (
  <Svg width={width} height={height} viewBox="0 0 32 32" fill="none">
    <Path
      d="M28.0237 2.02368C28.5713 1.47605 29.4292 1.47605 29.9768 2.02368C30.5242 2.57132 30.5244 3.42924 29.9768 3.97681L17.9534 16.0002L29.9768 28.0237C30.5242 28.5713 30.5244 29.4292 29.9768 29.9768C29.717 30.286 29.3449 30.3996 29.0002 30.3997C28.6223 30.3997 28.2616 30.2146 28.0237 29.9768L16.0002 17.9534L3.97681 29.9768C3.71704 30.286 3.34487 30.3996 3.00024 30.3997C2.62231 30.3997 2.26156 30.2146 2.02368 29.9768C1.47605 29.4292 1.47605 28.5713 2.02368 28.0237L14.0461 16.0002L2.02368 3.97681C1.47605 3.42918 1.47605 2.57131 2.02368 2.02368C2.57131 1.47605 3.42918 1.47605 3.97681 2.02368L16.0002 14.0461L28.0237 2.02368Z"
      fill="#111928"
      stroke="black"
      strokeWidth={0.5}
    />
  </Svg>
);

export default function ErrorPage() {
  return (
    <View className="flex-1 items-center justify-center bg-white px-[16px] py-[10px]">
      <View className="relative h-[350px] w-[343px] items-center justify-center gap-[12px] rounded-[5px] bg-[#F9FAFB]">
        {/* Ícone de fechar no canto superior direito */}
        <TouchableOpacity
          className="absolute right-[12px] top-[12px] z-10"
          onPress={() => router.back()}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>

        <View className="relative">
          <View className="inset-0 items-center justify-center">
            <View className="rounded-full bg-[#F89090;] p-3 shadow-lg">
              <CustomErrorIcon width={54} height={54} />
            </View>
          </View>
        </View>

        <Text className="px-[40px] text-center text-[20px] font-bold text-[#262626]">
          Não foi possível conectar!
        </Text>
        <Text className="px-[100px] text-center text-[14px] text-[#606268]">
          Verifique sua internet ou tente novamente.
        </Text>
      </View>
    </View>
  );
}
