// GIỜ 4 + GIỜ 5
// Tổng hợp HomeScreen + BookDetailScreen + Bottom Tab + CartScreen

import React, { useState } from 'react';

import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';

import { StatusBar } from 'expo-status-bar';

import { TabBar, TabKey } from './components/TabBar';

import { HomeScreen } from './screens/HomeScreen';
import { BookDetailScreen } from './screens/BookDetailScreen';
import { CartScreen } from './screens/CartScreen';

import { CategoryChips } from './components/CategoryChips';

import { BOOKS, CART_ITEMS } from './data';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const selectedBook = BOOKS.find((book) => book.id === selectedBookId) ?? null;
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.body}>
        {selectedBook ? (<BookDetailScreen book={selectedBook}
            onBack={() => {
              setSelectedBookId(null);
            }}

            onAddToCart={() => {
              setCartCount((count) => count + 1);
            }}
          />
        ) : (

          <>
            {activeTab === 'home' && (
              <HomeScreen
                cartCount={cartCount}

                onPressBook={(id) => {
                  setSelectedBookId(id);
                }}

                onPressCart={() => {
                  setActiveTab('cart');
                }}
              />
            )}

            {activeTab === 'category' && (
              <CategoryScreen />
            )}

            {activeTab === 'cart' && (
              <CartScreen
                items={CART_ITEMS}
              />
            )}

            {activeTab === 'account' && (
              <AccountScreen />
            )}

            <TabBar
              active={activeTab}
              onChange={(tab) => {
                setActiveTab(tab);
              }}
            />
          </>
        )}

      </View>

      <StatusBar style="auto" />

    </SafeAreaView>
  );
}

function CategoryScreen() {
  return (
    <View style={styles.categoryScreen}>

      <Text style={styles.categoryTitle}>
        Danh mục sách
      </Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.categoryContent}
      >

        <Text style={styles.sectionTitle}>
          Các thể loại
        </Text>

        <CategoryChips />

      </ScrollView>

    </View>
  );
}

function AccountScreen() {
  return (
    <View style={styles.placeholder}>

      <Text style={styles.placeholderTitle}>
        Tài khoản
      </Text>

      <Text style={styles.placeholderText}>
        Nội dung tài khoản sẽ được phát triển sau.
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({

  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  body: {
    flex: 1,
  },

  categoryScreen: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  categoryTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',

    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },

  categoryContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',

    marginBottom: 12,
  },

  placeholder: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',

    padding: 24,
  },

  placeholderTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',

    marginBottom: 8,
  },

  placeholderText: {
    textAlign: 'center',
    color: '#5B6B7F',
  },

});