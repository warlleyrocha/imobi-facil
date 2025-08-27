import { View, Text, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import TextSlider from '@/components/TextSlider';
import TabBar from '~/components/TabBar';

import ImagePro from '@/assets/bg.png';
import HouseAddIcon from '@/assets/icons-svg/house-add.svg';
import HouseAltIcon from '@/assets/icons-svg/house-alt.svg';
import Calendar from '@/assets/icons-svg/calendar.svg';
import Users from '@/assets/icons-svg/users.svg';
import Eyes from '@/assets/icons-svg/eyes.svg';
import Circle from '@/assets/icons-svg/circle.svg';
import Stats from '@/assets/icons-svg/stats.svg';

interface CardQuickAccess {
  id: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>; // Tipo para SVG
  title: string;
}

interface StatCardData {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  value: string;
  bgColor: string;
}

const cardData: CardQuickAccess[] = [
  { id: '1', icon: HouseAddIcon, title: 'Cadastrar Imóvel' },
  { id: '2', icon: HouseAltIcon, title: 'Ver Imóveis' },
  { id: '3', icon: Calendar, title: 'Agendar Visita' },
  { id: '4', icon: Users, title: 'Pastas de Imóveis' },
];

const statsData: StatCardData[] = [
  {
    id: '1',
    icon: Eyes,
    title: 'Visitas Agendadas',
    value: '24',
    bgColor: '#EDE9FE',
  },
  {
    id: '2',
    icon: Stats,
    title: 'Novos Leads',
    value: '12',
    bgColor: '#DAF8E6',
  },
  {
    id: '3',
    icon: Circle,
    title: 'Documentos pendentes para \naprovação',
    value: '8',
    bgColor: '#D0F0FD',
  },
];

export default function HomeCorretor() {
  const renderCard = ({ item }: { item: CardQuickAccess }) => {
    const Icon = item.icon; // Pega o componente SVG

    return (
      <TouchableOpacity className="m-2 min-h-[72px] flex-1 flex-row items-center gap-4 rounded-lg border border-cor-primaria bg-cor-primaria/10 p-4">
        <Icon width={24} height={24} />
        <Text className="flex-1 text-center font-mulish-bold text-[16px] text-cor-primaria">
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderStatCard = ({ item }: { item: StatCardData }) => {
    const Icon = item.icon;

    return (
      <TouchableOpacity className="flex-1 pb-[16px]">
        <View
          style={{ backgroundColor: item.bgColor }}
          className="min-h-[56px] flex-row items-center justify-between rounded-2xl bg-[#EDE9FE] p-4">
          <View className="mr-3 flex-1 flex-row items-center gap-[8px]">
            <Text className="font-mulish-semibold text-[14px]" numberOfLines={2}>
              {item.title}
            </Text>
            <Text className="mt-1 font-inter-semibold text-[18px]">{item.value}</Text>
          </View>

          <Icon width={24} height={24} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral-100">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}>
        {/*Header*/}
        <View className="relative flex-row items-center justify-center ">
          <Text className="font-mulish-bold text-[20px]">ImobiFácil</Text>
          <View className="absolute right-4">
            <Ionicons name="notifications-outline" size={24} color="black" />
          </View>
        </View>

        {/*Acesso rápido*/}
        <View className=" pt-[40px]">
          <Text className="pb-[16px] font-mulish-bold text-[20px]">Bem-Vindo, Corretor</Text>
          <FlatList
            data={cardData}
            renderItem={renderCard}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </View>

        {/*Resumo Semanal*/}
        <View className="gap-[16px] ">
          <Text className=" font-mulish-bold text-[18px]">Resumo Semanal</Text>
          <FlatList
            data={statsData}
            renderItem={renderStatCard}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            numColumns={1}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </View>

        {/*Slide animado*/}
        <TextSlider />

        {/*Contratar PRO*/}
        <View className="gap-[16px] pb-[30px] pt-[40px]">
          <View className="flex-row items-center justify-between">
            <Text className="font-mulish-bold text-[18px]">Ver Estatísticas</Text>
            <TouchableOpacity className="flex-row gap-[10px] rounded-lg bg-cor-primaria px-[24px] py-[12px]">
              <AntDesign name="staro" size={24} color="white" />
              <Text className="font-mulish-medium text-[16px] text-white">Contratar Pro</Text>
            </TouchableOpacity>
          </View>

          <Image source={ImagePro} style={{ width: 375, height: 240, borderRadius: 8 }} />
        </View>
      </ScrollView>

      {/*TabBar*/}
      <View className="px-[16px]">
        <TabBar />
      </View>
    </SafeAreaView>
  );
}
