import React from "react";
import { 
    View, Text, TouchableOpacity
} from "react-native";
import { useRouter } from 'expo-router';

import { Typography } from "@/styles/Typography";
import { styles } from "@/styles/history-view/history-item";
import { Color } from "@/styles/GlobalStyles";

import AntDesign from '@expo/vector-icons/AntDesign';

export const PaymentHistoryItem = ({ item, onPress, payment }) => {
    const router = useRouter();


    const handleDetailPress = (item) => {
        // Navigate to payment detail page
        router.push({
            pathname: '/payment-detail',
            params: { paymentId: item.id }
        });
        // console.log("Payment ID:", item.id);
    }
    return (
        <>
            <TouchableOpacity style={styles.container} onPress={() => onPress(item)}>
                    <View style={styles.headerContainer}>
                        {/* Time  */}
                        <Text style={[Typography.label, styles.timeText]}>{item.time}, {item.date}</Text>
                        {/* Payment Status  */}
                        <View style={[
                            {
                                backgroundColor: item.status == "Paid" ? "lightgreen" :
                                    item.status == "Refunded" ? "lightyellow" :
                                    "white",
                            },
                            styles.statusBox
                        ]}>
                            <Text style={[Typography.header6, {
                                color: item.status == "Paid" ? "green" :
                                    item.status == "Refunded" ? "orange" :
                                    "black",
                                }]}>{item.status}</Text>
                        </View>

                    </View>                    
                    
                    <Text style={[Typography.header6, styles.resNameText]}>{item.restaurantName}</Text>
                    
                    <Text style={[Typography.header4, styles.amountText, {
                        color: item.status == "Paid" ? "green" :
                               item.status == "Refunded" ? "orange" :
                               "black",
                    }]}>
                        {item.amount.toLocaleString("vi-VN")} VND
                    </Text>

                    {/* Footer  */}
                    <TouchableOpacity 
                    style={styles.detailView}
                    onPress={() => {handleDetailPress(item)}}>
                        {/* Details Text  */}
                        <Text style={[Typography.paragraph, styles.detailText]} >Details</Text>
                        {/* Icon  */}
                        <AntDesign name="right" size={12} style={styles.detailIcon} />
                    </TouchableOpacity>


            </TouchableOpacity>
        </>        
    );
}