import { StyleSheet } from "react-native";
import { Color, FontFamily, FontSize, Border } from "@/styles/GlobalStyles";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    paddingHorizontal: wp("8%"),
    paddingTop: hp("6%"),
  },
  headerTitle: {
    fontSize: wp("5%"),
    color: Color.secondary,
    fontFamily: FontFamily.segoeUI,
    fontWeight: "700",
    marginBottom: hp("2%"),
  },
  headerLine: {
    height: 1,
    backgroundColor: Color.primary,
    marginBottom: hp("4%"),
  },
  profileSection: {
    alignItems: "center",
    marginBottom: hp("6%"),
  },
  profileImage: {
    width: wp("20%"),
    height: wp("20%"),
    borderRadius: wp("10%"),
    marginBottom: hp("2%"),
  },
  profileName: {
    // fontSize: FontSize.size_base,
    fontFamily: FontFamily.segoeUI,
    fontWeight: "700",
    color: Color.primary,
    marginBottom: hp("1%"),
  },
  editProfile: {
    // fontSize: FontSize.size_3xs,
    color: Color.primary,
    textDecorationLine: "underline",
    marginBottom: hp("2%"),
  },
  contactInfo: {
    // fontSize: FontSize.size_sm,
    // fontFamily: FontFamily.segoeUI,
    color: Color.tertiary,
    marginBottom: hp("1%"),
  },
  savingsSection: {
    alignItems: "center",
    marginBottom: hp("6%"),
  },
  savingsTitle: {
    // fontSize: FontSize.size_sm,
    // fontFamily: FontFamily.segoeUI,
    marginBottom: hp("1%"),
  },
  savingsLabel: {
    color: Color.tertiary,
  },
  savingsHighlight: {
    color: Color.colorOrange,
  },
  savingsSubtitle: {
    // fontSize: FontSize.size_xs,
    // fontFamily: FontFamily.segoeUI,
    color: Color.tertiary,
    marginBottom: hp("2%"),
  },
  savingsAmountContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.11)",
    paddingVertical: hp("1%"),
    paddingHorizontal: wp("4%"),
    borderRadius: wp("2%"),
  },
  savingsAmount: {
    // fontSize: FontSize.size_sm,
    // fontFamily: FontFamily.poppinsBold,
    color: Color.primary,
  },
  amount: {
    fontSize: wp("5%"),
  },
  currency: {
    fontSize: wp("4%"),
  },
  logoutButton: {
    backgroundColor: Color.primary,
    paddingVertical: hp("1.5%"),
    paddingHorizontal: wp("8%"),
    borderRadius: wp("2%"),
    alignSelf: "center",
  },
  logoutText: {
    // fontSize: FontSize.size_sm,
    // fontFamily: FontFamily.segoeUI,
    color: Color.white,
    textAlign: "center",
  },
});