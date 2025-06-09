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
            msg = "Thanh toán thành công";
            break;
        case "Refunded":
            msg = "Thanh toán đã được hoàn trả";
            break;
        case "Cancelled":
            msg = "Thanh toán đã bị hủy";
            break;
        default:
            msg = "Thanh toán đang chờ";
    }
    return msg;
}

const description = ({ status }) => {
    let desc;
    switch (status) {
        case "Paid":
            desc = "Thanh toán của bạn đã được xử lý thành công. Cảm ơn bạn đã mua hàng!";
            break;
        case "Refunded":
            desc = "Thanh toán của bạn đã được hoàn trả. Vui lòng kiểm tra tài khoản của bạn để biết thêm chi tiết.";
            break;
        case "Cancelled":
            desc = "Thanh toán của bạn đã bị hủy. Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ hỗ trợ.";   
            break;
        default:
            desc = "Thanh toán của bạn đang chờ. Vui lòng chờ xác nhận.";
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