import { Text, View } from "react-native";
import { router, Stack, useRouter, useFocusEffect } from "expo-router";
import { useEffect } from "react";

import { useAuthContext } from "@/contexts/auth-context";

export default function AppLayout() {
    const router = useRouter();

    const { isAuthenticated, isLoading, setAuthenticated } = useAuthContext();

    if (isLoading) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

    useFocusEffect(() => {
        if (isAuthenticated == false) {
            console.log("isAuthentiacted in app: ", isAuthenticated);
            router.replace("/sign-in");
        }
    });



    return (
        <Stack
            screenOptions={{
                headerShown: false, // This hides the header
            }}
        />
    );
}