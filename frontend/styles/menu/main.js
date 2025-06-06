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
  notiLayout: {
    flex: 1,
    //debug
    // borderWidth: 1,
  },

  notiContainer: {
    width: screenWidthSAV,

    flexDirection: "column",
    alignItems: "item-start",
    flexWrap: "wrap",
    justifyContent: "space-between",
    
    //debug
    // borderWidth: 1,
    // borderColor: "red",
  },

  card: {
    marginHorizontal: wp("2%"),
    marginVertical: hp("2%"),

    width: wp("45%"),

    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,

    padding: hp("2%"),
  },
  image: {
    width: '100%',
    height: hp("20%"),
    marginBottom: hp("1%"),
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  location: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  addButton: {
    backgroundColor: Color.primary,
    padding: hp("1.4%"),
    borderRadius: 999,
  },

  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: hp("4%"),
    width: '100%',
  },
  emptyText: {
    fontSize: FontSize.medium,
    color: Color.secondary,
    textAlign: 'center',
  },

});