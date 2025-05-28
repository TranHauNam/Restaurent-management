import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

  /* fonts */
  export const FontFamily = {
    segoeUI: "Segoe UI",
    poppinsBold: "Poppins-Bold",
    poppinsSemiBold: "Poppins-SemiBold",
    poppinsRegular: "Poppins-Regular",
  };
  /* font sizes */
  export const FontSize = {
    size_4xl: hp("6%"),
    size_3xl: hp("4.8%"),  
    size_2xl: hp("4%"),  
    size_xl: hp("3.4%"),    
    size_l: hp("2.8%"),   
    size_m: hp("2.2%"), 
    size_s: hp("2%"),   
    size_xs: hp("1.6%"),   
    size_2xs: hp("1.2%"),   
  };
  /* Colors */
  export const Color = {
    white: "#fff",
    sub: "#cecece",
    secondary: "#2b2b2b",
    primary: "#F49B33",
    colorGray_100: "rgba(255, 255, 255, 0.13)",
    tertiary: "#5e5e5e",
    black: "#000",
  };
  /* border radiuses */
  export const Border = {
    br_9xs: 4,
    br_8xs: 5,
    br_xl: 20,
  };

  /* Paddings */
  export const Padding = {
    p_150xl: 169, //padding width
    p_5xs: 8, //pading height
    p_3xs: 10,
    p_mini: 15,
  };

  /* Gaps */
export const Gap = {
  gap_md: hp(1.23),
};
export const screenWidthSAV = wp("97.2%");
export const marginTopSAV = hp("3.4%");
export const marginLeftSAV = wp("1.8%");