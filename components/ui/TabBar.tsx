import { Href, usePathname, useRouter } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';
import { SvgProps } from 'react-native-svg';

import CalendarTabIcon from '@/assets/icons-svg/calendar-tab.svg';
import ChatIcon from '@/assets/icons-svg/chat.svg';
import HomeIcon from '@/assets/icons-svg/home.svg';
import HouseAltIcon from '@/assets/icons-svg/house-alt-black.svg';
import UserIcon from '@/assets/icons-svg/user.svg';

interface IconsRoutesTypes {
  id: string;
  icon: React.FC<SvgProps>;
  title: string;
  route: Href;
}

const iconsRoutes: IconsRoutesTypes[] = [
  { id: '1', icon: HomeIcon, title: 'Tela Inicial', route: '/corretor/home' },
  { id: '2', icon: HouseAltIcon, title: 'Ver Imóveis', route: '/corretor/imoveis' },
  { id: '3', icon: CalendarTabIcon, title: 'Agendar Visita', route: '/corretor/agenda' },
  { id: '4', icon: ChatIcon, title: 'Chat', route: '/corretor/chat' },
  { id: '5', icon: UserIcon, title: 'Perfil', route: '/corretor/profile' },
];

const TabBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View
      className="h-[60px] items-center justify-center rounded-[30px] px-4"
      style={{
        backgroundColor: '#FAFAFA',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 0.5,
      }}>
      <View className="w-full flex-row justify-around">
        {iconsRoutes.map((route) => {
          const IconComponent = route.icon;
          const isActive = pathname === route.route;

          return (
            <TouchableOpacity
              key={route.id}
              className={`h-[48px] w-[48px] items-center justify-center ${
                isActive ? 'rounded-full bg-gray-900' : 'bg-transparent'
              }`}
              onPress={() => router.replace(route.route)}>
              <IconComponent
                width={24}
                height={24}
                color={isActive ? '#ffffff' : '#000000'} // MUDEI DE fill PARA color
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default TabBar;
