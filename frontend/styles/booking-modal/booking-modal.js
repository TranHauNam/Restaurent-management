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
        fontWeight: "440",
        color: "black",

        // //debug
        // borderWidth: 1,
    },

    restaurantBox: {
        width: wp("88%"),
        height: hp("18%"),
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
});

