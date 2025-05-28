import { StyleSheet } from 'react-native';

import { Color, FontFamily, FontSize, Border } from "@/styles/GlobalStyles";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export const Typography = StyleSheet.create({
  header1: {
    lineHeight: hp('8%'),
    fontFamily: 'Roboto-Black',
    fontSize: hp('6%'),
    letterSpacing: wp('0.6%'),

    // //debug
    // borderWidth: 1,
  },
  header2: {
    fontFamily: 'Roboto-ExtraBold',
    fontSize: hp('4.8%'),
    lineHeight: hp('6%'),
    letterSpacing: wp('0.4%'),

    // //debug
    // borderWidth: 1,
  },
  header3: {
    fontFamily: 'Roboto-Bold',
    fontSize: hp('4%'),
    lineHeight: hp('4.8%'),
    letterSpacing: wp('0.32%'),

    // //debug
    // borderWidth: 1,
  },
  header4: {
    fontFamily: 'Roboto-SemiBold',
    fontSize: hp('3.2%'),
  },
  header5: {
    fontFamily: 'Roboto-SemiBold',
    fontSize: hp('2.4%'),
  },
  header6: {
    fontFamily: 'Roboto-Medium',
    fontSize: hp('2%'),
  },

  paragraph: {
    fontFamily: 'Roboto-Regular',
    fontSize: hp('2%'),
    lineHeight: hp('3%'),
  },
  label: {
    fontFamily: 'Roboto-Light',
    fontSize: hp('2%'),
    color: '#333',
  },
 
  button: {
    marginVertical: hp('1.6%'),
    marginHorizontal: wp('4%'),
    fontFamily: 'Roboto-Black',
    fontSize: hp('2.4%'),
    lineHeight: hp('2.8%'),
    letterSpacing: wp('0.32%'),

    // //debug
    // borderWidth: 1,
  },
});