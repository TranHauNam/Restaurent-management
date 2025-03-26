import * as React from "react";
import { Text, StyleSheet, View, Pressable, Image } from "react-native";
// import { Image } from "expo-image";
// import Clarityhomeline from "../assets/clarityhomeline.svg";
import { useNavigation } from "@react-navigation/native";
// import Materialsymbolsinfo from "../assets/materialsymbolsinfo.svg";
// import Ellipse53 from "../assets/ellipse-53.svg";
// import Camera from "../assets/camera.svg";
// import Clarityhomeline1 from "../assets/clarityhomeline1.svg";
// import Icsharpmorehoriz from "../assets/icsharpmorehoriz.svg";
// import Rinotification3line from "../assets/rinotification3line.svg";
// import Materialsymbolshistory from "../assets/materialsymbolshistory.svg";
// import Cilaccountlogout from "../assets/cilaccountlogout.svg";
import { FontFamily, FontSize, Padding, Border, Color } from "@/styles/GlobalStyles";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';



const Moreprofile = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.moreprofile}>
      <Text style={[styles.yourProfile, styles.bobSmithTypo]}>
        Your Profile
      </Text>
      <View style={styles.moreprofileChild} />
      <View style={styles.moreprofileItem} />
      <View style={styles.rectangleParent}>
        <View style={styles.groupChild} />
        {/* <Clarityhomeline
          style={styles.clarityhomeLineIcon}
          width={21}
          height={21}
        /> */}
        <Text style={styles.home}>Home</Text>
      </View>
      <Pressable
        style={[styles.mdichevronDown, styles.iconLayout1]}
        onPress={() => navigation.goBack()}
      >
        <Image
          style={[styles.icon, styles.iconLayout]}
          contentFit="cover"
          source={require("@/assets/images/image.png")}
        />
      </Pressable>
      <Image
        style={styles.moreprofileInner}
        contentFit="cover"
        source={require("@/assets/images/image.png")}
      />
      <View style={styles.bobSmithParent}>
        <Text style={[styles.bobSmith, styles.bobSmithTypo]}>Thanh Nguyen</Text>
        <Text style={styles.editProfile}>Edit Profile</Text>
        <Text style={[styles.text, styles.textTypo]}>+84 68688888</Text>
        <Text style={[styles.bobsmithemailcom, styles.textTypo]}>
          it.nguyenducthanh@gmail.com
        </Text>
      </View>
      <View style={[styles.logoutWrapper, styles.wrapperSpaceBlock]}>
        <Text style={[styles.logout, styles.logoutTypo]}>LogOut</Text>
      </View>
      <View style={styles.yourSavingsParent}>
        <Text style={[styles.yourSavings, styles.textTypo]}>
          <Text style={styles.your}>{`Your `}</Text>
          <Text style={styles.savings}>Savings</Text>
        </Text>
        <Text style={[styles.onYourRecent, styles.logoutTypo]}>
          on your recent Bookings
        </Text>
        <View style={[styles.groupItem, styles.groupPosition]} />
        <View style={[styles.groupInner, styles.groupPosition]} />
        <View style={[styles.dollarsWrapper, styles.wrapperSpaceBlock]}>
          <Text style={styles.dollars}>
            <Text style={[styles.text1, styles.textTypo]}>20</Text>
            <Text style={styles.text2}>{` `}</Text>
            <Text style={[styles.dollars1, styles.textTypo]}>Dollars</Text>
          </Text>
        </View>
        {/* <Materialsymbolsinfo
          style={[styles.materialSymbolsinfoIcon, styles.iconLayout1]}
          width={20}
          height={20}
        /> */}
      </View>
      {/* <Ellipse53
        style={[styles.ellipseIcon, styles.iconLayout1]}
        width={20}
        height={20}
      /> */}
      {/* <Camera style={styles.cameraIcon} width={12} height={12} /> */}
      <View style={styles.rectanglePosition}>
        <View style={[styles.rectangleView, styles.rectanglePosition]} />
        <View style={styles.groupChild1} />
        {/* <Clarityhomeline1
          style={[styles.clarityhomeLineIcon1, styles.lineIconPosition]}
          width={20}
          height={20}
        /> */}
        <Text style={[styles.home1, styles.home1FlexBox]}>Home</Text>
        <Text style={[styles.more, styles.moreTypo]}>More</Text>
        {/* <Icsharpmorehoriz
          style={[styles.icsharpMoreHorizIcon, styles.lineIconPosition]}
          width={20}
          height={20}
        /> */}
        <Text style={[styles.notifications, styles.home1FlexBox]}>
          Notifications
        </Text>
        <Pressable
          style={[styles.rinotification3Line, styles.lineIconPosition]}
          onPress={() => {}}
        >
          {/* <Rinotification3line
            style={styles.iconLayout}
            width={20}
            height={20}
          /> */}
        </Pressable>
        <Text style={[styles.history, styles.moreTypo]}>History</Text>
        <Pressable
          style={[styles.materialSymbolshistory, styles.lineIconPosition]}
          onPress={() => {}}
        >
          {/* <Materialsymbolshistory
            style={styles.iconLayout}
            width={20}
            height={20}
          /> */}
        </Pressable>
      </View>
      <Image
        style={styles.pngkitBlackBarPng2505541Icon}
        contentFit="cover"
        source={require("@/assets/images/image.png")}
      />
      {/* <Cilaccountlogout
        style={[styles.cilaccountLogoutIcon, styles.iconLayout1]}
        width={20}
        height={20}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
    bobSmithTypo: {
        fontFamily: FontFamily.segoeUI,
        fontWeight: "700",
        lineHeight: hp('2.96%'), // 24 / 812 * 100
        fontSize: FontSize.size_base,
        textAlign: "left",
        position: "absolute",
    },
    iconLayout1: {
        height: hp('2.46%'), // 20 / 812 * 100
        width: wp('5.33%'), // 20 / 375 * 100
        position: "absolute",
    },
    iconLayout: {
        nodeHeight: hp('2.46%'), // 20 / 812 * 100
        nodeWidth: wp('5.33%'), // 20 / 375 * 100
    },
    textTypo: {
        fontFamily: FontFamily.poppinsBold,
        fontWeight: "700",
    },
    wrapperSpaceBlock: {
        paddingHorizontal: wp('4%'), // 15 / 375 * 100
        flexDirection: "row",
        borderRadius: wp('1.33%'), // 5 / 375 * 100
        position: "absolute",
    },
    logoutTypo: {
        fontFamily: FontFamily.poppinsRegular,
        textAlign: "left",
    },
    groupPosition: {
        borderTopWidth: wp('0.13%'), // 0.5 / 375 * 100
        left: 0,
        height: hp('0.12%'), // 1 / 812 * 100
        width: wp('92.27%'), // 346 / 375 * 100
        borderColor: Color.primary,
        borderStyle: "solid",
        position: "absolute",
    },
    rectanglePosition: {
        height: hp('8.62%'), // 70 / 812 * 100
        bottom: 0,
        width: wp('100%'), // 375 / 375 * 100
        left: 0,
        position: "absolute",
    },
    lineIconPosition: {
        bottom: hp('3.82%'), // 31 / 812 * 100
        height: hp('2.46%'), // 20 / 812 * 100
        width: wp('5.33%'), // 20 / 375 * 100
        position: "absolute",
    },
    home1FlexBox: {
        bottom: hp('1.6%'), // 13 / 812 * 100
        justifyContent: "center",
        color: Color.tertiary,
        textAlign: "center",
        fontSize: FontSize.size_3xs,
        height: hp('1.85%'), // 15 / 812 * 100
        alignItems: "center",
        display: "flex",
        fontFamily: FontFamily.segoeUI,
        position: "absolute",
    },
    moreTypo: {
        bottom: hp('1.72%'), // 14 / 812 * 100
        textAlign: "center",
        fontSize: FontSize.size_3xs,
        fontFamily: FontFamily.segoeUI,
        position: "absolute",
    },
    yourProfile: {
        top: hp('6.53%'), // 53 / 812 * 100
        color: Color.secondary,
        textAlign: "left",
        left: wp('8%'), // 30 / 375 * 100
    },
    moreprofileChild: {
        top: hp('11.33%'), // 92 / 812 * 100
        borderTopWidth: wp('0.19%'), // 0.7 / 375 * 100
        height: hp('0.12%'), // 1 / 812 * 100
        width: wp('92.27%'), // 346 / 375 * 100
        borderColor: Color.colorOrange,
        borderStyle: "solid",
        left: wp('4%'), // 15 / 375 * 100
        position: "absolute",
    },
    moreprofileItem: {
        top: hp('93.72%'), // 761 / 812 * 100
        left: wp('43.47%'), // 163 / 375 * 100
        backgroundColor: "#d9d9d9",
        width: wp('13.87%'), // 52 / 375 * 100
        height: hp('5.42%'), // 44 / 812 * 100
        display: "none",
        position: "absolute",
    },
    groupChild: {
        backgroundColor: "rgba(255, 255, 255, 0.19)",
        borderRadius: wp('1.33%'), // 5 / 375 * 100
        left: 0,
        top: 0,
        height: hp('4.43%'), // 36 / 812 * 100
        width: wp('23.2%'), // 87 / 375 * 100
        position: "absolute",
    },
    clarityhomeLineIcon: {
        top: hp('0.86%'), // 7 / 812 * 100
        left: wp('3.2%'), // 12 / 375 * 100
        position: "absolute",
    },
    home: {
        top: hp('1.35%'), // 11 / 812 * 100
        left: wp('10.93%'), // 41 / 375 * 100
        height: hp('1.85%'), // 15 / 812 * 100
        alignItems: "center",
        display: "flex",
        width: wp('9.6%'), // 36 / 375 * 100
        color: Color.primary,
        fontWeight: "600",
        fontSize: FontSize.size_xs,
        textAlign: "left",
        fontFamily: FontFamily.segoeUI,
        position: "absolute",
    },
    rectangleParent: {
        top: hp('93.6%'), // 760 / 812 * 100
        left: wp('8.8%'), // 33 / 375 * 100
        height: hp('4.43%'), // 36 / 812 * 100
        width: wp('23.2%'), // 87 / 375 * 100
        display: "none",
        position: "absolute",
    },
    icon: {
        display: "none",
    },
    mdichevronDown: {
        top: hp('6.77%'), // 55 / 812 * 100
        width: wp('5.33%'), // 20 / 375 * 100
        left: wp('8%'), // 30 / 375 * 100
    },
    moreprofileInner: {
        top: hp('13.79%'), // 112 / 812 * 100
        width: wp('21.33%'), // 80 / 375 * 100
        height: hp('9.85%'), // 80 / 812 * 100
        left: wp('39.47%'), // 148 / 375 * 100
        position: "absolute",
    },
    bobSmith: {
        top: hp('3.08%'), // 25 / 812 * 100
        left: wp('11.73%'), // 44 / 375 * 100
        color: Color.primary,
        textAlign: "left",
    },
    editProfile: {
        left: wp('16%'), // 60 / 375 * 100
        textDecoration: "underline",
        lineHeight: hp('1.72%'), // 14 / 812 * 100
        textAlign: "center",
        fontSize: FontSize.size_3xs,
        color: Color.primary,
        top: 0,
        fontFamily: FontFamily.segoeUI,
        position: "absolute",
    },
    text: {
        left: wp('9.6%'), // 36 / 375 * 100
        color: Color.tertiary,
        fontSize: FontSize.size_sm,
        lineHeight: hp('2.96%'), // 24 / 812 * 100
        top: hp('7.26%'), // 59 / 812 * 100
        position: "absolute",
        textAlign: "left",
      },
      bobsmithemailcom: {
        top: hp('11.45%'), // 93 / 812 * 100
        color: Color.tertiary,
        fontSize: FontSize.size_sm,
        lineHeight: hp('2.96%'), // 24 / 812 * 100
        left: wp('0%'), // 0 / 375 * 100
        fontFamily: FontFamily.poppinsBold,
        textAlign: "left",
        position: "absolute",
      },
      bobSmithParent: {
        top: hp('25.49%'), // 207 / 812 * 100
        left: wp('27.73%'), // 104 / 375 * 100
        width: wp('44.53%'), // 167 / 375 * 100
        height: hp('14.41%'), // 117 / 812 * 100
        position: "absolute",
      },
      logout: {
        fontSize: FontSize.size_sm,
        lineHeight: hp('2.96%'), // 24 / 812 * 100
        color: Color.primary,
      },
      logoutWrapper: {
        top: hp('58.25%'), // 473 / 812 * 100
        paddingVertical: hp('0.62%'), // 5 / 812 * 100
        justifyContent: "center",
        paddingHorizontal: wp('4%'),
        flexDirection: "row",
        left: wp('39.47%'), // 148 / 375 * 100
        alignItems: "center",
        backgroundColor: Color.primary, 
      },
      your: {
        color: Color.tertiary,
      },
      savings: {
        color: Color.colorOrange,
      },
      yourSavings: {
        top: hp('1.23%'), // 10 / 812 * 100
        left: wp('33.33%'), // 125 / 375 * 100
        fontSize: FontSize.size_sm,
        lineHeight: hp('2.96%'), // 24 / 812 * 100
        textAlign: "left",
        position: "absolute",
      },
      onYourRecent: {
        left: wp('40.27%'), // 151 / 375 * 100
        lineHeight: hp('2.46%'), // 20 / 812 * 100
        color: Color.tertiary,
        top: hp('7.26%'), // 59 / 812 * 100
        position: "absolute",
        fontSize: FontSize.size_xs,
        fontFamily: FontFamily.poppinsRegular,
      },
      groupItem: {
        top: hp('0%'), // 0 / 812 * 100
      },
      groupInner: {
        top: hp('12.19%'), // 99 / 812 * 100
      },
      text1: {
        fontSize: wp('4.8%'), // 18 / 375 * 100
      },
      text2: {
        fontSize: wp('3.47%'), // 13 / 375 * 100
        fontFamily: FontFamily.poppinsSemiBold,
        fontWeight: "600",
      },
      dollars1: {
        fontSize: FontSize.size_3xs,
        fontFamily: FontFamily.poppinsBold,
      },
      dollars: {
        color: Color.primary,
        textAlign: "left",
      },
      dollarsWrapper: {
        top: hp('6.03%'), // 49 / 812 * 100
        left: wp('13.07%'), // 49 / 375 * 100
        backgroundColor: "rgba(255, 255, 255, 0.11)",
        paddingVertical: hp('0.49%'), // 4 / 812 * 100
        paddingHorizontal: wp('4%'),
        flexDirection: "row",
      },
      materialSymbolsinfoIcon: {
        top: hp('1.48%'), // 12 / 812 * 100
        left: wp('82.67%'), // 310 / 375 * 100
      },
      yourSavingsParent: {
        top: hp('42.37%'), // 344 / 812 * 100
        width: wp('92%'), // 345 / 375 * 100
        height: hp('12.19%'), // 99 / 812 * 100
        left: wp('4%'), // 15 / 375 * 100
        position: "absolute",
      },
      ellipseIcon: {
        top: hp('21.18%'), // 172 / 812 * 100
        left: wp('55.47%'), // 208 / 375 * 100
      },
      cameraIcon: {
        top: hp('21.67%'), // 176 / 812 * 100
        left: wp('56.53%'), // 212 / 375 * 100
        position: "absolute",
        overflow: "hidden",
      },
      rectangleView: {
        shadowColor: "rgba(51, 51, 51, 0.1)",
        shadowOffset: {
          width: wp('0%'), // 0 / 375 * 100
          height: hp('-0.12%'), // -1 / 812 * 100
        },
        shadowRadius: wp('2.67%'), // 10 / 375 * 100
        elevation: 10,
        shadowOpacity: 1,
        backgroundColor: Color.white,
      },
      groupChild1: {
        left: wp('76.8%'), // 288 / 375 * 100
        width: wp('18.67%'), // 70 / 375 * 100
        height: hp('0.37%'), // 3 / 812 * 100
        top: hp('0%'), // 0 / 812 * 100
        position: "absolute",
        backgroundColor: Color.primary,
      },
      clarityhomeLineIcon1: {
        left: wp('11.47%'), // 43 / 375 * 100
      },
      home1: {
        left: wp('9.33%'), // 35 / 375 * 100
        width: wp('9.6%'), // 36 / 375 * 100
        bottom: hp('1.6%'), // 13 / 812 * 100
      },
      more: {
        left: wp('82.67%'), // 310 / 375 * 100
        color: Color.primary,
      },
      icsharpMoreHorizIcon: {
        left: wp('83.47%'), // 313 / 375 * 100
      },
      notifications: {
        left: wp('28.27%'), // 106 / 375 * 100
        width: wp('19.73%'), // 74 / 375 * 100
      },
      rinotification3Line: {
        left: wp('35.47%'), // 133 / 375 * 100
      },
      history: {
        left: wp('57.87%'), // 217 / 375 * 100
        color: Color.tertiary,
      },
      materialSymbolshistory: {
        left: wp('59.47%'), // 223 / 375 * 100
      },
      pngkitBlackBarPng2505541Icon: {
        height: hp('4.8%'), // 39 / 812 * 100
        width: wp('100%'), // 375 / 375 * 100
        left: wp('0%'), // 0 / 375 * 100
        top: hp('0%'), // 0 / 812 * 100
        position: "absolute",
      },
      cilaccountLogoutIcon: {
        left: wp('86.67%'), // 325 / 375 * 100
        top: hp('6.77%'), // 55 / 812 * 100
        overflow: "hidden",
      },
      moreprofile: {
        flex: 1,
        height: hp('100%'), // 812 / 812 * 100
        overflow: "hidden",
        width: "100%", //do not convert
        backgroundColor: Color.white,
      },
});

export default Moreprofile;