import * as React from "react";
import { Text, StyleSheet, View, Pressable, Image } from "react-native";
// import { Image } from "expo-image";
// import Clarityhomeline from "../assets/clarityhomeline.svg";
import { useNavigation } from "@react-navigation/native";
// import Clarityhomeline1 from "../assets/clarityhomeline1.svg";
// import Icsharpmorehoriz from "../assets/icsharpmorehoriz.svg";
// import Rinotification3line from "../assets/rinotification3line.svg";
// import Materialsymbolshistory from "../assets/materialsymbolshistory.svg";
import { Color, FontFamily, FontSize } from "@/styles/GlobalStyles";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const Notifications = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.notifications}>
      <Text style={[styles.seaGrillOf, styles.seaTypo]}>
        Sea Grill of Merrick Park
      </Text>
      <Text style={[styles.seaGrillOf1, styles.seaTypo]}>
        Sea Grill of Merrick Park
      </Text>
      <Text style={[styles.yourTableIs, styles.yourTypo]}>
        Your Table is Booked
      </Text>
      <Text style={[styles.yourTableIs1, styles.yourTypo]}>
        Your Table is Booked
      </Text>
      <Text style={[styles.hrsAgo, styles.hrsTypo]}>2 hrs ago</Text>
      <Text style={[styles.hrsAgo1, styles.hrsTypo]}>10 hrs ago</Text>
      <View style={[styles.seaGrillOfMerrickParkParent, styles.seaLayout]}>
        <Text style={[styles.seaGrillOf2, styles.seaTypo]}>
          Sea Grill of Merrick Park
        </Text>
        <Text style={[styles.thankyouForVisiting, styles.yourTypo]}>
          Thankyou For Visiting, Please Come Again
        </Text>
        <Text style={styles.daysAgo}>3 Days ago</Text>
      </View>
      <View style={[styles.seaGrillOfMerrickParkGroup, styles.seaLayout]}>
        <Text style={[styles.seaGrillOf2, styles.seaTypo]}>
          Sea Grill of Merrick Park
        </Text>
        <Text style={[styles.thankyouForVisiting, styles.yourTypo]}>
          Your booking has been canceled
        </Text>
        <Text style={styles.daysAgo}>3 Days ago</Text>
      </View>
      <View style={[styles.notificationsChild, styles.itemChildLayout]} />
      <View style={[styles.notificationsItem, styles.itemChildLayout]} />
      <View style={[styles.notificationsInner, styles.itemChildLayout]} />
      <View style={[styles.lineView, styles.itemChildLayout]} />
      <View style={[styles.notificationsChild1, styles.itemChildLayout]} />
      <View style={styles.rectangleView} />
      <View style={[styles.rectangleParent, styles.groupChildLayout]}>
        <View style={[styles.groupChild, styles.groupChildLayout]} />
        {/* <Clarityhomeline
          style={styles.clarityhomeLineIcon}
          width={21}
          height={21}
        /> */}
        <Text style={styles.home}>Home</Text>
      </View>
      <View style={styles.notificationsParent}>
        <Text style={styles.notifications1}>Notifications</Text>
        <View style={[styles.groupItem, styles.itemChildLayout]} />
        <Pressable
          style={styles.mdichevronDown}
          onPress={() => navigation.goBack()}
        >
          <Image
            style={[styles.icon, styles.iconLayout]}
            contentFit="cover"
            source={require("@/assets/images/image.png")}
          />
        </Pressable>
      </View>
      <View style={[styles.seaGrillOfMerrickParkContainer, styles.seaLayout]}>
        <Text style={[styles.seaGrillOf2, styles.seaTypo]}>
          Sea Grill of Merrick Park
        </Text>
        <Text style={[styles.thankyouForVisiting, styles.yourTypo]}>
          Your Table is Booked
        </Text>
        <Text style={[styles.hrsAgo2, styles.hrsTypo]}>10 hrs ago</Text>
      </View>
      <View style={styles.groupPosition}>
        <View style={[styles.groupInner, styles.groupPosition]} />
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
        <Text style={[styles.notifications2, styles.home1FlexBox]}>
          Notifications
        </Text>
        <Pressable
          style={[styles.rinotification3Line, styles.lineIconPosition]}
          onPress={() => navigation.navigate("Notifications")}
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
    </View>
  );
};

