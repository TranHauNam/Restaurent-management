import { StyleSheet } from 'react-native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export const styles = StyleSheet.create({
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

    longSelectedText: {
        width: wp("70%"),

        fontSize: hp("2%"),
        color: "black",
        fontWeight: "450",

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

    quickSelectCard: {
        marginRight: wp("2%"),

        borderWidth: 1.4,
        borderColor: "#ddd",
        borderRadius: 90,

        paddingHorizontal: wp("3.2%"),
        paddingVertical: hp("1.2%"),

    },
});