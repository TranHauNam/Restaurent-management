import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Color } from "@/styles/GlobalStyles";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";



const TabIcon = ({ name, label, focused }) => {
  return (
    <View style={styles.iconContainer}>
      {focused && <View style={styles.activeLine} />}
      <AntDesign name={name} size={hp("2.46%")} color={focused ? Color.primary : Color.sub} />
      <Text style={[styles.tabLabel, { color: focused ? Color.primary : Color.sub }]}>{label}</Text>
    </View>
  );
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: hp("8.62%"),
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => <TabIcon name="home" label="Home" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "Notifications",
          tabBarIcon: ({ focused }) => (
            <TabIcon name="notification" label="Notifications" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ focused }) => <TabIcon name="clockcircleo" label="History" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "More",
          tabBarIcon: ({ focused }) => <TabIcon name="ellipsis1" label="More" focused={focused} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    width: "100%",
    minWidth: wp("28.67%"),
    height: "100%",
    minHeight: hp("7.39%"),
    marginTop: hp("2.5%"),
  },
  activeLine: {
    width: "100%",
    maxWidth: wp("18.67%"),
    height: 3,
    backgroundColor: Color.primary,
    borderRadius: 2,
    position: "absolute",
    top: -hp("0%"),
  },
  tabLabel: {
    fontSize: hp("1.23%"),
    fontFamily: "Segoe UI",
    marginTop: hp("0.5%"),
  },
});