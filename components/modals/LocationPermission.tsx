import * as Location from 'expo-location'; // Biblioteca para lidar com localização em apps Expo
import { useRouter } from 'expo-router'; // Navegação programática
import { useState } from 'react';
import { Alert, Image, Modal, Platform, Text, TouchableOpacity, View } from 'react-native';

import LocationSVG from '~/components/icons/Location'; // Ícone SVG customizado para localização

// Props esperadas pelo modal de permissão de localização
interface LocationPermissionModalProps {
  readonly visible: boolean; // Controla se o modal está visível
  readonly onClose: () => void; // Função chamada para fechar o modal
  readonly redirectPath: string; // Caminho para redirecionar após decisão
}

export default function LocationPermissionModal({
  visible,
  onClose,
  redirectPath,
}: LocationPermissionModalProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Função para obter localização no navegador web usando API nativa do browser
  async function getLocationWeb() {
    return new Promise<GeolocationPosition>((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocalização não suportada pelo navegador.'));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(new Error(error.message || 'Erro ao obter localização')),
        { enableHighAccuracy: true, timeout: 10000 }
      );
    });
  }

  // Lida com permissão "Durante o uso do app" — solicita permissão e pega localização com alta precisão
  async function handleAllowWhileUsingApp() {
    setLoading(true);
    try {
      if (Platform.OS === 'web') {
        // No web, usa a função getLocationWeb
        const location = await getLocationWeb();
        console.log('Localização exata (web):', location);
      } else {
        // No mobile, solicita permissão de localização em primeiro plano
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          const location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Highest, // máxima precisão
          });
          console.log('Localização exata (mobile):', location);
        } else {
          Alert.alert('Atenção', 'Permissão negada para uso durante o app.');
        }
      }
    } catch (error: any) {
      console.error(error);
      if (error?.code === 2) {
        Alert.alert(
          'Localização indisponível',
          'Não foi possível obter sua localização no navegador.'
        );
      } else {
        Alert.alert('Erro', error?.message || 'Não foi possível obter a permissão.');
      }
    } finally {
      setLoading(false);
      onClose(); // Fecha o modal
      router.replace(redirectPath as any); // Redireciona para a rota indicada
    }
  }

  // Lida com permissão "Apenas dessa vez" — similar a anterior, porém com precisão equilibrada
  async function handleAllowOnce() {
    setLoading(true);
    try {
      if (Platform.OS === 'web') {
        const location = await getLocationWeb();
        console.log('Localização temporária (web):', location);
      } else {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          const location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced, // precisão balanceada
          });
          console.log('Localização temporária (mobile):', location);
        } else {
          Alert.alert('Atenção', 'Permissão negada.');
        }
      }
    } catch (error: any) {
      console.error(error);
      if (error?.code === 2) {
        Alert.alert(
          'Localização indisponível',
          'Não foi possível obter sua localização no navegador.'
        );
      } else {
        Alert.alert('Erro', error?.message || 'Não foi possível obter a localização uma vez.');
      }
    } finally {
      setLoading(false);
      onClose();
      router.replace(redirectPath as any);
    }
  }

  // Caso o usuário negue a permissão
  function handleDeny() {
    onClose();
    router.replace(redirectPath as any);
  }

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View className="flex-1 items-center justify-end bg-dark/50 pb-[52px]">
        <View className="z-10 h-auto w-[306px] items-center gap-5 rounded-[26px] bg-white p-5">
          <LocationSVG /> {/* Ícone de localização */}
          <Text className="text-center font-mulish text-base text-black">
            Permitir que o ImobiFácil acesse a localização desse dispositivo?
          </Text>
          {/* Explicação visual das opções de localização */}
          <View className="flex-row gap-[30px]">
            <View className="items-center gap-3">
              <Image source={require('@/assets/location-1.png')} resizeMode="contain" />
              <Text className="font-mulish">Exata</Text>
            </View>

            <View className="items-center gap-3">
              <Image source={require('@/assets/location-2.png')} resizeMode="contain" />
              <Text className="font-mulish">Aproximada</Text>
            </View>
          </View>
          {/* Botões de ação */}
          <View className="w-full gap-1">
            <TouchableOpacity
              className="h-[50px] items-center justify-center rounded-t-2xl bg-[#D2E4FC] px-4 py-2"
              onPress={handleAllowWhileUsingApp}
              disabled={loading}>
              <Text className="text-center font-mulish-bold text-[12px] leading-[16px] text-[#171C23]">
                {loading ? 'Carregando...' : 'Durante o uso do app'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="h-[50px] justify-center bg-[#D2E4FC] px-4 py-2"
              onPress={handleAllowOnce}
              disabled={loading}>
              <Text className="text-center font-mulish-bold text-[12px] leading-[16px] text-[#171C23]">
                Apenas dessa vez
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="h-[50px] justify-center rounded-b-2xl bg-[#D2E4FC] px-4 py-2"
              onPress={handleDeny}
              disabled={loading}>
              <Text className="text-center font-mulish-bold text-[12px] leading-[16px] text-[#171C23]">
                Não permitir
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
