import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { colors } from "./src/theme";
import { PHONES } from "./src/data/phones";
import { SelectPhoneApp } from "./src/ex1/SelectPhoneApp";
import { SelectPhoneApi } from "./src/ex1/SelectPhoneApi";
import { BottomTabApp } from "./src/ex3/ButtomTabApp";
import { StackTabApp } from "./src/ex4/StackTabApp";
import { DrawerApp } from "./src/ex5/DrawerApp";

type Item = { key: string; title: string; render: () => React.ReactElement };

const ITEMS: Item[] = [
  { key: "1", title: "Bài 1: Select Phone", render: () => <SelectPhoneApp phone={PHONES[0]} /> },
  { key: "2", title: "Bài 2: Gắn API", render: () => <SelectPhoneApi /> },
  { key: "3", title: "Bài 3: Bottom Tab", render: () => <BottomTabApp /> },
  { key: "4", title: "Bài 4: Stack + Tab + Params", render: () => <StackTabApp /> },
  { key: "5", title: "Bài 5: Drawer", render: () => <DrawerApp /> },
];

export default function App() {
  const [current, setCurrent] = useState<Item | null>(null);

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      {current ? (
        <View style={styles.flex}>
          {current.render()}
          <Pressable style={styles.back} onPress={() => setCurrent(null)}>
            <Text style={styles.backText}>← Menu</Text>
          </Pressable>
        </View>
      ) : (
        <SafeAreaView style={styles.menu}>
          {ITEMS.map((it) => (
            <Pressable key={it.key} style={styles.btn} onPress={() => setCurrent(it)}>
              <Text style={styles.btnText}>{it.title}</Text>
            </Pressable>
          ))}
        </SafeAreaView>
      )}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  flex: { 
    flex: 1 
  },
  menu: { 
    flex: 1, 
    backgroundColor: colors.bg, 
    padding: 20, 
    gap: 12, 
    justifyContent: "center" 
  },
  title: { 
    fontSize: 22, 
    fontWeight: "700", 
    color: colors.navy, 
    textAlign: "center", 
    marginBottom: 12 
  },
  btn: { 
    backgroundColor: colors.blue, 
    borderRadius: 8, 
    paddingVertical: 14, 
    alignItems: "center" 
  },
  btnText: { 
    color: "#fff", 
    fontWeight: "700", 
    fontSize: 16 
  },
  back: {
    position: "absolute", 
    top: 48, 
    left: 12, 
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 16, 
    paddingHorizontal: 12, 
    paddingVertical: 6,
  },
  backText: { 
    color: "#fff", 
    fontSize: 13 
  }
});