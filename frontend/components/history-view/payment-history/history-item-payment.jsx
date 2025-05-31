import React from "react";
import { 
    View, Text, TouchableOpacity, Image, 
} from "react-native";
import { useRouter } from 'expo-router';

import { Typography } from "@/styles/Typography";
import { styles } from "@/styles/history-view/history-item";
import { Color } from "@/styles/GlobalStyles";

import AntDesign from '@expo/vector-icons/AntDesign';

// import { HistoryPayment } from '../../app/(app)/history-view/payment-detail/payment-detail'

export const PaymentHistoryItem = ({ item, onPress, payment }) => {
    const router = useRouter();

    const handleDetailPress = (item) => {
        // Navigate to payment detail page
        router.push(`/history-view/payment-detail/${item.id}`);
    }
    
    return (
        <>
            <TouchableOpacity style={styles.container} onPress={() => handleDetailPress(item)}>

            {/* Dòng đầu: Ảnh + Tên nhà hàng */}
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
                {/* Ảnh bo tròn bên trái */}
                <Image
                    source={{ uri: item.restaurantImage || "https://via.placeholder.com/40" }}
                    style={styles.image}
                />
                {/* Tên nhà hàng */}
                <Text style={[Typography.header5, styles.resNameText]}>
                    {item.restaurantName}
                </Text>
            </View>

            {/* Dòng thứ 2: Thời gian */}
            <Text style={[Typography.label, styles.timeText, { marginBottom: 4 }]}>
                {item.time}, {item.date}
            </Text>

            {/* Dòng thứ 3: Giá và trạng thái */}
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                {/* Giá */}
                <Text style={[
                    Typography.header4,
                    styles.amountText,
                    {
                        color: item.status == "Paid" ? "green" :
                               item.status == "Refunded" ? "orange" :
                               "black",
                    }
                ]}>
                    {item.amount.toLocaleString("vi-VN")} VND
                </Text>
                {/* Trạng thái */}
                <View style={[
                    {
                        backgroundColor: item.status == "Paid" ? "lightgreen" :
                            item.status == "Refunded" ? "lightyellow" :
                            "white",
                    },
                    styles.statusBox
                ]}>
                    <Text style={[
                        Typography.header6,
                        {
                            color: item.status == "Paid" ? "green" :
                                item.status == "Refunded" ? "orange" :
                                "black",
                        }
                    ]}>
                        {item.status}
                    </Text>
                </View>
            </View>

            {/* Footer: Nút xem chi tiết */}
            <TouchableOpacity 
                style={styles.detailView}
                onPress={() => handleDetailPress(item)}
            >
                <Text style={[Typography.paragraph, styles.detailText]}>Details</Text>
                <AntDesign name="right" size={12} style={styles.detailIcon} />
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.divider} />
        </TouchableOpacity>
        </>        
    );
}