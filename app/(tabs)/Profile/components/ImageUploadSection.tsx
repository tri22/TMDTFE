import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ImageUploadSection({ onchange }) {
    const [images, setImages] = useState([null, null, null, null, null]);
    const [imageUrls, setImageUrls] = useState([null, null, null, null, null]);
    const handleItemPress = async (index) => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Bạn cần cấp quyền truy cập thư viện ảnh.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: false,
            quality: 1,
        });

        if (result.canceled) return;

        const uri = result.assets[0].uri;
        const updatedImages = [...images];
        updatedImages[index] = uri;

        setImages(updatedImages);
        onchange?.(updatedImages.filter((uri) => uri)); // Truyền danh sách URI về cha
    };

    // const uploadImageToServer = async (uri) => {
    //     return await postProductApi.uploadImage(uri);
    // };


    // const handleItemPress = async (index) => {
    //     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //     if (status !== 'granted') {
    //         Alert.alert('Bạn cần cấp quyền truy cập thư viện ảnh.');
    //         return;
    //     }

    //     const result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //         allowsMultipleSelection: false,
    //         quality: 1,
    //     });

    //     if (result.canceled) return;

    //     const uri = result.assets[0].uri;

    //     try {
    //         const uploadedUrl = await uploadImageToServer(uri);
    //         const updatedImages = [...images];
    //         const updatedUrls = [...imageUrls];
    //         updatedImages[index] = uri;
    //         updatedUrls[index] = uploadedUrl;

    //         setImages(updatedImages);
    //         setImageUrls(updatedUrls);
    //         onchange?.(updatedUrls.filter((url) => url)); // gọi về cha
    //     } catch (error) {
    //         Alert.alert('Lỗi', 'Không thể tải ảnh lên server');
    //     }
    // };

    return (
        <View style={styles.imageContainer}>
            <Text style={styles.title}>Hình ảnh</Text>
            <View style={styles.imageRow}>
                {images.map((image, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.imageBox}
                        onPress={() => handleItemPress(index)}
                    >
                        {image ? (
                            <Image source={{ uri: image }} style={styles.image} />
                        ) : (
                            <Text style={styles.plusSign}>+</Text>
                        )}
                    </TouchableOpacity>
                ))}
            </View>
            {imageUrls.map((url, index) => url && (
                <Text key={index} style={styles.fileInfo}>
                    {" "}
                    Ảnh {index + 1}:
                </Text>
            ))}
            <Text style={styles.description}>
                Tải lên hình ảnh có kích thước lớn hơn 750px x 450px. Số lượng hình ảnh
                tối đa là 5. Dung lượng tối đa của mỗi hình ảnh là 134MB.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        padding: 16,
        paddingBottom: 0,
        backgroundColor: "#fff",
    },
    title: {
        fontWeight: "bold",
        color: "#2e384d",
        fontSize: 16,
        marginBottom: 8,
    },
    imageRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    imageBox: {
        width: 60,
        height: 60,
        borderWidth: 2,
        borderColor: "#2e384d",
        backgroundColor: "#e5ebfc",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    plusSign: {
        color: "#2e384d",
        fontWeight: "bold",
        fontSize: 20,
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 3,
        resizeMode: "cover",
    },
    fileInfo: {
        fontSize: 12,
        color: "#444",
        marginBottom: 2,
    },
    description: {
        color: "#444",
        fontSize: 12,
        marginTop: 8,
    },
});
