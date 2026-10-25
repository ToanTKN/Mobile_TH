import React, { useState } from "react";
import { View, Text, FlatList, TextInput, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { PHONES } from "../data/phones";
import { colors } from "../theme";
 
type TabParamList = { Home: undefined; Search: undefined; Profile: undefined };
const Tab = createBottomTabNavigator<TabParamList>();
 
type IconName = keyof typeof Ionicons.glyphMap;

const ICONS: Record<keyof TabParamList, [IconName, IconName]> = {
  Home: ["home", "home-outline"],
  Search: ["search", "search-outline"],
  Profile: ["person", "person-outline"],
};
 
function HomeTab() {
  return (
    <FlatList
      data={PHONES}
      keyExtractor={(p) => p.id}
      contentContainerStyle={{ padding: 16, gap: 10 }}
      renderItem={({ item }) => (
        <View style={s.card}><Text>{item.name.split(" - ")[0]}</Text></View>
      )}
    />
  );
}

function SearchTab() {
  const [keyword, setKeyword] = useState("");
  const kw = keyword.trim().toLowerCase();
  const results = PHONES.filter((p) => p.name.toLowerCase().includes(kw));
 
  return (
    <View style={s.screen}>
      <TextInput
        value={keyword}
        onChangeText={setKeyword}
        placeholder="Nhập từ khóa"
        style={s.input}
      />
      {results.length === 0 ? (
        <Text style={s.empty}>Không có kết quả cho “{keyword}”</Text>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(p) => p.id}
          contentContainerStyle={{ gap: 10 }}
          renderItem={({ item }) => (
            <View style={s.card}><Text>{item.name.split(" - ")[0]}</Text></View>
          )}
        />
      )}
    </View>
  );
}

function ProfileTab() {
  const name = "Nguyen Phuong Toan";
  return (
    <View style={s.center}>
      <View style={s.avatar}>
        <Text style={s.avatarText}>{name.charAt(0)}</Text>
      </View>
      <Text style={s.name}>{name}</Text>
      <Text style={s.muted}>nguyenphuongtoan@gmail.com</Text>
    </View>
  );
}

export function BottomTabApp() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: colors.red,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={ICONS[route.name][focused ? 0 : 1]}
              size={size}
              color={color}
            />
          ),
        })}
      >
        <Tab.Screen
          name="Home" component={HomeTab}
          options={{ title: "Trang chủ" }}
        />
        <Tab.Screen
          name="Search" component={SearchTab}
          options={{ title: "Tìm kiếm" }}
        />
        <Tab.Screen
          name="Profile" component={ProfileTab}
          options={{ title: "Cá nhân" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
 
const s = StyleSheet.create({
  screen: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: colors.bg 
  },
  card: { 
    backgroundColor: "#fff", 
    borderRadius: 8, 
    padding: 14 
  },
  input: {
    backgroundColor: "#fff", 
    borderWidth: 1, 
    borderColor: colors.line,
    borderRadius: 8, 
    padding: 10, 
    marginBottom: 12,
  },
  empty: { 
    textAlign: "center", 
    color: colors.muted, 
    marginTop: 24 
  },
  center: { 
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center", 
    gap: 6 
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
    fontSize: 40, 
    fontWeight: "700" 
  },
  name: { 
    fontSize: 22, 
    fontWeight: "700", 
    color: colors.text 
  },
  muted: { 
    color: colors.muted 
  },
});

