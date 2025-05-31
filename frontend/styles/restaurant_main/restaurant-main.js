import { StyleSheet } from "react-native";
import { Color, FontFamily, FontSize, Border } from "@/styles/GlobalStyles";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    paddingHorizontal: wp("6%"),
    paddingTop: hp("6%"),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    marginTop: -hp("0.8%"),
    height: 1,
    backgroundColor: Color.primary,
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
    backgroundColor: Color.primary,
    paddingVertical: hp("1.5%"),
    borderRadius: Border.br_8xs,
    alignItems: "center",
  },
  findSlotsText: {
    // fontSize: FontSize.size_sm,
    color: Color.white,
    // fontFamily: FontFamily.segoeUI,
    fontWeight: "700",
  },
});