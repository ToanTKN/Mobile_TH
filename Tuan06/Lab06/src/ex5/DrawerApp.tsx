import React, { useState } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme";
import { SettingsProvider, useSettings } from "./SettingsContext";
 
type DrawerParamList = { Home: undefined; Profile: undefined; Settings: undefined };
const Drawer = createDrawerNavigator<DrawerParamList>();
 
type IconName = keyof typeof Ionicons.glyphMap;
const ICONS: Record<keyof DrawerParamList, IconName> = {
  Home: "home-outline",
  Profile: "person-outline",
  Settings: "settings-outline",
};
 
function HomeScreen() {
    const { dark } = useSettings();
  return (
    <View style={[s.center, { backgroundColor: dark ? "#111827" : "#fff" }]}>
      <Text style={[s.big, dark && { color: "#fff" }]}>Xin chào 👋</Text>
    </View>
  );
}
function ProfileScreen() {
    const { dark } = useSettings();
  return (
    <View style={[s.center, { backgroundColor: dark ? "#111827" : "#fff" }]}>
      <View style={s.avatar}><Text style={s.avatarText}>ĐT</Text></View>
      <Text style={[s.big, dark && { color: "#fff" }]}>Nguyen Phuong Toan</Text>
      <Text style={[s.muted, dark && { color: "#fff" }]}>nguyenphuongtoan@gmail.com</Text>
    </View>
  );
}

function SettingsScreen() {
  const { notify, setNotify, dark, setDark } = useSettings();
  return (
    <View style={[s.settings, { backgroundColor: dark ? "#111827" : "#fff" }]}>
      <View style={s.line}>
        <Text style={[s.label, dark && { color: "#fff" }]}>Nhận thông báo</Text>
        <Switch value={notify} onValueChange={setNotify} />
      </View>
      <View style={s.line}>
        <Text style={[s.label, dark && { color: "#fff" }]}>Chế độ tối</Text>
        <Switch value={dark} onValueChange={setDark} />
      </View>
      <Text style={[s.muted, dark && { color: "#fff" }]}>
        Thông báo: {notify ? "BẬT" : "TẮT"} · Giao diện: {dark ? "tối" : "sáng"}
      </Text>
    </View>
  );
}

export function DrawerApp() {
  return (
    <SettingsProvider>
        <NavigationContainer>
      <Drawer.Navigator
        screenOptions={({ route }) => ({
          drawerActiveTintColor: colors.red,
          drawerIcon: ({ color, size }) => (
            <Ionicons name={ICONS[route.name]} size={size} color={color} />
          ),
        })}
      >
        <Drawer.Screen
          name="Home" component={HomeScreen}
          options={{ title: "Trang chủ" }}
        />
        <Drawer.Screen
          name="Profile" component={ProfileScreen}
          options={{ title: "Cá nhân" }}
        />
        <Drawer.Screen
          name="Settings" component={SettingsScreen}
          options={{ title: "Cài đặt" }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
    </SettingsProvider>
  );
}
 
const s = StyleSheet.create({
  center: { 
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center", 
    gap: 6 
  },
  big: { 
    fontSize: 22, 
    fontWeight: "700", 
    color: colors.text 
  },
  muted: { 
    color: colors.muted 
  },
  avatar: {
    width: 96, 
    height: 96, 
    borderRadius: 48, 
    backgroundColor: colors.blue,
    alignItems: "center", 
    justifyContent: "center", 
    marginBottom: 8,
  },
  avatarText: { 
    color: "#fff", 
    fontSize: 32, 
    fontWeight: "700" 
  },
  settings: { 
    flex: 1, 
    padding: 20, 
    gap: 16 
  },
  line: {
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center",
    paddingVertical: 8, 
    borderBottomWidth: 1, 
    borderBottomColor: colors.line,
  },
  label: { 
    fontSize: 16, 
    color: colors.text 
  },
});
