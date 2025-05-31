import { StyleSheet } from "react-native";
import { Color, FontFamily, FontSize, Border } from "@/styles/GlobalStyles";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";


export const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: Color.white,
  },
  header: {
    paddingTop: 40,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  support: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  supportText: {
    marginLeft: wp("2%"),
    fontSize: FontSize.size_m,
  },
  points: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F5E9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pointText: {
    fontWeight: 'bold',
    marginRight: 4,
  },
  pointValue: {
    fontWeight: 'bold',
  },
  avatarSection: {
    alignItems: 'center',
    marginTop: hp("4%"),
  },
  avatar: {
    width: wp("18%"),
    height: hp("9%"),

    borderRadius: 999,
    backgroundColor: Color.primary,
  },
  name: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: '700',
  },
  customerCode: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  levelSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  levelItem: {
    backgroundColor: '#FFF8E1',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    position: 'relative',
  },
  levelText: {
    fontSize: 14,
    fontWeight: '500',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#000',
    borderRadius: 10,
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
  },
  menuSection: {
    paddingHorizontal: 16,
  },
  menuItem: {
    borderBottomWidth: 1,
    borderColor: Color.lightsub,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp("2%"),
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIconBox: {
    marginRight: wp("2.4%"),
    backgroundColor: Color.lightPrimary,
    padding: 10,
    borderRadius: 12,
  },
  menuLabel: {
    fontSize: FontSize.size_m,
  },

  versionSection: {
    marginTop: hp("2%"),
  },

  versionText: {
    alignSelf: 'center',
    fontSize: FontSize.size_s,
    color: Color.tertiary,
  },
});