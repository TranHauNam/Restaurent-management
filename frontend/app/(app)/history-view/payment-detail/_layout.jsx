import { Stack } from "expo-router";

export default function PaymentDetailLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                // headerTitle: "Payment Detail",
                // headerBackTitle: "Back"
            }}
        />
    );
}