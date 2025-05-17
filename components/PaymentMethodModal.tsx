import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CardItem from "./CardItem";

type PaymentMethodModalProps = {
  visible: boolean;
  onClose: () => void;
  cards: {
    id: number;
    cardType: "mastercard" | "visa";
    cardNumber: string;
    ownerName: string;
    expiry: string;
  }[];
  onAddCard: () => void;
  onSelectCard: (card: {
    id: number;
    cardType: "mastercard" | "visa";
    cardNumber: string;
    ownerName: string;
    expiry: string;
  }) => void;
};

const PaymentMethodModal: React.FC<PaymentMethodModalProps> = ({
  visible,
  onClose,
  cards,
  onAddCard,
  onSelectCard,
}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Phương thức thanh toán</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close-circle" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <ScrollView>
            {cards.map((card) => (
              <TouchableOpacity
                key={card.id}
                onPress={() => {
                  onSelectCard(card);
                  onClose();
                }}
              >
                <CardItem
                  cardType={card.cardType}
                  cardNumber={card.cardNumber}
                  ownerName={card.ownerName}
                  expiry={card.expiry}
                  onSettings={() =>
                    alert(`Settings for card ${card.cardNumber}`)
                  }
                />
              </TouchableOpacity>
            ))}
          </ScrollView>

          <TouchableOpacity style={styles.addButton} onPress={onAddCard}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#F9F9F9",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "80%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#004080",
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 30,
    right: 20,
  },
  addButtonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default PaymentMethodModal;
