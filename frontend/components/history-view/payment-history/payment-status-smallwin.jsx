import React from 'react';
import { 
    Text, View, StyleSheet,
 } from 'react-native';

import { Typography } from '@/styles/Typography';
import { Color, FontSize, screenWidthSAV } from '@/styles/GlobalStyles';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const message = ({ status }) => {
    let msg;
    switch (status) {
        case "Paid":
            msg = "Payment Successful";
            break;
        case "Refunded":
            msg = "Payment Refunded";
            break;
        case "Cancelled":
            msg = "Payment Cancelled";
            break;
        default:
            msg = "Payment Pending";
    }
    return msg;
}

const description = ({ status }) => {
    let desc;
    switch (status) {
        case "Paid":
            desc = "Your payment has been successfully processed. Thank you for your purchase!";
            break;
        case "Refunded":
            desc = "Your payment has been refunded. Please check your account for the refund.";
            break;
        case "Cancelled":
            desc = "Your payment has been cancelled. If you have any questions, please contact support.";
            break;
        default:
            desc = "Your payment is still pending. Please wait for confirmation.";
            break;
    }
    return desc;
}
export const PaymentStatusBox = (status) => {
    const statusMessage = message(status);
    const statusDescription = description(status);  

    return (
        <>
            <Text style={[Typography.header5, ]}>Payment Status</Text>
            <View style={styles.statusBox}>
                {/* Message  */}
                <Text style={[Typography.header6, {
                    color: status.status == "Paid" ? "green" :
                        status.status == "Refunded" ? "orange" :
                        status.status == "Cancelled" ? "red" :
                        "black",
                }]}>
                    {statusMessage}
                </Text>
                {/* Description  */}
                <Text style={[Typography.body, {
                    color: Color.gray,
                    fontSize: FontSize.size_m,
                }]}>
                    {statusDescription}   
                </Text>
            </View>

            {/* Divider  */}
            <View style={styles.divider} />
        </>
    );
}

const styles = StyleSheet.create({
    title: {


    },

    statusBox: {
        width: wp("88%"),
        minHeight: hp("12%"),
        marginVertical: hp("1%"),
        
        // backgroundColor: "#white",
        // borderColor: "#ccc",
        // borderRadius: 10,
        // borderWidth: 1,
        
        position: "relative",
        alignSelf: "center", // Center the box horizontally
    },

    divider: {
        width: screenWidthSAV,
        marginVertical: hp("1%"),
        marginHorizontal: -wp("4%"),
        height: hp("1.4%"),

        backgroundColor: "#eee",
        
    },
});