import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ActionSection() {
    return (
        <View style={styles.formContainer}>
            <Link href="/Login/register_form" asChild>
                <TouchableOpacity style={styles.registerButton}>
                    <Text style={styles.registerButtonText}>Đăng ký</Text>
                </TouchableOpacity>
            </Link>

            <View style={styles.loginRow}>
                <Link href="/(tabs)/Login/login_form" asChild>
                    <TouchableOpacity style={styles.loginPressable}>
                        <Text style={styles.loginText}>Bạn đã có tài khoản?</Text>
                        <Ionicons name="arrow-forward-circle" size={26} color="#323660" style={styles.loginIcon} />
                    </TouchableOpacity>
                </Link>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    formContainer: {
        width: '100%',
        paddingBottom: 30,
    },
    registerButton: {
        backgroundColor: '#323660',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
    },

    registerButtonText: {
        color: '#fff',
        fontSize: 20,
        letterSpacing: 1,
    },
    loginRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        justifyContent: 'center',
    },
    loginPressable: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    loginText: {
        fontSize: 16,
        color: '#333',
    },
    loginIcon: {
        marginLeft: 8,
    },
});