// import CheckBox from '@react-native-community/checkbox';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Checkbox } from 'react-native-paper';

export default function ProductDetails({ onchange }) {
    const [material, setMaterial] = useState('');
    const [brand, setBrand] = useState('');
    const [condition, setCondition] = useState('');
    const [customMaterial, setCustomMaterial] = useState('');
    const [customBrand, setCustomBrand] = useState('');
    const [customCondition, setCustomCondition] = useState('');
    const [negotiable, setNegotiable] = useState(false);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [salePrice, setSalePrice] = useState('');
    const [description, setDescription] = useState('');
    const [qty, setQty] = useState('1');

    const [showMaterialDropdown, setShowMaterialDropdown] = useState(false);
    const [showBrandDropdown, setShowBrandDropdown] = useState(false);
    const [showConditionDropdown, setShowConditionDropdown] = useState(false);

    const materials = ['Nhựa', 'Kim loại', 'Gỗ', 'Thủy tinh'];
    const brands = ['Chanel', 'Gucci', 'Prada'];
    const conditions = ['Mới', 'Đã qua sử dụng', 'Như mới'];

    const handleSelectMaterial = (value: string) => {
        setMaterial(value);
        setShowMaterialDropdown(false);
    };

    const handleSelectBrand = (value: string) => {
        setBrand(value);
        setShowBrandDropdown(false);
    };

    const handleSelectCondition = (value: string) => {
        setCondition(value);
        setShowConditionDropdown(false);
    };

    useEffect(() => {
        onchange({
            name,
            price: parseFloat(price) || 0,
            salePrice: parseFloat(salePrice) || 0,
            material,
            brand,
            condition,
            description,
            negotiable,
            qty: parseInt(qty) || 1,
        });
    }, [name, price, salePrice, material, brand, condition, description, negotiable]);

    return (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Thông tin chi tiết</Text>

            <Text style={styles.inputLabel}>Tiêu đề</Text>
            <TextInput
                placeholder="Điền tên của sản phẩm"
                placeholderTextColor="#a6b3ac"
                style={styles.input}
                value={name}
                onChangeText={setName}
            />

            <Text style={styles.inputLabel}>Số lượng</Text>
            <TextInput
                placeholder="1"
                style={styles.input}
                keyboardType="numeric"
                value={qty}
                onChangeText={setQty}
            />

            <Text style={styles.inputLabel}>Chất liệu</Text>
            <TouchableOpacity
                onPress={() => setShowMaterialDropdown(!showMaterialDropdown)}
                style={styles.inputDropdown}
            >
                <Text style={styles.inputText}>{material || 'Chọn chất liệu'}</Text>
                <Text style={styles.dropdownArrow}>▼</Text>
            </TouchableOpacity>

            {showMaterialDropdown && (
                <View style={styles.dropdownList}>
                    <ScrollView nestedScrollEnabled>
                        {materials.map((item, index) => (
                            <TouchableOpacity key={index} onPress={() => handleSelectMaterial(item)}>
                                <Text style={styles.dropdownItemText}>{item}</Text>
                            </TouchableOpacity>
                        ))}
                        <View style={styles.otherInputContainer}>
                            <Text style={styles.otherInputLabel}>Khác:</Text>
                            <TextInput
                                value={customMaterial}
                                onChangeText={(text) => {
                                    setCustomMaterial(text);
                                    setMaterial(text);
                                }}
                                style={styles.otherInput}
                            />
                        </View>
                    </ScrollView>
                </View>
            )}

            <View style={styles.row}>
                <View style={styles.halfInput}>
                    <Text style={styles.inputLabel}>Giá</Text>
                    <TextInput
                        placeholder="0.00"
                        style={styles.input}
                        keyboardType="numeric"
                        value={price}
                        onChangeText={setPrice}
                    />
                </View>
                <View style={styles.halfInput}>
                    <Text style={styles.inputLabel}>Giá Sale</Text>
                    <TextInput
                        placeholder="0.00"
                        style={styles.input}
                        keyboardType="numeric"
                        value={salePrice}
                        onChangeText={setSalePrice}
                    />
                </View>
            </View>

            <View style={styles.checkboxRow}>
                <Checkbox
                    status={negotiable ? 'checked' : 'unchecked'}
                    onPress={() => setNegotiable(!negotiable)}
                    color="#2e384d"
                />
                <Text style={styles.checkboxLabel}>Giá có thể thương lượng?</Text>
            </View>

            <Text style={styles.inputLabel}>Thương hiệu</Text>
            <TouchableOpacity
                onPress={() => setShowBrandDropdown(!showBrandDropdown)}
                style={styles.inputDropdown}
            >
                <Text style={styles.inputText}>{brand || 'Chọn thương hiệu'}</Text>
                <Text style={styles.dropdownArrow}>▼</Text>
            </TouchableOpacity>

            {showBrandDropdown && (
                <View style={styles.dropdownList}>
                    <ScrollView nestedScrollEnabled>
                        {brands.map((item, index) => (
                            <TouchableOpacity key={index} onPress={() => handleSelectBrand(item)}>
                                <Text style={styles.dropdownItemText}>{item}</Text>
                            </TouchableOpacity>
                        ))}
                        <View style={styles.otherInputContainer}>
                            <Text style={styles.otherInputLabel}>Khác:</Text>
                            <TextInput
                                value={customBrand}
                                onChangeText={(text) => {
                                    setCustomBrand(text);
                                    setBrand(text);
                                }}
                                placeholder="Nhập thương hiệu"
                                style={styles.otherInput}
                            />
                        </View>
                    </ScrollView>
                </View>
            )}

            <Text style={styles.inputLabel}>Tình trạng</Text>
            <TouchableOpacity
                onPress={() => setShowConditionDropdown(!showConditionDropdown)}
                style={styles.inputDropdown}
            >
                <Text style={styles.inputText}>{condition || 'Chọn tình trạng'}</Text>
                <Text style={styles.dropdownArrow}>▼</Text>
            </TouchableOpacity>

            {showConditionDropdown && (
                <View style={styles.dropdownList}>
                    <ScrollView nestedScrollEnabled>
                        {conditions.map((item, index) => (
                            <TouchableOpacity key={index} onPress={() => handleSelectCondition(item)}>
                                <Text style={styles.dropdownItemText}>{item}</Text>
                            </TouchableOpacity>
                        ))}
                        <View style={styles.otherInputContainer}>
                            <Text style={styles.otherInputLabel}>Khác:</Text>
                            <TextInput
                                value={customCondition}
                                onChangeText={(text) => {
                                    setCustomCondition(text);
                                    setCondition(text);
                                }}
                                placeholder="Nhập tình trạng"
                                style={styles.otherInput}
                            />
                        </View>
                    </ScrollView>
                </View>
            )}

            <TextInput
                placeholder="Mô tả chi tiết"
                placeholderTextColor="#a6b3ac"
                style={[styles.input, styles.textarea]}
                multiline
                value={description}
                onChangeText={setDescription}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    sectionContainer: {
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        marginTop: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2e384d',
    },
    inputLabel: {
        color: '#a6b3ac',
        fontSize: 14,
        marginBottom: 4,
    },
    input: {
        borderWidth: 2,
        borderColor: '#2e384d',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: "#e5ebfc",
        fontSize: 16,
        color: '#2e384d',
    },
    textarea: {
        height: 100,
        textAlignVertical: 'top',
    },
    inputDropdown: {
        borderWidth: 2,
        borderColor: '#2e384d',
        borderRadius: 8,
        backgroundColor: '#e5ebfc',
        paddingHorizontal: 12,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    inputText: {
        fontSize: 16,
        color: '#2e384d',
    },
    dropdownArrow: {
        fontSize: 16,
        color: '#2e384d',
    },
    dropdownList: {
        backgroundColor: '#e5ebfc',
        borderWidth: 2,
        borderColor: '#2e384d',
        borderRadius: 8,
        marginTop: 4,
        maxHeight: 150,
    },
    dropdownItemText: {
        padding: 10,
        fontSize: 16,
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
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 6,
        paddingHorizontal: 8,
        height: 36,
        color: '#2e384d',
    },
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
});