import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Text, Pressable } from "react-native";
import { StatusBadge } from "../components/StatusBadge";
import { PrimaryButton } from "../components/PrimaryButton";
import { EmptyState } from "../components/EmptyState";
import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";
import { TodoBox } from "../components/TodoBox";
import { getOrdersByUser } from "../services/orderService";
import { getBooks } from "../services/bookService";
import { getErrorMessage } from "../api/client";
import { useAuth, useCart } from "../store/hooks";
import { formatDateTime } from "../utils/format";
import { showMessage } from "../utils/dialog";
import { RootScreenProps } from "../navigation/types";
import { Order } from "../types";
import { colors, formatPrice, radius } from "../theme";

export const PAYMENT_LABEL = { cod: "Thanh toán khi nhận hàng (COD)", bank: "Chuyển khoản ngân hàng" } as const;

export function OrdersScreen({ navigation }: RootScreenProps<"Orders">) {
  const { user, isLoggedIn } = useAuth();
  const { items: cartItems, add, setQty, remove } = useCart(); {/* BT9.C1 */}
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openId, setOpenId] = useState<number | null>(null); // đơn đang mở rộng (xem chi tiết ngay tại màn này)
  

  const load = useCallback(async () => {
    // TODO BT9.3a: if (!user) return; bật loading, xoá error; gọi getOrdersByUser(user.id);
    // SẮP XẾP LẠI ở client: mới nhất lên đầu (b.createdAt.localeCompare(a.createdAt)); catch → setError(getErrorMessage(e)); finally tắt loading
    // void getOrdersByUser; void getErrorMessage; void setOrders; void setError;
    // setLoading(false);
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getOrdersByUser(user.id);
      setOrders([...data].sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
      load();
  }, [load]);

  // TODO BT9.C1 (thử thách "Mua lại"): thêm lại toàn bộ sản phẩm của đơn vào giỏ hiện tại
  const reorder = async (order: Order) => {
    // 
    try {
      const books = await getBooks(); 
      const skipped: string[] = [];
      let added = 0;

      for (const it of order.items) {
        const book = books.find((b) => b.id === it.bookId);
        if (!book || book.stock <= 0) {
          skipped.push(it.title); 
          continue;
        }

        const existing = cartItems.find((c) => c.bookId === book.id);
        const target = Math.min((existing?.quantity ?? 0) + it.quantity, book.stock);

        if (existing) remove(book.id); 
        add({
          bookId: book.id, title: book.title, price: book.price,
          emoji: book.emoji, color: book.color, stock: book.stock,
        });
        setQty(book.id, target);
        added++;
      }

      const goCart = () => navigation.navigate("Tabs", { screen: "Cart" });

      if (added === 0) {
        showMessage("Không thể mua lại", "Các sách trong đơn này hiện đã hết hàng.");
      } else if (skipped.length > 0) {
        showMessage("Đã thêm vào giỏ", `Không thêm được (hết hàng): ${skipped.join(", ")}`, goCart);
      } else {
        goCart();
      }
    } catch (e) {
      showMessage("Không thể mua lại", getErrorMessage(e));
    }
  };

  if (!isLoggedIn) {
    return <EmptyState emoji="🔒" title="Bạn cần đăng nhập" actionLabel="Đăng nhập" onAction={() => navigation.navigate("Login")} />;
  }
  if (loading) return <LoadingView />;
  if (error) return <ErrorView message={error} onRetry={load} />;

  void StatusBadge; void PrimaryButton; void formatDateTime; void formatPrice; void radius; void colors; void reorder; void setOpenId; void openId;
  return (
    // <View style={styles.container}>
    //   <TodoBox id="BT9.3b">{"FlatList đơn hàng: mỗi thẻ có Đơn #id, ngày (formatDateTime), tổng tiền, <StatusBadge>; bấm vào thẻ → mở rộng chi tiết sản phẩm + địa chỉ giao ngay trên màn này (openId)."}</TodoBox>
    //   <TodoBox id="BT9.3c">{"ListEmptyComponent: <EmptyState emoji=\"🧾\" title=\"Bạn chưa có đơn hàng nào\" …> có nút “Mua sắm ngay”."}</TodoBox>
    // </View>
    <FlatList
      style={styles.container}
      contentContainerStyle={{ padding: 12, gap: 10 }}
      data={orders}
      keyExtractor={(o) => String(o.id)}
      renderItem={({ item: o }) => {
        const open = openId === o.id;
        return (
          <Pressable style={styles.card} onPress={() => setOpenId(open ? null : o.id)}>
            <View style={styles.row}>
              <Text style={styles.id}>Đơn #{o.id}</Text>
              <StatusBadge status={o.status} />
            </View>
            <Text style={styles.date}>{formatDateTime(o.createdAt)}</Text>
            <View style={styles.row}>
              <Text style={styles.total}>{formatPrice(o.total)}</Text>
              <Text style={styles.toggle}>Chi tiết {open ? "▲" : "▼"}</Text>
            </View>

            {open && (
              <View style={styles.detail}>
                {o.items.map((it) => (
                  <View key={it.bookId} style={styles.row}>
                    <Text style={styles.item} numberOfLines={1}>{it.title} × {it.quantity}</Text>
                    <Text style={styles.item}>{formatPrice(it.price * it.quantity)}</Text>
                  </View>
                ))}
                <Text style={styles.meta}>Giao đến: {o.address.name} · {o.address.phone}</Text>
                <Text style={styles.meta}>{o.address.address}</Text>
                <Text style={styles.meta}>{PAYMENT_LABEL[o.paymentMethod]}</Text>
                {/* BT9.C1 */}
                {o.status === "completed" && (
                  <PrimaryButton title="Mua lại" variant="outline" onPress={() => reorder(o)} />
                )}
              </View>
            )}
          </Pressable>
        );
      }}
      ListEmptyComponent={
        <EmptyState emoji="🧾" title="Bạn chưa có đơn hàng nào"
          actionLabel="Mua sắm ngay"
          onAction={() => navigation.navigate("Tabs", { screen: "Home" })} />
      }
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  card: { backgroundColor: "#fff", borderRadius: radius.md, padding: 12, gap: 6 },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 8 },
  id: { fontWeight: "800", color: colors.navy, fontSize: 16 },
  date: { color: colors.muted, fontSize: 12 },
  total: { fontWeight: "800", color: colors.indigo, fontSize: 16 },
  toggle: { color: colors.indigo, fontWeight: "700" },
  detail: { borderTopWidth: 1, borderTopColor: colors.line, paddingTop: 8, gap: 4 },
  item: { color: colors.text, flex: 1 },
  meta: { color: colors.muted, fontSize: 13 },
});
