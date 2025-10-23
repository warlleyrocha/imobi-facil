import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Calendar from '@/components/layouts/Calendar';

export default function Agenda() {
  return (
    <SafeAreaView>
      <View>
        <Calendar />
      </View>
    </SafeAreaView>
  );
}
