import { Slot } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import TabBar from '@/components/TabBar';

export default function TabsLayout() {
  return (
    <View style={styles.container}>
      <Slot />
      <View style={styles.tabBarContainer}>
        <TabBar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBarContainer: {
    position: 'absolute',
    bottom: 40, // distância do bottom
    left: 16, // margem lateral
    right: 16, // margem lateral
  },
});
