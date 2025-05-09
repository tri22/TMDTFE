import { BottomNavigation } from '@/components/BottomNavigation';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Divider, List } from 'react-native-paper';

const About: React.FC = () => {
    return (
        <View style={styles.wrapper}>

            <ScrollView contentContainerStyle={styles.container}>
                <Image
                    source={require('../../../assets/images/logo.png')}
                    style={styles.logo}
                />
                <Text style={styles.title}>About Pass Fashion</Text>
                <Text style={styles.paragraph}>
                    Pass Fashion là ứng dụng giúp bạn trao đổi, mua bán đồ thời trang đã qua sử dụng một cách nhanh chóng, an toàn và tiện lợi.
                    Chúng tôi tin rằng mỗi món đồ đều có thể có "vòng đời thứ hai" nếu được trao lại đúng người cần.
                </Text>
                <Text style={styles.subtitle}>Với Pass Fashion, bạn có thể:</Text>
                <List.Item title="Đăng bán quần áo, túi xách, kính mắt, phụ kiện... bạn không còn sử dụng." />
                <List.Item title="Tìm kiếm những món hàng thời trang đẹp, giá tốt từ cộng đồng." />
                <List.Item title="Lọc sản phẩm theo vị trí để dễ giao dịch trực tiếp." />
                <List.Item title="Xem đánh giá người dùng để đảm bảo giao dịch minh bạch và tin cậy." />
                <List.Item title="Quản lý đơn hàng và lịch sử giao dịch dễ dàng." />
                <Divider style={{ marginVertical: 20 }} />
                <Text style={styles.paragraph}>
                    Mỗi món đồ bạn pass lại là một hành động góp phần giảm rác thải thời trang và bảo vệ môi trường.
                </Text>
            </ScrollView>
            <BottomNavigation></BottomNavigation>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        padding: 20,
        backgroundColor: '#fff',
    },
    logo: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        marginVertical: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        fontWeight: '600',
        marginVertical: 10,
    },
    paragraph: {
        fontSize: 14,
        textAlign: 'justify',
        marginBottom: 10,
    },
});
export default About;