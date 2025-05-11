
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { BottomNavigation } from '../../../components/BottomNavigation';
import { AddressForm } from './AddressForm';


const AddressSettings = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.formWrapper}>
        <AddressForm></AddressForm>
      </ScrollView>
      <BottomNavigation />
    </View>
  );
};

export default AddressSettings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  formWrapper: {
    flexGrow: 1,
    padding: 16,
  },
});
