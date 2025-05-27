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
    fontSize: wp("4.27%"),
    color: Color.secondary,
    fontFamily: FontFamily.segoeUI,
    fontWeight: "700",
    marginBottom: hp("2%"),
  },
  headerLine: {
    height: 1,
    backgroundColor: Color.primary,
    marginBottom: hp("2%"),
  },
  bookingItem: {
    backgroundColor: Color.white,
    paddingVertical: hp("2%"),
    borderBottomWidth: 1,
    borderBottomColor: Color.sub,
    marginBottom: hp("2%"),
  },
  restaurantName: {
    // fontSize: FontSize.size_sm,
    // fontFamily: FontFamily.segoeUI,
    fontWeight: "700",
    color: Color.tertiary,
    marginBottom: hp("0.5%"),
  },
  status: {
    // fontSize: FontSize.size_xs,
    // fontFamily: FontFamily.segoeUI,
    marginBottom: hp("1%"),
  },
  reservedStatus: {
    color: Color.primary,
  },
  cancelledStatus: {
    color: Color.colorCrimson,
  },
  completedStatus: {
    color: "#00a144",
  },
  actionButton: {
    marginBottom: hp("0.5%"),
  },
  actionText: {
    // fontSize: FontSize.size_3xs,
    // fontFamily: FontFamily.segoeUI,
    textDecorationLine: "underline",
  },
  cancelText: {
    color: Color.colorCrimson,
  },
  editText: {
    color: "#00a144",
  },
  timeAgo: {
    // fontSize: FontSize.size_3xs,
    // fontFamily: FontFamily.segoeUI,
    color: Color.tertiary,
    textAlign: "right",
    marginBottom: hp("1%"),
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailsText: {
    // fontSize: FontSize.size_xs,
    // fontFamily: FontFamily.segoeUI,
    color: Color.tertiary,
  },
});