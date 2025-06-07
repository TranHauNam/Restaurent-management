import { Tabs, Redirect } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { useAuthContext } from '../../../contexts/auth-context';
import { Color } from '../../../styles/GlobalStyles';

export default function TabsLayout() {
    const { adminToken } = useAuthContext();

    // Nếu chưa đăng nhập, chuyển về trang đăng nhập
    if (!adminToken) {
        return <Redirect href="/admin/sign-in" />;
    }

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Color.primary,
                tabBarInactiveTintColor: Color.sub,
                tabBarStyle: {
                    height: 60,
                    paddingBottom: 5,
                    paddingTop: 5,
                    backgroundColor: '#fff',
                    borderTopWidth: 1,
                    borderTopColor: Color.primary,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    marginBottom: 5,
                },
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="statistics"
                options={{
                    title: 'Thống kê',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="bar-chart" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="edit-restaurant"
                options={{
                    title: 'Nhà hàng',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="edit" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="manage-food"
                options={{
                    title: 'Quản lý món ăn',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="cutlery" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="manage-tables"
                options={{
                    title: 'Quản lý bàn',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="table" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                // options={{
                //     title: 'Thông tin cá nhân',
                //     tabBarButton: () => null, // Ẩn khỏi tab bar
                //     headerShown: false,
                // }}
                options={{
                    title: 'Thông tin cá nhân',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="user-circle" size={24} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
} 