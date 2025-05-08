import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';


// const CategoryItem: React.FC<TransactionCategoryProps> = ({ amount, label }) => (
//   <View style={styles.categoryItem}>
//     <Text style={styles.categoryText}>{`${label} ${amount}`}</Text>
//   </View>
// );

export const TransactionCategories: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.column}>
        {/* <CategoryItem amount="183.000đ" label="Quần" />
        <CategoryItem amount="47.000đ" label="Áo" /> */}
      </View>
      <View style={styles.column}>
        {/* <CategoryItem amount="92.000đ" label="Giày" />
        <CategoryItem amount="43.000đ" label="Túi" /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    display: 'flex',
    marginTop: 16,
    width: '100%',
    maxWidth: 280,
    flexDirection: 'row',
    gap: 5,
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    gap: 9,
  },
  categoryItem: {
    borderRadius: 18,
    padding: 6,
    alignItems: 'center',
  },
  categoryText: {
    fontFamily: 'Raleway',
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: '500',
    letterSpacing: -0.15,
    textAlign: 'center',
  },
});