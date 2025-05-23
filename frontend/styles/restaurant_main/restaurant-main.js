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
    fontSize: wp("5%"),
    color: Color.secondary,
    fontFamily: FontFamily.segoeUI,
    fontWeight: "700",
    // marginBottom: hp("2%"),
  },
  headerLine: {
    height: 1,
    backgroundColor: Color.primary,
    marginBottom: hp("2%"),
  },
  restaurantImage: {
    width: "100%",
    height: hp("24%"),
    borderRadius: Border.br_8xs,
    marginBottom: hp("2%"),
  },
  address: {
    fontSize: FontSize.size_sm,
    color: Color.tertiary,
    fontFamily: FontFamily.segoeUI,
    // marginBottom: hp("1%"),
    marginLeft: wp("2%"),
  },
  operatingHours: {
    fontSize: FontSize.size_sm,
    color: Color.tertiary,
    fontFamily: FontFamily.segoeUI,
    // marginBottom: hp("2%"),
    marginLeft: wp("2%"),
  },
  menuLink: {
    fontSize: FontSize.size_sm,
    color: Color.primary,
    textDecorationLine: "underline",
    // marginBottom: hp("4%"),
    marginLeft: wp("2%"),
  },
  sectionTitle: {
    fontSize: FontSize.size_sm,
    color: Color.primary,
    fontFamily: FontFamily.segoeUI,
    fontWeight: "700",
    marginBottom: hp("1%"),
  },
  description: {
    fontSize: FontSize.size_xs,
    color: Color.tertiary,
    fontFamily: FontFamily.segoeUI,
    
  },
  readMore: {
    fontSize: FontSize.size_sm,
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
    fontSize: FontSize.size_sm,
    color: Color.white,
    fontFamily: FontFamily.segoeUI,
    fontWeight: "700",
  },
});