import { StyleSheet } from 'react-native';


import { 
    Color, FontSize,
    screenWidthSAV, marginLeftSAV, marginTopSAV,   
} from '@/styles/GlobalStyles';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

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

  mainLayout: {
    // //debug
    // borderWidth: 1,
  },

  mainContainer: {
    //debug
    // borderWidth: 1,
    // borderColor: "red",
  },

  smallBoxContainer: {
    marginHorizontal: wp("4%"), 
    marginTop: hp("1.6%"),
    backgroundColor: Color.white,
  },
  boxDivider: {
        width: wp("100%"),
        marginVertical: hp("1%"),
        alignSelf: "center",
        height: hp("1.4%"),

        backgroundColor: "#eee",
        
    },

  statusSection: {
    marginTop: hp("1%"),
    paddingHorizontal: wp("4%"),
  },
  statusLabel: {
    fontSize: FontSize.size_m,
  },
  statusRow: {
    marginTop: hp("0.5%"),
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: wp("3.2%"),
    height: hp("1.6%"),
    marginRight: wp("2%"),

    borderRadius: 999,
  },
  statusText: {
    fontSize: FontSize.size_m,
  },



  statusTime: {
    marginTop: hp("0.5%"),

    fontSize: FontSize.size_xs,
    color: Color.tertiary,
  },
  detailSection: {
    marginTop: hp("1.6%"),
    paddingHorizontal: wp("4%"),
  },
  detailHeader: {
    marginBottom: hp("1%"),
    fontSize: FontSize.size_m,
  },
  detailRow: {
    paddingVertical: hp("1%"),

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLabel: {
    fontSize: FontSize.size_m,
  },
  detailValue: {
    fontSize: FontSize.size_m,
  },
});