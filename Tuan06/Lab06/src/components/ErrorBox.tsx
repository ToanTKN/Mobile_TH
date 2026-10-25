import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { colors } from "../theme";

export function ErrorBox({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>Đã có lỗi xảy ra</Text>
      <Text style={styles.msg}>{message}</Text>
      <Pressable style={styles.btn} onPress={onRetry}>
        <Text style={styles.btnText}>THỬ LẠI</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { 
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center", 
    padding: 24, 
    gap: 10, 
    backgroundColor: "#fff" 
  },
  title: { 
    fontSize: 18, 
    fontWeight: "700", 
    color: colors.red 
  },
  msg: { 
    color: colors.text, 
    textAlign: "center" 
  },
  btn: { 
    backgroundColor: colors.blue, 
    borderRadius: 6, 
    paddingHorizontal: 24, 
    paddingVertical: 12, 
    marginTop: 8 
  },
  btnText: { 
    color: "#fff", 
    fontWeight: "700" 
  },
});