import { showToast } from '@/api/axiosInstance';
import { postProductApi } from '@/api/postApi';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { commonStyles } from '../styles/PostPdStyle';
import Dropdown from './Dropdown';

export default function ProductDetails({ onChange }) {
    const [form, setForm] = useState({
        name: '',
        qty: '1',
        price: '',
        salePrice: '',
        material: '',
        brand: '',
        condition: '',
        description: '',
        negotiable: false,
    });
    const [dropdowns, setDropdowns] = useState({
        material: false,
        brand: false,
        condition: false,
    });
    const [customValues, setCustomValues] = useState({
        material: '',
        brand: '',
        condition: '',
    });

    // lấy ra tất cả material có trong danh sách sản phẩm
    const [materials, setMaterials] = useState<string[]>([]);
    useEffect(() => {
        const fetchMaterials = async () => {
            try {
                const res = await postProductApi.getAllMaterial();
                setMaterials(res.data);
            } catch (error) {
                console.error('Lỗi khi lấy materials:', error);
                showToast('error', "Lỗi", 'Lỗi khi lấy danh sách materials');
            }
        };

        fetchMaterials();
    }, []);

    // const materials = ['Nhựa', 'Kim loại', 'Gỗ', 'Thủy tinh'];
    const brands = ['Chanel', 'Gucci', 'Prada'];
    const conditions = ['Mới', 'Đã qua sử dụng', 'Như mới'];

    useEffect(() => {
        onChange({
            ...form,
            price: parseFloat(form.price) || 0,
            salePrice: parseFloat(form.salePrice) || 0,
            qty: parseInt(form.qty) || 1,
        });
    }, [form]);

    const updateForm = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const toggleDropdown = (key) => {
        setDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <View style={commonStyles.sectionContainer}>
            <Text style={commonStyles.title}>Thông tin chi tiết</Text>
            <Text style={commonStyles.inputLabel}>Tiêu đề</Text>
            <TextInput
                placeholder="Điền tên của sản phẩm"
                placeholderTextColor="#a6b3ac"
                style={commonStyles.input}
                value={form.name}
                onChangeText={(text) => updateForm('name', text)}
            />
            <Text style={commonStyles.inputLabel}>Số lượng</Text>
            <TextInput
                placeholder="1"
                style={commonStyles.input}
                keyboardType="numeric"
                value={form.qty}
                onChangeText={(text) => updateForm('qty', text)}
            />
            <Text style={commonStyles.inputLabel}>Chất liệu</Text>
            <Dropdown
                label="chất liệu"
                value={form.material}
                items={materials}
                onSelect={(value) => updateForm('material', value)}
                showDropdown={dropdowns.material}
                setShowDropdown={() => toggleDropdown('material')}
                customValue={customValues.material}
                setCustomValue={(text) => setCustomValues({ ...customValues, material: text })}
            />
            <View style={styles.row}>
                <View style={styles.halfInput}>
                    <Text style={commonStyles.inputLabel}>Giá</Text>
                    <TextInput
                        placeholder="0.00"
                        style={commonStyles.input}
                        keyboardType="numeric"
                        value={form.price}
                        onChangeText={(text) => updateForm('price', text)}
                    />
                </View>
                <View style={styles.halfInput}>
                    <Text style={commonStyles.inputLabel}>Giá Sale</Text>
                    <TextInput
                        placeholder="0.00"
                        style={commonStyles.input}
                        keyboardType="numeric"
                        value={form.salePrice}
                        onChangeText={(text) => updateForm('salePrice', text)}
                    />
                </View>
            </View>
            <View style={styles.checkboxRow}>
                <Checkbox
                    status={form.negotiable ? 'checked' : 'unchecked'}
                    onPress={() => updateForm('negotiable', !form.negotiable)}
                    color="#2e384d"
                />
                <Text style={styles.checkboxLabel}>Giá có thể thương lượng?</Text>
            </View>
            <Text style={commonStyles.inputLabel}>Thương hiệu</Text>
            <Dropdown
                label="thương hiệu"
                value={form.brand}
                items={brands}
                onSelect={(value) => updateForm('brand', value)}
                showDropdown={dropdowns.brand}
                setShowDropdown={() => toggleDropdown('brand')}
                customValue={customValues.brand}
                setCustomValue={(text) => setCustomValues({ ...customValues, brand: text })}
            />
            <Text style={commonStyles.inputLabel}>Tình trạng</Text>
            <Dropdown
                label="tình trạng"
                value={form.condition}
                items={conditions}
                onSelect={(value) => updateForm('condition', value)}
                showDropdown={dropdowns.condition}
                setShowDropdown={() => toggleDropdown('condition')}
                customValue={customValues.condition}
                setCustomValue={(text) => setCustomValues({ ...customValues, condition: text })}
            />
            <TextInput
                placeholder="Mô tả chi tiết"
                placeholderTextColor="#a6b3ac"
                style={[commonStyles.input, styles.textarea]}
                multiline
                value={form.description}
                onChangeText={(text) => updateForm('description', text)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
    halfInput: {
        flex: 1,
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkboxLabel: {
        marginLeft: 8,
    },
    textarea: {
        height: 100,
        textAlignVertical: 'top',
        marginTop: 10,
    },
});