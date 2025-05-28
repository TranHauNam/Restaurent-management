import { StyleSheet } from "react-native";
import { Color, FontFamily, FontSize, Border } from "@/styles/GlobalStyles";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    
    paddingHorizontal: wp("4%"),
    paddingTop: hp("6%"),
  },
  headerBanner: {
    paddingVertical: hp("2%"),
    paddingHorizontal: wp("4%"),
    borderRadius: Border.br_8xs,
    marginBottom: hp("4%"),
  },
  headerText: {
    color: Color.white,
    textAlign: "center",
  },
  welcomeText: {
    color: Color.secondary,
  },
  highlightText: {
    color: Color.primary,
  },
  sectionTitle: {
    color: Color.primary,
    marginBottom: hp("2%"),
  },
  listContainer: {
    paddingBottom: hp("4%"),
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: hp("2%"),
  },
  cardContainer: {
    marginBottom: hp("2%"),
    minWidth: "100%",
    height: hp("20%"),


    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "baseline",
    
  },

  cardPressable: {
    minWidth: "100%",
    height: "50%",    
    
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  cardImage: {
    width: wp("20%"),
    height: hp("10%"),

    borderRadius: 10,    
  },
  cardTitle: {
    
  },
  cardAddress: {          
    minWidth: "70%",

    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 2,
  },
  cardHours: {
    // fontSize: FontSize.size_xs,
    // fontFamily: FontFamily.segoeUI,
    color: Color.tertiary,
    marginBottom: hp("1%"),
  },
  timeSlots: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeSlot: {
    backgroundColor: Color.primary,
    borderRadius: Border.br_8xs,
    paddingVertical: hp("0.5%"),
    paddingHorizontal: wp("2%"),
  },

  timeSlotContainer: {
    marginHorizontal: wp("3%"),
    width: wp("18%"),
    minHeight: "50%",

    backgroundColor: Color.primary,
    borderRadius: 4,

    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
          
  },

  timeSlotText: {
    fontSize: FontSize.size_xs,
    color: Color.white,
    textAlign: "center",
  },

  restaurantListContainer: {
    width: "100%",
    height: "100%", 
    flexDirection: "column",

    display: "flex",
    justifyContent: "flex-start",
    alignItems: "baseline",
  },

});