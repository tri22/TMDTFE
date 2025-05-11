import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="Settings" options={{ headerShown: false }} />
        <Stack.Screen name="Setting/AddressSettings" options={{ headerShown: false }} />
        <Stack.Screen name="Setting/MyActivity" options={{ headerShown: false }} />
        <Stack.Screen name="Setting/OrderHistory" options={{ headerShown: false }} />
        <Stack.Screen name="Setting/PaymentSetting" options={{ headerShown: false }} />
        <Stack.Screen name="Setting/About" options={{ headerShown: false }} />
        <Stack.Screen name="Setting/OrderManagement" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
