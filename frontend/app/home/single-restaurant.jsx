import * as React from "react";
import { Text, StyleSheet, View, Pressable, Image } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
//import { Image } from "expo-image";
// import Clarityhomeline from "../assets/clarityhomeline.svg";
// import Mdichevrondoubleright1 from "../assets/mdichevrondoubleright1.svg";
// import Group8116 from "../assets/group-8116.svg";
// import Locationiconic from "../assets/locationiconic.svg";
// import Icbaselineaccesstimefilled from "../assets/icbaselineaccesstimefilled.svg";
// import Jamgpsf from "../assets/jamgpsf.svg";
// import Materialsymbolsdaterange from "../assets/materialsymbolsdaterange.svg";
// import Mdichevrondown1 from "../assets/mdichevrondown1.svg";
// import Icbaselineaccesstime from "../assets/icbaselineaccesstime.svg";
// import Mdichevrondown2 from "../assets/mdichevrondown2.svg";
// import Mdipersonmultiple from "../assets/mdipersonmultiple.svg";
// import Mdichevrondown3 from "../assets/mdichevrondown3.svg";
import {
  FontFamily,
  Color,
  FontSize,
  Gap,
  Padding,
  Border,
} from "@/styles/GlobalStyles";


const SingleRestaurantPage = () => {
  return (
    <View style={styles.singleRestaurantPage}>
      <Text style={[styles.seaGrillNorth, styles.textTypo]}>
        Sea Grill North Miami Beach
      </Text>
      <View
        style={[styles.singleRestaurantPageChild, styles.rectangleViewBorder]}
      />
      <View style={styles.singleRestaurantPageItem} />
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
        style={[styles.mdichevronDown, styles.mdichevronDownLayout]}
        onPress={() => {}}
      >
        <Image
          style={styles.icon}
          contentFit="cover"
          source={require("@/assets/images/image.png")}
        />
      </Pressable>
      <Image
        style={styles.singleRestaurantPageInner}
        contentFit="cover"
        source={require("@/assets/images/image.png")}
      />
      <View style={[styles.rectangleView, styles.rectangleViewBorder]} />
      <Image
        style={[styles.mdichevronDoubleRightIcon, styles.iconLayout1]}
        contentFit="cover"
        source={require("@/assets/images/image.png")}
      />
      {/* <Mdichevrondoubleright1
        style={[styles.mdichevronDoubleRightIcon1, styles.iconLayout1]}
        width={15}
        height={15}
      /> */}
      {/* <Group8116 style={styles.groupIcon} width={36} height={6} /> */}
      {/* <Locationiconic
        style={[styles.locationiconic, styles.iconLayout1]}
        width={15}
        height={15}
      /> */}
      <Text
        style={[styles.ne163rdSt, styles.showMenuPosition]}
      >{`3913 NE 163rd St 
North Miami Beach, FL 33160  |`}</Text>
      {/* <Icbaselineaccesstimefilled
        style={[styles.icbaselineAccessTimeFilledIcon, styles.iconLayout1]}
        width={15}
        height={15}
      /> */}
      <Text style={[styles.am1100Container, styles.showMenuPosition]}>
        <Text style={[styles.text, styles.textTypo]}>10:30</Text>
        <Text style={styles.am}>{` AM - `}</Text>
        <Text style={[styles.text, styles.textTypo]}>{`11:00 `}</Text>
        <Text style={styles.am}>PM</Text>
      </Text>
      <Image
        style={[styles.image4Icon, styles.iconLayout1]}
        contentFit="cover"
        source={require("@/assets/images/image.png")}
      />
      <Text style={[styles.showMenu, styles.showMenuPosition]}>Show Menu</Text>
      <Text style={[styles.description, styles.textTypo]}>Description</Text>
      {/* <Jamgpsf
        style={[styles.jamgpsFIcon, styles.iconLayout]}
        width={10}
        height={10}
      /> */}
      <Text style={[styles.getDirection, styles.textTypo]}>Get Direction</Text>
      <Text style={styles.seagrillRestaurantAndContainer}>
        <Text style={styles.seagrillRestaurantAndBarHa}>
          <Text style={styles.seagrillRestaurantAndBarHa1}>
            <Text style={styles.am}>
              Seagrill Restaurant and bar has one mission: to provide guests
              with a fine and fresh seafood experience. Featuring seasonal and
              sustainable seafood that is flown in fresh daily, our chef-driven
              menu proves that no matter when you’re dining, seafood can be
              truly exceptional.
            </Text>
            <Text style={[styles.text, styles.textTypo]}>{` `}</Text>
          </Text>
          <Text style={[styles.text, styles.textTypo]}>
            <Text style={styles.text4}>{` `}</Text>
          </Text>
        </Text>
        <Text style={[styles.text, styles.textTypo]}>
          <Text style={styles.text4}>
            <Text style={styles.readMore2}>Read More...</Text>
          </Text>
        </Text>
      </Text>
      <View
        style={[styles.materialSymbolsdateRangeParent, styles.parentBorder]}
      >
        {/* <Materialsymbolsdaterange
          style={styles.mdichevronDownLayout}
          width={20}
          height={20}
        /> */}
        <Text style={styles.date}>Date</Text>
        {/* <Mdichevrondown1 style={styles.iconLayout} width={10} height={10} /> */}
      </View>
      <View style={[styles.icbaselineAccessTimeParent, styles.parentBorder]}>
        {/* <Icbaselineaccesstime width={20} height={20} /> */}
        <Text style={styles.date}>Time</Text>
        {/* <Mdichevrondown2 width={10} height={10} /> */}
      </View>
      <View style={[styles.mdipersonMultipleParent, styles.parentBorder]}>
        {/* <Mdipersonmultiple width={20} height={20} /> */}
        <Text style={styles.date}>People</Text>
        {/* <Mdichevrondown3 width={10} height={10} /> */}
      </View>
      <Pressable style={styles.findSlotsWrapper} onPress={() => {}}>
        <Text style={[styles.findSlots, styles.textTypo]}>Find Slots</Text>
      </Pressable>
      <Image
        style={styles.pngkitBlackBarPng2505541Icon}
        contentFit="cover"
        source={require("@/assets/images/image.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textTypo: {
    fontWeight: "700",
    fontFamily: FontFamily.segoeUI,
  },
  rectangleViewBorder: {
    borderColor: Color.primary,
    borderStyle: "solid",
    position: "absolute",
  },
  mdichevronDownLayout: {},
  iconLayout1: {
    width: wp('4%'), // 15 / 375 * 100
    height: hp('1.85%'), // 15 / 812 * 100
    position: "absolute",
  },
  showMenuPosition: {
    left: wp('14.67%'), // 55 / 375 * 100
    color: Color.tertiary,
    fontSize: FontSize.size_xs,
    textAlign: "left",
    position: "absolute",
  },
  iconLayout: {},
  parentBorder: {
    gap: Gap.gap_md,
    paddingHorizontal: Padding.p_3xs,
    borderWidth: 1,
    borderColor: Color.sub,
    top: hp('66.75%'), // 542 / 812 * 100
    paddingVertical: Padding.p_5xs,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: Border.br_8xs,
    borderStyle: "solid",
    position: "absolute",
  },
  seaGrillNorth: {
    top: hp('6.53%'), // 53 / 812 * 100
    left: wp('16%'), // 60 / 375 * 100
    fontSize: hp('1.97%'), // 16 / 812 * 100
    color: Color.secondary,
    textAlign: "left",
    fontFamily: FontFamily.segoeUI,
    lineHeight: hp('2.96%'), // 24 / 812 * 100
    fontWeight: "700",
    position: "absolute",
  },
  singleRestaurantPageChild: {
    top: hp('11.33%'), // 92 / 812 * 100
    borderTopWidth: 0.7,
    width: wp('92.27%'), // 346 / 375 * 100
    height: hp('0.12%'), // 1 / 812 * 100
    left: wp('4%'), // 15 / 375 * 100
  },
  singleRestaurantPageItem: {
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
    borderRadius: Border.br_8xs,
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
    display: "flex",
    height: hp('1.85%'), // 15 / 812 * 100
    alignItems: "center",
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
    height: "100%", //do not change
    nodeWidth: wp('5.33%'), // 20 / 375 * 100
    nodeHeight: hp('2.46%'), // 20 / 812 * 100
    width: "100%", //do not change
  },
  mdichevronDown: {
    top: hp('6.77%'), // 55 / 812 * 100
    left: wp('8%'), // 30 / 375 * 100
    position: "absolute",
  },
  singleRestaurantPageInner: {
    top: hp('13.18%'), // 107 / 812 * 100
    width: wp('92%'), // 345 / 375 * 100
    height: hp('22.17%'), // 180 / 812 * 100
    left: wp('4%'), // 15 / 375 * 100
    position: "absolute",
  },
  rectangleView: {
    top: hp('13.55%'), // 110 / 812 * 100
    left: wp('4.8%'), // 18 / 375 * 100
    borderWidth: 0.5,
    width: wp('90.4%'), // 339 / 375 * 100
    height: hp('21.43%'), // 174 / 812 * 100
  },
  mdichevronDoubleRightIcon: {
    left: wp('6.67%'), // 25 / 375 * 100
    borderRadius: Border.br_xl,
    top: hp('23.4%'), // 190 / 812 * 100
    width: wp('4%'), // 15 / 375 * 100
  },
  mdichevronDoubleRightIcon1: {
    left: wp('89.33%'), // 335 / 375 * 100
    borderRadius: Border.br_xl,
    top: hp('23.4%'), // 190 / 812 * 100
  },
  groupIcon: {
    top: hp('33.37%'), // 271 / 812 * 100
    left: wp('45.33%'), // 170 / 375 * 100
    position: "absolute",
  },
  locationiconic: {
    top: hp('37.93%'), // 308 / 812 * 100
    left: wp('8%'), // 30 / 375 * 100
  },
  ne163rdSt: {
    top: hp('37.81%'), // 307 / 812 * 100
    color: Color.tertiary,
    fontFamily: FontFamily.segoeUI,
  },
  icbaselineAccessTimeFilledIcon: {
    top: hp('43.1%'), // 350 / 812 * 100
    left: wp('8%'), // 30 / 375 * 100
  },
  text: {
    fontFamily: FontFamily.segoeUI,
  },
  am: {
    fontFamily: FontFamily.segoeUI,
  },
  am1100Container: {
    top: hp('42.99%'), // 349 / 812 * 100
    color: Color.tertiary,
  },
  image4Icon: {
    top: hp('46.3%'), // 376 / 812 * 100
    left: wp('8%'), // 30 / 375 * 100
  },
  showMenu: {
    top: hp('46.18%'), // 375 / 812 * 100
    lineHeight: hp('1.97%'), // 16 / 812 * 100
    color: Color.tertiary,
    fontWeight: "600",
    left: wp('14.67%'), // 55 / 375 * 100
    fontFamily: FontFamily.segoeUI,
  },
  description: {
    top: hp('50.62%'), // 411 / 812 * 100
    left: wp('8%'), // 30 / 375 * 100
    color: Color.primary,
    fontSize: FontSize.size_xs,
    textAlign: "left",
    fontFamily: FontFamily.segoeUI,
    position: "absolute",
  },
  jamgpsFIcon: {
    top: hp('40.39%'), // 328 / 812 * 100
    left: wp('60%'), // 225 / 375 * 100
    position: "absolute",
  },
  getDirection: {
    top: hp('40.02%'), // 325 / 812 * 100
    left: wp('64%'), // 240 / 375 * 100
    textDecoration: "underline",
    fontStyle: "italic",
    fontSize: FontSize.size_3xs,
    color: Color.tertiary,
    textAlign: "left",
    fontFamily: FontFamily.segoeUI,
    position: "absolute",
  },
  seagrillRestaurantAndBarHa1: {
    fontSize: FontSize.size_xs,
  },
  text4: {
    fontSize: FontSize.size_3xs,
  },
  seagrillRestaurantAndBarHa: {
    color: Color.tertiary,
  },
  readMore2: {
    color: Color.primary,
  },
  seagrillRestaurantAndContainer: {
    top: hp('53.2%'), // 432 / 812 * 100
    width: wp('84%'), // 315 / 375 * 100
    left: wp('8%'), // 30 / 375 * 100
    textAlign: "left",
    position: "absolute",
  },
  date: {
    lineHeight: hp('2.46%'), // 20 / 812 * 100
    color: Color.tertiary,
    fontSize: FontSize.size_xs,
    textAlign: "left",
    fontFamily: FontFamily.segoeUI,
  },
  materialSymbolsdateRangeParent: {
    left: wp('7.47%'), // 28 / 375 * 100
  },
  icbaselineAccessTimeParent: {
    left: wp('35.73%'), // 134 / 375 * 100
  },
  mdipersonMultipleParent: {
    left: wp('64.27%'), // 241 / 375 * 100
  },
  findSlots: {
    fontSize: wp('3.73%'), // 14 / 375 * 100
    color: Color.white,
    textAlign: "center",
    fontFamily: FontFamily.segoeUI,
    lineHeight: hp('2.96%'), // 24 / 812 * 100
    fontWeight: "700",
  },
  findSlotsWrapper: {
    top: hp('74.88%'), // 608 / 812 * 100
    left: wp('8.53%'), // 32 / 375 * 100
    borderRadius: 4,
    backgroundColor: Color.primary,
    width: wp('82.93%'), // 311 / 375 * 100
    height: hp('6.4%'), // 52 / 812 * 100
    justifyContent: "center",
    // paddingHorizontal: wp('45.07%'), // 169 / 375 * 100
    // paddingVertical: Padding.p_5xs, // do not change
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
  },
  pngkitBlackBarPng2505541Icon: {
    width: wp('100%'), // 375 / 375 * 100
    height: hp('4.8%'), // 39 / 812 * 100
    left: 0,
    top: 0,
    position: "absolute",
  },
  singleRestaurantPage: {
    backgroundColor: Color.white,
    flex: 1,
    height: hp('100%'), // 812 / 812 * 100
    overflow: "hidden",
    width: "100%", // do not change
  },
});

export default SingleRestaurantPage;