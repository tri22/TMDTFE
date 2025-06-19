import Home from '@/app/(tabs)/home';
import Product from '@/app/(tabs)/product';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Product" component={Product} />
    </Stack.Navigator>
  );
}
