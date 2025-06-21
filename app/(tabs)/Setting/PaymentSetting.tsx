import creditCardApi, { CardData } from "@/api/creditCardApi";
import { CardItem } from "@/components";
import { BottomNavigation } from "@/components/BottomNavigation";
import CardFormModal from "@/components/CardFormModal";
import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Swipeable } from 'react-native-gesture-handler';
const PaymentSetting = () => {
  const bankLogos: { [key: string]: { name: string; logo: string } } = {
    "970436": {
      name: "Vietcombank",
      logo: "https://i.pinimg.com/736x/80/1d/11/801d116027d9523390684fdb860f4199.jpg"
    },
    "970418": {
      name: "BIDV",
      logo: "https://i.pinimg.com/736x/af/48/e8/af48e85232fe63f9b6d064548df6c44e.jpg"
    },
    "970422": {
      name: "Agribank",
      logo: "https://i.pinimg.com/736x/a3/d4/b5/a3d4b5a4fd8f32db689ab50e777025df.jpg"
    },
    "970405": {
      name: "VietinBank",
      logo: "https://i.pinimg.com/736x/1f/b7/d0/1fb7d0cae3f7149d4fc7ffb61fa095e5.jpg"
    },
    "970423": {
      name: "ACB",
      logo: "https://i.pinimg.com/736x/4e/7f/b5/4e7fb57891725caa8347ed29ec0bc993.jpg"
    },
    "970407": {
      name: "Techcombank",
      logo: "https://i.pinimg.com/736x/a2/9a/a8/a29aa86bdaad3c3bdfef3b52064dd390.jpg"
    },
    "970403": {
      name: "Sacombank",
      logo: "https://i.pinimg.com/736x/23/04/2a/23042af6f4c9588163a5d99083f08cf3.jpg"
    },
    "970432": {
      name: "TPBank",
      logo: "https://i.pinimg.com/736x/a8/e9/31/a8e931d65a17267bed9642dfc2f65e8b.jpg"
    },
    "970441": {
      name: "VPBank",
      logo: "https://i.pinimg.com/736x/55/0c/5e/550c5e38096bca994f857e766cc865ca.jpg"
    },
    "970419": {
      name: "MB Bank",
      logo: "https://i.pinimg.com/736x/18/b4/57/18b457a25f54edb34eaf33a38c78d920.jpg"
    },
    "970409": {
      name: "HDBank",
      logo: "https://i.pinimg.com/736x/c0/4a/d9/c04ad9ba1448d6bb75b01c15c530af57.jpg"
    },
    "970428": {
      name: "VIB",
      logo: "https://i.pinimg.com/736x/92/32/bf/9232bfeec3a935b9649d158c89d23d96.jpg"
    },
    "970454": {
      name: "MSB",
      logo: "https://i.pinimg.com/736x/92/dd/9d/92dd9ddf90fef6277a3109f51b03dcbd.jpg"
    },
  };
  const [isEditMode, setIsEditMode] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [cardList, setCardList] = useState<CardData[]>([]);
  const [editCard, setEditCard] = useState<CardData>({
    id: 0,
    number: "String",
    ownerName: "String",
    expiryDate: "String",
    ccv: 0,
  });


  useEffect(() => {
    fetchCardData();
  }, [])

  const fetchCardData = async () => {
    try {
      const response = await creditCardApi.getAllByUserId(4);
      const data = response.data;

      const formattedData = data.map((item: CardData) => {
        const [year, month] = item.expiryDate.split("-");
        const yy = year.slice(-2);
        return {
          ...item,
          expiryDate: `${month}/${yy}`,
        };
      });

      setCardList(formattedData);
    } catch (error) {
      console.error(error);
    }
  };


  const handleDeleteCard = async (id: number | undefined) => {
    if (id === undefined) return;
    try {
      await creditCardApi.deleteCard(id);
      fetchCardData(); // load lại danh sách
    } catch (error) {
      console.error(error);
    }
  };


  const handleSaveSuccess = () => {
    setModalVisible(false);   // đóng modal
    fetchCardData();          // gọi lại API để lấy danh sách thẻ mới
  };


  const handleCardSetting = (card: CardData) => {
    setEditCard(card);
    setIsEditMode(true);
    setModalVisible(true);
  };

  const handleAddCard = () => {
    setEditCard({ id: 0, number: "", ownerName: "", expiryDate: "", ccv: 0, userId: 0 });
    setIsEditMode(false);
    setModalVisible(true);
  };

  const formatExpiryDate = (rawDate: string): string => {
    const [year, month] = rawDate.split("-");
    const yy = year.slice(-2);
    return `${month}/${yy}`;
  };

  return (
    <View style={styles.container}>

      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}
        style={{ paddingTop: 30, paddingLeft: 20, paddingRight: 20 }}>
        {/* Header */}
        <Text style={styles.title}>Cài đặt</Text>
        <Text style={styles.subtitle}>Phương thức thanh toán</Text>
        {/* Card */}
        {cardList.map((item, index) => {
          const cardNumber = item.number;
          const bankCode = cardNumber?.slice(0, 6);
          const logo = bankLogos[bankCode]?.logo || "https://via.placeholder.com/40";

          const renderRightActions = () => (
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteCard(item.id)}
            >
              <MaterialIcons name="delete" size={24} color="#fff" />
            </TouchableOpacity>
          );

          return (
            <Swipeable key={index} renderRightActions={renderRightActions}>
              <TouchableOpacity onPress={() => handleCardSetting(item)}>
                <CardItem
                  cardNumber={cardNumber}
                  img={{ uri: logo }}
                  expiry={item.expiryDate}
                  ownerName={item.ownerName}
                />
              </TouchableOpacity>
            </Swipeable>
          );
        })}
      </ScrollView>
      <CardFormModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        initialData={editCard}
        handleSaveSuccess={handleSaveSuccess}
        editMode={isEditMode}
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAddCard}>
        <Text style={styles.plus}>Thêm Thẻ</Text>
      </TouchableOpacity>
      <BottomNavigation></BottomNavigation>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
    marginBottom: 20,
  },
  cardContainer: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  cardContent: {
    flex: 1,
    backgroundColor: "#f5f7ff",
    borderRadius: 16,
    padding: 16,
    position: "relative",
  },
  logo: {
    width: 40,
    height: 24,
    resizeMode: "contain",
    marginBottom: 16,
  },
  secureIcon: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#e0e7ff",
    padding: 6,
    borderRadius: 999,
  },
  cardNumber: {
    fontSize: 16,
    letterSpacing: 2,
    marginBottom: 12,
    color: "#000",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 12,
    color: "#333",
    fontWeight: "bold",
  },
  expiry: {
    fontSize: 12,
    color: "#333",
  },
  addButton: {
    position: "absolute",
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: "#2b2d64",
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  plus: {
    fontSize: 16,
    color: "#fff",
  },
  deleteButton: {
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    borderRadius: 12,
    marginVertical: 5,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },

});

export default PaymentSetting;
