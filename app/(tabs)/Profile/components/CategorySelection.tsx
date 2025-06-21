import { postProductApi } from '@/api/postApi';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { commonStyles } from '../styles/PostPdStyle';

export default function CategorySelection({ onChange }) {
    const [categories, setCategories] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [customCategory, setCustomCategory] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await postProductApi.getAllCategories();
                setCategories(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy danh mục:', error);
            }
        };
        fetchCategories();
    }, []);

    const handleSelectCategory = (item) => {
        setCategoryName(item.title);
        onChange(item.title);
        setShowDropdown(false);
    };

    const handleCustomCategory = (text) => {
        setCustomCategory(text);
        setCategoryName(text);
        onChange(text);
    };

    return (
        <View style={commonStyles.sectionContainer}>
            <Text style={commonStyles.title}>Danh mục</Text>
            <TouchableOpacity
                style={commonStyles.dropdownContainer}
                onPress={() => setShowDropdown(!showDropdown)}
            >
                <View style={styles.dropdownLeft}>
                    <Text style={styles.dropdownLabel}>Phân loại</Text>
                    <Text style={styles.dropdownValue}>{categoryName || 'Chọn danh mục'}</Text>
                </View>
                <Text style={styles.dropdownArrow}>▼</Text>
            </TouchableOpacity>
            {showDropdown && (
                <View style={commonStyles.dropdownList}>
                    <ScrollView nestedScrollEnabled>
                        {categories.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => handleSelectCategory(item)}
                                style={styles.dropdownItem}
                            >
                                <Text style={commonStyles.dropdownItemText}>{item.title}</Text>
                            </TouchableOpacity>
                        ))}
                        <View style={styles.otherInputContainer}>
                            <Text style={styles.otherInputLabel}>Khác:</Text>
                            <TextInput
                                value={customCategory}
                                onChangeText={handleCustomCategory}
                                placeholder="Nhập phân loại"
                                style={styles.otherInput}
                            />
                        </View>
                    </ScrollView>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    dropdownLeft: {
        flexDirection: 'column',
    },
    dropdownLabel: {
        fontSize: 13,
        color: '#a6b3ac',
    },
    dropdownValue: {
        fontSize: 16,
        color: '#2e384d',
    },
    dropdownArrow: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2e384d',
    },
    otherInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    otherInputLabel: {
        marginRight: 8,
    },
    otherInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        paddingHorizontal: 8,
        height: 40,
        color: '#2e384d',
    },
});