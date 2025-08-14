import React, { useRef, useState } from 'react';
import {
  FlatList,
  Image,
  Dimensions,
  View,
  Text,
  NativeScrollEvent,
  NativeSyntheticEvent,
  TouchableOpacity,
} from 'react-native';

type ImageData = {
  id: string; // Adicionando id para cada imagem
  image: any; // require() de imagem local
  title: string;
  description: string;
};

type ImageCarouselProps = Readonly<{
  images: ImageData[];
}>;

const { width: screenWidth } = Dimensions.get('window');

export default function ImageSlide({ images }: ImageCarouselProps) {
  const flatListRef = useRef<FlatList<any>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / screenWidth);
    setCurrentIndex(index);
  };

  return (
    <View className="w-full gap-4">
      <FlatList
        ref={flatListRef}
        data={images}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ width: screenWidth }} className="items-center justify-center">
            <TouchableOpacity
              className="absolute right-8 top-5 z-10 rounded-full border-[1.5px] border-[#FAFAFA] px-3 py-1 md:right-10 md:top-10  md:px-4 md:py-2"
              style={{
                backgroundColor: 'rgba(162, 162, 162, 0.20)',
                shadowColor: '#000000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 2,
                elevation: 4, // Para Android
              }}
              onPress={() => flatListRef.current?.scrollToIndex({ index: 5 })}>
              <Text className="font-mulish-bold text-[12px] font-medium leading-5 text-[#FAFAFA] md:text-base">
                Pular
              </Text>
            </TouchableOpacity>
            <Image
              source={item.image}
              className="h-[368px] w-[343px] sm:h-[368px] sm:w-[343px] md:h-[408px] md:w-[380px] lg:h-[450px] lg:w-[420px] xl:h-[483px] xl:w-[450px]"
              resizeMode="contain"
            />

            <Text className="pb-[15px] pt-[50px] text-center font-inter-semibold text-2xl text-[#111928] md:text-4xl">
              {item.title}
            </Text>
            <Text className="px-4 text-center font-inter-light text-sm text-[#6B7280] md:text-lg">
              {item.description}
            </Text>
          </View>
        )}
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
      />

      {/* Indicador de pontos */}
      <View className="mt-4 flex-row items-center justify-center gap-[5px]">
        {images.map((item, index) => (
          <View
            key={item.id}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'w-[50px] bg-cor-primaria' : 'w-[10px] bg-cor-primaria'
            }`}
          />
        ))}
      </View>
    </View>
  );
}
