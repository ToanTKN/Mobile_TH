import React from "react";
import { View, Text, Image, Pressable, ScrollView, StyleSheet } from "react-native";
import { PHONES, PHONE_COLORS } from "../data/phones";
import { Stars } from "../components/Starts";
import { colors, formatPrice } from "../theme";
import { useFavorites } from "./FavoritesContext";
import type { RootProps } from "./types";
 
export function ProductDetailsScreen({ route }: RootProps<"ProductDetails">) {
  const { id } = route.params;                       
  const { has, toggle } = useFavorites();
  const phone = PHONES.find((p) => p.id === id);
 
  if (!phone) {                                       
    return (
      <View style={s.center}><Text>Không tìm thấy sản phẩm #{id}</Text></View>
    );
  }
  const saved = has(phone.id);
 
  return (                                            
    <ScrollView contentContainerStyle={s.wrap}>
      <Image
        source={PHONE_COLORS[phone.defaultColor].image}
        style={s.image}
        resizeMode="contain"
      />
      <Text style={s.name}>{phone.name}</Text>
      <Stars value={phone.rating} />
      <Text style={s.price}>{formatPrice(phone.price)}</Text>
      <Text style={s.muted}>Cung cấp bởi {phone.supplier}</Text>
 
      <Pressable                                     
        style={[s.btn, saved && s.btnOn]}
        onPress={() => toggle(phone.id)}
      >
        <Text style={[s.btnText, saved && s.btnTextOn]}>
          {saved ? "♥ Đã lưu" : "♡ Lưu vào yêu thích"}
        </Text>
      </Pressable>
    </ScrollView>
  );
}
 
const s = StyleSheet.create({
  center: { 
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center" 
  },
  wrap: { 
    padding: 16, 
    gap: 10, 
    backgroundColor: "#fff", 
    flexGrow: 1 
  },
  image: { 
    width: "100%", 
    height: 260 
  },
  name: { 
    fontSize: 18, 
    fontWeight: "700", 
    color: colors.text 
  },
  price: { 
    fontSize: 22, 
    fontWeight: "700", 
    color: colors.red 
  },
  muted: { 
    color: colors.muted 
  },
  btn: {
    borderWidth: 1, 
    borderColor: colors.red, 
    borderRadius: 6,
    paddingVertical: 12, 
    alignItems: "center", 
    marginTop: 8,
  },
  btnOn: { 
    backgroundColor: colors.red 
  },
  btnText: { 
    color: colors.red, 
    fontWeight: "700", 
    fontSize: 16 
  },
  btnTextOn: { 
    color: "#fff" 
  },
});
