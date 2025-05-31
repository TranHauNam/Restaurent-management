import { StyleSheet } from 'react-native';


import { Color, FontSize, marginLeftSAV, marginTopSAV, screenWidthSAV } from "@/styles/GlobalStyles";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export const styles = StyleSheet.create({
    container: {
        minHeight: hp("16%"),
        marginTop: hp("1%"),

        paddingHorizontal: wp("2%"),

        // //debug
        // borderWidth: 1,
    },

    divider: {
        marginBottom: hp("1%"),
        marginTop: hp("1%"),
        width: wp("80%"),
        height: 1,
        alignSelf: "center",

        backgroundColor: Color.divider,

        // //debug
        // borderWidth: 1,
    },

    image: {
        width: wp("12%"),
        height: wp("12%"),
        borderRadius: 999,
        marginRight: wp("2.8%"),
        backgroundColor: "#eee",
    },
    
    headerContainer: {
        height: hp("4%"),
        marginTop: hp("0.4%"),

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        // paddingHorizontal: wp("2%"),

        // //debug
        // borderWidth: 1,
    },

    timeText: {
        fontSize: FontSize.size_xs,
    },

    statusBox: {
        maxWidth: wp("30%"),

        borderRadius: 20,

        alignItems: "center",
        justifyContent: "center", 
        paddingVertical: hp("0.5%"),
        paddingHorizontal: wp("2%"),
        // //debug
        // borderWidth: 1,
    },

    resNameText: {

    },

    amountText: {

    },

    detailView: {
        flexDirection: "row",
        gap: wp("1%"),
        alignItems: "center",
        justifyContent: "flex-start",
    },

    detailText: {
        color: Color.sub,
        fontSize: FontSize.size_xs,
    },

    detailIcon: {
        marginTop: hp("0.2%"),

        color: Color.sub,

    },
});