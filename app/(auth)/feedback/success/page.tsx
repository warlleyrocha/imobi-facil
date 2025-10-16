import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { CustomSuccessIcon } from '~/components/icons/CustomSuccessIcon';

export default function Success() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(auth)/select-profile');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View
  className="flex-1 items-center justify-center px-[16px] py-[10px]"
  style={{ backgroundColor: '#F1F2F6' }} 
>
  {/* Quadrado interno */}
  <View
    className="items-center justify-center gap-[12px] rounded-[10px]"
    style={{
      backgroundColor: '#F9FAFB', // 
      borderWidth: 2,
      borderColor: '#DFE4EA',
      width: "100%", 
      height: "55%",
      paddingVertical: 60,
      shadowColor: '#000',
      shadowOpacity: 0.15,
      shadowRadius: 10,
      elevation: 6,
    }}
  >

        {/* Ícone de fechar no canto superior direito */}
        <TouchableOpacity
          className="absolute right-[12px] top-[12px] z-10"
          onPress={() => router.replace('/(auth)/select-profile')}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>

        <View className="relative">
          <View className="inset-0 items-center justify-center">
            <View className="rounded-full bg-[#ACEFC8] p-3 shadow-lg">
              <CustomSuccessIcon width={54} height={54} />
            </View>
          </View>
        </View>

        <Text className="px-[40px] text-center text-[20px] font-bold text-[#262626]">
          Login realizado com Sucesso!
        </Text>
        <Text className="px-[100px] text-center text-[14px] text-[#606268]">
          Redirecionando para completar seu perfil
        </Text>
      </View>
    </View>
  );
}
