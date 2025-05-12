import { Stack } from "expo-router";
import { AuthContextProvider } from "../contexts/auth-context";
import { Slot } from "expo-router";

export default function Layout() {
  return (
    <AuthContextProvider>
      <Stack>
        <Stack.Screen 
          name="index" 
          options={{ 
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="sign-in" 
          options={{ 
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="admin/sign-in" 
          options={{ 
            headerShown: false,
            title: 'Đăng nhập Admin'
          }} 
        />
        <Stack.Screen 
          name="admin" 
          options={{ 
            headerShown: false 
          }} 
        />
      </Stack>
    </AuthContextProvider>
  );
}
