import React from "react";
import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";

interface PaymentStatusModalProps {
  visible: boolean;
  status: "success" | "failure";
  message: string;
  subMessage: string;
  buttonPrimaryText: string;
  buttonSecondaryText?: string;
  onPrimaryPress: () => void;
  onSecondaryPress?: () => void;
  onClose: () => void;
}

const PaymentStatusModal: React.FC<PaymentStatusModalProps> = ({
  visible,
  status,
  message,
  subMessage,
  buttonPrimaryText,
  buttonSecondaryText,
  onPrimaryPress,
  onSecondaryPress,
  onClose,
}) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Icon */}
          <View style={styles.iconContainer}>
            <Image
              // source={status === "success" ? require("") : require("")}
              style={styles.icon}
            />
          </View>

          {/* Message */}
          <Text style={styles.title}>{message}</Text>
          <Text style={styles.subTitle}>{subMessage}</Text>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <Pressable style={styles.primaryButton} onPress={onPrimaryPress}>
              <Text style={styles.primaryButtonText}>{buttonPrimaryText}</Text>
            </Pressable>
            {buttonSecondaryText && onSecondaryPress && (
              <Pressable
                style={[styles.secondaryButton, { marginLeft: 10 }]}
                onPress={onSecondaryPress}
              >
                <Text style={styles.secondaryButtonText}>
                  {buttonSecondaryText}
                </Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  iconContainer: {
    marginBottom: 10,
  },
  icon: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  subTitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  primaryButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  primaryButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  secondaryButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  secondaryButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default PaymentStatusModal;
