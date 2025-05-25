import { StyleSheet } from 'react-native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";


export const styles = StyleSheet.create({
    container: { 
        flex: 1, 

        backgroundColor: "white",

        flexDirection: "column",
        justifyContent: "flex-start", 
        alignItems: "center",
        position: "relative", 

        //debug
        borderWidth: 1,
    },

    headerContainer: {
        height: hp("6%"),
        width: wp("100%"),
        position: "absolute",

        borderBottomWidth: 1,

        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",

        //debug
        borderWidth: 1,
    },

    backBut: {
        position: "absolute",
        left: wp("4%"),
        top: hp("1.5%"),
        width: wp("6%"),
        height: hp("3%"),

        justifyContent: "center",
        alignItems: "center",

       //debug
        borderWidth: 1, 
    },

    headerText: {
        fontSize: hp("2.5%"),
        fontWeight: "bold",
        color: "black",

        textAlign: "center",
        lineHeight: hp("6%"),

        //debug
        borderWidth: 1,
    },
});

