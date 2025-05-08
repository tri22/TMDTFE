import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Feather, FontAwesome5, MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import { Link } from 'expo-router';

export const BottomNavigation: React.FC = () => {
    return (
        <View style={styles.container}>
            <Link href="/(tabs)" asChild>
                <Pressable style={styles.iconWrapper}>
                    <Feather name="home" size={24} color="#4472C4" />
                </Pressable>
            </Link>

            <Link href="/(tabs)" asChild>
                <Pressable style={styles.iconWrapper}>
                    <AntDesign name="hearto" size={24} color="#4472C4" />
                </Pressable>
            </Link>

            <Link href="/(tabs)" asChild>
                <Pressable style={styles.iconWrapper}>
                    <MaterialIcons name="list-alt" size={24} color="#4472C4" />
                </Pressable>
            </Link>

            <Link href="/(tabs)" asChild>
                <Pressable style={styles.iconWrapper}>
                    <Feather name="bookmark" size={24} color="#4472C4" />
                </Pressable>
            </Link>

            <Link href="/(tabs)/Settings" asChild>
                <Pressable style={styles.iconWrapper}>
                    <FontAwesome5 name="user" size={24} color="#4472C4" />
                </Pressable>
            </Link>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        height: 84,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -1 },
        shadowOpacity: 0.16,
        shadowRadius: 1,
        elevation: 5,
    },
    bar: {
        position: 'absolute',
        bottom: 14,
        left: '50%',
        transform: [{ translateX: -67 }],
        width: 134,
        height: 5,
        backgroundColor: 'black',
        borderRadius: 34,
    },
    iconWrapper: {
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
