import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { PRICE_RANGES, PriceRange } from "../utils/filters";
import { colors, radius } from "../theme";

interface Props {
  value: PriceRange;
  onChange: (v: PriceRange) => void;
}

// THỬ THÁCH (BT7.C2): 3 nút lọc khoảng giá (bấm lần nữa để bỏ chọn)
export function PriceFilter({ value, onChange }: Props) {
  return (
    <View style={styles.row}>
      {PRICE_RANGES.map((r) => {
        const active = value === r.key;
        return (
          <Pressable
            key={r.key}
            style={[styles.btn, active && styles.btnActive]}
            onPress={() => onChange(active ? null : r.key)}
          >
            <Text style={[styles.text, active && styles.textActive]}>{r.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", paddingHorizontal: 12, paddingBottom: 8, gap: 8 },
  btn: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.cyan,
    backgroundColor: "#fff",
  },
  btnActive: {
    backgroundColor: colors.cyan,
  },
  text: {
    color: colors.text,
    fontSize: 12,
    fontWeight: "700",
  },
  textActive: {
    color: "#fff",
  },
});
