import React from 'react';
import { StyleSheet } from 'react-native';

import { 
    Color, 
    marginLeftSAV, 
    marginTopSAV, 
    screenWidthSAV 
} from '@/styles/GlobalStyles';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: marginTopSAV,
        width: screenWidthSAV,
        marginLeft: marginLeftSAV,
        backgroundColor: Color.white,
    
        flexDirection: "column",
        justifyContent: "flex-start",
        position: "relative",
    
        // //debug
        // borderWidth: 1,
    },

    mapContainer: {
        flex: 1,
        //debug
        borderWidth: 1,
    },

    map: {
        flex: 1,
    },
})