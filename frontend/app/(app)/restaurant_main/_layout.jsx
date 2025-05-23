import { Stack } from "expo-router";

export default function RestaurantMainLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false, // This hides the header
            }}
        />
    );
}