import { Stack } from 'expo-router';
import { useAuthContext } from '../../contexts/auth-context';

export default function AdminLayout() {
    const { adminToken } = useAuthContext();

    return (
        <Stack screenOptions={{ headerShown: false }}>
            {/* Màn hình đăng nhập */}
            <Stack.Screen name="sign-in" />
            
            {/* Các màn hình tab sau khi đăng nhập */}
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
    );
} 