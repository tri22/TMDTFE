import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';  // Import AntDesign icon set

export const AddCardBtn: React.FC = () => {
  return (
    <TouchableOpacity style={styles.button}>
      <AntDesign name="pluscircleo" size={50} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 50,
    backgroundColor: '#374151', // Slate 700 color
    borderRadius: 20,
  },
});
