import React from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import { colors } from "../theme";

export function Loading() {
  return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color={colors.blue} />
      <Text style={styles.text}>Đang tải...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { 
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center", 
    gap: 12, 
    backgroundColor: "#fff" 
  },
  text: { 
    color: colors.muted, 
    fontSize: 14 
  },
});