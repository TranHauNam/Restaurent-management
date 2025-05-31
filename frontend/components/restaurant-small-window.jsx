import React from 'react';
import { 
    Text, View, StyleSheet, Image
} from 'react-native';

import { Typography } from '@/styles/Typography';
import { Color, FontSize, screenWidthSAV } from '@/styles/GlobalStyles';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



export const RestaurantSmallWindow = ({ restaurant }) => {

    // console.log("RestaurantSmallWindow", restaurant);

    return (
        <>
            <Text style={[Typography.header5, styles.restaurantText]}>Restaurant</Text>
            <View style={styles.restaurantBox}>
                <Image
                    style={styles.restaurantImage}
                    source={{uri: `${restaurant.imageURL}`}}
                />
                <View style={styles.restaurantInfoTextContainer}>
                    <Text style={styles.restaurantName}>{restaurant.name}</Text>
                    <Text style={styles.restaurantAddress}>{restaurant.address}</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                        <Text style={styles.restaurantAddress}>Hotline</Text>
                        <Text style={styles.restaurantPhone}>{restaurant.phone}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.divider} />
        </>
    );
}

const styles = StyleSheet.create({
    restaurantText: {
        // //debug
        // borderWidth: 1,
    },

    restaurantBox: {
        width: wp("88%"),
        minHeight: hp("12%"),
        marginVertical: hp("1%"),
        
        backgroundColor: "#white",
        borderColor: "#ccc",
        borderRadius: 10,
        borderWidth: 1,
        
        position: "relative",
        alignSelf: "center", // Center the box horizontally
    },

    restaurantImage: {
        position: "absolute",
        top: hp("1.6%"),
        left: wp("3.2%"),
        width: wp("14%"),
        height: hp("6.8%"),

        borderRadius: 999, // Circular image  
    },

    restaurantInfoTextContainer: {
        position: "absolute",
        left: wp("20%"),
        top: hp("1.8%"),
        width: wp("65%"),
        minHeight: hp("8%"),

        justifyContent: "flex-start",
        alignItems: "flex-start",

        // //debug
        // borderWidth: 1,
    },

    restaurantName: {
        fontWeight: "bold",
        fontSize: hp("2%"),
        color: "black",
    },

    restaurantAddress: {
        fontSize: hp("1.8%"),
        color: "#555",
    },

    restaurantPhone: {
        fontSize: hp("1.8%"),
        fontWeight: "bold",
        color: "blue",
    },

    divider: {
        width: screenWidthSAV,
        marginVertical: hp("1%"),
        marginHorizontal: -wp("4%"),
        height: hp("1.4%"),

        backgroundColor: "#eee",
        
    },
});