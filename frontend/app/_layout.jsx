import { useEffect } from 'react';

import { AuthContextProvider } from "../contexts/auth-context";

import { Stack } from "expo-router";
import { useFonts } from 'expo-font';

export default function Layout() {
  const [loaded, error] = useFonts({
    'Roboto-Medium': require('../assets/fonts/Roboto/normal/Roboto-Medium.ttf'),
    'Roboto-Regular': require('../assets/fonts/Roboto/normal/Roboto-Regular.ttf'),
    'Roboto-Bold': require('../assets/fonts/Roboto/normal/Roboto-Bold.ttf'),
    'Roboto-Light': require('../assets/fonts/Roboto/normal/Roboto-Light.ttf'),
    'Roboto-Black': require('../assets/fonts/Roboto/normal/Roboto-Black.ttf'),
    'Roboto-Thin': require('../assets/fonts/Roboto/normal/Roboto-Thin.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      if (error) {
        console.error("Error loading fonts:", error);
      } else {
        console.log("Fonts loaded successfully");
      }
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <AuthContextProvider>
      <Stack
        screenOptions={{
          headerShown: false, // This hides the header
        }}
      >
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
