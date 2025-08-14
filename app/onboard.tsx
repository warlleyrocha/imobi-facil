import { TouchableOpacity, View, Text } from 'react-native';
import ImageSlide from '../components/ImageSlide';
import Svg, { Path } from 'react-native-svg';
import { onboardImages } from '../assets/onboard';

export default function Onboard() {
  return (
    <View className="flex-1 bg-white">
      {/* Container para o ImageSlide sem padding lateral */}
      <View className="flex-1 pb-24 pt-12">
        <ImageSlide images={onboardImages} />
      </View>

      {/* Container dos botões fixo no final */}
      <View className="absolute bottom-8 left-0 right-0 flex-row justify-between px-4 md:bottom-12 md:px-5">
        <TouchableOpacity
          className="items-center justify-center rounded-full bg-cor-primaria p-4"
          accessibilityRole="button">
          <Svg width={21} height={20} viewBox="0 0 21 20" fill="none">
            <Path
              d="M18 9.3125H4.65625L9.96875 3.90625C10.25 3.625 10.25 3.1875 9.96875 2.90625C9.6875 2.625 9.25 2.625 8.96875 2.90625L2.5 9.46875C2.21875 9.75 2.21875 10.1875 2.5 10.4688L8.96875 17.0312C9.09375 17.1563 9.28125 17.25 9.46875 17.25C9.65625 17.25 9.8125 17.1875 9.96875 17.0625C10.25 16.7812 10.25 16.3438 9.96875 16.0625L4.6875 10.7187H18C18.375 10.7187 18.6875 10.4062 18.6875 10.0312C18.6875 9.625 18.375 9.3125 18 9.3125Z"
              fill="#FAFAFA"
            />
          </Svg>
        </TouchableOpacity>

        <TouchableOpacity
          className="w-[140px] flex-row items-center gap-2 rounded-lg bg-cor-primaria px-6 py-3"
          accessibilityRole="button">
          <Text className="font-mulish-medium text-base font-medium text-white md:text-lg">
            Próximo
          </Text>
          <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
            <Path
              d="M18 9.5L11.5312 2.9375C11.25 2.65625 10.8125 2.65625 10.5312 2.9375C10.25 3.21875 10.25 3.65625 10.5312 3.9375L15.7812 9.28125H2.5C2.125 9.28125 1.8125 9.59375 1.8125 9.96875C1.8125 10.3437 2.125 10.6875 2.5 10.6875H15.8437L10.5312 16.0938C10.25 16.375 10.25 16.8125 10.5312 17.0938C10.6562 17.2188 10.8437 17.2813 11.0312 17.2813C11.2187 17.2813 11.4062 17.2188 11.5312 17.0625L18 10.5C18.2812 10.2187 18.2812 9.78125 18 9.5Z"
              fill="white"
            />
          </Svg>
        </TouchableOpacity>
      </View>
    </View>
  );
}
