import { View, Text, StyleSheet, TextInput, Pressable, } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Color, FontFamily, Border, FontSize } from "@/styles/GlobalStyles"

export default function SignUpEmail() {

  return (
    <View style={styles.rootContainer}>
      {/* <View style={styles.rectangle} /> */}

      <Pressable style={styles.logoContainer} onPress={() => {}}>
        <Text style={[styles.textLogo, styles.textFlexBox]}>
          <Text style={styles.table}>Table</Text>
          <Text style={styles.boldFont}>Booky</Text>
        </Text>
      </Pressable>

      {/* <Frame style={styles.frameIcon} width={375} height={83} />  */}

      <Text style={[styles.letsGetYou, styles.boldFont]}>
        Let’s get you started
      </Text>

      <View style={[styles.fullNameContainer, styles.guidTextContainerAbsolutePosition]}>
        <Text style={[styles.textNormalFormat, styles.textFlexBox]}>Full name</Text>
        <View style={styles.inputContainer}>
          <View style={[styles.customBorder, styles.customBorderLayout]} /> 
          <TextInput style={[styles.inputTextContainter, styles.inputTextLayout]} placeholder='Thanh Nguyen' />
        </View>
      </View>

      <View style={[styles.emailAddressContainer, styles.guidTextContainerAbsolutePosition]}>
        <Text style={[styles.textNormalFormat, styles.textFlexBox]}>Email address</Text>
        <View style={styles.inputContainer}>
          <View style={[styles.customBorder, styles.customBorderLayout]} />
          <TextInput style={[styles.inputTextContainter, styles.inputTextLayout]} placeholder='it.nguyenducthanh@gmail.com' />
        </View>
      </View>

      <View style={[styles.confirmPasswordContainer, styles.guidTextContainerAbsolutePosition]}>
        <Text style={[styles.textNormalFormat, styles.textFlexBox]}>
          Confirm password
        </Text>
        <View style={styles.inputContainer}>
          <View style={[styles.customBorder, styles.customBorderLayout]} /> 
          <TextInput style={[styles.inputTextContainter, styles.inputTextLayout]} placeholder='' />
        </View>
        {/* <Group8093 style={styles.inputContainer} width={311} height={40} /> */}
      </View>

      <View style={[styles.createPasswordContainer, styles.guidTextContainerAbsolutePosition]}>
        <Text style={[styles.textNormalFormat, styles.textFlexBox]}>
          Create password
        </Text>
        <View style={styles.inputContainer}>
          <View style={[styles.customBorder, styles.customBorderLayout]} /> 
          <TextInput style={[styles.inputTextContainter, styles.inputTextLayout]} placeholder='' />
        </View>
        {/* <Group80931 style={styles.inputContainer} width={311} height={40} /> */}
      </View>


      <View
        style={[
          styles.passwordMustContainAMinimuParent,
          styles.passwordParentPosition,
        ]}
      >
        <Text style={[styles.passwordMustContain, styles.inputTextLayout]}>
          Password must contain a minimum of 8 characters
        </Text>
        <Text style={[styles.passwordMustContain1, styles.inputTextLayout]}>
          Password must contain at least one symbol e.g. @, !
        </Text>
      </View>

      <Pressable
        style={[styles.signUpWrapper, styles.customBorderLayout]}
        onPress={() => {}}
      >
        <Text style={[styles.signUp, styles.signTypo]}>Sign Up</Text>
      </Pressable>

      <View style={styles.alreadyAUserParent}>
        <Text style={[styles.alreadyAUser, styles.signTypo]}>
          Already a user?
        </Text>
        <Pressable style={styles.signIn} onPress={() => {}}>
          <Text style={[styles.signIn1, styles.signTypo]}>Sign in</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  textFlexBox: {
    textAlign: 'left',
    // color: Color.primary,
  },
  boldFont: {
    fontWeight: '700',
    fontFamily: FontFamily.segoeUI,
  },
  guidTextContainerAbsolutePosition: {
    position: 'absolute',
  },
  inputTextLayout: {
    // color: Color.sub,
    fontColor: Color.secondary,
    width: wp('73.33%'), // 275 / 375 * 100
    textAlign: 'left',
    position: 'absolute', 
  },
  customBorderLayout: {
    borderRadius: Border.br_9xs,
    width: wp('82.93%'), // 311 / 375 * 100
    position: 'absolute',
  },
  // passwordParentPosition: {
  //   // display: 'none',
  //   position: 'absolute',
  // },
  signTypo: {
    lineHeight: hp('2.96%'), // 24 / 812 * 100
    fontSize: FontSize.size_base,
    fontWeight: '700',
    fontFamily: FontFamily.segoeUI,
  },
  // rectangle: {
  //   height: '100%',
  //   top: 0,
  //   right: 0,
  //   bottom: 0,
  //   left: 0,
  //   backgroundColor: Color.white,
  //   position: 'absolute',
  //   width: '100%',
  // },
  table: {
    fontFamily: FontFamily.segoeUI,
  },
  textLogo: {
    fontSize: wp('6.4%'), // 24 / 375 * 100
    lineHeight: hp('3.94%'), // 32 / 812 * 100
    color: Color.primary,
  },
  logoContainer: {
    left: wp('32.8%'), // 123 / 375 * 100
    top: hp('6.16%'), // 50 / 812 * 100
    position: 'absolute',
  },
  frameIcon: {
    top: hp('87.93%'), // 714 / 812 * 100
    opacity: 0.2,
    left: 0,
    position: 'absolute',
    overflow: 'hidden',
  },
  letsGetYou: {
    top: hp('13.79%'), // 112 / 812 * 100
    left: wp('27.2%'), // 102 / 375 * 100
    fontSize: wp('4.8%'), // 18 / 375 * 100
    lineHeight: hp('4.43%'), // 36 / 812 * 100
    color: Color.secondary,
    textAlign: 'center',
    position: 'absolute',
  },
  textNormalFormat: {
    fontSize: FontSize.size_sm,
    lineHeight: hp('2.46%'), // 20 / 812 * 100
    top: 0,
    left: 0,
    fontFamily: FontFamily.segoeUI,
    position: 'absolute',
  },
  inputTextContainter: {
    top: hp('1.48%'), // 12 / 812 * 100
    left: wp('4.27%'), // 16 / 375 * 100
    lineHeight: hp('1.97%'), // 16 / 812 * 100
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.segoeUI,
  },
  customBorder: {
    borderStyle: 'solid',
    borderColor: Color.sub,
    borderWidth: 0.7,
    height: hp('4.93%'), // 40 / 812 * 100
    top: 0,
    left: 0,
  },
  inputContainer: {
    top: hp('3.45%'), // 28 / 812 * 100
    left: 0,
    position: 'absolute',
  },
  fullNameContainer: {
    top: hp('32.76%'), // 266 / 812 * 100
    height: hp('8.37%'), // 68 / 812 * 100
    width: wp('82.93%'), // 311 / 375 * 100
    left: wp('8.8%'), // 33 / 375 * 100
  },
  passwordMustContain: {
    lineHeight: hp('1.97%'), // 16 / 812 * 100
    fontSize: FontSize.size_xs,
    color: Color.sub,
    fontFamily: FontFamily.segoeUI,
    top: 0,
    left: 0,
  },
  passwordMustContain1: {
    top: hp('2.96%'), // 24 / 812 * 100
    lineHeight: hp('1.97%'), // 16 / 812 * 100
    fontSize: FontSize.size_xs,
    color: Color.sub,
    fontFamily: FontFamily.segoeUI,
    left: 0,
  },
  passwordMustContainAMinimuParent: {
    top: hp('65.27%'), // 530 / 812 * 100
    left: wp('9.07%'), // 34 / 375 * 100
    width: wp('73.33%'), // 275 / 375 * 100
    height: hp('4.93%'), // 40 / 812 * 100
  },
  emailAddressContainer: {
    top: hp('21.92%'), // 178 / 812 * 100
    height: hp('8.37%'), // 68 / 812 * 100
    width: wp('82.93%'), // 311 / 375 * 100
    left: wp('8.8%'), // 33 / 375 * 100
  },
  confirmPasswordContainer: {
    top: hp('54.43%'), // 442 / 812 * 100
    height: hp('8.37%'), // 68 / 812 * 100
    width: wp('82.93%'), // 311 / 375 * 100
    left: wp('8.8%'), // 33 / 375 * 100
  },
  createPasswordContainer: {
    top: hp('43.6%'), // 354 / 812 * 100
    height: hp('8.37%'), // 68 / 812 * 100
    width: wp('82.93%'), // 311 / 375 * 100
    left: wp('8.8%'), // 33 / 375 * 100
  },
  signUp: {
    color: Color.secondary,
    textAlign: 'center',
  },
  signUpWrapper: {
    height: hp('4.92%'), 
    top: hp('71.66%'), // 590 / 812 * 100
    backgroundColor: Color.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // paddingHorizontal: wp('45.07%'), // 169 / 375 * 100
    // paddingVertical: hp('0.99%'), // 8 / 812 * 100
    left: wp('8.8%'), // 33 / 375 * 100
    borderRadius: Border.br_9xs,
  },
  alreadyAUser: {
    color: Color.sub,
    textAlign: 'left',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  signIn1: {
    textDecoration: 'underline',
    textAlign: 'left',
    color: Color.primary,
  },
  signIn: {
    left: wp('31%'), // 128 / 375 * 100
    top: 0,
    position: 'absolute',
  },
  alreadyAUserParent: {
    top: hp('77.58%'), // 630 / 812 * 100 = 
    left: wp('28.0%'), //
    width: wp('48%'), // 180 / 375 * 100
    height: hp('2.96%'), // 24 / 812 * 100
    position: 'absolute',
  },
  rootContainer: {
    backgroundColor: Color.white,
    flex: 1,
    height: hp('100%'), // 812 / 812 * 100
    overflow: 'hidden',
    width: wp('100%'), // 375 / 375 * 100
  },
})
