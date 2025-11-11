import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Calendar from './items/Calendar';

export default function Agenda() {
  return (
    <SafeAreaView>
      <View>
        <Calendar />
      </View>
    </SafeAreaView>
  );
}
