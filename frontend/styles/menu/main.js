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
    backgroundColor: Color.white,
  },

  headerContainer: {
    marginTop: hp("2%"),
    width: '100%',
    backgroundColor: Color.white,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 1,
  },

  contentContainer: {
    flex: 1,
    width: '100%',
    marginBottom: hp("10%"),
  },

  menuContainer: {
    padding: wp("2%"),
  },

  card: {
    flex: 1,
    margin: wp("2%"),
    backgroundColor: Color.white,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    padding: wp("3%"),
  },

  image: {
    width: '100%',
    height: hp("15%"),
    borderRadius: 12,
    marginBottom: hp("1%"),
  },

  title: {
    fontSize: FontSize.medium,
    fontWeight: '600',
    color: Color.secondary,
    marginBottom: hp("0.5%"),
  },

  description: {
    fontSize: FontSize.small,
    color: Color.gray,
    marginBottom: hp("1%"),
    lineHeight: hp("2.2%"),
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },

  price: {
    fontSize: FontSize.medium,
    fontWeight: '700',
    color: Color.secondary,
  },

  // Quantity Control Styles
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.lightGray,
    borderRadius: 999,
    padding: wp("0.2%"),
  },

  quantityButton: {
    backgroundColor: Color.primary,
    borderRadius: 999,
    width: wp("8%"),
    height: wp("8%"),
    justifyContent: 'center',
    alignItems: 'center',
  },

  quantityText: {
    fontSize: FontSize.medium,
    fontWeight: '600',
    color: Color.secondary,
    marginHorizontal: wp("3%"),
    minWidth: wp("6%"),
    textAlign: 'center',
  },

  addButton: {
    backgroundColor: Color.primary,
    padding: wp("0.5%"),
    borderRadius: 999,
    width: wp("8%"),
    height: wp("8%"),
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Cart Summary Styles
  cartSummary: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Color.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: wp("4%"),
    borderTopWidth: 1,
    borderTopColor: Color.lightGray,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  totalAmount: {
    fontSize: FontSize.medium,
    fontWeight: '700',
    color: Color.secondary,
  },

  viewCartButton: {
    backgroundColor: Color.primary,
    padding: wp("3%"),
    borderRadius: 999,
    width: wp("12%"),
    height: wp("12%"),
    justifyContent: 'center',
    alignItems: 'center',
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