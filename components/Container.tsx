// TestColors.jsx
import React from 'react';
import { View, Text } from 'react-native';

export const TestColors = () => {
  return (
    <View className="flex-1 bg-white p-4">
      <Text className="mb-4 text-2xl font-bold text-text-primary">Teste das Cores</Text>

      {/* Cores principais */}
      <View className="mb-4">
        <Text className="mb-2 text-lg text-text-primary">Cores Principais</Text>
        <View className="flex-row space-x-2">
          <View className="h-12 w-12 rounded bg-primary" />
          <View className="h-12 w-12 rounded bg-orange" />
        </View>
      </View>

      {/* Cores escuras */}
      <View className="mb-4">
        <Text className="mb-2 text-lg text-text-primary">Cores Escuras</Text>
        <View className="flex-row space-x-2">
          <View className="h-12 w-12 rounded bg-dark-1" />
          <View className="h-12 w-12 rounded bg-dark-3" />
          <View className="h-12 w-12 rounded bg-dark-5" />
        </View>
      </View>

      {/* Cores cinza */}
      <View className="mb-4">
        <Text className="mb-2 text-lg text-text-primary">Cores Cinza</Text>
        <View className="flex-row space-x-2">
          <View className="h-12 w-12 rounded bg-grey-1" />
          <View className="h-12 w-12 rounded bg-grey-3" />
          <View className="h-12 w-12 rounded bg-grey-5" />
        </View>
      </View>
    </View>
  );
};
