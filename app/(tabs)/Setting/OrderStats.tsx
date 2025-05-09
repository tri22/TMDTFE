import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

interface OrderStatProps {
  count: number;
  label: string;
  icon: React.ReactNode;
}

const OrderStatItem: React.FC<OrderStatProps> = ({ count, label, icon }) => (
  <View style={styles.statItem}>
    <View style={styles.statCircle}>
      {icon}
      <Text style={styles.statCount}>{count}</Text>
    </View>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

export const OrderStats: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.mainStat}>
        <OrderStatItem
          count={12}
          label="Đơn đã đặt"
          icon={<MaterialCommunityIcons name="clipboard-list" size={50} color="#2196F3" />}
        />
      </View>
      <View style={styles.subStats}>
        <OrderStatItem
          count={7}
          label="Đã Nhận"
          icon={<MaterialIcons name="check-circle" size={50} color="#4CAF50" />}
        />
        <OrderStatItem
          count={5}
          label="Đang vận chuyển"
          icon={<FontAwesome5 name="shipping-fast" size={50} color="#FF9800" />}
        />
      </View>
    </View>
    
  );
};
const styles = StyleSheet.create({
    container: {
      alignSelf: 'center',
      marginTop: 20,
      width: '100%',
      maxWidth: 285,
      gap: 16,
    },
    mainStat: {
      alignItems: 'center',
    },
    subStats: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      gap: 3,
    },
    statItem: {
      alignItems: 'center',
    },
    statCircle: {
      aspectRatio: 1,
      width: 80,
      alignItems: 'center',
      justifyContent: 'center',
    },
    statCount: {
      fontSize: 21,
      color: '#202020',
      fontWeight: '500',
      position: 'absolute',
      bottom: 10,
    },
    statLabel: {
      marginTop: 20,
      color: '#202020',
      fontSize: 13,
      fontWeight: '700',
      letterSpacing: -0.13,
      textAlign: 'center',
    },
  });
  