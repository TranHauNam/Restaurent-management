import React from "react";
import { StyleSheet, View, Text, Pressable, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Padding, Color, Border, FontSize, FontFamily } from "@/styles/GlobalStyles";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const SignIn = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Pressable style={styles.logoContainer} onPress={() => {}}>
        <Text style={styles.logoText}>
          <Text style={styles.logoTable}>Table</Text>
          <Text style={styles.logoBooky}>Booky</Text>
        </Text>
      </Pressable>

      {/* Welcome Text */}
      <Text style={styles.welcomeText}>
        <Text style={styles.welcomeBack}>Welcome Back, </Text>
        <Text style={styles.signInText}>Sign In</Text>
      </Text>

      {/* Input Fields */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email or Phone Number</Text>
        <View style={styles.inputField}>
          <TextInput style={styles.inputText} placeholder="it.nguyenducthanh@gmail.com"/>
        </View>
      </View>

      {/* OTP Section */}
      <Text style={styles.label}>Enter OTP Received</Text>
      <View style={styles.otpContainer}>
        <View style={styles.otpBox}>
          <Text style={styles.otpText}>9</Text>
        </View>
        <View style={styles.otpBox}>
          <Text style={styles.otpText}>9</Text>
        </View>
        <View style={styles.otpBox}>
          <Text style={styles.otpText}>9</Text>
        </View>
        <View style={styles.otpBox}>
          <Text style={styles.otpText}>9</Text>
        </View>
      </View>

      {/* Buttons */}
      <Pressable style={styles.signInButton} onPress={() => {}}>
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>
      <Pressable style={styles.sendOtpButton} onPress={() => {}}>
        <Text style={styles.buttonText}>Send OTP</Text>
      </Pressable>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Don’t have an account?</Text>
        <Pressable onPress={() => {}}>
          <Text style={styles.signUpText}>Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    paddingHorizontal: wp("8%"),
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: hp("4%"),
  },
  logoText: {
    fontSize: wp("6%"),
    color: Color.primary,
    fontFamily: FontFamily.segoeUI,
    fontWeight: "700",
  },
  logoTable: {
    fontWeight: "400",
  },
  logoBooky: {
    fontWeight: "700",
  },
  welcomeText: {
    fontSize: wp("5%"),
    color: Color.secondary,
    fontFamily: FontFamily.segoeUI,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: hp("4%"),
  },
  welcomeBack: {
    color: Color.sub,
  },
  signInText: {
    color: Color.primary,
  },
  inputGroup: {
    marginBottom: hp("3%"),
  },
  label: {
    fontSize: FontSize.size_sm,
    color: Color.secondary,
    fontFamily: FontFamily.segoeUI,
    marginBottom: hp("1%"),
  },
  inputField: {
    height: hp("5%"),
    borderWidth: 1,
    borderColor: Color.sub,
    borderRadius: Border.br_9xs,
    paddingHorizontal: wp("4%"),
    justifyContent: "center",
  },
  inputText: {
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.segoeUI,
    color: Color.secondary,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: hp("4%"),
  },
  otpBox: {
    width: wp("15%"),
    height: hp("6%"),
    borderWidth: 1,
    borderColor: Color.sub,
    borderRadius: Border.br_9xs,
    justifyContent: "center",
    alignItems: "center",
  },
  otpText: {
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.segoeUI,
    color: Color.secondary,
  },
  signInButton: {
    backgroundColor: Color.primary,
    borderRadius: Border.br_9xs,
    alignItems: "center",
    justifyContent: "center",
    height: hp("5%"),
    marginBottom: hp("2%"),
  },
  sendOtpButton: {
    backgroundColor: Color.secondary,
    borderRadius: Border.br_9xs,
    alignItems: "center",
    justifyContent: "center",
    height: hp("5%"),
    marginBottom: hp("4%"),
  },
  buttonText: {
    color: Color.white,
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.segoeUI,
    fontWeight: "700",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    fontSize: FontSize.size_sm,
    color: Color.sub,
    fontFamily: FontFamily.segoeUI,
  },
  signUpText: {
    fontSize: FontSize.size_sm,
    color: Color.primary,
    fontFamily: FontFamily.segoeUI,
    textDecorationLine: "underline",
    marginLeft: wp("2%"),
  },
});

export default SignIn;