import { Category, postProductApi } from '@/api/postApi';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function CategorySelection({ onchange }) {
    const [showDropdown, setShowDropdown] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoryId, setCategoryId] = useState('');  //Lưu category_id 
    const [categoryName, setCategoryName] = useState('');  //Hiển thị tên danh mục 
    const [customCategory, setCustomCategory] = useState('');  //Lấy danh sách danh mục từ API 
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await postProductApi.getAllCategories(); // 🔄 Dùng hàm axios
                setCategories(response.data);
            } catch (error) { console.error('Lỗi khi lấy danh mục:', error); }
        }; fetchCategories();
    }, []);

    const handleSelectCategory = (item) => {
        setCategoryId(item.id);
        setCategoryName(item.title);
        onchange?.(item.title);
        setShowDropdown(false);
    };
    return (
        <View style={styles.sectionContainer}>
            <Text style={styles.categoryTitle}>Danh mục</Text>
            <TouchableOpacity style={styles.dropdownContainer} onPress={() => setShowDropdown(!showDropdown)} >
                <View style={styles.dropdownLeft}>
                    <Text style={styles.dropdownLabel}>Phân loại</Text>
                    <Text style={styles.dropdownValue}>{categoryName || 'Chọn danh mục'}</Text>
                </View>
                <View style={styles.dropdownIcon}>
                    <Text style={styles.dropdownArrow}>▼</Text>
                </View>
            </TouchableOpacity>
            {showDropdown && (
                <View style={styles.dropdownList}>
                    <ScrollView nestedScrollEnabled={true}>
                        {categories.map((item, index) => (
                            <TouchableOpacity key={index} onPress={() => handleSelectCategory(item)} style={styles.dropdownItem} >
                                <Text style={styles.dropdownItemText}>{item.title}</Text>
                            </TouchableOpacity>
                        ))}
                        <View style={styles.otherInputContainer}>
                            <Text style={styles.otherInputLabel}>Khác:</Text>
                            <TextInput value={customCategory} onChangeText={(text) => {
                                setCustomCategory(text);  //Gửi custom category lên server để tạo mới nếu cần
                                setCategoryName(text); onchange?.({ title: text });  //Cần API để tạo category mới 
                            }} placeholder="Nhập phân loại" style={styles.otherInput} />
                        </View>
                    </ScrollView>
                </View>)}
        </View>
    );
}

const styles = StyleSheet.create({
    sectionContainer: {
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        marginTop: 16,
    },
    categoryTitle: {
        color: '#2e384d',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 8,
    },
    dropdownContainer: {
        backgroundColor: '#e5ebfc',
        borderColor: '#2e384d',
        borderWidth: 1,
        borderRadius: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 2,
        padding: 12,
    },
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
    dropdownIcon: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropdownArrow: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2e384d',
    },
    dropdownList: {
        backgroundColor: '#e5ebfc',
        borderColor: '#2e384d',
        borderWidth: 1,
        borderRadius: 6,
        padding: 10,
        height: 180,
    },
    dropdownItem: {
        paddingVertical: 10,
    },
    dropdownItemText: {
        fontSize: 16,
        color: '#2e384d',
    },
    otherInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    otherInputLabel: {
        marginRight: 8,
    },
    otherInput: {
        width: 180,
        borderWidth: 1,
        alignContent: 'center',
        borderColor: '#ccc',
        borderRadius: 6,
        paddingHorizontal: 8,
        height: 40,
        color: '#2e384d',
        textAlignVertical: 'center',
        textAlign: 'left',
    },
});