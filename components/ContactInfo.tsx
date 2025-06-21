import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ContactInfoModal from "./ContactModal";

type ContactInfo = {
  phone: string;
  email: string;
};
interface ContactInfoProps {}
const ContactInfo: React.FC<ContactInfoProps> = () => {
  // Sample data for contact information

  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    phone: "",
    email: "",
  });

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userString = await AsyncStorage.getItem("user");

        if (!userString) {
          console.warn("No user data found");
          return;
        }

        const user = JSON.parse(userString);

        setContactInfo({
          phone: user.phone || "",
          email: user.email || "",
        });
      } catch (error) {
        console.error("Error fetching contact info:", error);
      }
    };

    fetchUserData(); // ← Gọi hàm async ở đây
  }, []);

  const handleSave = (contactInfo: ContactInfo) => {
    setContactInfo(contactInfo);

    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Thông tin liên hệ</Text>
        <TouchableOpacity>
          <MaterialIcons
            onPress={() => {
              setVisible(true);
            }}
            name="edit"
            size={20}
            color="#4F8EF7"
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.info}>
        {contactInfo.phone && `Số điện thoại: ${contactInfo.phone}`}
      </Text>
      <Text style={styles.info}>
        {contactInfo.email && `Email: ${contactInfo.email}`}
      </Text>
      <ContactInfoModal
        email={contactInfo.email}
        phone={contactInfo.phone}
        visible={visible}
        onClose={() => setVisible(false)}
        onSave={handleSave}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  info: {
    fontSize: 14,
    color: "#555",
  },
});

export default ContactInfo;
