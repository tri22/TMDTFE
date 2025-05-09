import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';

export const TransactionSummary: React.FC = () => {
  return (
    <View style={styles.container}>
      <AntDesign name="arrowleft" size={30} color="#333" style={styles.arrowIcon} />
      <View style={styles.circularContainer}>
        <View style={styles.outerCircle}>
          <View style={styles.innerCircle}>
            <View style={styles.centerCircle}>
              <FontAwesome5 name="money-bill-wave" size={40} color="#4CAF50" />
              <Text style={styles.label}>Tổng</Text>
              <Text style={styles.amount}>1.350.000vnđ</Text>
            </View>
          </View>
        </View>
      </View>
      <AntDesign name="arrowright" size={30} color="#333" style={styles.arrowIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
  },
  arrowIcon: {
    alignSelf: 'center',
  },
  circularContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerCircle: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#E0F7FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#B2EBF2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  label: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: -0.16,
    marginTop: 8,
  },
  amount: {
    color: '#202020',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.21,
    marginTop: 2,
  },
});
