import * as React from "react";
import { StyleSheet, View, Text, Pressable, Image, ScrollView } from "react-native";
// import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
// import Frame8108 from "../assets/frame-8108.svg";
// import Clarityhomeline from "../assets/clarityhomeline.svg";
// import Group8130 from "../assets/group-8130.svg";
// import Clarityhomeline1 from "../assets/clarityhomeline1.svg";
// import Icsharpmorehoriz from "../assets/icsharpmorehoriz.svg";
// import Rinotification3line from "../assets/rinotification3line.svg";
// import Materialsymbolshistory from "../assets/materialsymbolshistory.svg";
import { Color, FontFamily, Padding, Border, FontSize } from "@/styles/GlobalStyles";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const HomeGridViewslider = () => {
  return (
    <ScrollView style={styles.homeGridViewslider}>
      <View style={[styles.rectangleParent, styles.rectangleParentLayout]}>
        <View style={[styles.frameChild, styles.childShadowBox]} />
        <Text
          style={[
            styles.welcomeToDineInfloridaContainer,
            styles.ourRestaurantsPosition,
          ]}
        >
          <Text style={styles.welcomeToDineIn}>
            <Text style={styles.welcomeTo}>{`Welcome to `}</Text>
            <Text style={styles.dineIn}>Dine-in</Text>
          </Text>
          <Text style={styles.dineIn}>
            <Text style={styles.florida1Typo}>Florida</Text>
          </Text>
        </Text>
        <Image
          style={styles.frameItem}
          contentFit="cover"
          source={require("@/assets/images/image.png")}
        />
        {/* <Frame8108 style={styles.frameInner} width={8} height={30} /> */}
      </View>
      <Text style={[styles.ourRestaurants, styles.florida1Typo]}>
        <Text style={styles.welcomeTo}>{`Our `}</Text>
        <Text style={styles.dineIn}>Restaurants</Text>
      </Text>
      <View style={[styles.homeBannerImg, styles.asset22x1Layout]}>
        <Image
          style={[styles.asset22x1, styles.iconPosition1]}
          contentFit="cover"
          source={require("@/assets/images/image.png")}
        />
        <View style={[styles.homeBannerImgChild, styles.childShadowBox]} />
        <Text style={[styles.discount20, styles.florida1Typo]}>
          Discount 20%
        </Text>
      </View>
      <View style={[styles.bookNowWrapper, styles.wrapperFlexBox]}>
        <Text style={[styles.bookNow, styles.text2Typo]}>Book Now</Text>
      </View>
      <View style={[styles.exploreWrapper, styles.wrapperFlexBox]}>
        <Text style={[styles.explore, styles.text2Typo]}>Explore</Text>
      </View>
      <Pressable
        style={[styles.rectangleGroup, styles.rectangleLayout]}
        onPress={() => {}}
      >
        <View style={[styles.groupChild, styles.groupChildShadowBox]} />
        <Text style={[styles.seaGrillOf, styles.florida1Typo]}>
          Sea Grill of Merrick Park
        </Text>
        <View
          style={[
            styles.photo2019111222080451Parent,
            styles.image5Icon1Position,
          ]}
        >
          <Image
            style={[styles.photo2019111222080451Icon, styles.iconPosition1]}
            contentFit="cover"
            source={require("@/assets/images/image.png")}
          />
          <Image
            style={styles.iconPosition}
            contentFit="cover"
            source={require("@/assets/images/image.png")}
          />
        </View>
        <Text style={styles.salzedoStreetSuite}>{`4250 Salzedo Street, 
Suite 1425Coral Gables, FL 33146`}</Text>
        <Text style={[styles.am1100Container, styles.containerClr]}>
          <Text style={styles.florida1Typo}>11:30</Text>
          <Text style={styles.welcomeToDineIn}>{` AM - `}</Text>
          <Text style={styles.florida1Typo}>{`11:00 `}</Text>
          <Text style={styles.welcomeToDineIn}>PM</Text>
        </Text>
        <View style={[styles.wrapper, styles.frameFlexBox]}>
          <Text style={[styles.text2, styles.text2Typo]}>11:15</Text>
        </View>
        <View style={[styles.container, styles.frameFlexBox]}>
          <Text style={[styles.text2, styles.text2Typo]}>11:15</Text>
        </View>
        <View style={[styles.frame, styles.frameFlexBox]}>
          <Text style={[styles.text2, styles.text2Typo]}>11:15</Text>
        </View>
      </Pressable>
      <View style={[styles.rectangleContainer, styles.rectanglePosition]}>
        <View style={[styles.groupItem, styles.groupChildShadowBox]} />
        <Text style={[styles.seaGrillOf, styles.florida1Typo]}>
          Villagio Restaurant and Bar
        </Text>
        <View
          style={[
            styles.photo2019111222080451Parent,
            styles.image5Icon1Position,
          ]}
        >
          <Image
            style={[styles.photo2019111222080451Icon, styles.iconPosition1]}
            contentFit="cover"
            source={require("@/assets/images/image.png")}
          />
          <Image
            style={styles.image5Icon1Position}
            contentFit="cover"
            source={require("@/assets/images/image.png")}
          />
        </View>
        <Text style={styles.salzedoStreetSuite}>{`344 Plaza Real, Suite 1433
Boca Raton, FL 33432-3937`}</Text>
        <Text style={[styles.am1100Container, styles.containerClr]}>
          <Text style={styles.florida1Typo}>11:30</Text>
          <Text style={styles.welcomeToDineIn}>{` AM - `}</Text>
          <Text style={styles.florida1Typo}>{`11:00 `}</Text>
          <Text style={styles.welcomeToDineIn}>PM</Text>
        </Text>
        <View style={[styles.wrapper, styles.frameFlexBox]}>
          <Text style={[styles.text2, styles.text2Typo]}>11:15</Text>
        </View>
        <View style={[styles.container, styles.frameFlexBox]}>
          <Text style={[styles.text2, styles.text2Typo]}>11:15</Text>
        </View>
        <View style={[styles.frame, styles.frameFlexBox]}>
          <Text style={[styles.text2, styles.text2Typo]}>11:15</Text>
        </View>
      </View>
      <View style={[styles.groupView, styles.groupViewPosition]}>
        <View style={[styles.groupInner, styles.groupChildShadowBox]} />
        <Text style={[styles.seaGrillOf, styles.florida1Typo]}>
          Villagio Restaurant and Bar
        </Text>
        <View
          style={[
            styles.photo2019111222080451Parent,
            styles.image5Icon1Position,
          ]}
        >
          <Image
            style={[styles.photo2019111222080451Icon, styles.iconPosition1]}
            contentFit="cover"
            source={require("@/assets/images/image.png")}
          />
          <Image
            style={styles.image5Icon1Position}
            contentFit="cover"
            source={require("@/assets/images/image.png")}
          />
        </View>
        <Text
          style={styles.salzedoStreetSuite}
        >{`360 San Lorenzo Avenue, Suite 1430 
Coral Gables, FL 33146-1865`}</Text>
        <Text style={[styles.am1100Container, styles.containerClr]}>
          <Text style={styles.florida1Typo}>11:30</Text>
          <Text style={styles.welcomeToDineIn}>{` AM - `}</Text>
          <Text style={styles.florida1Typo}>{`11:00 `}</Text>
          <Text style={styles.welcomeToDineIn}>PM</Text>
        </Text>
        <View style={[styles.wrapper, styles.frameFlexBox]}>
          <Text style={[styles.text2, styles.text2Typo]}>11:15</Text>
        </View>
        <View style={[styles.container, styles.frameFlexBox]}>
          <Text style={[styles.text2, styles.text2Typo]}>11:15</Text>
        </View>
        <View style={[styles.frame, styles.frameFlexBox]}>
          <Text style={[styles.text2, styles.text2Typo]}>11:15</Text>
        </View>
      </View>
      <View style={[styles.rectangleParent1, styles.rectangleLayout]}>
        <View style={[styles.rectangleView, styles.groupChildShadowBox]} />
        <Text style={[styles.seaGrillOf, styles.florida1Typo]}>
          Sea Grill North Miami Beach
        </Text>
        <View
          style={[
            styles.photo2019111222080451Parent,
            styles.image5Icon1Position,
          ]}
        >
          <Image
            style={[styles.photo2019111222080451Icon, styles.iconPosition1]}
            contentFit="cover"
            source={require("@/assets/images/image.png")}
          />
          <Image
            style={styles.iconPosition}
            contentFit="cover"
            source={require("@/assets/images/image.png")}
          />
          <Image
            style={[styles.photo2019111222080452Icon, styles.iconPosition]}
            contentFit="cover"
            source={require("@/assets/images/image.png")}
          />
        </View>
        <Text style={styles.salzedoStreetSuite}>{`3913 NE 163rd St 
North Miami Beach, FL 33160`}</Text>
        <Text style={[styles.am1100Container, styles.containerClr]}>
          <Text style={styles.florida1Typo}>11:30</Text>
          <Text style={styles.welcomeToDineIn}>{` AM - `}</Text>
          <Text style={styles.florida1Typo}>{`11:00 `}</Text>
          <Text style={styles.welcomeToDineIn}>PM</Text>
        </Text>
        <View style={[styles.wrapper, styles.frameFlexBox]}>
          <Text style={[styles.text2, styles.text2Typo]}>11:15</Text>
        </View>
        <View style={[styles.container, styles.frameFlexBox]}>
          <Text style={[styles.text2, styles.text2Typo]}>11:15</Text>
        </View>
        <View style={[styles.frame, styles.frameFlexBox]}>
          <Text style={[styles.text2, styles.text2Typo]}>11:15</Text>
        </View>
      </View>
      <View style={[styles.rectangleParent2, styles.rectanglePosition]}>
        <View style={[styles.groupChild1, styles.groupChildShadowBox]} />
        <Text style={[styles.seaGrillOf, styles.florida1Typo]}>
          Villagio Restaurant and Bar
        </Text>
        <View
          style={[
            styles.photo2019111222080451Parent,
            styles.image5Icon1Position,
          ]}
        >
          <Image
            style={[styles.photo2019111222080451Icon, styles.iconPosition1]}
            contentFit="cover"
            source={require("@/assets/images/image.png")}
          />
          <Image
            style={styles.iconPosition}
            contentFit="cover"
            source={require("@/assets/images/image.png")}
          />
          <Image
            style={styles.image5Icon1Position}
            contentFit="cover"
            source={require("@/assets/images/image.png")}
          />
        </View>
        <Text style={styles.salzedoStreetSuite}>{`1760 Sawgrass Mills Circle
Sunrise, FL 33323-3912`}</Text>
        <Text style={[styles.am1100Container, styles.containerClr]}>
          <Text style={styles.florida1Typo}>11:30</Text>
          <Text style={styles.welcomeToDineIn}>{` AM - `}</Text>
          <Text style={styles.florida1Typo}>{`11:00 `}</Text>
          <Text style={styles.welcomeToDineIn}>PM</Text>
        </Text>
        <View style={[styles.wrapper, styles.frameFlexBox]}>
          <Text style={[styles.text2, styles.text2Typo]}>11:15</Text>
        </View>
        <View style={[styles.container, styles.frameFlexBox]}>
          <Text style={[styles.text2, styles.text2Typo]}>11:15</Text>
        </View>
        <View style={[styles.frame, styles.frameFlexBox]}>
          <Text style={[styles.text2, styles.text2Typo]}>11:15</Text>
        </View>
      </View>
      <View style={[styles.rectangleParent3, styles.groupViewPosition]}>
        <View style={[styles.groupChild2, styles.groupChildShadowBox]} />
        <Text style={[styles.seaGrillOf, styles.florida1Typo]}>
          Carpaccio American Dream
        </Text>
        <View
          style={[
            styles.photo2019111222080451Parent,
            styles.image5Icon1Position,
          ]}
        >
          <Image
            style={[styles.photo2019111222080451Icon, styles.iconPosition1]}
            contentFit="cover"
            source={require("@/assets/images/image.png")}
          />
          <Image
            style={styles.iconPosition}
            contentFit="cover"
            source={require("@/assets/images/image.png")}
          />
          <Image
            style={styles.image5Icon1Position}
            contentFit="cover"
            source={require("@/assets/images/image.png")}
          />
        </View>
        <Text style={styles.salzedoStreetSuite}>{`1 American Dream Way. 
#F225East Rutherford, NJ 07073`}</Text>
        <Text style={[styles.am1100Container, styles.containerClr]}>
          <Text style={styles.florida1Typo}>11:30</Text>
          <Text style={styles.welcomeToDineIn}>{` AM - `}</Text>
          <Text style={styles.florida1Typo}>{`11:00 `}</Text>
          <Text style={styles.welcomeToDineIn}>PM</Text>
        </Text>
        <View style={[styles.wrapper, styles.frameFlexBox]}>
          <Text style={[styles.text2, styles.text2Typo]}>11:15</Text>
        </View>
        <View style={[styles.container, styles.frameFlexBox]}>
          <Text style={[styles.text2, styles.text2Typo]}>11:15</Text>
        </View>
        <View style={[styles.frame, styles.frameFlexBox]}>
          <Text style={[styles.text2, styles.text2Typo]}>11:15</Text>
        </View>
      </View>
      <View style={styles.homeGridViewsliderChild} />
      <View style={[styles.rectangleParent4, styles.groupChild3Layout]}>
        <View style={[styles.groupChild3, styles.groupChild3Layout]} />
        {/* <Clarityhomeline
          style={styles.clarityhomeLineIcon}
          width={21}
          height={21}
        /> */}
        <Text style={styles.home}>Home</Text>
      </View>
      <Image
        style={[styles.materialSymbolsarrowBackRoIcon, styles.materialLayout]}
        contentFit="cover"
        source={require("@/assets/images/image.png")}
      />
      <Pressable
        style={[styles.materialSymbolsarrowBackRo, styles.materialLayout]}
        onPress={() => {}}
      >
        <Image
          style={[styles.icon, styles.iconLayout]}
          contentFit="cover"
          source={require("@/assets/images/image.png")}
        />
      </Pressable>
      {/* <Group8130 style={styles.homeGridViewsliderItem} width={337} height={0} /> */}
      <Image
        style={[styles.pngkitBlackBarPng2505541Icon, styles.iconPosition1]}
        contentFit="cover"
        source={require("@/assets/images/image.png")}
      />
      <View
        style={[
          styles.homeGridViewsliderInner,
          styles.homeGridViewsliderInnerPosition,
        ]}
      />
      <Text
        style={[styles.signUpFor, styles.signUpForPosition]}
      >{`Sign up for an account to receive 2% off your bill on every reservation! `}</Text>
      <View style={[styles.rectangleParent5, styles.signUpForPosition]}>
        <LinearGradient
          style={[
            styles.rectangleLineargradient,
            styles.homeGridViewsliderInnerPosition,
          ]}
          locations={[0, 1]}
          colors={["#faff00", "#ed994c"]}
        />
        <Text style={[styles.automaticallySave2Container, styles.containerClr]}>
          <Text style={styles.welcomeToDineIn}>{`Automatically save `}</Text>
          <Text style={styles.florida1Typo}>2%</Text>
          <Text
            style={styles.welcomeToDineIn}
          >{` on your bill if you reserve your Table With `}</Text>
          <Text style={styles.florida1Typo}>DINE IN FLORIDA</Text>
        </Text>
      </View>
      <View style={styles.groupChild4Position}>
        <View style={[styles.groupChild4, styles.groupChild4Position]} />
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
        <View style={styles.groupChild5} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  rectangleParentLayout: {
    width: wp('100%'), // 375 / 375 * 100
    position: "absolute",
  },
  childShadowBox: {
    backgroundColor: Color.colorGray_100,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowColor: "rgba(0, 0, 0, 0.15)",
    shadowOpacity: 1,
    width: wp('100%'), // 375 / 375 * 100
    left: 0,
    position: "absolute",
  },
  ourRestaurantsPosition: {
    left: wp('8%'), // 30 / 375 * 100
    textAlign: "left",
    position: "absolute",
  },
  florida1Typo: {
    fontWeight: "700",
    fontFamily: FontFamily.segoeUI,
  },
  asset22x1Layout: {
    height: hp('23.52%'), // 191 / 812 * 100
    width: wp('100%'), // 375 / 375 * 100
    position: "absolute",
  },
  iconPosition1: {
    top: 0,
    left: 0,
  },
  wrapperFlexBox: {
    paddingVertical: hp('0.98%'), // do not change
    paddingHorizontal: wp('26.67%'), // do not change
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: wp('28.8%'), // 108 / 375 * 100
    borderRadius: Border.br_9xs,
    top: hp('37.44%'), // 304 / 812 * 100
    display: "none",
    height: hp('3.69%'), // 30 / 812 * 100
    position: "absolute",
  },
  text2Typo: {
    textAlign: "center",
    fontWeight: "700",
    fontFamily: FontFamily.segoeUI,
  },
  rectangleLayout: {
    height: hp('25.86%'), // 210 / 812 * 100
    width: wp('42.13%'), // 158 / 375 * 100
    top: hp('27.83%'), // 226 / 812 * 100
    position: "absolute",
  },
  groupChildShadowBox: {
    shadowColor: "rgba(0, 0, 0, 0.08)",
    borderRadius: Border.br_8xs,
    height: hp('25.86%'), // 210 / 812 * 100
    width: wp('42.13%'), // 158 / 375 * 100
    top: 0,
    backgroundColor: Color.colorGray_100,
    shadowOpacity: 1,
    elevation: 10,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    left: 0,
    position: "absolute",
  },
  image5Icon1Position: {
    height: hp('11.7%'), // 95 / 812 * 100
    width: wp('42.13%'), // 158 / 375 * 100
    top: 0,
    left: 0,
    position: "absolute",
  },
  containerClr: {
    color: Color.secondary,
    textAlign: "left",
    position: "absolute",
  },
  frameFlexBox: {
    paddingVertical: hp('0.61%'), // do not change
    paddingHorizontal: wp('2.67%'), // do not change
    borderRadius: Border.br_11xs,
    top: hp('21.67%'), // 176 / 812 * 100
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
  },
  rectanglePosition: {
    top: hp('56.17%'), // 456 / 812 * 100
    height: hp('25.86%'), // 210 / 812 * 100
    width: wp('42.13%'), // 158 / 375 * 100
    position: "absolute",
  },
  groupViewPosition: {
    top: hp('84.48%'), // 686 / 812 * 100
    height: hp('25.86%'), // 210 / 812 * 100
    width: wp('42.13%'), // 158 / 375 * 100
    position: "absolute",
  },
  iconPosition: {
    height: hp('16.13%'), // 131 / 812 * 100
    width: wp('44.8%'), // 168 / 375 * 100
    top: hp('-2.22%'), // -18 / 812 * 100
    left: 0,
    position: "absolute",
  },
  groupChild3Layout: {
    height: hp('4.43%'), // 36 / 812 * 100
    width: wp('23.2%'), // 87 / 375 * 100
    position: "absolute",
  },
  materialLayout: {
    height: hp('2.46%'), // 20 / 812 * 100
    width: wp('5.33%'), // 20 / 375 * 100
    top: hp('45.56%'), // 370 / 812 * 100
    position: "absolute",
  },
  iconLayout: {
    nodeHeight: hp('2.46%'), // 20 / 812 * 100
    nodeWidth: wp('5.33%'), // 20 / 375 * 100
  },
  homeGridViewsliderInnerPosition: {
    left: "0%", // do not change
    position: "absolute",
  },
  signUpForPosition: {
    left: "50%", // do not change
    position: "absolute",
  },
  groupChild4Position: {
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
    height: hp('1.85%'), // 15 / 812 * 100
    display: "flex",
    textAlign: "center",
    fontSize: FontSize.size_3xs,
    justifyContent: "center",
    alignItems: "center",
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
  frameChild: {
    top: hp('-0.12%'), // -1 / 812 * 100
    height: hp('6.78%'), // 55 / 812 * 100
    elevation: 10,
    shadowRadius: 10,
    backgroundColor: Color.colorGray_100,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowColor: "rgba(0, 0, 0, 0.15)",
  },
  welcomeTo: {
    color: Color.tertiary,
  },
  dineIn: {
    color: Color.primary,
  },
  welcomeToDineIn: {
    fontFamily: FontFamily.segoeUI,
  },
  welcomeToDineInfloridaContainer: {
    fontSize: wp('3.73%'), // 14 / 375 * 100
    textAlign: "left",
    lineHeight: hp('2.96%'), // 24 / 812 * 100
    top: hp('1.85%'), // 15 / 812 * 100
  },
  frameItem: {
    left: wp('85.33%'), // 320 / 375 * 100
    width: wp('6.67%'), // 25 / 375 * 100
    height: hp('3.08%'), // 25 / 812 * 100
    top: hp('1.85%'), // 15 / 812 * 100
    position: "absolute",
  },
  frameInner: {
    top: hp('1.48%'), // 12 / 812 * 100
    left: wp('80.27%'), // 301 / 375 * 100
    position: "absolute",
  },
  rectangleParent: {
    top: hp('9.85%'), // 80 / 812 * 100
    height: hp('11.82%'), // 96 / 812 * 100
    left: 0,
  },
  ourRestaurants: {
    top: hp('18.97%'), // 154 / 812 * 100
    lineHeight: hp('3.94%'), // 32 / 812 * 100
    fontSize: FontSize.size_lg,
    textAlign: "left",
    left: wp('8%'), // 30 / 375 * 100
    position: "absolute",
  },
  asset22x1: {
    height: hp('23.52%'), // 191 / 812 * 100
    width: wp('100%'), // 375 / 375 * 100
    position: "absolute",
  },
  homeBannerImgChild: {
    top: hp('8.75%'), // 71 / 812 * 100
    shadowRadius: 16,
    elevation: 16,
    height: hp('6.4%'), // 52 / 812 * 100
    backgroundColor: Color.colorGray_100,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowColor: "rgba(0, 0, 0, 0.15)",
  },
  discount20: {
    top: hp('10.22%'), // 83 / 812 * 100
    left: wp('30.4%'), // 114 / 375 * 100
    fontSize: wp('5.33%'), // 20 / 375 * 100
    textTransform: "uppercase",
    color: Color.primary,
    textAlign: "left",
    position: "absolute",
  },
  homeBannerImg: {
    top: hp('13.91%'), // 113 / 812 * 100
    display: "none",
    left: 0,
  },
  bookNow: {
    color: Color.white,
    fontSize: FontSize.size_3xs,
    lineHeight: 24,
  },
  bookNowWrapper: {
    left: wp('18.67%'), // 70 / 375 * 100
    backgroundColor: Color.primary,
  },
  explore: {
    fontSize: FontSize.size_3xs,
    color: Color.primary,
    lineHeight: 24,
  },
  exploreWrapper: {
    borderStyle: "solid",
    borderColor: Color.primary,
    borderWidth: 1,
    left: wp('52.8%'), // 198 / 375 * 100
  },
  groupChild: {
    borderRadius: Border.br_8xs,
  },
  seaGrillOf: {
    top: hp('12.93%'), // 105 / 812 * 100
    left: wp('1.87%'), // 7 / 375 * 100
    fontSize: FontSize.size_3xs,
    color: Color.tertiary,
    textAlign: "left",
    position: "absolute",
  },
  photo2019111222080451Icon: {
    width: wp('70.93%'), // 266 / 375 * 100
    height: hp('25.62%'), // 208 / 812 * 100
    borderRadius: Border.br_8xs,
    display: "none",
    position: "absolute",
  },
  photo2019111222080451Parent: {
    borderTopLeftRadius: Border.br_8xs,
    borderTopRightRadius: Border.br_8xs,
    overflow: "hidden",
  },
  salzedoStreetSuite: {
    top: hp('15.76%'), // 128 / 812 * 100
    fontSize: FontSize.size_5xs,
    left: wp('1.87%'), // 7 / 375 * 100
    color: Color.tertiary,
    fontFamily: FontFamily.segoeUI,
    textAlign: "left",
    position: "absolute",
  },
  am1100Container: {
    top: hp('19.09%'), // 155 / 812 * 100
    fontSize: FontSize.size_5xs,
    left: wp('1.87%'), // 7 / 375 * 100
  },
  text2: {
    fontSize: FontSize.size_5xs,
    color: Color.white,
  },
  wrapper: {
    left: wp('1.87%'), // 7 / 375 * 100
    backgroundColor: Color.primary,
  },
  container: {
    left: wp('15.47%'), // 58 / 375 * 100
    backgroundColor: Color.sub,
  },
  frame: {
    left: wp('29.07%'), // 109 / 375 * 100
    backgroundColor: Color.primary,
  },
  rectangleGroup: {
    left: wp('5.33%'), // 20 / 375 * 100
  },
  groupItem: {
    borderRadius: Border.br_8xs,
  },
  rectangleContainer: {
    left: wp('5.33%'), // 20 / 375 * 100
  },
  groupInner: {
    borderRadius: Border.br_8xs,
  },
  groupView: {
    left: wp('5.33%'), // 20 / 375 * 100
  },
  rectangleView: {
    borderRadius: Border.br_8xs,
  },
  photo2019111222080452Icon: {
    borderRadius: Border.br_8xs,
  },
  rectangleParent1: {
    left: wp('52.8%'), // 198 / 375 * 100
  },
  groupChild1: {
    borderRadius: Border.br_8xs,
  },
  rectangleParent2: {
    left: wp('52.8%'), // 198 / 375 * 100
  },
  groupChild2: {
    borderRadius: Border.br_8xs,
  },
  rectangleParent3: {
    left: wp('52.8%'), // 198 / 375 * 100
  },
  homeGridViewsliderChild: {
    top: hp('93.72%'), // 761 / 812 * 100
    left: wp('43.47%'), // 163 / 375 * 100
    backgroundColor: "#d9d9d9",
    width: wp('13.87%'), // 52 / 375 * 100
    height: hp('5.42%'), // 44 / 812 * 100
    display: "none",
    position: "absolute",
  },
  groupChild3: {
    backgroundColor: "rgba(255, 255, 255, 0.19)",
    borderRadius: Border.br_8xs,
    top: 0,
    left: 0,
  },
  clarityhomeLineIcon: {
    top: hp('0.86%'), // 7 / 812 * 100
    left: wp('3.2%'), // 12 / 375 * 100
    position: "absolute",
  },
  home: {
    top: hp('1.35%'), // 11 / 812 * 100
    left: wp('10.93%'), // 41 / 375 * 100
    fontSize: wp('3.2%'), // 12 / 375 * 100
    fontWeight: "600",
    height: hp('1.85%'), // 15 / 812 * 100
    display: "flex",
    width: wp('9.6%'), // 36 / 375 * 100
    alignItems: "center",
    color: Color.primary,
    fontFamily: FontFamily.segoeUI,
    textAlign: "left",
    position: "absolute",
  },
  rectangleParent4: {
    top: hp('93.6%'), // 760 / 812 * 100
    left: wp('8.8%'), // 33 / 375 * 100
    display: "none",
  },
  materialSymbolsarrowBackRoIcon: {
    left: wp('78.67%'), // 295 / 375 * 100
    borderRadius: Border.br_8xs,
    display: "none",
  },
  icon: {
    display: "none",
  },
  materialSymbolsarrowBackRo: {
    left: wp('86.67%'), // 325 / 375 * 100
  },
  homeGridViewsliderItem: {
    bottom: hp('113.3%'), // 920 / 812 * 100
    left: wp('5.33%'), // 20 / 375 * 100
    position: "absolute",
  },
  pngkitBlackBarPng2505541Icon: {
    height: hp('4.8%'), // 39 / 812 * 100
    width: wp('100%'), // 375 / 375 * 100
    position: "absolute",
  },
  homeGridViewsliderInner: {
    height: "3.58%", // do not change
    width: "512%", // do not change
    top: "3.49%", // do not change
    right: "-412%", // do not change
    bottom: "92.92%", // do not change
    backgroundColor: Color.primary,
  },
  signUpFor: {
    marginLeft: -166.5, // do not change
    top: hp('5.54%'), // 45 / 812 * 100
    lineHeight: hp('3.45%'), // 28 / 812 * 100
    color: Color.white,
    fontSize: FontSize.size_3xs,
    fontWeight: "700",
    fontFamily: FontFamily.segoeUI,
    textAlign: "left",
  },
  rectangleLineargradient: {
    top: "0%", // do not change
    right: "0%", // do not change
    bottom: "0%", // do not change
    borderRadius: 10,
    backgroundColor: "transparent",
    height: "100%", // do not change
    left: "0%", // do not change
    width: "100%", // do not change
  },
  automaticallySave2Container: {
    height: "60.87%", // do not change
    width: "85.63%", // do not change
    top: "18.26%", // do not change
    left: "8.87%", // do not change
    fontSize: FontSize.size_lg,
  },
  rectangleParent5: {
    marginLeft: -163.5, // do not change
    top: hp('112.35%'), // 913 / 812 * 100
    width: wp('87.2%'), // 327 / 375 * 100
    height: hp('14.16%'), // 115 / 812 * 100
  },
  groupChild4: {
    shadowColor: "rgba(51, 51, 51, 0.1)",
    shadowOpacity: 1,
    bottom: 0,
    elevation: 10,
    shadowRadius: 10,
    backgroundColor: Color.white,
  },
  clarityhomeLineIcon1: {
    left: wp('11.47%'), // 43 / 375 * 100
  },
  home1: {
    left: wp('9.33%'), // 35 / 375 * 100
    width: wp('9.6%'), // 36 / 375 * 100
    bottom: hp('1.6%'), // 13 / 812 * 100
    color: Color.primary,
  },
  more: {
    left: wp('82.67%'), // 310 / 375 * 100
  },
  icsharpMoreHorizIcon: {
    left: wp('83.47%'), // 313 / 375 * 100
  },
  notifications: {
    left: wp('28.27%'), // 106 / 375 * 100
    width: wp('19.73%'), // 74 / 375 * 100
    color: Color.tertiary,
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
  groupChild5: {
    bottom: hp('8.25%'), // 67 / 812 * 100
    left: wp('4.8%'), // 18 / 375 * 100
    width: wp('18.67%'), // 70 / 375 * 100
    height: hp('0.37%'), // 3 / 812 * 100
    backgroundColor: Color.primary,
    position: "absolute",
  },
  homeGridViewslider: {
    flex: 1,
    height: hp('137.44%'), // 1116 / 812 * 100
    overflow: "hidden",
    width: "100%", // do not change
    backgroundColor: Color.white,
  },
});

export default HomeGridViewslider;