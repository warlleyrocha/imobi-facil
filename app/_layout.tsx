import { Slot, useRouter } from "expo-router";
import 'global.css'; // Importando o CSS global
import { useEffect, useState } from "react";
import Splash from "./splash"; // Importando sua splash customizada

export default function RootLayout() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  //const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);
      
      // Só navega uma vez após o loading
      router.push("/(auth)/sign-in");
    };

    checkAuth();
  }, []);

  // Enquanto carrega, mostra splash customizada
  if (loading) return <Splash />;

  return <Slot />;
}
