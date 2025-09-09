// App.tsx
import { ExpoRoot } from 'expo-router';

export default function App() {
  const ctx = require.context('./app');
  return <ExpoRoot context={ctx} />;
}
