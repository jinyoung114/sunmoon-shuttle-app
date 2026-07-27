import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";

import MapScreen from "./MapScreen";
import RouteScreen from "./RouteScreen";
import NotificationScreen from "./NotificationScreen";
import ProfileScreen from "./ProfileScreen";
import ScheduleScreen from "./ScheduleScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function StudentScreen({ setScreen }) {
  
  // 하단 탭 네비게이터 정의
  function StudentTabs() {
    const insets = useSafeAreaInsets();

    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size, focused }) => {
            let iconName;
            if (route.name === "지도") {
              iconName = focused ? "map" : "map-outline";
            } else if (route.name === "전체 노선") {
              iconName = focused ? "bus" : "bus-outline";
            } else if (route.name === "알림") {
              iconName = focused ? "notifications" : "notifications-outline";
            } else if (route.name === "내 정보") {
              iconName = focused ? "person" : "person-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#003D7C", // 선문대 상징색 (블루)
          tabBarInactiveTintColor: "#94A3B8", // 비활성 색상
          tabBarStyle: {
            backgroundColor: "#FFFFFF",
            borderTopWidth: 1,
            borderTopColor: "#E2E8F0",
            height: 60 + insets.bottom,
            paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
            paddingTop: 8,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: "700",
          },
          headerShown: false,
        })}
      >
        <Tab.Screen name="지도" component={MapScreen} />
        <Tab.Screen name="전체 노선" component={RouteScreen} />
        <Tab.Screen name="알림" component={NotificationScreen} />
        <Tab.Screen 
          name="내 정보" 
          component={ProfileScreen} 
          initialParams={{ setScreen }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer independent={true}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="StudentMain" component={StudentTabs} />
          <Stack.Screen name="Schedule" component={ScheduleScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({});