import React from "react";
import { Pressable, Image, View, Text, StyleSheet } from "react-native";
import { Phone } from "../types";
import { PHONE_COLORS } from "../data/phones";
import { colors, formatPrice } from "../theme";
 
export function ProductRow({ phone, onPress }: { phone: Phone; onPress: () => void }) {
  return (
    <Pressable style={styles.row} onPress={onPress}>
      <Image
        source={PHONE_COLORS[phone.defaultColor].image}
        style={styles.thumb}
        resizeMode="contain"
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.name} numberOfLines={2}>{phone.name.split(" - ")[0]}</Text>
        <Text style={styles.price}>{formatPrice(phone.price)}</Text>
      </View>
      <Text style={styles.chevron}>{">"}</Text>
    </Pressable>
  );
}
 
const styles = StyleSheet.create({
  row: {
    flexDirection: "row", 
    alignItems: "center", 
    gap: 12, 
    backgroundColor: "#fff",
    borderRadius: 8, 
    padding: 10
  },
  thumb: { 
    width: 56, 
    height: 64 
  },
  name: { 
    fontSize: 15, 
    color: colors.text, 
    fontWeight: "600" 
  },
  price: { 
    marginTop: 4, 
    color: colors.red, 
    fontWeight: "700" 
  },
  chevron: { 
    color: colors.muted, 
    fontSize: 18 
  }
});
