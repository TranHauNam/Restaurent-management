// turn those file to tab 4 space

import React from "react";
import { StyleSheet, View, Text, Pressable, TextInput, Alert } from "react-native";
import { Padding, Color, Border, FontSize, FontFamily } from "@/styles/GlobalStyles";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useRef } from "react";
import { useRouter } from "expo-router";
import { OtpInput } from "react-native-otp-entry";
import { useAuthContext } from "@/contexts/auth-context";
import { set } from "date-fns";


const SignIn = () => {
  const router = useRouter();
  const emailRef = useRef("");
  const otpRef = useRef("");
  const { login, verifyOTP, setLoading, setAuthenticated } = useAuthContext();

  const handleSignIn = async () => {
    // if (!emailRef.current) {
    //   Alert.alert("Please enter Email");
    //   console.log("Please enter Email");
    //   return;
    // }

    // if (otpRef.current.length < 6) {
    //   Alert.alert("Please enter Send OTP button");
    //   console.log("Please enter Send OTP button");
    //   return;
    // }

    // let otpResponse = await verifyOTP(otpRef.current);
    // if (!otpResponse.success) {
    //   Alert.alert(otpResponse.message);
    //   console.log(otpResponse.message);
    // } else if (otpResponse.success) {
    //   // router.push("/(app)/(tabs)/");
    //   setAuthenticated(true);
    //   router.replace("/");
    // }

    setLoading(false);
    setAuthenticated(true);
    router.replace("/");
  }

  const handleSendOTP = async () => {
    if (!emailRef.current) {
      Alert.alert("Please enter Email");
      console.log("Please enter Email");
      return;
    }

    let emailResponse = await login(emailRef.current);
    if (emailResponse.success) {
      Alert.alert("Please check the email for OTP");
      console.log("Please check the email for OTP");
      
    } else if (!emailResponse.success) {
      Alert.alert(emailResponse.message);
      console.log(emailResponse.message);
    }
  }

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
          <TextInput 
            style={styles.inputText} 
            placeholder="Enter" 
            placeholderTextColor={Color.sub} 
            onChangeText={(text) => { emailRef.current = text}}
          />
        </View>
      </View>

      {/* OTP Section */}
      <Text style={styles.label}>Enter OTP Received</Text>
      <View style={styles.otpContainer}>
        <OtpInput 
          numberOfDigits={6}
          focusColor= {Color.primary}
          onTextChange={(text) => {
            otpRef.current = text;
            console.log("OTP entered: ", text);
          }} 
        />
      </View>

      {/* Buttons */}
      <Pressable style={styles.signInButton} onPress={() => {handleSignIn()}}>
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>
      <Pressable style={styles.sendOtpButton} onPress={() => {handleSendOTP()}}>
        <Text style={styles.buttonText}>Send OTP</Text>
      </Pressable>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account?</Text>
        <Pressable onPress={() => {
          router.push("/sign-up-email");
        }}>
          <Text style={styles.signUpText}>Sign Up</Text>
        </Pressable>
      </View>

      {/* Back to Client Login */}
      <Pressable 
        style={styles.backButton} 
        onPress={() => router.push("/admin/sign-in")}
      >
        <Text style={styles.backButtonText}>Đăng nhập Admin</Text>
      </Pressable>
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
    marginVertical: wp("3%"),
    marginBottom: hp("4%"),
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
  backButton: {
    backgroundColor: Color.primary,
    borderRadius: Border.br_9xs,
    alignItems: "center",
    justifyContent: "center",
    height: hp("5%"),
    marginTop: hp("2%"),
  },
  backButtonText: {
    color: Color.white,
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.segoeUI,
    fontWeight: "700",
  },
});

export default SignIn;