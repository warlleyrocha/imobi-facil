// Hook para gerenciar estado local
import { useRouter } from 'expo-router';
// Importa componentes básicos do React Native para estrutura, imagem, toque, etc.
import { useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// Hook para navegação programática com Expo Router
import LocationPermissionModal from '../../components/LocationPermission';
// Componente modal customizado para solicitar permissão de localização

// Obtém a largura da tela do dispositivo
const { width } = Dimensions.get('window');

// Constante para manter proporção da imagem (altura/largura)
const IMAGE_RATIO = 368 / 375;

// Define a largura da imagem dependendo da plataforma (limita no web para 375px)
const MAX_WEB_WIDTH = 375;
const imageWidth = Platform.OS === 'web' ? Math.min(width, MAX_WEB_WIDTH) : width;

export default function SelectProfile() {
  const router = useRouter(); // Hook para navegação
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  // Estado para controlar a visibilidade do modal de permissão de localização

  // Função chamada ao clicar no botão "Corretor"
  // Mostra o modal de permissão de localização
  function handleCorretorClick() {
    setShowPermissionModal(true);
  }

  // Função chamada ao clicar no botão "Usuário"
  // Navega direto para a rota do usuário
  function handleUsuarioClick() {
    router.push('/(auth)/usuario');
  }

  return (
    <View className="flex-1 bg-white">
      {/* Wrapper que ajusta o alinhamento horizontal: centraliza na web, alinha à esquerda no mobile */}
      <View
        style={{
          width: '100%',
          alignItems: Platform.OS === 'web' ? 'center' : 'flex-start',
        }}>
        {/* ImageBackground com a imagem de seleção de perfil */}
        <ImageBackground
          source={require('../../assets/select-profile.png')}
          style={{ top: -6, width: imageWidth, height: imageWidth * IMAGE_RATIO }} // Mantém proporção da imagem
          resizeMode="contain" // Ajusta a imagem para caber dentro do espaço disponível, sem cortar
          imageStyle={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}
          // Bordas arredondadas somente na parte inferior da imagem
        >
          {/* Conteúdo dentro da ImageBackground, centralizado */}
          <View className="flex-1 items-center justify-center">
            {/* Imagem menor (logo ou splash) dentro do background */}
            <Image
              className="mb-6 h-[73px] w-[73px]"
              source={require('../../assets/splash.png')}
              resizeMode="contain"
            />
          </View>
        </ImageBackground>
      </View>

      {/* Texto de instrução e título centralizados */}
      <View className="mt-[34px] items-center justify-center gap-[24px] px-4">
        <Text className="font-inter-semibold text-[25px] text-dark">Selecione seu perfil</Text>
        <Text className="text-center font-inter-light text-[14px] leading-[18.2px] text-dark-5">
          Ao selecionar o seu perfil, você poderá visualizar as principais funcionalidades que você
          terá acesso ao concluir o cadastro.
        </Text>
      </View>

      {/* Área dos botões com espaçamento e padding */}
      <View className="flex-1 gap-[15px] px-4 pt-[15vh]">
        {/* Botão "Corretor" com borda e background leve, que ao ser clicado abre o modal de permissão */}
        <TouchableOpacity
          className="h-14 flex-row items-center justify-center gap-2 rounded-lg border border-cor-primaria bg-cor-primaria/5 px-6"
          onPress={handleCorretorClick}>
          <Text className="text-center font-mulish-medium text-lg text-cor-primaria">Corretor</Text>
        </TouchableOpacity>

        {/* Botão "Usuário" similar, mas que navega direto para rota do usuário */}
        <TouchableOpacity
          className="bg-primary/5 h-14 flex-row items-center justify-center gap-2 rounded-lg border border-cor-primaria bg-cor-primaria/5 px-6"
          onPress={handleUsuarioClick}>
          <Text className="text-center font-mulish-medium text-lg text-cor-primaria">Usuário</Text>
        </TouchableOpacity>
      </View>

      {/* Modal de permissão de localização.
          Controla a visibilidade pelo estado showPermissionModal,
          permite fechar o modal e redireciona para a rota corretor após permissão */}
      <LocationPermissionModal
        visible={showPermissionModal}
        onClose={() => setShowPermissionModal(false)}
        redirectPath="/(auth)/corretor"
      />
    </View>
  );
}
