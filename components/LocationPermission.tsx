import { View, Text, TouchableOpacity, Modal, Alert, Image, Platform } from 'react-native';
import { useState } from 'react';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import LocationSVG from './Icons/Location';

interface LocationPermissionModalProps {
  readonly visible: boolean;
  readonly onClose: () => void;
  readonly redirectPath: string;
}

export default function LocationPermissionModal({
  visible,
  onClose,
  redirectPath,
}: LocationPermissionModalProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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

  async function handleAllowWhileUsingApp() {
    setLoading(true);
    try {
      if (Platform.OS === 'web') {
        // Web: usa navigator.geolocation
        const location = await getLocationWeb();
        console.log('Localização exata (web):', location);
      } else {
        // Mobile: usa expo-location
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          const location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Highest,
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
      onClose();
      router.push(redirectPath as any);
    }
  }

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
            accuracy: Location.Accuracy.Balanced,
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
      router.push(redirectPath as any);
    }
  }

  function handleDeny() {
    onClose();
    router.push(redirectPath as any);
  }

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View
        className="flex-1 items-center justify-center"
        style={{
          backgroundColor: 'rgba(17, 25, 40, 0.5)', // mesma cor + opacidade
        }}>
        <View className="h-auto w-[306px] items-center gap-5 rounded-[26px] bg-white p-5">
          <LocationSVG />

          <Text className="text-center font-mulish text-base text-black">
            Permitir que o ImobiFácil acesse a localização desse dispositivo?{' '}
          </Text>

          <View className="flex-row gap-[30px]">
            {/* Primeiro item */}
            <View className="items-center gap-3">
              <Image
                className=""
                source={require('../assets/location-1.png')}
                resizeMode="contain"
              />
              <Text className="font-mulish">Exata</Text>
            </View>

            {/* Segundo item */}
            <View className="items-center gap-3">
              <Image
                className=""
                source={require('../assets/location-2.png')}
                resizeMode="contain"
              />
              <Text className="font-mulish">Aproximada</Text>
            </View>
          </View>

          {/*Botões */}
          <View className="w-full gap-1">
            <TouchableOpacity
              className="h-[50px] items-center justify-center rounded-t-2xl bg-[#D2E4FC] px-4 py-2"
              onPress={handleAllowWhileUsingApp}
              disabled={loading}>
              <Text className="text-center font-mulish-bold text-xs text-[#171C23]">
                {loading ? 'Carregando...' : 'Durante o uso do app'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="h-[50px] justify-center bg-[#D2E4FC] px-4 py-2"
              onPress={handleAllowOnce}
              disabled={loading}>
              <Text className="text-center font-mulish-bold text-xs text-[#171C23]">
                Apenas dessa vez
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="h-[50px] justify-center rounded-b-2xl bg-[#D2E4FC] px-4 py-2"
              onPress={handleDeny}
              disabled={loading}>
              <Text className="text-center font-mulish-bold text-xs text-[#171C23]">
                Não permitir
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
