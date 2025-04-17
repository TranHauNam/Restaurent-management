import { View, Text, StyleSheet, TextInput, Pressable, Alert } from "react-native";
import React from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Color, FontFamily, Border, FontSize } from "@/styles/GlobalStyles";
import { useRouter } from "expo-router";
import { useRef } from "react";
import { useAuthContext } from "@/contexts/auth-context";


export default function SignUpEmail() {
  const router = useRouter();
  const emailRef = useRef("");
  const fullNameRef = useRef("");

  const { register, setLoading, setAuthenticated } = useAuthContext();

  const handleSignUp = async () => {
    if (!emailRef.current || !fullNameRef.current) {
      Alert.alert("Sign Up", "Please fill in all fields!");
      console.log("Please fill in all fields!");
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
        <Text style={styles.logoText}>
          <Text style={styles.logoTable}>Table</Text>
          <Text style={styles.logoBooky}>Booky</Text>
        </Text>
      </Pressable>

      {/* Title */}
      <Text style={styles.title}>Let’s get you started</Text>

      {/* Input Fields */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Full name</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Your usename" 
          placeholderTextColor={Color.sub}
          onChangeText={(text) => { fullNameRef.current = text; }}
       />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email address</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Enter your email" 
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
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </Pressable>

      {/* Already a User */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Already a user?</Text>
        <Pressable onPress={() => {
          router.push("/sign-in");
        }}>
          <Text style={styles.signInText}>Sign in</Text>
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
  title: {
    fontSize: wp("5%"),
    color: Color.secondary,
    fontFamily: FontFamily.segoeUI,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: hp("4%"),
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
  input: {
    height: hp("5%"),
    borderWidth: 1,
    borderColor: Color.sub,
    borderRadius: Border.br_9xs,
    paddingHorizontal: wp("4%"),
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.segoeUI,
    color: Color.secondary,
  },
  passwordGuidelines: {
    marginBottom: hp("4%"),
  },
  guidelineText: {
    fontSize: FontSize.size_xs,
    color: Color.sub,
    fontFamily: FontFamily.segoeUI,
    marginBottom: hp("1%"),
  },
  signUpButton: {
    backgroundColor: Color.primary,
    borderRadius: Border.br_9xs,
    alignItems: "center",
    justifyContent: "center",
    height: hp("5%"),
    marginBottom: hp("4%"),
  },
  signUpButtonText: {
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
  signInText: {
    fontSize: FontSize.size_sm,
    color: Color.primary,
    fontFamily: FontFamily.segoeUI,
    textDecorationLine: "underline",
    marginLeft: wp("2%"),
  },
});