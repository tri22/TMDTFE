import creditCardApi, { CardData } from '@/api/creditCardApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface CardFormModalProps {
  visible: boolean;
  onClose: () => void;
  handleSaveSuccess: () => void;
  initialData: CardData;
  editMode: boolean
}

const CardFormModal: React.FC<CardFormModalProps> = ({ visible, onClose, handleSaveSuccess, initialData, editMode }) => {
  const [formData, setFormData] = useState<CardData>(initialData);

  useEffect(() => {
    setFormData(initialData); // reset khi mở modal mới
  }, [initialData]);

  const handleChange = (key: keyof CardData, value: string | number) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveCard = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('user');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        const data = {
          ownerName: formData.ownerName,
          number: formData.number.replace(/\s+/g, ''),
          expiryDate: formData.expiryDate,
          ccv: formData.ccv,
          userId: userData.id,
        };

        if (editMode) {
          if (initialData.id !== undefined) {
            await creditCardApi.updateCard(initialData.id, data);
          }
        } else {
          await creditCardApi.addCard(data);
        }

        handleSaveSuccess();
        onClose();
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={styles.modalTitle}>Thêm thẻ</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Chủ thẻ</Text>
            <TextInput
              style={styles.input}
              placeholder="Không để trống"
              placeholderTextColor="#6B7280"
              value={formData.ownerName}
              onChangeText={(text) => handleChange('ownerName', text)}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Số thẻ</Text>
            <TextInput
              style={styles.input}
              placeholder="Không để trống"
              placeholderTextColor="#6B7280"
              value={formData.number}
              onChangeText={(text) => handleChange('number', text)}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Ngày hết hạn (MM/YYYY)</Text>
            <TextInput
              style={styles.input}
              placeholder="Không để trống"
              placeholderTextColor="#6B7280"
              value={formData.expiryDate}
              onChangeText={(text) => handleChange('expiryDate', text)}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>CVV</Text>
            <TextInput
              style={styles.input}
              placeholder="Không để trống"
              placeholderTextColor="#6B7280"
              value={formData.ccv.toString()}
              onChangeText={(text) => handleChange('ccv', parseInt(text) || 0)}
              keyboardType="numeric"
            />
          </View>

          <TouchableOpacity onPress={handleSaveCard} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Lưu</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: 350,
    maxWidth: '90%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  inputWrapper: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  input: {
    height: 40,
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    fontSize: 16,
    marginTop: 5,
    color: '#1F2937',
  },
  saveButton: {
    backgroundColor: '#374151',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#F9FAFB',
    fontSize: 16,
  },
});

export default CardFormModal;
