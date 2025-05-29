import { StyleSheet } from "react-native";

import { 
  Color, FontFamily, FontSize, 
  Border, marginLeftSAV, marginTopSAV, 
  screenWidthSAV 
} from "@/styles/GlobalStyles";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";




export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: marginTopSAV,
    width: screenWidthSAV,
    marginLeft: marginLeftSAV,
    backgroundColor: Color.white,

    flexDirection: "column",
    justifyContent: "flex-start",
    position: "relative",

    // //debug
    // borderWidth: 1,
  },
  
  header: {
    height: hp("8%"),

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",

    // // debug
    // borderWidth: 1,

  },

  headerText: { 
    color: Color.secondary,
  },

  readAllIcon: {
    position: "absolute",
    right: wp("2%"),
    top: hp("1.8%"),
    width: wp("10%"),
    height: hp("4.2%"),

    alignItems: "center",
    justifyContent: "center",

    // //debug
    // borderWidth: 1,
  },

  notiLayout: {
    // //debug
    // borderWidth: 1,
  },

  notiContainer: {
    //debug
    // borderWidth: 1,
    // borderColor: "red",
  },

  notiItem: {
    padding: wp("4%"),

    backgroundColor: Color.white,

    borderBottomColor: Color.sub,
    borderBottomWidth: 1,

    // //debug
    // borderWidth: 1,
  },

  notiTitle: {

  },

  notiDescription: {

  },

  notiContent: {

  },

  notiTime: {

  },
});