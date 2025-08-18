import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Svg, Path } from 'react-native-svg';
import { useEffect } from 'react';

// Componente SVG customizado do Figma
const CustomSuccessIcon = ({ width = 44, height = 44 }) => (
  <Svg width={width} height={height} viewBox="0 0 54 54" fill="none">
    <Path
      d="M16.7724 21.3603C16.3201 21.0834 15.6841 21.005 15.2087 21.2736C14.7334 21.5422 14.3106 22.0296 14.2876 22.5751L10.1921 51.4075C10.1136 52.0435 10.4349 52.7376 10.9776 53.0699C11.3395 53.2914 11.8296 53.405 12.2672 53.2997C12.4859 53.2471 12.6871 53.1216 12.8154 53.0136L36.7218 36.3093C37.1796 35.9677 37.4389 35.4425 37.462 34.897C37.485 34.3515 37.126 33.8207 36.6561 33.4709L16.7724 21.3603ZM16.134 33.779L25.9942 39.8154L22.7544 42.0603L15.608 37.6853L16.134 33.779ZM15.0119 41.3L19.6254 44.1244L14.006 48.0217L15.0119 41.3ZM28.9599 37.7135L16.6397 30.1089L17.2442 25.5666L32.7129 35.0365L28.9599 37.7135Z"
      fill="#111928"
    />
    <Path
      d="M26.3426 25.2293C26.7044 25.4508 27.1946 25.5644 27.6321 25.4591C28.0696 25.3539 28.472 25.1028 28.676 24.668C29.2852 23.673 29.9239 23.4422 30.9273 23.1237C32.1318 22.6797 33.701 22.1479 34.9923 20.1403C36.266 18.0597 36.026 16.4204 35.8007 15.1632C35.628 14.1248 35.5431 13.4509 36.1523 12.4559C36.7615 11.4608 37.4002 11.23 38.4035 10.9115C39.6081 10.4675 41.1773 9.93578 42.4685 7.92811C42.9669 7.11397 42.7214 6.09309 41.9072 5.59467C41.0931 5.09625 40.0722 5.34182 39.5738 6.15596C38.9646 7.15103 38.3259 7.38181 37.3225 7.7003C36.118 8.14432 34.5488 8.67605 33.2575 10.6837C31.9838 12.7643 32.2239 14.4036 32.4491 15.6608C32.6218 16.6992 32.7067 17.3731 32.0975 18.3681C31.4884 19.3632 30.8496 19.594 29.8463 19.9125C28.6417 20.3565 27.0726 20.8882 25.7813 22.8959C25.2829 23.71 25.5284 24.7309 26.3426 25.2293Z"
      fill="#111928"
    />
    <Path
      d="M21.8249 21.842C22.1166 21.7718 22.3908 21.6288 22.6298 21.3398C22.9418 21.0334 29.7379 13.6903 25.5332 5.83071C25.1215 5.08121 24.1061 4.70833 23.3012 5.2105C22.4788 5.63974 22.1789 6.63756 22.6081 7.45998C25.6128 13.2169 20.4698 18.7738 20.2308 19.0628C19.6243 19.7486 19.6511 20.8221 20.2641 21.4461C20.661 21.8134 21.2416 21.9823 21.8249 21.842Z"
      fill="#111928"
    />
    <Path
      d="M46.4474 18.6963C37.553 18.5988 34.0863 27.918 33.9553 28.3352C33.6202 29.1872 34.0845 30.1555 35.0094 30.473C35.3362 30.5486 35.663 30.6243 35.9546 30.5542C36.4651 30.4314 36.9783 29.9994 37.1647 29.4917C37.2404 29.1649 39.9235 22.0398 46.4171 22.0978C47.3447 22.106 48.097 21.3851 48.1053 20.4575C48.1865 19.5123 47.448 18.6871 46.4474 18.6963Z"
      fill="#111928"
    />
  </Svg>
);

export default function Concluido() {
  const router = useRouter();

  useEffect(() => { 
    const timer = setTimeout(() => {
      router.replace('/(auth)/onboard');
    }, 3000); // Redireciona após 3 segundos para a página de onboard

    // Limpa o timer caso o componente desmonte antes do timeout
    // Isso é importante para evitar erros se o usuário sair da página antes do redirecionamento
    return () => clearTimeout(timer);
  }, [router]);
  return (
    <View className="flex-1 items-center justify-center bg-white px-[16px] py-[10px]">
      <View className="relative h-[350px] w-[343px] items-center justify-center gap-[12px] rounded-[5px] bg-[#F9FAFB]">
        {/* Ícone de fechar no canto superior direito */}
        <TouchableOpacity
          className="absolute right-[12px] top-[12px] z-10"
          onPress={() => router.push('/(auth)/onboard')}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>

        <View className="relative">
          <View className="inset-0 items-center justify-center">
            <View className="rounded-full bg-[#ACEFC8;] p-3 shadow-lg">
              <CustomSuccessIcon width={54} height={54} />
            </View>
          </View>
        </View>

        <Text className="px-[40px] text-center text-[20px] font-bold text-[#262626]">
          Cadastro concluído!
        </Text>
        <Text className="px-[100px] text-center text-[14px] text-[#606268]">
          Agora vamos te mostrar como tirar o máximo do app.
        </Text>
      </View>
    </View>
  );
}
