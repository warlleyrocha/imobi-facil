import { View, Text, Image } from "react-native";
import { Container } from "~/components/Container";

export default function Corretor() {
  const setaEsquerda = require("~/assets/arrow-left.png");
  
  return (
    <View>
      <Container>
        <View className="items-center flex-1 justify-center">
          <View className="flex-row items-center gap-12 justify-between">
            <Image source={setaEsquerda} style={{ width: 24, height: 24 }} className="text-left" />
            <Text className="text-xl font-bold text-center">Cadastro do Corretor</Text>
          </View>
        </View>
      </Container>
    </View>
  );
}