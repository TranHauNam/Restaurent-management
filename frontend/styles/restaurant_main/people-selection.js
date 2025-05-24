import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export const styles = StyleSheet.create({
    darkOpacityBackground: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        
        justifyContent: "flex-end",
    },

    whiteSmallScreen: {
        width: "100%",
        height: "40%",

        backgroundColor: "white",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,

        flexDirection: "column",
    },

    headerText: {
        width: wp("70%"),

        marginTop: 20, 
        marginLeft: 30,
        marginBottom: 10,

        fontSize: 20, 
        fontWeight: "bold", 
    },

    quickPeopleSelectBut:{
        margin: 4,

        backgroundColor: "white",         
        borderRadius: 40, 

        padding: 10, 
    },

    contentContainer: {
        height: hp("32%"), 
        marginHorizontal: 20, 

        flexDirection: "column", 
        alignItems: "center", 
        justifyContent: "flex-start", 
    },

    quickScrollSelect: {
        flexDirection: "row", 
        flexWrap: "wrap", 
        justifyContent: "flex-start", 
        alignItems: "center",
    },

    textInput: {
        marginTop: 20,
        marginBottom: 20,
        height: hp("6%"),
        width: wp("84%"),

        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 10,

        paddingLeft: 10,
    },

    confirmButton: {
        width: wp("84%"),
        height: hp("6%"),
        marginTop: 4,

        backgroundColor: "orange",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",

        padding: 10,
    },

    confirmButText: {
        fontSize: 16,
        color: "white",
        fontWeight: "bold",
    },
});