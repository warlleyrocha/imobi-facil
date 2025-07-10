// app/index.tsx
import { Text, View, Pressable, ScrollView, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useRef } from 'react';

const { width: screenWidth } = Dimensions.get('window');

export default function Welcome() {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  // Dados das imagens do carrossel
  const carouselImages = [
    {
      id: 1,
      source: 'https://picsum.photos/400/250?random=1',
      title: 'Explore novos recursos',
      description: 'Descubra funcionalidades incríveis',
    },
    {
      id: 2,
      source: 'https://picsum.photos/400/250?random=2',
      title: 'Interface intuitiva',
      description: 'Design pensado para sua experiência',
    },
    {
      id: 3,
      source: 'https://picsum.photos/400/250?random=3',
      title: 'Conecte-se facilmente',
      description: 'Mantenha-se sempre conectado',
    },
  ];

  // Função para detectar mudança de slide
  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const viewSize = event.nativeEvent.layoutMeasurement;
    const pageNum = Math.floor(contentOffset.x / viewSize.width);
    setActiveSlide(pageNum);
  };

  // Função para navegar para slide específico
  const goToSlide = (slideIndex: number) => {
    scrollViewRef.current?.scrollTo({
      x: slideIndex * screenWidth,
      animated: true,
    });
  };

  return (
    <View className="flex-1 bg-white">
      {/* Carrossel de Imagens */}
      <View className="mb-8 mt-12">
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScroll}
          className="mb-4">
          {carouselImages.map((item) => (
            <View key={item.id} style={{ width: screenWidth }} className="px-6">
              <View className="overflow-hidden rounded-2xl bg-gray-100 shadow-lg">
                <Image source={{ uri: item.source }} className="h-48 w-full" resizeMode="cover" />
                <View className="p-4">
                  <Text className="mb-2 text-xl font-bold text-gray-800">{item.title}</Text>
                  <Text className="text-gray-600">{item.description}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Indicadores de Slide */}
        <View className="flex-row items-center justify-center space-x-2">
          {carouselImages.map((_, index) => (
            <Pressable
              key={index}
              onPress={() => goToSlide(index)}
              className={`h-2 rounded-full ${
                activeSlide === index ? 'w-6 bg-blue-600' : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </View>
      </View>

      {/* Conteúdo Principal */}
      <View className="flex-1 items-center justify-center px-6">
        <Text className="mb-6 text-center text-3xl font-bold">Bem-vindo ao nosso App!</Text>

        <Text className="mb-8 text-center text-base text-gray-600">
          Explore todas as funcionalidades e comece sua jornada conosco
        </Text>

        <Pressable
          onPress={() => router.push('/login')}
          className="mb-4 w-full rounded-xl bg-blue-600 py-3 shadow-sm">
          <Text className="text-center font-semibold text-white">Login</Text>
        </Pressable>

        <Pressable
          onPress={() => router.push('/register')}
          className="w-full rounded-xl bg-gray-200 py-3">
          <Text className="text-center font-semibold">Cadastrar</Text>
        </Pressable>
      </View>
    </View>
  );
}
