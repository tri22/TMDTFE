import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

interface CardFormModalProps {
  visible: boolean;
  onClose: () => void;
}

const CardFormModal: React.FC<CardFormModalProps> = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Thêm thẻ</Text>

          {/* Cardholder input */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Chủ thẻ</Text>
            <TextInput
              style={styles.input}
              placeholder="Không để trống"
              placeholderTextColor="#6B7280"
            />
          </View>

          {/* Card Number input */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Số thẻ</Text>
            <TextInput
              style={styles.input}
              placeholder="Không để trống"
              placeholderTextColor="#6B7280"
            />
          </View>

          {/* Expiry Date input */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Ngày hết hạn</Text>
            <TextInput
              style={styles.input}
              placeholder="Không để trống"
              placeholderTextColor="#6B7280"
            />
          </View>

          {/* CVV input */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>CVV</Text>
            <TextInput
              style={styles.input}
              placeholder="Không để trống"
              placeholderTextColor="#6B7280"
            />
          </View>

          {/* Save button */}
          <TouchableOpacity onPress={onClose} style={styles.saveButton}>
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
