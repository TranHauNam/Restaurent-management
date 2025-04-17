import React from "react";
import { StyleSheet, View, Text, Pressable, TextInput, Alert } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Color, FontFamily, Border, FontSize } from "@/styles/GlobalStyles";
import { OtpInput } from "react-native-otp-entry";
import { useState, useRef } from "react";
import { useRouter } from "expo-router";
import { useAuthContext } from "@/contexts/auth-context";

const SubmitOTP = () => {
  const router = useRouter();
  const otpRef = useRef("");
  const { verifyOTP, setLoading, setAuthenticated  } = useAuthContext();

  const handleSignUp = async () => {
    console.log("Sign Up button pressed");
    if (otpRef.current.length < 6) {
      Alert.alert("Sign Up", "Please enter full the OTP!");
      console.log("Please enter full the OTP!");
      return;
    }

    let response = await verifyOTP(otpRef.current);
    if (!response.success) {
      Alert.alert("Sign Up", response.message);
      console.log(response.message);
    } else if (response.success) {
      router.replace("/");
    }
  };

  const handleSignIn = () => {
    console.log("Sign In button pressed");
    router.push("/sign-in");
  };


  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={{ alignItems: "center", justifyContent: "center", marginVertical: hp("3%"), flexDirection: "row" }}> 
        <Text style={{color: Color.primary, fontSize: hp("4%"), fontWeight: "300"}}>Dine-in</Text>
        <Text style={{color: Color.primary, fontSize:hp("4%"), fontWeight:"bold"  }}>Floria</Text>
      </View>

      <View style={{ alignItems: "center", color: Color.secondary, marginVertical: hp("3.5%") }}>
        <Text style={{color: Color.secondary, fontSize: hp("3%"), fontWeight: "300"}}>Check for OTP</Text>
      </View>

      {/* style={styles.infoText} */}
      <Text style={{ alignItems: "center", color: Color.sub, fontSize: FontSize.size_sm, marginVertical: hp("1%") }}>
        You will get an OTP regarding registration on your provided medium.
      </Text>

      {/* OTP Section */}
      <View style={styles.otpContainer}>
        <OtpInput 
          numberOfDigits={6}
          focusColor= {Color.primary}
          onTextChange={(text) => {
            console.log("OTP entered: ", text);
            otpRef.current = text;
          }} 
        />
      </View>

      {/* Resend OTP */}
      <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginVertical: hp("1%") }}>
        <Text style={{color: Color.sub, fontSize: FontSize.size_sm, marginVertical: hp("1%"), textDecorationLine: "underline", marginHorizontal: wp("0.5%")}}>Resend OTP</Text>
        <Text style={{color: Color.sub, fontSize: FontSize.size_sm, marginVertical: hp("1%"), marginHorizontal: wp("0.5%")}}>in</Text>
        <Text style={{color: Color.sub, fontSize: FontSize.size_sm, marginVertical: hp("1%"), marginHorizontal: wp("0.5%")}}>5:00</Text>
      </View>
      
      {/* Button */}
      <Pressable style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpText}>Sign Up</Text>
      </Pressable>
      <View style={styles.signInContainer}>
        <Text style={styles.alreadyUserText}>Already a user?</Text>
        <Pressable onPress={handleSignIn}>
          <Text style={styles.signInText}>Sign in</Text>
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
  },
  infoText: {
    fontSize: FontSize.size_xs,
    color: Color.sub,
    textAlign: "left",
    fontFamily: FontFamily.segoeUI,
  },
  title: {
    marginTop: hp("5%"),
    fontSize: wp("4.8%"),
    color: "#f7fcfd",
    textAlign: "center",
    fontFamily: FontFamily.segoeUI,
  },
  signUpButton: {
    marginTop: hp("10%"),
    backgroundColor: Color.primary,
    borderRadius: Border.br_9xs,
    alignItems: "center",
    justifyContent: "center",
    height: hp("5%"),
  },
  signUpText: {
    color: Color.secondary,
    fontSize: FontSize.size_base,
    fontWeight: "700",
    fontFamily: FontFamily.segoeUI,
  },
  signInContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: hp("2%"),
  },
  alreadyUserText: {
    color: Color.sub,
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.segoeUI,
  },
  signInText: {
    color: Color.primary,
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.segoeUI,
    textDecorationLine: "underline",
    marginLeft: wp("2%"),
  },
  otpContainer: {
    marginVertical: hp("3%"),
    marginHorizontal: wp("2%"),
  },
});

export default SubmitOTP;