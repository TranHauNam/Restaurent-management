import * as React from "react";
import { Text, StyleSheet, View, Pressable, Image } from "react-native";
// import { Image } from "expo-image";
// import Clarityhomeline from "../assets/clarityhomeline.svg";
import { useNavigation } from "@react-navigation/native";
// import Materialsymbolsdaterange from "../assets/materialsymbolsdaterange.svg";
// import Mdipersonmultiple from "../assets/mdipersonmultiple.svg";
// import Materialsymbolsdaterange1 from "../assets/materialsymbolsdaterange1.svg";
// import Mdipersonmultiple1 from "../assets/mdipersonmultiple1.svg";
// import Materialsymbolsdaterange2 from "../assets/materialsymbolsdaterange2.svg";
// import Mdipersonmultiple2 from "../assets/mdipersonmultiple2.svg";
// import Clarityhomeline1 from "../assets/clarityhomeline1.svg";
// import Icsharpmorehoriz from "../assets/icsharpmorehoriz.svg";
// import Rinotification3line from "../assets/rinotification3line.svg";
// import Materialsymbolshistory from "../assets/materialsymbolshistory.svg";
// import Materialsymbolstablebar from "../assets/materialsymbolstablebar.svg";
// import Materialsymbolstablebar1 from "../assets/materialsymbolstablebar1.svg";
// import Materialsymbolstablebar2 from "../assets/materialsymbolstablebar2.svg";
import { Color, FontSize, FontFamily } from "@/styles/GlobalStyles";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const History1 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.history}>
      <Text style={styles.history1}>History</Text>
      <View style={styles.historyChild} />
      <View style={styles.historyItem} />
      <View style={[styles.rectangleParent, styles.groupChildLayout]}>
        <View style={[styles.groupChild, styles.groupChildLayout]} />
        {/* <Clarityhomeline
          style={[styles.clarityhomeLineIcon, styles.agoPosition]}
          width={21}
          height={21}
        /> */}
        <Text style={styles.home}>Home</Text>
      </View>
      <Pressable
        style={[styles.mdichevronDown, styles.parentLayout]}
        onPress={() => navigation.goBack()}
      >
        <Image
          style={[styles.icon, styles.iconLayout]}
          contentFit="cover"
          source={require("@/assets/images/image.png")}
        />
      </Pressable>
      <View style={[styles.historyInner, styles.historyPosition]} />
      <View style={[styles.lineView, styles.historyPosition]} />
      <View style={[styles.historyChild1, styles.historyPosition]} />
      <View style={[styles.seaGrillOfMerrickParkParent, styles.seaLayout]}>
        <Text style={styles.seaGrillOf}>Sea Grill of Merrick Park</Text>
        <Text style={[styles.reserved, styles.reservedPosition]}>Reserved</Text>
        <Pressable style={styles.cancelBooking} onPress={() => {}}>
          <Text style={[styles.cancelBooking1, styles.agoTypo]}>
            Cancel Booking
          </Text>
        </Pressable>
        <Pressable style={styles.editBooking} onPress={() => {}}>
          <Text style={[styles.editBooking1, styles.agoTypo]}>
            Edit Booking
          </Text>
        </Pressable>
        <Text style={[styles.hrsAgo, styles.agoTypo]}>2 hrs ago</Text>
        <View
          style={[styles.materialSymbolsdateRangeParent, styles.parentLayout]}
        >
          {/* <Materialsymbolsdaterange
            style={[styles.materialSymbolsdateRangeIcon, styles.parentLayout]}
            width={20}
            height={20}
          /> */}
          <Text style={styles.december2022}>17 December 2022 | 12:15 PM</Text>
        </View>
        <View style={[styles.mdipersonMultipleParent, styles.parentLayout]}>
          {/* <Mdipersonmultiple
            style={[styles.materialSymbolsdateRangeIcon, styles.parentLayout]}
            width={20}
            height={20}
          /> */}
          <Text style={styles.december2022}>2 Guests</Text>
        </View>
      </View>
      <View style={[styles.seaGrillOfMerrickParkGroup, styles.seaLayout]}>
        <Text style={styles.seaGrillOf}>Sea Grill of Merrick Park</Text>
        <Text style={[styles.cancelled, styles.reservedPosition]}>
          Cancelled
        </Text>
        <Text style={[styles.daysAgo, styles.agoTypo]}>2 Days ago</Text>
        <View
          style={[styles.materialSymbolsdateRangeParent, styles.parentLayout]}
        >
          {/* <Materialsymbolsdaterange1
            style={[styles.materialSymbolsdateRangeIcon, styles.parentLayout]}
            width={20}
            height={20}
          /> */}
          <Text style={styles.december2022}>17 December 2022 | 12:15 PM</Text>
        </View>
        <View style={[styles.mdipersonMultipleParent, styles.parentLayout]}>
          {/* <Mdipersonmultiple1
            style={[styles.materialSymbolsdateRangeIcon, styles.parentLayout]}
            width={20}
            height={20}
          /> */}
          <Text style={styles.december2022}>2 Guests</Text>
        </View>
      </View>
      <View style={[styles.seaGrillOfMerrickParkContainer, styles.seaLayout]}>
        <Text style={styles.seaGrillOf}>Sea Grill of Merrick Park</Text>
        <Text style={[styles.reserved, styles.reservedPosition]}>
          Completed
        </Text>
        <Text style={[styles.daysAgo1, styles.agoTypo]}>10 Days ago</Text>
        <View
          style={[styles.materialSymbolsdateRangeParent, styles.parentLayout]}
        >
          {/* <Materialsymbolsdaterange2
            style={[styles.materialSymbolsdateRangeIcon, styles.parentLayout]}
            width={20}
            height={20}
          /> */}
          <Text style={styles.december2022}>17 December 2022 | 12:15 PM</Text>
        </View>
        <View style={[styles.mdipersonMultipleParent, styles.parentLayout]}>
          {/* <Mdipersonmultiple2
            style={[styles.materialSymbolsdateRangeIcon, styles.parentLayout]}
            width={20}
            height={20}
          /> */}
          <Text style={styles.december2022}>2 Guests</Text>
        </View>
      </View>
      <View style={styles.groupPosition}>
        <View style={[styles.groupItem, styles.groupPosition]} />
        <View style={styles.groupInner} />
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
        <Text style={[styles.history2, styles.moreTypo]}>History</Text>
        <Pressable
          style={[styles.materialSymbolshistory, styles.lineIconPosition]}
          onPress={() => navigation.navigate("History1")}
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
      {/* <Materialsymbolstablebar
        style={[
          styles.materialSymbolstableBarIcon,
          styles.materialIconPosition,
        ]}
        width={20}
        height={20}
      /> */}
      {/* <Materialsymbolstablebar1
        style={[
          styles.materialSymbolstableBarIcon1,
          styles.materialIconPosition,
        ]}
        width={20}
        height={20}
      /> */}
      {/* <Materialsymbolstablebar2
        style={[
          styles.materialSymbolstableBarIcon2,
          styles.materialIconPosition,
        ]}
        width={20}
        height={20}
      /> */}
      <Text style={[styles.indoor, styles.indoorTypo]}>Indoor</Text>
      <Text style={[styles.indoor1, styles.indoorTypo]}>Indoor</Text>
      <Text style={[styles.indoor2, styles.indoorTypo]}>Indoor</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    groupChildLayout: {
        height: hp('4.43%'), // 36 / 812 * 100
        width: wp('23.2%'), // 87 / 375 * 100
        position: "absolute",
      },
      agoPosition: {
        top: hp('0.86%'), // 7 / 812 * 100
        position: "absolute",
      },
      parentLayout: {
        height: hp('2.46%'), // 20 / 812 * 100
        position: "absolute",
      },
      iconLayout: {
        nodeHeight: 20, // do not change
        nodeWidth: 20, // do not change
      },
      historyPosition: {
        borderTopWidth: 0.5, // do not change
        height: hp('0.12%'), // 1 / 812 * 100
        width: wp('92.27%'), // 346 / 375 * 100
        borderColor: Color.primary,
        borderStyle: "solid",
        left: wp('4%'), // 15 / 375 * 100
        position: "absolute",
      },
      seaLayout: {
        height: hp('14.04%'), // 114 / 812 * 100
        width: wp('84%'), // 315 / 375 * 100
        left: wp('8%'), // 30 / 375 * 100
        position: "absolute",
      },
      reservedPosition: {
        lineHeight: hp('2.46%'), // 20 / 812 * 100
        top: hp('4.19%'), // 34 / 812 * 100
        fontSize: FontSize.size_xs,
        left: 0,
        textAlign: "left",
        fontFamily: FontFamily.segoeUI,
        position: "absolute",
      },
      agoTypo: {
        textAlign: "right",
        fontSize: FontSize.size_3xs,
        fontFamily: FontFamily.segoeUI,
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
        fontSize: FontSize.size_3xs,
        color: Color.tertiary,
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
      materialIconPosition: {
        left: wp('71.47%'), // 268 / 375 * 100
        height: hp('2.46%'), // 20 / 812 * 100
        width: wp('5.33%'), // 20 / 375 * 100
        position: "absolute",
      },
      indoorTypo: {
        left: wp('80.8%'), // 303 / 375 * 100
        color: Color.tertiary,
        fontSize: FontSize.size_sm,
        textAlign: "left",
        fontFamily: FontFamily.segoeUI,
        position: "absolute",
      },
      history1: {
        top: hp('6.53%'), // 53 / 812 * 100
        fontSize: wp('4.27%'), // 16 / 375 * 100
        color: Color.secondary,
        textAlign: "left",
        fontFamily: FontFamily.segoeUI,
        fontWeight: "700",
        lineHeight: hp('2.96%'), // 24 / 812 * 100
        left: wp('8%'), // 30 / 375 * 100
        position: "absolute",
      },
      historyChild: {
        top: hp('11.33%'), // 92 / 812 * 100
        borderTopWidth: 0.7, // do not change
        height: hp('0.12%'), // 1 / 812 * 100
        width: wp('92.27%'), // 346 / 375 * 100
        borderColor: Color.primary,
        borderStyle: "solid",
        left: wp('4%'), // 15 / 375 * 100
        position: "absolute",
      },
      historyItem: {
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
        left: wp('3.2%'), // 12 / 375 * 100
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
      icon: {
        display: "none",
      },
      mdichevronDown: {
        top: hp('6.77%'), // 55 / 812 * 100
        width: wp('5.33%'), // 20 / 375 * 100
        height: hp('2.46%'), // 20 / 812 * 100
        left: wp('8%'), // 30 / 375 * 100
      },
      historyInner: {
        top: hp('30.54%'), // 248 / 812 * 100
      },
      lineView: {
        top: hp('49.51%'), // 402 / 812 * 100
      },
      historyChild1: {
        top: hp('68.47%'), // 556 / 812 * 100
      },
      seaGrillOf: {
        color: Color.tertiary,
        fontSize: FontSize.size_sm,
        left: wp('0%'), // 0 / 375 * 100
        top: hp('0%'), // 0 / 812 * 100
        textAlign: "left",
        fontFamily: FontFamily.segoeUI,
        fontWeight: "700",
        lineHeight: hp('2.96%'), // 24 / 812 * 100
        position: "absolute",
      },
      reserved: {
        color: Color.primary,
      },
      cancelBooking1: {
        textDecoration: "underline",
        color: Color.colorCrimson,
      },
      cancelBooking: {
        left: wp('65.6%'), // 246 / 375 * 100
        top: hp('5.05%'), // 41 / 812 * 100
        position: "absolute",
      },
      editBooking1: {
        color: "#00a144",
      },
      editBooking: {
        left: wp('69.07%'), // 259 / 375 * 100
        top: hp('8.37%'), // 68 / 812 * 100
        position: "absolute",
      },
      hrsAgo: {
        left: wp('72.8%'), // 273 / 375 * 100
        color: Color.tertiary,
        top: hp('0.86%'), // 7 / 812 * 100
        position: "absolute",
      },
      materialSymbolsdateRangeIcon: {
        left: wp('0%'), // 0 / 375 * 100
        top: hp('0%'), // 0 / 812 * 100
      },
      december2022: {
        top: hp('0.12%'), // 1 / 812 * 100
        left: wp('9.33%'), // 35 / 375 * 100
        color: Color.tertiary,
        fontSize: FontSize.size_xs,
        textAlign: "left",
        fontFamily: FontFamily.segoeUI,
        fontWeight: "700",
        position: "absolute",
      },
      materialSymbolsdateRangeParent: {
        top: hp('7.88%'), // 64 / 812 * 100
        width: wp('54.4%'), // 204 / 375 * 100
        left: wp('0%'), // 0 / 375 * 100
      },
      mdipersonMultipleParent: {
        top: hp('11.57%'), // 94 / 812 * 100
        width: wp('22.13%'), // 83 / 375 * 100
        left: wp('0%'), // 0 / 375 * 100
      },
      seaGrillOfMerrickParkParent: {
        top: hp('14.04%'), // 114 / 812 * 100
      },
      cancelled: {
        color: Color.colorCrimson,
      },
      daysAgo: {
        left: wp('70.93%'), // 266 / 375 * 100
        color: Color.tertiary,
        top: hp('0.86%'), // 7 / 812 * 100
        position: "absolute",
      },
      seaGrillOfMerrickParkGroup: {
        top: hp('33.01%'), // 268 / 812 * 100
      },
      daysAgo1: {
        left: wp('69.33%'), // 260 / 375 * 100
        color: Color.tertiary,
        top: hp('0.86%'), // 7 / 812 * 100
        position: "absolute",
      },
      seaGrillOfMerrickParkContainer: {
        top: hp('51.97%'), // 422 / 812 * 100
      },
      groupItem: {
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
      groupInner: {
        left: wp('52.8%'), // 198 / 375 * 100
        backgroundColor: Color.primary,
        width: wp('18.67%'), // 70 / 375 * 100
        height: hp('0.37%'), // 3 / 812 * 100
        top: hp('0%'), // 0 / 812 * 100
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
      },
      more: {
        left: wp('82.67%'), // 310 / 375 * 100
        color: Color.tertiary,
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
      history2: {
        left: wp('57.87%'), // 217 / 375 * 100
        color: Color.primary,
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
      materialSymbolstableBarIcon: {
        top: hp('25.62%'), // 208 / 812 * 100
      },
      materialSymbolstableBarIcon1: {
        top: hp('44.46%'), // 361 / 812 * 100
      },
      materialSymbolstableBarIcon2: {
        top: hp('63.3%'), // 514 / 812 * 100
      },
      indoor: {
        top: hp('25.62%'), // 208 / 812 * 100
      },
      indoor1: {
        top: hp('44.46%'), // 361 / 812 * 100
      },
      indoor2: {
        top: hp('63.3%'), // 514 / 812 * 100
      },
      history: {
        flex: 1, // do not change
        height: hp('100%'), // 812 / 812 * 100
        overflow: "hidden",
        width: "100%", // do not change
        backgroundColor: Color.white,
      },
});

export default History1;