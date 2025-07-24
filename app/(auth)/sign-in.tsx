import { View, Text, Image, TouchableOpacity, ImageBackground } from "react-native";

export default function SignIn() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
        <ImageBackground 
        source={require("../../assets/background-login.jpg")}
        className="flex-1 items-center justify-center w-[375px] h-[410px]"
        >
            <Image
            source={require("../../assets/splash.png")}/>
            <Text className="text-[24px] font-bold text-white ">
                Bem vindo ao ImobiFácil
            </Text>
        </ImageBackground>

         {/* Container para o conteúdo do login */}
        <View className="flex-1 px-[16px] items-center justify-center rounded-t-[30px] -mt-[10px] z-10 bg-white gap-[10px]">
            <Text className="text-[20px] text-[#111928] font-bold">
                Conheça nosso APP
            </Text>

            <Text className="text-[14px] text-[#111928] text-center">
            Faça login de forma rápida e segura usando sua conta Google. Assim você acessa o ImobiFácil sem precisar lembrar de senhas.
            </Text>

            <TouchableOpacity className="bg-[#E6E6E6] w-[345px] h-[50px] rounded-[5px] items-center justify-center">
              Continue com o Google
            </TouchableOpacity>
        </View>
    </View>
  );
}