import { StyleSheet } from "react-native";
import { 
  Color, FontFamily, 
  FontSize, Border,
  marginLeftSAV, marginTopSAV,
  screenWidthSAV, 
} from "@/styles/GlobalStyles";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: screenWidthSAV,
    marginTop: marginTopSAV,
    marginLeft: marginLeftSAV,

    backgroundColor: Color.white,

    flexDirection: "column",
    justifyContent: "flex-start",
    position: "relative",
    
    // //debug
    // borderWidth: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    height: hp("6%"),        
        
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "center",
    position: "relative",
    zIndex: 999,

    // //debug
    // borderWidth: 1,
  },
  backBut: {
      position: "absolute",
      left: wp("4%"),
      top: hp("1.5%"),
      width: wp("6%"),
      height: hp("3%"),

      justifyContent: "center",
      alignItems: "center",

      // //debug
      // borderWidth: 1, 
  },
  headerText: {        
      // textAlign: "center",
      marginLeft: wp("12%"),
      fontSize: FontSize.size_l,
      color: Color.secondary,
      lineHeight: hp("6%"),

      // //debug
      // borderWidth: 1,
  },

  headerContainer: {
    marginBottom: hp("2%"),

    flexDirection: "row",
    gap: wp("2%"),
  },
  restaurantTitle: {
    marginTop: -hp("0.8%"),
    
    color: Color.secondary,
    fontSize: FontSize.size_l,

    // //debug
    // borderWidth: 1,
  },
  headerLine: {
    marginBottom: hp("2%"),
    marginTop: hp("0.8%"),
    // marginHorizontal: wp("2.4%"),
    height: 1,
    backgroundColor: Color.primary,
  },

  mainLayout: {
    // //debug
    // borderWidth: 1,
  },

  mainContent: {
    //debug
    // borderColor: "red",
    // borderWidth: 1,

    paddingBottom: hp("4%"),
    paddingHorizontal: wp("2.4%"),
  },
  restaurantImage: {
    width: "100%",
    height: hp("24%"),
    borderRadius: Border.br_8xs,
    marginBottom: hp("2%"),
  },
  address: {
    marginLeft: wp("2%"),
    color: Color.secondary,
  },

  mapLink: {
    fontSize: FontSize.size_s,
    color: Color.primary,
    textDecorationLine: "underline",
    marginLeft: wp("2%"),
  },
  operatingHours: {
    marginLeft: wp("2%"),
    color: Color.secondary,
  },
  menuLink: {
    marginLeft: wp("2%"),

    color: Color.primary,
    textDecorationLine: "underline",
  },
  sectionTitle: {
    // fontSize: FontSize.size_sm,
    color: Color.primary,
    // fontFamily: FontFamily.segoeUI,
    fontWeight: "700",
    marginBottom: hp("1%"),
  },
  description: {
    color: Color.secondary,  
  },
  readMore: {
    // fontSize: FontSize.size_sm,
    color: Color.primary,
    textDecorationLine: "underline",
    marginBottom: hp("4%"),
  },

  findSlotsButton: {
    paddingVertical: hp("1.5%"),

    borderRadius: Border.br_8xs,
    backgroundColor: Color.primary,
    alignItems: "center",
  },
  findSlotsText: {
    color: Color.white,
  },
});