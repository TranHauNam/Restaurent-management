import React, { useRef } from "react";
import { StyleSheet, View, Text, Pressable, TextInput, Alert } from "react-native";
import { Color, Border, FontSize, FontFamily } from "@/styles/GlobalStyles";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useRouter } from "expo-router";
import { useAuthContext } from "@/contexts/auth-context";

const AdminSignIn = () => {
  const router = useRouter();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const { loginAdmin } = useAuthContext();

  const handleSignIn = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Thông báo", "Vui lòng nhập đầy đủ thông tin");
      return;
    }

    try {
      const response = await loginAdmin(emailRef.current, passwordRef.current);
      console.log("Login response:", response);
      
      if (response.success) {
        Alert.alert("Thành công", "Đăng nhập thành công", [
          {
            text: "OK",
            onPress: () => router.replace("/admin")
          }
        ]);
      } else {
        Alert.alert("Đăng nhập thất bại", response.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Lỗi", "Có lỗi xảy ra khi đăng nhập");
    }
  };

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
        <Text style={styles.welcomeBack}>Chào mừng, </Text>
        <Text style={styles.signInText}>Đăng nhập Admin</Text>
      </Text>

      {/* Input Fields */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputField}>
          <TextInput 
            style={styles.inputText} 
            placeholder="Nhập email" 
            placeholderTextColor={Color.sub} 
            onChangeText={(text) => { emailRef.current = text}}
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Mật khẩu</Text>
        <View style={styles.inputField}>
          <TextInput 
            style={styles.inputText} 
            placeholder="Nhập mật khẩu" 
            placeholderTextColor={Color.sub}
            secureTextEntry
            onChangeText={(text) => { passwordRef.current = text}}
          />
        </View>
      </View>

      {/* Sign In Button */}
      <Pressable style={styles.signInButton} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Đăng nhập</Text>
      </Pressable>

      {/* Back to Client Login */}
      <Pressable 
        style={styles.backButton} 
        onPress={() => router.back()}
      >
        <Text style={styles.backButtonText}>Quay lại đăng nhập khách hàng</Text>
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
  signInButton: {
    backgroundColor: Color.primary,
    borderRadius: Border.br_9xs,
    alignItems: "center",
    justifyContent: "center",
    height: hp("5%"),
    marginBottom: hp("2%"),
  },
  buttonText: {
    color: Color.white,
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.segoeUI,
    fontWeight: "700",
  },
  backButton: {
    alignItems: "center",
    marginTop: hp("2%"),
  },
  backButtonText: {
    color: Color.primary,
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.segoeUI,
    textDecorationLine: "underline",
  },
});

export default AdminSignIn; 