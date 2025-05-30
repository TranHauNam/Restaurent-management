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
        //debug
        borderWidth: 1,
    },

    mainContainer: {
        //debug
        borderWidth: 1,
        borderColor: "red",
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
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: wp("6%"),
        paddingRight: wp("4%"),
        paddingVertical: hp("0.4%"),
    },

    payLaberText: {

    },

    payValueText: {
        fontSize: FontSize.size_m,

    },

    calculateDivideLine: {
        width: wp("80%"),
        height: 2,

        alignSelf: "center",
        backgroundColor: Color.sub,
        marginVertical: hp("1.4%"),
        
    },
});