import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const TextSlider = () => {
  const translateX = useRef(new Animated.Value(screenWidth)).current;

  useEffect(() => {
    const startAnimation = () => {
      translateX.setValue(screenWidth); // começa fora da tela à direita

      Animated.timing(translateX, {
        toValue: -screenWidth, // para assim que sair da tela
        duration: 8000, // 🔥 8 segundos para cruzar
        useNativeDriver: true,
      }).start(startAnimation); // 🔥 reinicia instantaneamente
    };

    startAnimation();
  }, [translateX]);

  return (
    <View className="-mx-4 overflow-hidden bg-[#F0F4FA]/50 px-4 py-3">
      <Animated.View
        style={{
          transform: [{ translateX }],
        }}>
        <Text
          className="text-center font-mulish-semibold text-[14px] text-black"
          numberOfLines={1}
          ellipsizeMode="clip">
          💡 Cadastros com fotos de qualidade recebem 3x mais cliques
        </Text>
      </Animated.View>
    </View>
  );
};

export default TextSlider;
