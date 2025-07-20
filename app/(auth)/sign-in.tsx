import { View, Text, Image, TouchableOpacity } from "react-native";

export default function SignIn() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
        <View className="flex-1 items-center justify-center">
            <Image
            source={require("../../assets/splash.png")}/>
            <Text>
                Bem vindo ao ImobiFácil
            </Text>
        </View>

        <View className="flex-1 items-center justify-center">
            <Text>
                Conheça nosso APP
            </Text>

            <Text>
            Faça login de forma rápida e segura usando sua conta Google. Assim você acessa o ImobiFácil sem precisar lembrar de senhas.
            </Text>

            <TouchableOpacity className="bg-[#E6E6E6] w-[345px] h-[50px] rounded-[5px] items-center justify-center">
              Continue com o Google
            </TouchableOpacity>
        </View>
    </View>
  );
}