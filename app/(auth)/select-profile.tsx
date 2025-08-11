// app/(auth)/select-profile.tsx
import { View, Text, ImageBackground, Dimensions, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import LocationPermissionModal from '../../components/LocationPermission';

const { width } = Dimensions.get('window');
const IMAGE_RATIO = 368 / 375;

export default function SelectProfile() {
  const router = useRouter();
  const [showPermissionModal, setShowPermissionModal] = useState(false);

  function handleCorretorClick() {
    setShowPermissionModal(true);
  }

  function handleUsuarioClick() {
    router.push('/(auth)/usuario');
  }

  return (
    <View className="flex-1 bg-white">
      <ImageBackground
        source={require('../../assets/select-profile.png')}
        style={{ width: width, height: width * IMAGE_RATIO }}
        resizeMode="contain"
        imageStyle={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
        <View className="flex-1 items-center justify-center">
          <Image
            className="mb-6 h-[73px] w-[73px]"
            source={require('../../assets/splash.png')}
            resizeMode="contain"
          />
        </View>
      </ImageBackground>

      <View className="items-center justify-center gap-6 px-4 pt-[50px]">
        <Text className="font-inter-semibold text-[26px]">Selecione seu perfil</Text>
        <Text className="text-center font-inter-light text-base">
          Ao selecionar o seu perfil, você poderá visualizar as principais funcionalidades que você
          terá acesso ao concluir o cadastro.
        </Text>
      </View>

      <View className="flex-1 gap-[15px] px-4 pt-[18vh]">
        <TouchableOpacity
          className="h-14 flex-row items-center justify-center gap-2 rounded-lg border border-cor-primaria bg-cor-primaria/5 px-6"
          onPress={handleCorretorClick}>
          <Text className="text-center font-mulish-medium text-lg text-cor-primaria">Corretor</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-primary/5 h-14 flex-row items-center justify-center gap-2 rounded-lg border border-cor-primaria bg-cor-primaria/5 px-6"
          onPress={handleUsuarioClick}>
          <Text className="text-center font-mulish-medium text-lg text-cor-primaria">Usuário</Text>
        </TouchableOpacity>
      </View>

      {/* Modal de permissão */}
      <LocationPermissionModal
        visible={showPermissionModal}
        onClose={() => setShowPermissionModal(false)}
        redirectPath="/(auth)/corretor"
      />
    </View>
  );
}
