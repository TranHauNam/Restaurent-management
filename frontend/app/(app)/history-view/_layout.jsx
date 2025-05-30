import { Stack } from "expo-router";

export default function HistoryViewLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false, // This hides the header
            }}
        />
    );
}