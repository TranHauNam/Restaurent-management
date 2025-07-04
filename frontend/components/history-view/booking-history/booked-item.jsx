import React from 'react';
import { useRouter } from 'expo-router';
import {
    View, Text, Image,
    TouchableOpacity,

} from "react-native";

import { Typography } from "@/styles/Typography";
import { styles } from "@/styles/history-view/booked-history/booked-item";



export const BookedItem = ({item }) => {
    const router = useRouter();

    const handleDetailPress = (item) => {
        // Navigate to payment detail page
        router.push(`/history-view/booking-detail/${item.id}`);
    }

    return (
        <>
            <TouchableOpacity 
            style={styles.container}
            onPress={() => {handleDetailPress(item)}}>
                <View style={styles.titleBox}>
                    <Image 
                        source={{ uri: "https://picsum.photos/200" }}
                        style={styles.image}
                    />
                    <Text style={[Typography.header6, styles.titleText]}>
                        {item.restaurantName}
                    </Text>
                </View>
                <Text style={[Typography.paragraph, styles.inforText]}>
                    {item.date} - {item.time}
                </Text>
                <Text style={[Typography.header6, styles.statusText]}>
                    {item.status}
                </Text>

                <Text style={[Typography.paragraph, styles.codeText]}>
                    {item.code}
                </Text>                
            </TouchableOpacity>

            {/* Divider  */}
            <View style={styles.divider} />
        </>
    );
}