import React from "react";
import { useRef } from "react";
import { StyleSheet, View, Text, Pressable, TextInput, Alert, StatusBar } from "react-native";

import { Typography } from "@/styles/Typography";
import { useAuthContext } from "@/contexts/auth-context";
import { Padding, Color, Border, FontSize, FontFamily } from "@/styles/GlobalStyles";

import { useRouter } from "expo-router";
import { OtpInput } from "react-native-otp-entry";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { set } from "date-fns";



const SignIn = () => {
  const router = useRouter();
  const emailRef = useRef("");
  const otpRef = useRef("");
  const { login, verifyOTP, setLoading, setAuthenticated } = useAuthContext();

  const handleSignIn = async () => {
    //--------------------Temporary Comment DO NOT DELETE--------------------
    if (!emailRef.current) {
      Alert.alert("Please enter Email");
      console.log("Please enter Email");
      return;
    }

    if (otpRef.current.length < 6) {
      Alert.alert("Please enter Send OTP button");
      console.log("Please enter Send OTP button");
      return;
    }

    let otpResponse = await verifyOTP(otpRef.current);
    
    if (!otpResponse.success) {
      Alert.alert(otpResponse.message);
      console.log(otpResponse.message);
    } else if (otpResponse.success) {
      // router.push("/(app)/(tabs)/");
      setLoading(false);
      setAuthenticated(true);
      router.replace("/");
    }
    //----------------------

    // setLoading(false);
    // setAuthenticated(true);
    // router.replace("/");
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
    <>
    <StatusBar barStyle="dark-content" backgroundColor="#fff" />
    <View style={styles.container}>
      {/* Logo */}
      <Pressable style={styles.logoContainer} onPress={() => {}}>
        <Text style={[Typography.header1 ,styles.logoText]}>
          <Text style={styles.logoTable}>Table</Text>
          <Text style={styles.logoBooky}>Booky</Text>
        </Text>
      </Pressable>

      {/* Welcome Text */}
      <Text style={[Typography.header4, styles.welcomeText]}>
        <Text style={styles.welcomeBack}>Chào mừng bạn, </Text>
        <Text style={styles.signInText}>Đăng nhập</Text>
      </Text>

      {/* Input Fields */}
      <View style={styles.inputGroup}>
        <Text style={[Typography.label, styles.label]}>Email hoặc Số điện thoại</Text>
        <View style={styles.inputField}>
          <TextInput 
            style={[Typography.paragraph ,styles.inputText]} 
            placeholder="Enter" 
            placeholderTextColor={Color.sub} 
            onChangeText={(text) => { emailRef.current = text}}
          />
        </View>
      </View>

      {/* OTP Section */}
      <Text style={[Typography.label, styles.label]}>Nhập mã OTP nhận được</Text>
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
      <Pressable style={[styles.button, { backgroundColor: Color.primary}]} onPress={() => {handleSignIn()}}>
        <Text style={[Typography.largeButton, styles.buttonText]}>Đăng nhập</Text>
      </Pressable>
      <Pressable style={[styles.button, { backgroundColor: Color.secondary }]} onPress={() => {handleSendOTP()}}>
        <Text style={[Typography.largeButton, styles.buttonText]}>Gửi mã OTP</Text>
      </Pressable>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Không có tài khoản?</Text>
        <Pressable onPress={() => {
          router.push("/sign-up-email");
        }}>
          <Text style={styles.signUpText}>Đăng ký</Text>
        </Pressable>
      </View>

      {/* Back to Client Login */}
      <Pressable 
        style={[styles.button, { backgroundColor: Color.primary, marginTop: hp("2%") }]} 
        onPress={() => router.push("/admin/sign-in")}
      >
        <Text style={[Typography.largeButton, styles.backButtonText]}>Đăng nhập Admin</Text>
      </Pressable>
    </View>
        
    </>
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
    color: Color.primary,
    fontSize: FontSize.size_3xl,
  },
  logoTable: {
    color: Color.secondary,
  },
  logoBooky: {
    color: Color.primary,
  },
  welcomeText: {
    marginBottom: hp("4%"),
    
    color: Color.secondary,
    fontSize: FontSize.size_l,
    textAlign: "center",
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
    color: Color.secondary,
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
    color: Color.secondary,
  },
  otpContainer: {
    marginVertical: wp("3%"),
    marginBottom: hp("4%"),
  },

  button: {
    marginBottom: hp("4%"),
    height: "auto",

    borderRadius: Border.br_9xs,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: Color.white,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    // fontSize: FontSize.size_sm,
    color: Color.sub,
    // fontFamily: FontFamily.segoeUI,
  },
  signUpText: {
    // fontSize: FontSize.size_sm,
    color: Color.primary,
    // fontFamily: FontFamily.segoeUI,
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
  },
});

export default SignIn;