import { ScrollView, StyleSheet } from 'react-native';

import { BottomNavigation } from '../../components/BottomNavigation';
export default function HomeScreen() {
  return (
    <ScrollView>
      
      <BottomNavigation />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
