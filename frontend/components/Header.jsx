import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { Typography } from '@/styles/Typography';
import { Color } from '@/styles/GlobalStyles';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



export const Header = ({ title, onBackPress, hasReturn }) => {
    return (
        <View style={styles.header}>
            {hasReturn && (
                <>
                    <TouchableOpacity style={styles.backBut} onPress={onBackPress}>
                        <MaterialIcons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                </>
            )}
            <Text style={[Typography.header5, styles.headerText]}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        height: hp("6%"),
        width: wp("100%"),
        position: "absolute",

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

        // //debug
        // borderWidth: 1, 
    },
    headerText: {
        
        textAlign: "center",
        color: Color.secondary,
        lineHeight: hp("6%"),

        // //debug
        // borderWidth: 1,
    },
});