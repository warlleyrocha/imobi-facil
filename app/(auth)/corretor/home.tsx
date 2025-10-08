// src/screens/HomeCorretor.tsx
import { FontAwesome } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Href, useRouter } from 'expo-router';
import { FC } from 'react';
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SvgProps } from 'react-native-svg';

import ImagePro from '@/assets/bg.png';
import Calendar from '@/assets/icons-svg/calendar.svg';
import Circle from '@/assets/icons-svg/circle.svg';
import Eyes from '@/assets/icons-svg/eyes.svg';
import HouseAddIcon from '@/assets/icons-svg/house-add.svg';
import HouseAltIcon from '@/assets/icons-svg/house-alt.svg';
import Stats from '@/assets/icons-svg/stats.svg';
import Users from '@/assets/icons-svg/users.svg';
import TextSlider from '@/components/TextSlider';
import TabBar from '~/components/TabBar';

interface CardQuickAccess {
  id: string;
  icon: FC<SvgProps>;
  title: string;
  route: Href;
}

interface StatCardData {
  id: string;
  icon: FC<SvgProps>;
  title: string;
  value: string;
  statistics?: string;
  bgColor: string;
}

const cardData: CardQuickAccess[] = [
  { id: '1', icon: HouseAddIcon, title: 'Cadastrar Imóvel', route: '/corretor/imoveis/new' },
  { id: '2', icon: HouseAltIcon, title: 'Meus Imóveis', route: '/corretor/imoveis/' },
  { id: '3', icon: Calendar, title: 'Cadastrar Cliente', route: '/(auth)/feedback/success/page' }, //substituir pela rota correta
  { id: '4', icon: Users, title: 'Minhas Pastas', route: '/(auth)/feedback/success/page' }, //substituir pela rota correta
];

const statsData: StatCardData[] = [
  { id: '1', icon: Eyes, title: 'Visitas Agendadas', value: '24', bgColor: '#EDE9FE' },
  {
    id: '2',
    icon: Stats,
    title: 'Novos Contatos',
    value: '12',
    statistics: '+11.01%',
    bgColor: '#DAF8E6',
  },
  { id: '3', icon: Circle, title: 'Documentos pendentes', value: '8', bgColor: '#D0F0FD' },
];

const QuickAccessCard: FC<{ item: CardQuickAccess }> = ({ item }) => {
  const router = useRouter();
  const Icon = item.icon;
  return (
    <TouchableOpacity
      className="min-h-[72px] flex-1 flex-row items-center gap-4 rounded-lg border border-cor-primaria bg-cor-primaria/10 p-4"
      onPress={() => router.push(item.route)}>
      <Icon width={24} height={24} />
      <Text className="flex-1 text-center font-mulish-bold text-[16px] text-cor-primaria">
        {item.title}
      </Text>
    </TouchableOpacity>
  );
};

const StatCard: FC<{ item: StatCardData }> = ({ item }) => {
  const Icon = item.icon;
  const isSpecial = item.id === '2';
  const isValueRight = item.id === '3';

  return (
    <TouchableOpacity className="flex-1 pb-[16px]">
      <View
        style={{ backgroundColor: item.bgColor }}
        className="min-h-[56px] flex-row items-center justify-between rounded-2xl p-4">
        <View className="mr-3 flex-1">
          <View className="flex-row items-center gap-2">
            <Text className="font-mulish-semibold text-[14px]" numberOfLines={2}>
              {item.title}
            </Text>
            {!isValueRight && <Text className="font-inter-semibold text-[18px]">{item.value}</Text>}
          </View>
        </View>

        <View className="flex-row items-center gap-2">
          {isSpecial && item.statistics && (
            <Text className="font-inter-medium text-[12px]">{item.statistics}</Text>
          )}
          {isValueRight && <Text className="font-inter-semibold text-[18px]">{item.value}</Text>}
          <Icon width={isSpecial ? 16 : 24} height={isSpecial ? 16 : 24} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

/* ----------------------------- MAIN PAGE ----------------------------- */

export default function HomeCorretor() {
  return (
    <SafeAreaView className="flex-1 bg-neutral-100 pt-[6px]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}>
        {/* Header */}
        <View className="relative top-9 flex-row items-center justify-center ">
          <Text className="font-mulish-bold text-[20px]">ImobiFácil</Text>
          <View className="absolute right-4">
            <Ionicons name="notifications-outline" size={24} color="black" />
          </View>
        </View>

        {/* Acesso rápido */}
        <View className="pb-[10px] pt-[62px]">
          <Text className="pb-[16px] font-mulish-bold text-[20px]">Bem-Vindo, Corretor</Text>
          <FlatList
            data={cardData}
            renderItem={({ item }) => <QuickAccessCard item={item} />}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{ gap: 21, marginBottom: 20 }}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </View>

        {/* Resumo Semanal */}
        <View className="gap-[16px] ">
          <Text className="font-mulish-bold text-[18px]">Resumo Semanal</Text>
          <FlatList
            data={statsData}
            renderItem={({ item }) => <StatCard item={item} />}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            numColumns={1}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </View>

        <TextSlider />

        {/* Contratar PRO */}
        <View className="gap-[16px] pb-[30px] pt-[40px]">
          <View className="flex-row items-center justify-between">
            <Text className="font-mulish-bold text-[18px]">Ver Estatísticas</Text>
            <TouchableOpacity className="flex-row gap-[10px] rounded-lg bg-cor-primaria px-[24px] py-[10px]">
              <FontAwesome name="star-o" size={24} color="white" />
              <Text className="font-mulish-medium text-[16px] text-white">Contratar Pro</Text>
            </TouchableOpacity>
          </View>
          <Image source={ImagePro} />
        </View>
      </ScrollView>

      {/* TabBar */}
      <View
        className="absolute bottom-[47px] left-4 right-4 z-50"
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.15,
          shadowRadius: 20,
          elevation: 10,
        }}>
        <TabBar />
      </View>
    </SafeAreaView>
  );
}
