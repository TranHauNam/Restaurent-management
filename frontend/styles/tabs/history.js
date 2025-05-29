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

  hisViewOption: {
    height: hp("6%"),

    borderBottomColor: Color.lightsub,
    borderBottomWidth: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",


    // //debug
    // borderWidth: 1,
  },

  optionBox: { 
    flex: 1,
    height: hp("5.8%"), 
    alignItems: "center",
    justifyContent: "center",
    
    // //debug
    // borderWidth: 1,
  },

  hisLayout: {
    backgroundColor: Color.white,


    // //debug
    // borderWidth: 1,
  },

  hisContainer: {
    //debug
    // borderWidth: 1,
    // borderColor: "red",
  },

});