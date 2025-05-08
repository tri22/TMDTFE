import * as React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Header } from './Header';
import { TransactionSummary } from './TransactionSummary';
import { TransactionCategories } from './TransactionCategories';
import { OrderStats } from './OrderStats';
import { ScrollView } from 'react-native-gesture-handler';
import { BottomNavigation } from '../../../components/BottomNavigation';
const MyActivity: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Header />

        <View style={styles.monthTitle}>
          <Text style={styles.monthText}>Tháng 4</Text>
        </View>

        <TransactionSummary />
        <TransactionCategories />
        <OrderStats />

        <View style={styles.historyTitle}>
          <Text style={styles.historyText}>Lịch sử giao dịch</Text>
        </View>
      </View>
      <BottomNavigation></BottomNavigation>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: 480,
    width: '100%',
    paddingTop: 15,
    overflow: 'hidden',
  },
  content: {
    display: 'flex',
    width: '100%',
    paddingHorizontal: 20,
    flexDirection: 'column',
  },
  monthTitle: {
    borderRadius: 18,
    marginTop: 25,
    paddingHorizontal: 70,
    paddingVertical: 9,
  },
  monthText: {
    fontFamily: 'Raleway',
    fontSize: 18,
    color: 'rgb(50, 54, 96)',
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: -0.18,
  },
  historyTitle: {
    borderRadius: 9,
    marginTop: 13,
    paddingHorizontal: 70,
    paddingVertical: 8,
  },
  historyText: {
    fontFamily: 'Nunito Sans',
    fontSize: 16,
    color: 'rgb(243, 243, 243)',
    fontWeight: '300',
    textAlign: 'center',
    lineHeight: 32,
  },
  bottomImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 4.46,
    marginTop: 20,
  },
});

export default MyActivity;