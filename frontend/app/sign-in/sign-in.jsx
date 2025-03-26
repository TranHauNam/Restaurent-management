import * as React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
// import Frame from "../assets/frame.svg";
// import Icoutlinerefresh from "../assets/icoutlinerefresh.svg";
import { useNavigation } from "@react-navigation/native";
import { Padding, Color, Border, FontSize, FontFamily } from "@/styles/GlobalStyles";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const SignIn = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.signIn}>
      <View style={styles.rectangle} />
      <Pressable
        style={[styles.tablebooky, styles.tablebookyPosition]}
        onPress={() => {}}
      >
        <Text style={styles.text}>
          <Text style={styles.table}>Table</Text>
          <Text style={styles.booky}>Booky</Text>
        </Text>
      </Pressable>
      {/* <Frame style={styles.frameIcon} width={375} height={83} /> */}
      <Text style={[styles.welcomeBackSignContainer, styles.signTypo]}>
        <Text style={styles.welcomeBack}>Welcome Back ,</Text>
        <Text style={styles.signIn1}>Sign In</Text>
      </Text>
      <Pressable
        style={[styles.signInWrapper, styles.wrapperFlexBox]}
        onPress={() => {}}
      >
        <Text style={[styles.signIn2, styles.text1Typo]}>Sign in</Text>
      </Pressable>
      <View style={styles.dontHaveAnAccountParent}>
        <Text style={[styles.dontHaveAn, styles.text1Typo]}>
          Don,t have an account?
        </Text>
        <Text style={styles.signUp}>Sign Up</Text>
      </View>
      <Pressable
        style={[styles.continueAsGuestContainer, styles.tablebookyPosition]}
        onPress={() => {}}
      >
        <Text style={[styles.text1, styles.text1Typo]}>
          <Text style={styles.continueAs}>{`Continue as `}</Text>
          <Text style={styles.signIn1}>Guest</Text>
        </Text>
      </Pressable>
      <View style={[styles.signInChild, styles.groupItemBorder]} />
      <View style={styles.emailOrPhoneNumberParent}>
        <Text style={[styles.emailOrPhone, styles.emailOrPhoneTypo]}>
          Email or Phone Number
        </Text>
        <View style={styles.bobsmithgmailcomParent}>
          <Text style={[styles.bobsmithgmailcom, styles.bobsmithgmailcomTypo]}>
            Bob.Smith@gmail.com
          </Text>
          <View style={styles.groupChild} />
        </View>
      </View>
      <View style={styles.rectangleParent}>
        <View style={[styles.groupItem, styles.groupItemBorder]} />
        <Text style={[styles.iAgreeToContainer, styles.bobsmithgmailcomTypo]}>
          <Text style={styles.iAgreeTo}>
            <Text style={styles.continueAs}>I agree to</Text>
          </Text>
          <Text style={styles.signIn1}>
            <Text style={styles.iAgreeTo}>{` `}</Text>
            <Text style={styles.privacyPolicyTypo}>{`Terms & Conditions`}</Text>
          </Text>
          <Text style={styles.continueAs}>
            <Text style={styles.table}>{` `}</Text>
            <Text style={styles.table}>and</Text>
            <Text style={styles.table}>{` `}</Text>
          </Text>
          <Text style={[styles.privacyPolicy, styles.privacyPolicyTypo]}>
            privacy Policy
          </Text>
        </Text>
      </View>
      <Pressable style={styles.forgotPassword} onPress={() => {}}>
        <Text style={styles.forgotPassword1}>Forgot Password?</Text>
      </Pressable>
      <Text style={[styles.enterOtpRecieved, styles.emailOrPhoneTypo]}>
        Enter OTP Recieved
      </Text>
      <View style={[styles.parent, styles.groupLayout]}>
        <Text style={[styles.text5, styles.textTypo]}>9</Text>
        <Text style={[styles.text6, styles.textTypo]}>9</Text>
        <Text style={[styles.text7, styles.textTypo]}>9</Text>
        <Text style={[styles.text8, styles.textTypo]}>9</Text>
        <View style={[styles.groupInner, styles.groupChildLayout]} />
        <View style={[styles.rectangleView, styles.groupChildLayout]} />
        <View style={[styles.groupChild1, styles.groupChildLayout]} />
        <View style={[styles.groupChild2, styles.groupChildLayout]} />
      </View>
      <View style={[styles.rectangleGroup, styles.groupLayout]}>
        <View style={[styles.groupChild3, styles.groupLayout]} />
        {/* <Icoutlinerefresh
          style={styles.icoutlineRefreshIcon}
          width={25}
          height={25}
        /> */}
      </View>
      <Pressable
        style={[styles.sendOtpWrapper, styles.wrapperFlexBox]}
        onPress={() => navigation.navigate("SignIn")}
      >
        <Text style={[styles.signIn2, styles.text1Typo]}>Send OTP</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  tablebookyPosition: {
    left: wp('32.8%'), // 123 / 375
    position: "absolute",
  },
  signTypo: {
    textAlign: "center",
    fontWeight: "700",
  },
  wrapperFlexBox: {
    // paddingVertical: hp('0.98%'),
    // paddingHorizontal: wp('45.0%'),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: wp('82.93%'), // 311 / 375
    height: hp('4.92'), // 40 / 812
    backgroundColor: Color.primary,
    borderRadius: Border.br_9xs,
    position: "absolute",
  },
  text1Typo: {
    lineHeight: hp('2.96%'), // 24 / 812
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.segoeUI,
  },
  groupItemBorder: {
    borderStyle: "solid",
    position: "absolute",
  },
  emailOrPhoneTypo: {
    lineHeight: hp('2.46%'), // 20 / 812
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.segoeUI,
    textAlign: "left",
    color: Color.primary,
    position: "absolute",
  },
  bobsmithgmailcomTypo: {
    fontSize: FontSize.size_xs,
    textAlign: "left",
    position: "absolute",
  },
  privacyPolicyTypo: {
    fontStyle: "italic",
    fontFamily: FontFamily.segoeUI,
  },
  groupLayout: {
    height: hp('6.15%'), // 50 / 812
    position: "absolute",
  },
  textTypo: {
    top: hp('1.97%'), // 16 / 812
    fontWeight: "600",
    fontSize: FontSize.size_sm,
    color: Color.sub,
    fontFamily: FontFamily.segoeUI,
    textAlign: "left",
    position: "absolute",
  },
  groupChildLayout: {
    height: hp('6.28%'), // 51 / 812
    top: hp('-0.12%'), // -1 / 812
    width: "20.98%", // do not change this
    borderWidth: 0.7,
    borderColor: Color.sub,
    borderStyle: "solid",
    borderRadius: Border.br_9xs,
    position: "absolute",
  },
  rectangle: {
    height: "100%", // do not change this
    top: 0,
    bottom: 0,
    backgroundColor: Color.secondary,
    left: 0,
    right: 0,
    position: "absolute",
    width: "100%", // do not change this
  },
  table: {
    fontFamily: FontFamily.segoeUI,
  },
  booky: {
    fontWeight: "700",
    fontFamily: FontFamily.segoeUI,
  },
  text: {
    fontSize: hp('2.96%'), // 24 / 812
    lineHeight: hp('3.94%'), // 32 / 812
    textAlign: "left",
    color: Color.primary,
  },
  tablebooky: {
    top: hp('6.15%'), // 50 / 812
  },
