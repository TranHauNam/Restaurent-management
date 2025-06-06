import { StyleSheet } from "react-native";
import { 
  Color, FontFamily, FontSize, 
  Border
} from "@/styles/GlobalStyles";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },

  headerContainer: {
    width: '100%',
    backgroundColor: Color.white,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 1,
    marginTop: hp("2%"),
  },

  contentContainer: {
    flex: 1,
    width: '100%',
  },

  contentWithFooter: {
    marginBottom: hp("15%"), // Space for footer when it's visible
  },

  listContent: {
    padding: wp("4%"),
    flexGrow: 1, // Ensures content fills available space
  },

  cartItem: {
    flexDirection: 'row',
    backgroundColor: Color.white,
    borderRadius: 12,
    marginBottom: hp("2%"),
    padding: wp("4%"),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  itemContent: {
    flex: 1,
    marginRight: wp("3%"),
  },

  itemTitle: {
    fontSize: FontSize.medium,
    fontWeight: '600',
    color: Color.secondary,
    marginBottom: hp("0.5%"),
  },

  itemDescription: {
    fontSize: FontSize.small,
    color: Color.gray,
    marginBottom: hp("1%"),
  },

  itemPrice: {
    fontSize: FontSize.medium,
    fontWeight: '700',
    color: Color.secondary,
  },

  quantityBadge: {
    backgroundColor: Color.lightGray,
    borderRadius: 999,
    paddingHorizontal: wp("3%"),
    paddingVertical: hp("0.5%"),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },

  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.lightGray,
    borderRadius: 999,
    paddingHorizontal: wp("2%"),
    paddingVertical: hp("0.5%"),
    justifyContent: 'space-between',
    minWidth: wp("25%"),
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
    marginHorizontal: wp("2%"),
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Color.white,
    padding: wp("4%"),
    borderTopWidth: 1,
    borderTopColor: Color.lightGray,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp("2%"),
  },

  totalLabel: {
    fontSize: FontSize.medium,
    fontWeight: '600',
    color: Color.secondary,
  },

  totalAmount: {
    fontSize: FontSize.large,
    fontWeight: '700',
    color: Color.secondary,
  },

  checkoutButton: {
    backgroundColor: Color.primary,
    borderRadius: 12,
    padding: hp("2%"),
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkoutButtonDisabled: {
    backgroundColor: Color.gray,
    opacity: 0.5,
  },

  checkoutButtonText: {
    color: Color.white,
    fontSize: FontSize.medium,
    fontWeight: '600',
  },

  checkoutButtonTextDisabled: {
    opacity: 0.7,
  },

  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: hp("4%"),
  },

  emptyText: {
    fontSize: FontSize.medium,
    color: Color.gray,
    textAlign: 'center',
  },
}); 