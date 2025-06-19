import { SafeAreaView, StyleSheet } from 'react-native';
import ActionSection from './Login/Components/ActionSection';
import LogoSection from './Login/Components/LogoSection';

export default function MainLogin() {
    return (
        <SafeAreaView style={styles.container}>
            <LogoSection imageStyle={{ width: 500, height: 500 }} />
            <ActionSection />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
});
