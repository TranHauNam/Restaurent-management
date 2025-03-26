import * as React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
// import { Image } from "expo-image";
// import Frame from "../assets/frame.svg";
// import Icoutlinerefresh from "../assets/icoutlinerefresh.svg";
import { Color, FontFamily, Border, FontSize } from "@/styles/GlobalStyles";

const SubmitOTP = () => {
  return (
    <View style={styles.submitOtp}>
      <View style={[styles.rectangle, styles.rectanglePosition]} />
      <Text style={[styles.youWillGet, styles.youWillGetFlexBox]}>
        You will get a OTP regarding registeration on your provided medium.
      </Text>
      <Pressable style={styles.tablebooky} onPress={() => {}}>
        <Text style={[styles.text, styles.textClr]}>
          <Text style={styles.table}>Table</Text>
          <Text style={styles.bookyTypo}>Booky</Text>
        </Text>
      </Pressable>
      {/* <Frame
        style={[styles.frameIcon, styles.frameIconPosition]}
        width={375}
        height={83}
      /> */}
      <Text style={[styles.enterYourOtp, styles.bookyTypo]}>
        Enter Your OTP
      </Text>
      <Pressable
        style={[styles.signUpWrapper, styles.groupChild3Bg]}
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
      <View style={styles.groupParent}>
        <View
          style={[
            styles.youWillGetAmazingDiscountsParent,
            // styles.frameIconPosition,
          ]}
        >
          <Text
            style={[styles.youWillGetContainer, styles.youContainerPosition]}
          >
            <Text style={styles.table}>{`You will get amazing `}</Text>
            <Text style={styles.bookyTypo}>discounts</Text>
            <Text style={styles.text1}>{` `}</Text>
            <Text style={styles.table}>and</Text>
            <Text style={styles.text1}>{` `}</Text>
            <Text style={styles.bookyTypo}>offers</Text>
          </Text>
          <Text
            style={[styles.youWillGetContainer1, styles.youContainerPosition]}
          >
            <Text style={styles.table}>{`You will get `}</Text>
            <Text style={styles.bookyTypo}>points</Text>
            <Text style={styles.table}>{` `}</Text>
            <Text style={styles.bookyTypo}>on each booking</Text>
            <Text
              style={styles.table}
            >{` and you can use those points to get `}</Text>
            <Text style={styles.bookyTypo}>great discounts</Text>
            <Text style={styles.table}> on your next booking</Text>
          </Text>
          <Text style={styles.benifitsOfRegisteration}>
            Benifits of Registeration
          </Text>
          {/* <Image
            style={[styles.mdichevronDownIcon, styles.mdichevronIconLayout]}
            contentFit="cover"
            source={require("../assets/mdichevrondown.png")}
          />
          <Image
            style={[styles.mdichevronDownIcon1, styles.mdichevronIconLayout]}
            contentFit="cover"
            source={require("../assets/mdichevrondown1.png")}
          /> */}
        </View>
        <View style={[styles.groupChild, styles.groupLayout]} />
        <View style={[styles.groupItem, styles.groupLayout]} />
      </View>
      <View style={[styles.parent, styles.parentLayout]}>
        <Text style={[styles.text4, styles.textTypo]}>9</Text>
        <Text style={[styles.text5, styles.textTypo]}>9</Text>
        <Text style={[styles.text6, styles.textTypo]}>9</Text>
        <Text style={[styles.text7, styles.textTypo]}>9</Text>
        <View style={[styles.groupInner, styles.groupChildLayout]} />
        <View style={[styles.rectangleView, styles.groupChildLayout]} />
        <View style={[styles.groupChild1, styles.groupChildLayout]} />
        <View style={[styles.groupChild2, styles.groupChildLayout]} />
      </View>
      <View style={[styles.rectangleParent, styles.parentLayout]}>
        <View style={[styles.groupChild3, styles.parentLayout]} />
        {/* <Icoutlinerefresh
          style={styles.icoutlineRefreshIcon}
          width={25}
          height={25}
        /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rectanglePosition: {
    left: "0%",
    right: "0%",
    width: "100%",
  },
  youWillGetFlexBox: {
    textAlign: "left",
    color: Color.sub,
  },
  textClr: {
    color: Color.primary,
    textAlign: "left",
  },
//   frameIconPosition: {
//     left: 0,
//     position: "absolute",
//   },
  bookyTypo: {
    fontWeight: "700",
    fontFamily: FontFamily.segoeUI,
  },
  groupChild3Bg: {
    backgroundColor: Color.primary,
    borderRadius: Border.br_9xs,
  },
  signTypo: {
    lineHeight: hp('2.96%'), // 24 / 812 * 100
    fontSize: FontSize.size_base,
    fontWeight: "700",
    fontFamily: FontFamily.segoeUI,
  },
  youContainerPosition: {
    left: wp('6.67%'),
    textAlign: "left",
    color: Color.sub,
    fontSize: FontSize.size_xs,
    position: "absolute",
  },
//   mdichevronIconLayout: {
//     height: 10,
//     width: 10,
//     left: 4,
//     position: "absolute",
//   },
  groupLayout: {
    height: hp('0.12%'), // 1 / 812 * 100
    width: wp('83.47%'), // 313 / 375 * 100
    borderTopWidth: 0.7,
    borderColor: Color.primary,
    borderStyle: "solid",
    left: 0,
    position: "absolute",
  },
  parentLayout: {
    height: hp('6.16%'), // 50 / 812 * 100
    position: "absolute",
  },
  textTypo: {
    top: hp('1.97%'), // 16 / 812 * 100
    fontSize: FontSize.size_sm,
    fontWeight: "600",
    textAlign: "left",
    color: Color.sub,
    fontFamily: FontFamily.segoeUI,
    position: "absolute",
  },
  groupChildLayout: {
    height: hp('6.28%'), // 51 / 812 * 100
    borderWidth: 0.7,
    borderColor: Color.sub,
    top: -1,
    width: "20.98%",
    borderStyle: "solid",
    borderRadius: Border.br_9xs,
    position: "absolute",
  },
  rectangle: {
    height: "100%",
    top: 0,
    bottom: 0,
    backgroundColor: Color.secondary,
    position: "absolute",
  },
  youWillGet: {
    top: hp('21.92%'), // 178 / 812 * 100
    width: wp('82.93%'), // 311 / 375 * 100
    fontFamily: FontFamily.segoeUI,
    fontSize: FontSize.size_xs,
    textAlign: "left",
    color: Color.sub,
    left: wp('8.53%'), // 32 / 375 * 100
    position: "absolute",
  },
  table: {
    fontFamily: FontFamily.segoeUI,
  },
  text: {
    fontSize: wp('6.4%'), // 24 / 375 * 100
    lineHeight: hp('3.94%'), // 32 / 812 * 100
  },
  tablebooky: {
    left: wp('32.8%'), // 123 / 375 * 100
    top: hp('6.16%'), // 50 / 812 * 100
    position: "absolute",
    
  },
//   frameIcon: {
//     top: 714,
//     opacity: 0.2,
//     overflow: "hidden",
//   },
  enterYourOtp: {
    top: hp('13.79%'), // 112 / 812 * 100
    left: wp('33.07%'), // 124 / 375 * 100
    fontSize: wp('4.8%'), // 18 / 375 * 100
    lineHeight: hp('4.43%'), // 36 / 812 * 100
    color: "#f7fcfd",
    textAlign: "center",
    position: "absolute",
  },
  signUp: {
    color: Color.secondary,
    textAlign: "center",
  },
  signUpWrapper: {
    top: hp('63.8%'), // 518 / 812 * 100
    left: wp('8.8%'), // 33 / 375 * 100
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // paddingHorizontal: 169,
    // paddingVertical: 8,
    width: wp('82.9%'), // 311 / 375 * 100
    height: hp('4.92%'), // 40 / 812 * 100
    position: "absolute",
  },
  alreadyAUser: {
    top: 0,
    left: 0,
    position: "absolute",
    textAlign: "left",
    color: Color.sub,
  },
  signIn1: {
    textDecoration: "underline",
    color: Color.primary,
    textAlign: "left",
  },
  signIn: {
    left: wp('34.13%'), // 128 / 375 * 100
    top: 0,
    position: "absolute",
  },
  alreadyAUserParent: {
    top: hp('71.18%'), // 578 / 812 * 100
    left: wp('28.53%'), // 107 / 375 * 100
    width: wp('48%'), // 180 / 375 * 100
    height: hp('2.96%'), // 24 / 812 * 100
    position: "absolute",
  },
  text1: {
    fontWeight: "600",
    fontFamily: FontFamily.segoeUI,
  },
  youWillGetContainer: {
    top: hp('11.33%'), // 92 / 812 * 100
    width: wp('71.2%'), // 267 / 375 * 100
  },
  youWillGetContainer1: {
    top: hp('4.19%'), // 34 / 812 * 100
    width: wp('76.27%'), // 286 / 375 * 100
  },
  benifitsOfRegisteration: {
    fontSize: FontSize.size_sm,
    fontWeight: "600",
    top: 0,
    left: 0,
    textAlign: "left",
    color: Color.sub,
    fontFamily: FontFamily.segoeUI,
    position: "absolute",
  },
//   mdichevronDownIcon: {
//     top: 37,
//   },
//   mdichevronDownIcon1: {
//     top: 95,
//   },
  youWillGetAmazingDiscountsParent: {
    top: hp('2.46%'), // 20 / 812 * 100
    height: hp('13.3%'), // 108 / 812 * 100
    width: wp('82.93%'), // 311 / 375 * 100
  },
  groupChild: {
    top: hp('19.46%'), // 158 / 812 * 100
  },
  groupItem: {
    top: 0,
  },
  groupParent: {
    top: hp('40.64%'), // 330 / 812 * 100
    width: wp('83.2%'), // 312 / 375 * 100
    height: hp('19.46%'), // 158 / 812 * 100
    left: wp('8.53%'), // 32 / 375 * 100
    position: "absolute",
  },
  text4: {
    left: wp('5.33%'), // 20 / 375 * 100
  },
  text5: {
    left: wp('22.93%'), // 86 / 375 * 100
  },
  text6: {
    left: wp('40.53%'), // 152 / 375 * 100
  },
  text7: {
    left: wp('57.6%'), // 216 / 375 * 100
  },
  groupInner: {
    right: "79.31%",
    left: "-0.29%",
  },
  rectangleView: {
    right: "52.78%",
    left: "26.24%",
  },
  groupChild1: {
    right: "26.24%",
    left: "52.78%",
  },
  groupChild2: {
    right: "-0.29%",
    left: "79.31%",
  },
  parent: {
    width: wp('65.33%'), // 245 / 375 * 100
    top: hp('29.56%'), // 240 / 812 * 100
    height: hp('6.16%'), // 50 / 812 * 100
    left: wp('8.53%'), // 32 / 375 * 100
  },
  groupChild3: {
    top: 0,
    backgroundColor: Color.primary,
    borderRadius: Border.br_9xs,
    left: "0%",
    right: "0%",
    width: "100%",
  },
//   icoutlineRefreshIcon: {
//     top: 13,
//     left: 12,
//     position: "absolute",
//     overflow: "hidden",
//   },
  rectangleParent: {
    width: "13.33%",
    right: "8.8%",
    left: "77.87%",
    top: hp('29.56%'), // 240 / 812 * 100
    height: hp('6.16%'), // 50 / 812 * 100
  },
  submitOtp: {
    backgroundColor: Color.white,
    flex: 1,
    height: hp('100%'), // 812 / 812 * 100
    overflow: "hidden",
    width: "100%",
  },
});

export default SubmitOTP;