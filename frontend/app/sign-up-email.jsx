import React from "react";
import { useRef } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, Alert } from "react-native";

import { Typography } from "@/styles/Typography";
import { useAuthContext } from "@/contexts/auth-context";
import { Color, FontFamily, Border, FontSize } from "@/styles/GlobalStyles";

import { useRouter } from "expo-router";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";


export default function SignUpEmail() {
  const router = useRouter();
  const emailRef = useRef("");
  const fullNameRef = useRef("");

  const { register, setLoading, setAuthenticated } = useAuthContext();

  const handleSignUp = async () => {
    if (!emailRef.current || !fullNameRef.current) {
      Alert.alert("Đăng ký", "Vui lòng điền đầy đủ thông tin!");
      // console.log("Please fill in all fields!");
      return;
    }

    let response = await register(fullNameRef.current, emailRef.current);
    if (!response.success) {
      Alert.alert("Sign Up", response.message);
      console.log(response.message);
    } else if (response.success) {
      console.log(response.message);
      router.push("/submit-OTP");
    }
  }

  return (
    <View style={styles.container}>
      {/* Logo need to fix => Change to TableBooky */}
      <Pressable style={styles.logoContainer} onPress={() => {}}>
        <Text style={[Typography.header1, styles.logoText]}>
          <Text style={styles.logoTable}>Table</Text>
          <Text style={styles.logoBooky}>Booky</Text>
        </Text>
      </Pressable>

      {/* Title */}
      <Text style={[Typography.header4, styles.title]}>Hãy bắt đầu</Text>

      {/* Input Fields */}
      <View style={styles.inputGroup}>
        <Text style={[Typography.label, styles.label]}>Họ và tên</Text>
        <TextInput 
          style={[Typography.paragraph ,styles.input]} 
          placeholder="Nhập họ và tên" 
          placeholderTextColor={Color.sub}
          onChangeText={(text) => { fullNameRef.current = text; }}
       />
      </View>

      <View style={styles.inputGroup}>
        <Text style={[Typography.label, styles.label]}>Email</Text>
        <TextInput 
          style={[Typography.paragraph ,styles.input]} 
          placeholder="Nhập email" 
          placeholderTextColor={Color.sub} 
          onChangeText={(text) => { emailRef.current = text; }}
        />
      </View>

      {/* <View style={styles.inputGroup}>
        <Text style={styles.label}>Create password</Text>
        <TextInput style={styles.input} placeholder="Enter your password" secureTextEntry />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Confirm password</Text>
        <TextInput style={styles.input} placeholder="Confirm your password" secureTextEntry />
      </View> */}

      {/* Password Guidelines
      <View style={styles.passwordGuidelines}>
        <Text style={styles.guidelineText}>Password must contain a minimum of 8 characters</Text>
        <Text style={styles.guidelineText}>Password must contain at least one symbol e.g. @, !</Text>
      </View> */}

      {/* Sign Up Button */}
      <Pressable style={styles.signUpButton} onPress={() => {
        handleSignUp();
      }}>
        <Text style={[Typography.largeButton, styles.signUpButtonText]}>Đăng ký</Text>
      </Pressable>

      {/* Already a User */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Đã có tài khoản?</Text>
        <Pressable onPress={() => {
          router.push("/sign-in");
        }}>
          <Text style={styles.signInText}>Đăng nhập</Text>
        </Pressable>
      </View>
    </View>
  );
}

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
    fontSize: FontSize.size_3xl,
    color: Color.primary,
  },
  logoTable: {
    color: Color.secondary,
  },
  logoBooky: {
    color: Color.primary,
  },
  title: {
    fontSize: FontSize.size_l,
    textAlign: "center",
    marginBottom: hp("4%"),
  },
  inputGroup: {
    marginBottom: hp("3%"),
  },
  label: {
    color: Color.secondary,
    marginBottom: hp("1%"),
  },
  input: {
    height: hp("5%"),

    borderWidth: 1,
    borderColor: Color.sub,
    borderRadius: Border.br_9xs,

    color: Color.secondary,
    paddingHorizontal: wp("4%"),
  },
  passwordGuidelines: {
    marginBottom: hp("4%"),
  },
  guidelineText: {
    // fontSize: FontSize.size_xs,
    color: Color.sub,
    // fontFamily: FontFamily.segoeUI,
    marginBottom: hp("1%"),
  },
  signUpButton: {
    height: "auto",
    marginBottom: hp("4%"),

    backgroundColor: Color.primary,
    borderRadius: Border.br_9xs,
    
    alignItems: "center",
    justifyContent: "center",
  },

  signUpButtonText: {
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
  signInText: {
    // fontSize: FontSize.size_sm,
    color: Color.primary,
    // fontFamily: FontFamily.segoeUI,
    textDecorationLine: "underline",
    marginLeft: wp("2%"),
  },
});