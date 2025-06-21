import { showToast } from '@/api/axiosInstance';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { commonStyles } from '../styles/PostPdStyle';

export default function ImageUploadSection({ onChange }) {
    const [images, setImages] = useState(Array(5).fill(null));

    const handleItemPress = async (index) => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Thông báo', 'Bạn cần cấp quyền truy cập thư viện ảnh.');
            showToast('info', 'Thông báo', 'Bạn cần cấp quyền truy cập thư viện ảnh.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: false,
            quality: 1,
        });

        if (!result.canceled) {
            const updatedImages = [...images];
            updatedImages[index] = result.assets[0].uri;
            setImages(updatedImages);
            onChange(updatedImages.filter(Boolean));
        }
    };

    return (
        <View style={styles.imageContainer}>
            <Text style={commonStyles.title}>Hình ảnh</Text>
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
            <Text style={styles.description}>
                Tải lên hình ảnh có kích thước lớn hơn 750px x 450px. Số lượng hình ảnh tối đa là 5. Dung lượng tối đa của mỗi hình ảnh là 134MB.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        padding: 16,
        paddingBottom: 0,
    },
    imageRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    imageBox: {
        width: 60,
        height: 60,
        borderWidth: 2,
        borderColor: '#2e384d',
        backgroundColor: '#e5ebfc',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    plusSign: {
        color: '#2e384d',
        fontWeight: 'bold',
        fontSize: 20,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 3,
        resizeMode: 'cover',
    },
    description: {
        color: '#444',
        fontSize: 12,
        marginTop: 8,
    },
});
