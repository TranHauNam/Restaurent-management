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
        alignItems: "center",
        position: "relative",
        
        // //debug
        // borderWidth: 1,
    },
    
});