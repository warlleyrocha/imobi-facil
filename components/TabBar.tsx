import CalendarTabIcon from '@/assets/icons-svg/calendar-tab.svg';
import ChatIcon from '@/assets/icons-svg/chat.svg';
import HomeIcon from '@/assets/icons-svg/home.svg';
import HouseAltIcon from '@/assets/icons-svg/house-alt-black.svg';
import UserIcon from '@/assets/icons-svg/user.svg';
import { TouchableOpacity, View } from 'react-native';
import { SvgProps } from 'react-native-svg';

interface IconsRoutesTypes {
  id: string;
  icon: React.FC<SvgProps>;
  title: string;
}

const iconsRoutes: IconsRoutesTypes[] = [
  { id: '1', icon: HomeIcon, title: 'Tela Inicial' },
  { id: '2', icon: HouseAltIcon, title: 'Ver Imóveis' },
  { id: '3', icon: CalendarTabIcon, title: 'Agendar Visita' },
  { id: '4', icon: ChatIcon, title: 'Chat' },
  { id: '5', icon: UserIcon, title: 'Perfil' },
];

const TabBar = () => {
  return (
    <View
      className="h-[60px] items-center justify-center rounded-[30px] px-4"
      style={{
        backgroundColor: '#FAFAFA', // Fundo semi-transparente

        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)', // Borda sutil
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 2, // Sombra para Android
      }}>
      <View className="w-full flex-row justify-around">
        {iconsRoutes.map((route, index) => {
          const IconComponent = route.icon;
          const isFirstIcon = index === 0;

          return (
            <TouchableOpacity
              key={route.id}
              className={`h-[48px] w-[48px] items-center justify-center ${
                isFirstIcon ? 'rounded-full bg-gray-900' : 'bg-transparent'
              }`}
              onPress={() => {
                console.log(`Navegando para: ${route.title}`);
              }}>
              <IconComponent width={24} height={24} fill={isFirstIcon ? '#ffffff' : '#000000'} />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default TabBar;
