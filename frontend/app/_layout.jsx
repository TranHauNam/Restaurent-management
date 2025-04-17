import { Stack } from "expo-router";
import { AuthContextProvider } from "../contexts/auth-context";
import { Slot } from "expo-router";


export default function RootLayout() {

  return (
    <AuthContextProvider>
      <Slot />
    </AuthContextProvider>
  );
}
