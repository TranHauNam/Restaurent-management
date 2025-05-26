import { StyleSheet } from 'react-native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Color, FontFamily, FontSize, Border } from "@/styles/GlobalStyles";


export const styles = StyleSheet.create({
    container: { 
        flex: 1, 

        backgroundColor: "white",

        flexDirection: "column",
        justifyContent: "flex-start", 
        alignItems: "center",
        position: "relative", 

        // //debug
        // borderWidth: 1,
    },

    headerContainer: {
        height: hp("6%"),
        width: wp("100%"),
        position: "absolute",

        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",

        // //debug
        // borderWidth: 1,
    },

    backBut: {
        position: "absolute",
        left: wp("4%"),
        top: hp("1.5%"),
        width: wp("6%"),
        height: hp("3%"),

        justifyContent: "center",
        alignItems: "center",

        // //debug
        // borderWidth: 1, 
    },

    headerText: {
        fontSize: hp("2.5%"),
        fontWeight: "bold",
        color: "black",

        textAlign: "center",
        lineHeight: hp("6%"),

        // //debug
        // borderWidth: 1,
    },

    mainScrollView: {
        width: wp("100%"),
        height: hp("100%"),
        marginTop: hp("6%"), // To avoid header overlap

        // //debug
        // borderWidth: 1,
        // borderColor: "red",
    },
    
    scrollViewContent: {
        
        paddingHorizontal: wp("6%"),
        paddingVertical: hp("2%"),

        // //debug
        // borderWidth: 1,
        // borderColor: "darkred",
    },

    restaurantText: {
        
        fontSize: hp("2.4%"),
        fontWeight: "600",
        color: "black",

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
        width: wp("100%"),
        marginVertical: hp("1%"),
        marginHorizontal: -wp("6%"),
        height: hp("1.4%"),

        backgroundColor: "#eee",
        
    },

    labelText: {
        marginTop: hp("0.4%"),
        marginBottom: hp("1%"),

        fontWeight: "310",
        fontSize: hp("2.12%"),
    },

    selectionContainer: { 
        marginBottom: hp("2%"),

        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "space-between", 

        // //debug
        // borderWidth: 1,
    },

    quickSelectNoteView: {
        marginBottom: hp("2%"),
        marginTop: -hp("1.2%"),
        maxWidth: wp("88%"),
        minHeight: hp("8%"),
        
        // //debug
        // borderWidth: 1,
    },
    
    quickSelectNoteContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",

    },

    shortSelectorBox: {
        width: wp("40%"),
        height: hp("6%"),
        
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,

        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: wp("2.8%"),
        paddingHorizontal: wp("6%"),
    },

    longSelectorBox: {
        width: wp("88%"),
        height: hp("6%"),
        
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,

        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: wp("2.8%"),
        paddingHorizontal: wp("4%"),
        position: "relative",
    },

    shortSelectedText: {
        width: wp("22%"),

        fontSize: hp("2%"),
        color: "black",
        fontWeight: "450",

        // // debug
        // borderWidth: 1,
    },

    longSelectedText: {
        width: wp("70%"),

        fontSize: hp("2%"),
        color: "black",
        fontWeight: "450",

        // //debug
        // borderWidth: 1,
    },

    dropdownIcon: {
        position: "absolute",
        right: wp("4%"),
        top: hp("1.6%"),
        width: wp("8%"),
        height: hp("2.8%"),

        justifyContent: "center",
        alignItems: "center",

        // //debug
        // borderWidth: 1,
    },

    quickSelectCard: {
        marginRight: wp("2%"),

        borderWidth: 1.4,
        borderColor: "#ddd",
        borderRadius: 90,

        paddingHorizontal: wp("3.2%"),
        paddingVertical: hp("1.2%"),

    },

    reserveButton: {
        width: wp("88%"),
        height: hp("6%"),
        marginBottom: hp("2%"),

        backgroundColor: Color.primary,
        borderRadius: 8,

        justifyContent: "center",
        alignItems: "center",

        // //debug
        // borderWidth: 1,
    },

    reserveButtonText: {
        fontSize: hp("2.2%"),
        color: "white",
        fontWeight: "bold",
    },
});

