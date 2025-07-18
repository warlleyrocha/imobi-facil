import { Slot, useRouter } from "expo-router";
import 'global.css'; // Importando o CSS global
import { useEffect, useState } from "react";
import Splash from "./splash"; // Importando sua splash customizada

export default function RootLayout() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Aqui você pode checar SecureStore ou AsyncStorage futuramente
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula carregamento
      } finally {
        setLoading(false);
          router.replace("/(auth)/sign-in");
      }
    };

    checkAuth();
  }, []);

  // Enquanto carrega, mostra splash customizada
  if (loading) return <Splash />;

  return <Slot />;
}
