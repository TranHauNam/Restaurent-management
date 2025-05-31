import React from 'react';
import {
    View, Text, Image,
    TouchableOpacity,

} from "react-native";

import { Typography } from "@/styles/Typography";
import { styles } from "@/styles/history-view/booked-history/booked-item";



export const BookedItem = ({item }) => {

    return (
        <>
            <TouchableOpacity 
            style={styles.container}
            onPress={() => {}}>
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