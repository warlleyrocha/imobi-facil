import { View, Image, ActivityIndicator, Dimensions } from "react-native";

export default function Splash() {
  const { height } = Dimensions.get("window");

  return (
    <View
      className="flex-1 items-center justify-center bg-white"
      style={{ paddingVertical: height * 0.08 }}
    >
      {/* Logo responsiva */}
      <Image
        source={require("../assets/splash.png")}
        className="w-3/4 max-w-[300px] h-auto"
        resizeMode="contain"
      />

      {/* Indicador de carregamento com margem proporcional */}
      <ActivityIndicator
        size="large"
        color="#000"
        style={{ marginTop: height * 0.05 }}
      />
    </View>
  );
}
