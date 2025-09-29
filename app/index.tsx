// app/index.tsx
import { Redirect } from "expo-router";

import { useAuth } from "../contexts/authContext";

export default function Index() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href="/sign-in" />;
  }

  return <Redirect href="/(auth)/select-profile" />;
}
