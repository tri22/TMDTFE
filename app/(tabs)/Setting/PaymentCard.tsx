import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const PaymentCard: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Image
          source={{
            uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/abf2eeb539569e2b12e272f8a360c9da41e7833b?placeholderIfAbsent=true&apiKey=ad37ee268092407f8686910c5bdd2914',
          }}
          style={styles.cardLogo}
          resizeMode="contain"
        />
        <Text style={styles.cardNumber}>**** **** ****</Text>
        <Text style={styles.cardName}>Amanda Morgan</Text>
      </View>
      <View style={styles.rightSection}>
        <Image
          source={{
            uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/34b8298edc2dffb2d90e858b67d94018c9710c9d?placeholderIfAbsent=true&apiKey=ad37ee268092407f8686910c5bdd2914',
          }}
          style={styles.cardType}
          resizeMode="contain"
        />
        <Text style={styles.cardCode}>1579</Text>
        <Text style={styles.cardDate}>12/22</Text>
      </View>
    </View>
  );
};
export default PaymentCard;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 20,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 36,
    backgroundColor: '#EFF6FF', // tương đương bg-blue-50
    borderRadius: 12,
    alignItems: 'flex-start',
  },
  leftSection: {
    flex: 1,
  },
  cardLogo: {
    width: 56,
    aspectRatio: 1.6,
  },
  cardNumber: {
    marginTop: 36,
    fontSize: 12,
    letterSpacing: 7.07,
    fontWeight: '600',
    color: '#262626',
  },
  cardName: {
    marginTop: 10,
    fontSize: 12,
    letterSpacing: 1.5,
    fontWeight: '600',
    color: '#262626',
    textTransform: 'uppercase',
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  cardType: {
    width: 35,
    aspectRatio: 1,
  },
  cardCode: {
    marginTop: 32,
    fontSize: 12,
    letterSpacing: 1.5,
    fontWeight: '600',
    color: '#262626',
  },
  cardDate: {
    marginTop: 10,
    fontSize: 12,
    letterSpacing: 1.5,
    fontWeight: '600',
    color: '#262626',
    textTransform: 'uppercase',
    textAlign: 'right',
  },
});
