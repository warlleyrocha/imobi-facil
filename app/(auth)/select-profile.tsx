import { View, Text, ImageBackground, Dimensions, Image, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');
const IMAGE_RATIO = 368 / 375; // altura / largura da imagem

export default function SelectProfile() {
  return (
    <View className="flex-1 bg-white">
      <ImageBackground
        source={require('../../assets/select-profile.png')}
        style={{ width: width, height: width * IMAGE_RATIO }}
        resizeMode="contain"
        imageStyle={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }} // se quiser reforçar bordas arredondadas no ImageBackground
      >
        <View className="flex-1 items-center justify-center">
          <Image
            className="mb-6 h-[73px] w-[73px]"
            source={require('../../assets/splash.png')}
            resizeMode="contain"
          />
        </View>
      </ImageBackground>

      {/* restante do layout */}
      <View className="items-center justify-center gap-6 px-4 pt-[50px]">
        <Text className="font-inter-semibold text-[26px]">Selecione seu perfil</Text>

        <Text className="text-center font-inter-light text-base">
          Ao selecione o seu perfil, você poderá visualizar as principais funcionalidades que você
          terá acesso ao concluir o cadastro.
        </Text>
      </View>

      <View className="flex-1 gap-[15px] px-4 pt-[18vh]">
        <TouchableOpacity
          className="h-14 flex-row items-center justify-center gap-2 rounded-lg border border-cor-primaria bg-cor-primaria/5 px-6"
          onPress={() => console.log('Corretor Selected')}>
          <Text className="text-center font-mulish-medium text-lg text-cor-primaria">Corretor</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-primary/5 h-14 flex-row items-center justify-center gap-2 rounded-lg border border-cor-primaria bg-cor-primaria/5 px-6"
          onPress={() => console.log('Usuario Selected')}>
          <Text className="text-center font-mulish-medium text-lg text-cor-primaria">Usuário</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
