import { StyleSheet } from 'react-native';


import { 
    Color, FontSize,
    screenWidthSAV, marginLeftSAV, marginTopSAV,   
} from '@/styles/GlobalStyles';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: screenWidthSAV,
        marginTop: marginTopSAV,
        marginLeft: marginLeftSAV,

        backgroundColor: Color.white,

        flexDirection: "column",
        justifyContent: "flex-start",
        position: "relative",
        
        // //debug
        // borderWidth: 1,
    },

    mainLayout: {
        // //debug
        // borderWidth: 1,
    },

    mainContainer: {
        //debug
        // borderWidth: 1,
        // borderColor: "red",
    },

    smallBoxContainer: {
        marginHorizontal: wp("4%"), 
        marginTop: hp("1.6%"),
        backgroundColor: Color.white,
    },

    paymentContainer: {

        flexDirection: "column",
        justifyContent: "flex-start",

        paddingHorizontal: wp("4%"),
        paddingVertical: hp("2%"),
    },
    
    payBoxHeader: {

    },

    insideBox: {
        marginTop: hp("1.2%"),

        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // paddingLeft: wp("6%"),
        // paddingRight: wp("4%"),
        paddingVertical: hp("0.4%"),
    },

    menuItemContainer: {
        width: screenWidthSAV - wp("8%"),
        height: hp("8%"),

        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // paddingHorizontal: wp("4%"),
        paddingVertical: hp("1.2%"),

        // //debug
        // borderWidth: 1,

    },

    menuInforContainer: {

        flexDirection: "row",
        justifyContent: "flex-start",
        gap: wp("1.6%"),
    },

    menuItemImage: {
        width: wp("12.8%"),
        height: hp("6.4%"),

        borderRadius: 8,

        //debug
        borderWidth: 1,
    },

    payLaberText: {
        fontSize: FontSize.size_m,
    },

    payValueText: {
        fontSize: FontSize.size_m,

    },

    timeLabelText: {
        fontSize: FontSize.size_s,
        color: Color.tertiary,
    },

    calculateDivideLine: {
        width: wp("90%"),
        height: 2,

        alignSelf: "center",
        backgroundColor: Color.sub,
        marginVertical: hp("1.4%"),
        
    },

    boxDivider: {
        width: wp("100%"),
        marginVertical: hp("1%"),
        alignSelf: "center",
        height: hp("1.4%"),

        backgroundColor: "#eee",
        
    },

    itemDivider: {
        marginBottom: hp("0.4%"),
        width: wp("90%"), 

        height: 1, 
        backgroundColor: "#ccc", 
        alignSelf: "center", 
    },
});