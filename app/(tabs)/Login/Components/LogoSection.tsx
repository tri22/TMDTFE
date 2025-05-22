import React from 'react';
import { Image, ImageStyle, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

type LogoSectionProps = {
    containerStyle?: StyleProp<ViewStyle>;
    imageStyle?: StyleProp<ImageStyle>;
};

export default function LogoSection({ containerStyle, imageStyle }: LogoSectionProps) {
    return (
        <View style={[styles.logoContainer, containerStyle]}>
            <Image
                source={require('../../../../assets/images/logo/smallLogo.png')}
                style={[styles.logo, imageStyle]}
                resizeMode="contain"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 200,
        height: 200,
    },
});