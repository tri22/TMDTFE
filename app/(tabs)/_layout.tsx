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
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="Settings" options={{ headerShown: false }} />
                <Stack.Screen name="Setting/AddressSettings" options={{ headerShown: false }} />
                <Stack.Screen name="Setting/MyActivity" options={{ headerShown: false }} />
                <Stack.Screen name="Setting/OrderHistory" options={{ headerShown: false }} />
                <Stack.Screen name="Setting/PaymentSetting" options={{ headerShown: false }} />
                <Stack.Screen name="Setting/About" options={{ headerShown: false }} />
                <Stack.Screen name="Setting/OrderManagement" options={{ headerShown: false }} />
                <Stack.Screen name="Setting/ProfileSetting" options={{ headerShown: false }} />
                {/* Phần login */}
                <Stack.Screen name="MainLogin" options={{ headerShown: false }} />
                <Stack.Screen name="Login/register_form" options={{ headerShown: false }} />
                <Stack.Screen name="Login/account_auth" options={{ headerShown: false }} />
                <Stack.Screen name="Login/login_form" options={{ headerShown: false }} />
                <Stack.Screen name="Login/sms_recovery" options={{ headerShown: false }} />
                <Stack.Screen name="Login/email_recovery" options={{ headerShown: false }} />
                <Stack.Screen name="Login/password_recovery" options={{ headerShown: false }} />
                <Stack.Screen name="Login/new_pass_form" options={{ headerShown: false }} />
                {/* product, product detail */}
                <Stack.Screen name="product" />
                <Stack.Screen name="productDetail" />
            </Stack>
            <StatusBar style="auto" />
        </ThemeProvider>
    );
}
