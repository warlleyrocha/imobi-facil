import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type ImageData = {
  id: string;
  image: any;
  title: string;
  description: string;
};

type ImageCarouselProps = Readonly<{
  images: ImageData[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  flatListRef: React.RefObject<FlatList<any> | null>;
  isScrollingProgrammatically: React.RefObject<boolean>;
}>;

const { width: screenWidth } = Dimensions.get('window');

export default function ImageSlide({
  images,
  currentIndex,
  setCurrentIndex,
  flatListRef,
  isScrollingProgrammatically,
}: ImageCarouselProps) {
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / screenWidth);

    if (!isScrollingProgrammatically.current && index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  const handleMomentumScrollEnd = () => {
    isScrollingProgrammatically.current = false;
  };

  const handleSkip = () => {
    const lastIndex = images.length - 1;
    isScrollingProgrammatically.current = true;
    setCurrentIndex(lastIndex);

    setTimeout(() => {
      flatListRef.current?.scrollToIndex({
        index: lastIndex,
        animated: true,
      });
    }, 50);

    setTimeout(() => {
      isScrollingProgrammatically.current = false;
    }, 500);
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
              onPress={handleSkip}>
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
        onMomentumScrollEnd={handleMomentumScrollEnd} // 🔹 reseta flag depois da rolagem
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
      />

      <View className="mt-4 flex-row items-center justify-center gap-[5px]">
        {images.map((item, index) => (
          <View
            key={item.id}
            className={`h-1 rounded-full ${
              index === currentIndex ? 'w-[50px] bg-cor-primaria' : 'w-[10px] bg-cor-primaria'
            }`}
          />
        ))}
      </View>
    </View>
  );
}
