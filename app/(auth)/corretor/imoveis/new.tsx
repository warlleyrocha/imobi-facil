import { Link } from 'expo-router';
import { View, Text } from 'react-native';
export default function FormImovel() {
  return (
    <View>
      <Text>Novo Imovel Page</Text>

      {/* Link temporário para success page */}
      <Link href="/(auth)/corretor/imoveis/addSuccess">
        <Text className='text-blue-600'>Go to Success Page</Text>
      </Link>
    </View>
  );
}
