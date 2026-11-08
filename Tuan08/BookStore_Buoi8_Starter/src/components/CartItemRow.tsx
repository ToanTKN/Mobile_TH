import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { CartItem } from "../types";
import { useDebounce } from "../hooks/useDebounce";
import { colors, formatPrice, radius } from "../theme";

interface Props {
  item: CartItem;
  onChangeQty: (bookId: number, quantity: number) => void;
  onRemove: (bookId: number) => void;
}

export function CartItemRow({ item, onChangeQty, onRemove }: Props) {
  // 1) State cục bộ và debounced value
  const [qty, setQty] = useState(item.quantity);
  const debouncedQty = useDebounce(qty, 300);

  // 2) Đẩy lên store sau 300ms dừng bấm
  useEffect(() => {
    if (debouncedQty !== item.quantity) {
      onChangeQty(item.bookId, debouncedQty);
    }
  }, [debouncedQty]);

  // 3) Đồng bộ lại khi store đổi từ nơi khác
  useEffect(() => {
    setQty(item.quantity);
  }, [item.quantity]);

  // 4) Điều kiện tăng / giảm
  const canDec = qty > 1;
  const canInc = qty < item.stock;

  return (
    <View style={styles.row}>
      <View style={[styles.cover, { backgroundColor: item.color }]}>
        <Text style={styles.emoji}>{item.emoji}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
        
        {/* Bộ điều khiển tăng / giảm số lượng */}
        <View style={styles.qtyControlRow}>
          <Pressable
            disabled={!canDec}
            onPress={() => setQty((q) => q - 1)}
            style={[styles.stepBtn, !canDec && styles.stepBtnDisabled]}
            accessibilityLabel="Giảm"
            hitSlop={4}
          >
            <Text style={[styles.stepBtnText, !canDec && styles.stepBtnTextDisabled]}>−</Text>
          </Pressable>

          <Text style={styles.qtyValue}>{qty}</Text>

          <Pressable
            disabled={!canInc}
            onPress={() => setQty((q) => q + 1)}
            style={[styles.stepBtn, !canInc && styles.stepBtnDisabled]}
            accessibilityLabel="Tăng"
            hitSlop={4}
          >
            <Text style={[styles.stepBtnText, !canInc && styles.stepBtnTextDisabled]}>+</Text>
          </Pressable>

          <Text style={styles.stockText}>Còn {item.stock}</Text>
        </View>
      </View>

      <Pressable onPress={() => onRemove(item.bookId)} hitSlop={8} accessibilityLabel="Xóa khỏi giỏ">
        <Text style={styles.trash}>🗑️</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: 10,
    marginHorizontal: 12,
    marginVertical: 5,
    gap: 10,
  },
  cover: {
    width: 54,
    height: 72,
    borderRadius: radius.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: { fontSize: 26 },
  info: { flex: 1, gap: 4 },
  title: { fontWeight: "700", color: colors.text },
  price: { color: colors.indigo, fontWeight: "800" },
  qtyControlRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 4,
  },
  stepBtn: {
    width: 28,
    height: 28,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  stepBtnDisabled: {
    opacity: 0.35,
    borderColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
  },
  stepBtnText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.navy,
  },
  stepBtnTextDisabled: {
    color: colors.muted,
  },
  qtyValue: {
    fontWeight: "800",
    color: colors.navy,
    fontSize: 15,
    minWidth: 20,
    textAlign: "center",
  },
  stockText: {
    fontSize: 12,
    color: colors.muted,
    marginLeft: 4,
  },
  trash: { fontSize: 22 },
});