//   frameIcon: {
//     top: 714,
//     opacity: 0.2,
//     left: 0,
//     position: "absolute",
//     overflow: "hidden",
//   },
  welcomeBack: {
    color: "#f7fcfd",
  },
  signIn1: {
    color: Color.primary,
  },
  welcomeBackSignContainer: {
    top: hp('15.02%'), // 122 / 812
    left: wp('24.53%'), // 92 / 375
    fontSize: hp('2.21%'), // 18 / 812
    lineHeight: hp('4.43%'), // 36 / 812
    fontFamily: FontFamily.segoeUI,
    position: "absolute",
  },
  signIn2: {
    color: Color.secondary,
    textAlign: "center",
    fontWeight: "700",
  },
  signInWrapper: {
    top: hp('59.11%'), // 480 / 812
    left: wp('8.8%'), // 33 / 375
  },
  dontHaveAn: {
    color: Color.sub,
    top: 0,
    left: 0,
    fontWeight: "700",
    textAlign: "left",
    position: "absolute",
  },
  signUp: {
    left: wp('47.47%'), // 178 / 375
    textDecoration: "underline", 
    top: 0,
    lineHeight: hp('2.96%'), // 24 / 812
    fontSize: FontSize.size_base,
    fontWeight: "700",
    fontFamily: FontFamily.segoeUI,
    textAlign: "left",
    color: Color.primary,
    position: "absolute",
  },
  dontHaveAnAccountParent: {
    top: hp('66.5%'), // 540 / 812
    left: wp('18.4%'), // 69 / 375
    width: wp('63.47%'), // 238 / 375
    height: hp('2.96%'), // 24 / 812
    position: "absolute",
  },
  continueAs: {
    color: Color.sub,
  },
  text1: {
    textAlign: "left",
  },
  continueAsGuestContainer: {
    top: hp('78.57%'), // 638 / 812
  },
  signInChild: {
    top: hp('71.92%'), // 584 / 812
    left: wp('8%'), // 30 / 375
    borderColor: Color.primary,
    borderTopWidth: 1,
    width: wp('84.53%'), // 317 / 375
    height: hp('0.12%'), // 1 / 812
  },
  emailOrPhone: {
    top: 0,
    left: 0,
  },
  bobsmithgmailcom: {
    top: hp('1.48%'), // 12 / 812
    left: wp('4.27%'), // 16 / 375
    lineHeight: 16,
    color: Color.sub,
    fontFamily: FontFamily.segoeUI,
  },
  groupChild: {
    borderWidth: 0.7,
    borderColor: Color.sub,
    height: hp('4.93%'), // 40 / 812
    borderStyle: "solid",
    top: 0,
    width: wp('82.93%'), // 311 / 375
    borderRadius: Border.br_9xs,
    left: 0,
    position: "absolute",
  },
  bobsmithgmailcomParent: {
    top: hp('3.45%'), // 28 / 812
    height: hp('4.93%'), // 40 / 812
    width: wp('82.93%'), // 311 / 375
    left: 0,
    position: "absolute",
  },
  emailOrPhoneNumberParent: {
    top: hp('21.92%'), // 178 / 812
    height: hp('8.37%'), // 68 / 812
    width: wp('82.93%'), // 311 / 375
    left: wp('8.8%'), // 33 / 375
    position: "absolute",
  },
  groupItem: {
    top: hp('0.49%'), // 4 / 812
    borderRadius: 2,
    borderColor: "#000",
    borderWidth: 0.5,
    width: wp('2.93%'), // 11 / 375
    height: hp('1.35%'), // 11 / 812
    left: 0,
    backgroundColor: Color.white,
    borderStyle: "solid",
  },
  iAgreeTo: {
    fontWeight: "300",
    fontFamily: FontFamily.segoeUI,
  },
  privacyPolicy: {
    color: Color.primary,
  },
  iAgreeToContainer: {
    left: wp('5.33%'), // 20 / 375
    top: 0,
  },
  rectangleParent: {
    top: hp('53.45%'), // 434 / 812
    width: wp('72.53%'), // 272 / 375
    height: hp('1.97%'), // 16 / 812
    left: wp('8.8%'), // 33 / 375
    position: "absolute",
  },
  forgotPassword1: {
    fontWeight: "600",
    textDecoration: "underline",
    color: Color.sub,
    lineHeight: hp('2.96%'), // 24 / 812
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.segoeUI,
    textAlign: "left",
  },
  forgotPassword: {
    left: wp('33.07%'), // 124 / 375
    top: hp('73.77%'), // 599 / 812
    position: "absolute",
  },
  enterOtpRecieved: {
    top: hp('41.38%'), // 336 / 812
    left: wp('9.07%'), // 34 / 375
  },
  text5: {
    left: wp('5.33%'), // 20 / 375
  },
  text6: {
    left: wp('22.93%'), // 86 / 375
  },
  text7: {
    left: wp('40.53%'), // 152 / 375
  },
  text8: {
    left: wp('57.6%'), // 216 / 375
  },
  groupInner: {
    right: "79.31%", // do not change this
    left: "-0.29%", // do not change this
  },
  rectangleView: {
    right: "52.78%", // do not change this
    left: "26.24%", // do not change this
  },
  groupChild1: {
    right: "26.24%", // do not change this
    left: "52.78%", // do not change this
  },
  groupChild2: {
    right: "-0.29%", // do not change this
    left: "79.31%", // do not change this
  },
  parent: {
    width: wp('65.33%'), // 245 / 375
    top: hp('44.83%'), // 364 / 812
    height: hp('6.15%'), // 50 / 812
    left: wp('9.07%'), // 34 / 375
  },
  groupChild3: {
    top: 0,
    height: hp('6.15%'), // 50 / 812
    backgroundColor: Color.primary,
    borderRadius: Border.br_9xs,
    left: "0%", // do not change this
    right: "0%", // do not change this
    width: "100%", // do not change this
  },
//   icoutlineRefreshIcon: {
//     top: 15,
//     left: 12,
//     position: "absolute",
//     overflow: "hidden",
//   },
  rectangleGroup: {
    width: "13.33%", // do not change this
    right: "8.27%", // do not change this
    left: "78.4%", // do not change this
    top: hp('44.83%'), // 364 / 812
    height: hp('6.15%'), // 50 / 812
  },
  sendOtpWrapper: {
    top: hp('32.76%'), // 266 / 812
    left: wp('8.53%'), // 32 / 375
  },
  signIn: {
    flex: 1,
    height: hp('100%'), // 812 / 812
    overflow: "hidden",
    width: "100%", // do not change this
    backgroundColor: Color.white,
  },
});

export default SignIn;