const styles = StyleSheet.create({
    seaTypo: {
        textAlign: "left",
        color: Color.tertiary,
        fontFamily: FontFamily.segoeUI,
        fontWeight: "700",
        lineHeight: hp('2.96%'), // 24 / 812 * 100
        fontSize: FontSize.size_sm,
        position: "absolute",
      },
      yourTypo: {
        lineHeight: hp('2.46%'), // 20 / 812 * 100
        fontSize: FontSize.size_xs,
        textAlign: "left",
        color: Color.tertiary,
        fontFamily: FontFamily.segoeUI,
        position: "absolute",
      },
      hrsTypo: {
        textAlign: "right",
        fontSize: FontSize.size_3xs,
        color: Color.tertiary,
        fontFamily: FontFamily.segoeUI,
        lineHeight: hp('2.96%'), // 24 / 812 * 100
        position: "absolute",
      },
      seaLayout: {
        height: hp('6.65%'), // 54 / 812 * 100
        width: wp('84%'), // 315 / 375 * 100
        left: wp('8%'), // 30 / 375 * 100
        position: "absolute",
      },
      itemChildLayout: {
        height: hp('0.12%'), // 1 / 812 * 100
        width: wp('92.27%'), // 346 / 375 * 100
        borderStyle: "solid",
        position: "absolute",
      },
      groupChildLayout: {
        height: hp('4.43%'), // 36 / 812 * 100
        width: wp('23.2%'), // 87 / 375 * 100
        position: "absolute",
      },
      iconLayout: {
        nodeHeight: 20, // do not change
        nodeWidth: 20, // do not change
      },
      groupPosition: {
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
        justifyContent: "center",
        textAlign: "center",
        bottom: hp('1.6%'), // 13 / 812 * 100
        height: hp('1.85%'), // 15 / 812 * 100
        alignItems: "center",
        display: "flex",
        fontSize: FontSize.size_3xs,
        fontFamily: FontFamily.segoeUI,
        position: "absolute",
      },
      moreTypo: {
        bottom: hp('1.72%'), // 14 / 812 * 100
        textAlign: "center",
        fontSize: FontSize.size_3xs,
        color: Color.tertiary,
        fontFamily: FontFamily.segoeUI,
        position: "absolute",
      },
      seaGrillOf: {
        left: wp('8%'), // 30 / 375 * 100
        top: hp('14.04%'), // 114 / 812 * 100
      },
      seaGrillOf1: {
        top: hp('60.34%'), // 490 / 812 * 100
        left: wp('8%'), // 30 / 375 * 100
      },
      yourTableIs: {
        top: hp('18.23%'), // 148 / 812 * 100
        left: wp('8%'), // 30 / 375 * 100
      },
      yourTableIs1: {
        top: hp('64.53%'), // 524 / 812 * 100
        left: wp('8%'), // 30 / 375 * 100
      },
      hrsAgo: {
        left: wp('80.8%'), // 303 / 375 * 100
        top: hp('14.04%'), // 114 / 812 * 100
      },
      hrsAgo1: {
        left: wp('79.47%'), // 298 / 375 * 100
        top: hp('60.34%'), // 490 / 812 * 100
      },
      seaGrillOf2: {
        left: 0,
        top: 0,
      },
      thankyouForVisiting: {
        top: hp('4.19%'), // 34 / 812 * 100
        left: 0,
      },
      daysAgo: {
        left: wp('70.93%'), // 266 / 375 * 100
        top: hp('0.25%'), // 2 / 812 * 100
        textAlign: "right",
        fontSize: FontSize.size_3xs,
        color: Color.tertiary,
        fontFamily: FontFamily.segoeUI,
        lineHeight: hp('2.96%'), // 24 / 812 * 100
        position: "absolute",
      },
      seaGrillOfMerrickParkParent: {
        top: hp('37.19%'), // 302 / 812 * 100
      },
      seaGrillOfMerrickParkGroup: {
        top: hp('48.77%'), // 396 / 812 * 100
      },
      notificationsChild: {
        top: hp('23.15%'), // 188 / 812 * 100
        borderTopWidth: 0.5, // do not change
        width: wp('92.27%'), // 346 / 375 * 100
        borderStyle: "solid",
        left: wp('4%'), // 15 / 375 * 100
        borderColor: Color.primary,
      },
      notificationsItem: {
        top: hp('34.72%'), // 282 / 812 * 100
        borderTopWidth: 0.5, // do not change
        width: wp('92.27%'), // 346 / 375 * 100
        borderStyle: "solid",
        left: wp('4%'), // 15 / 375 * 100
        borderColor: Color.primary,
      },
      notificationsInner: {
        top: hp('91.63%'), // 744 / 812 * 100
        borderColor: "rgba(244, 155, 51, 0.3)",
        borderTopWidth: 0.5, // do not change
        width: wp('92.27%'), // 346 / 375 * 100
        borderStyle: "solid",
        left: wp('4%'), // 15 / 375 * 100
      },
      lineView: {
        top: hp('46.31%'), // 376 / 812 * 100
        borderTopWidth: 0.5, // do not change
        width: wp('92.27%'), // 346 / 375 * 100
        borderStyle: "solid",
        left: wp('4%'), // 15 / 375 * 100
        borderColor: Color.primary,
      },
      notificationsChild1: {
        top: hp('57.88%'), // 470 / 812 * 100
        borderTopWidth: 0.5, // do not change
        width: wp('92.27%'), // 346 / 375 * 100
        borderStyle: "solid",
        left: wp('4%'), // 15 / 375 * 100
        borderColor: Color.primary,
      },
      rectangleView: {
        top: hp('93.72%'), // 761 / 812 * 100
        left: wp('43.47%'), // 163 / 375 * 100
        backgroundColor: "#d9d9d9",
        width: wp('13.87%'), // 52 / 375 * 100
        height: hp('5.42%'), // 44 / 812 * 100
        display: "none",
        position: "absolute",
      },
      groupChild: {
        borderRadius: 5,
        backgroundColor: "rgba(255, 255, 255, 0.19)",
        left: 0,
        top: 0,
      },
      clarityhomeLineIcon: {
        top: hp('0.86%'), // 7 / 812 * 100
        left: wp('3.2%'), // 12 / 375 * 100
        position: "absolute",
      },
      home: {
        top: hp('1.35%'), // 11 / 812 * 100
        left: wp('10.93%'), // 41 / 375 * 100
        fontWeight: "600",
        height: hp('1.85%'), // 15 / 812 * 100
        alignItems: "center",
        display: "flex",
        width: wp('9.6%'), // 36 / 375 * 100
        color: Color.primary,
        fontSize: FontSize.size_xs,
        textAlign: "left",
        fontFamily: FontFamily.segoeUI,
        position: "absolute",
      },
      rectangleParent: {
        top: hp('93.6%'), // 760 / 812 * 100
        left: wp('8.8%'), // 33 / 375 * 100
        display: "none",
      },
      notifications1: {
        fontSize: wp('4.27%'), // 16 / 375 * 100
        color: Color.secondary,
        left: wp('4%'), // 15 / 375 * 100
        top: 0,
        textAlign: "left",
        fontFamily: FontFamily.segoeUI,
        fontWeight: "700",
        lineHeight: hp('2.96%'), // 24 / 812 * 100
        position: "absolute",
      },
      groupItem: {
        top: hp('4.8%'), // 39 / 812 * 100
        borderTopWidth: 0.7, // do not change
        borderColor: Color.primary,
        width: wp('92.27%'), // 346 / 375 * 100
        borderStyle: "solid",
        left: 0,
      },
      icon: {
        display: "none",
      },
      mdichevronDown: {
        height: hp('2.46%'), // 20 / 812 * 100
        width: wp('5.33%'), // 20 / 375 * 100
        left: wp('4%'), // 15 / 375 * 100
        top: hp('0.25%'), // 2 / 812 * 100
        position: "absolute",
      },
      notificationsParent: {
        top: hp('6.53%'), // 53 / 812 * 100
        width: wp('92%'), // 345 / 375 * 100
        height: hp('4.8%'), // 39 / 812 * 100
        left: wp('4%'), // 15 / 375 * 100
        position: "absolute",
      },
      hrsAgo2: {
        left: wp('71.47%'), // 268 / 375 * 100
        top: 0,
      },
      seaGrillOfMerrickParkContainer: {
        top: hp('25.62%'), // 208 / 812 * 100
      },
      groupInner: {
        shadowColor: "rgba(51, 51, 51, 0.1)",
        shadowOffset: {
          width: 0,
          height: -1,
        },
        shadowRadius: 10,
        elevation: 10,
        shadowOpacity: 1,
        backgroundColor: Color.white,
        bottom: 0,
      },
      groupChild1: {
        left: wp('28.8%'), // 108 / 375 * 100
        backgroundColor: Color.primary,
        width: wp('18.67%'), // 70 / 375 * 100
        height: hp('0.37%'), // 3 / 812 * 100
        top: 0,
        position: "absolute",
      },
      clarityhomeLineIcon1: {
        left: wp('11.47%'), // 43 / 375 * 100
      },
      home1: {
        left: wp('9.33%'), // 35 / 375 * 100
        width: wp('9.6%'), // 36 / 375 * 100
        justifyContent: "center",
        textAlign: "center",
        bottom: hp('1.6%'), // 13 / 812 * 100
        color: Color.tertiary,
      },
      more: {
        left: wp('82.67%'), // 310 / 375 * 100
      },
      icsharpMoreHorizIcon: {
        left: wp('83.47%'), // 313 / 375 * 100
      },
      notifications2: {
        left: wp('28.27%'), // 106 / 375 * 100
        width: wp('19.73%'), // 74 / 375 * 100
        justifyContent: "center",
        textAlign: "center",
        bottom: hp('1.6%'), // 13 / 812 * 100
        color: Color.primary,
      },
      rinotification3Line: {
        left: wp('35.47%'), // 133 / 375 * 100
      },
      history: {
        left: wp('57.87%'), // 217 / 375 * 100
      },
      materialSymbolshistory: {
        left: wp('59.47%'), // 223 / 375 * 100
      },
      pngkitBlackBarPng2505541Icon: {
        width: wp('100%'), // 375 / 375 * 100
        height: hp('4.8%'), // 39 / 812 * 100
        left: 0,
        top: 0,
        position: "absolute",
      },
      notifications: {
        flex: 1, // do not change
        height: hp('100%'), // 812 / 812 * 100
        overflow: "hidden",
        width: "100%", // do not change
        backgroundColor: Color.white,
      },
});

export default Notifications;