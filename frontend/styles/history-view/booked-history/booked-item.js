import { StyleSheet } from "react-native";

import { Typography } from "@/styles/Typography";
import { 
    screenWidthSAV, marginLeftSAV,
    Color, FontSize, 
} from "@/styles/GlobalStyles";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";


export const styles = StyleSheet.create({

    container: {
        width: screenWidthSAV,
        minHeight: hp("14%"),
        position: "relative",

        paddingHorizontal: wp("2.8%"),
        paddingVertical: hp("1%"),

        // //debug
        // borderWidth: 1,
    },

    titleBox: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
    },

    image: {
        width: wp("12%"),
        height: wp("12%"),
        borderRadius: 999,
        marginRight: wp("2.8%"),

        // debug
        // borderWidth: 1,
    },

    titleText: {
        fontSize: FontSize.size_m,
    },

    inforText: {
        fontSize: FontSize.size_s,
        color: Color.tertiary,
    },

    statusText: {
        FontSize: FontSize.size_s,
        color: Color.tertiary,
    },

    codeText: {
        position: "absolute",
        top: hp("4%"),
        right: wp("2.8%"),
        fontSize: FontSize.size_m,
    },

    divider: {
        width: wp("80%"),
        height: 1,
        alignSelf: "center",
        marginBottom: hp("1%"),

        backgroundColor: Color.divider,

    },
});