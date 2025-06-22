import voucherApi, { Voucher } from "@/api/voucherApi";
import { VoucherItem } from "@/components";
import { BottomNavigation } from "@/components/BottomNavigation";
import dayjs from 'dayjs';
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
export default function VoucherScreen() {
    const [vouchers, setVouchers] = useState<Voucher[]>([])

    useEffect(() => {
        fetchVouchers()
    }, [])

    const fetchVouchers = async () => {
        try {
            const response = await voucherApi.getAllVouchers();
            const data = response.data
            console.log(data)
            setVouchers(data)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{ paddingBottom: 80 }}>
                {vouchers.map((item) => (
                    <VoucherItem
                        key={item.id}
                        title={item.code}
                        description={item.description}
                        expiry={dayjs(item.expiryDate).format('DD/MM/YYYY')}
                        onAdd={() => null}
                    />
                ))}
            </ScrollView>
            <BottomNavigation></BottomNavigation>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 48,
        paddingRight: 20,
        paddingLeft: 20,
    }
})