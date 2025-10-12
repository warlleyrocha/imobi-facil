import { Slot, usePathname } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import TabBar from '@/components/ui/TabBar';

export default function TabsLayout() {
  const pathname = usePathname();

  // Oculta a TabBar em rotas internas
  const hideTabBar =
    pathname.includes('/imoveis/formProperty') ||
    pathname.includes('/imoveis/addSuccess') ||
    (pathname.includes('/imoveis/') && pathname.match(/\/imoveis\/\d+/)); // ex: /imoveis/123

  return (
    <View style={styles.container}>
      <Slot />
      {!hideTabBar && (
        <View style={styles.tabBarContainer}>
          <TabBar />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBarContainer: {
    position: 'absolute',
    bottom: 40,
    left: 16,
    right: 16,
  },
});
