// GIỜ 1 — Nền tảng Flexbox & Layout đơn giản
// Minh hoạ riêng: Bài 1 (Header) + Bài 2 (BookRowCard) + Thử thách giờ 1
// (Header cố định trên cùng + danh sách Book Card xếp chồng theo cột bên dưới).
import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { Header } from './components/Header';
import { CategoryChips } from './components/CategoryChips';
import { BookGrid } from './components/BookGrid';
import { FloatingCartButton } from './components/FloatingCartButton';
import { BOOKS } from './data';

export default function App() {
  const [cartCount, setCartCount] = useState(0);
  return (
    <View style={styles.screen}>
      <Header/>
      {/* flex:1 cho vùng nội dung -> chiếm hết phần còn lại của màn hình sau Header,
          đúng yêu cầu "Thử thách giờ 1". */}
      <ScrollView contentContainerStyle={styles.list}>
       <CategoryChips/>
       <BookGrid books = {BOOKS} onPressBook = {() => {}}/>
      </ScrollView>
      <FloatingCartButton count={cartCount} onPress={() => setCartCount((prev) => prev + 1)}/>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F8FAFC' },
  list: { padding: 12, gap: 10 },
});
