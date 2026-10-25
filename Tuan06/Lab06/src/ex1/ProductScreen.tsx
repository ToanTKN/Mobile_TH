import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { SelectPhoneParamList } from "./SelectPhoneApp";
import { Phone } from "../types";
import { PHONE_COLORS } from "../data/phones";
import { Stars } from "../components/Starts";
import { colors, formatPrice } from "../theme";

type Props = NativeStackScreenProps<SelectPhoneParamList, "Product"> & { phone: Phone };

export function ProductScreen({ navigation, route, phone }: Props) {
  const picked = route.params?.color;
  const shown = picked ?? phone.defaultColor;
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.imageWrap}>
        <Image source={PHONE_COLORS[shown].image} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{phone.name}</Text>
        <View style={styles.row}><Stars value={phone.rating} /><Text style={styles.review}>(Xem {phone.reviewCount} đánh giá)</Text></View>
        <View style={styles.row}>
          <Text style={styles.price}>{formatPrice(phone.price)}</Text>
          <Text style={styles.oldPrice}>{formatPrice(phone.oldPrice)}</Text>   {/* gạch ngang */}
        </View>
        <View style={styles.row}><Text style={styles.badge}>{phone.badge}</Text>{/* vòng tròn có dấu ? */}</View>
 
        {/* ===== TODO 1 + TODO 2 ở bên dưới ===== */}
        <Pressable
            style={styles.chooseBtn}
            onPress={() => navigation.navigate("ChooseColor", { color: picked })}
        >
            <Text style={styles.chooseText}>
                {picked ? "4 MÀU-CHỌN LOẠI" : "4 MÀU-CHỌN MÀU"}
            </Text>
            <Text style={styles.chevron}>{">"}</Text>
        </Pressable>
      </View>
      <Pressable style={styles.buyBtn}>
        <Text style={styles.buyText}>CHỌN MUA</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    root: { 
        flex: 1, 
        backgroundColor: "#fff", 
        paddingHorizontal: 16 
    },
    imageWrap: { 
        flex: 1, 
        alignItems: "center", 
        justifyContent: "center" 
    },
    image: { 
        width: "80%", 
        height: "100%" 
    },
    info: { 
        paddingBottom: 12 
    },
    name: { 
        fontSize: 15, 
        color: colors.text, 
        marginTop: 8 
    },
    row: { 
        flexDirection: "row", 
        alignItems: "center", 
        gap: 8, 
        marginTop: 8 
    },
    review: { 
        color: colors.muted, 
        fontSize: 12 
    },
    price: { 
        fontSize: 18, 
        fontWeight: "700", 
        color: colors.text 
    },
    oldPrice: { 
        color: colors.muted, 
        textDecorationLine: "line-through" 
    },
    badge: { 
        color: colors.red, 
        fontWeight: "700", 
        fontSize: 12 
    },
    chooseBtn: {
        borderWidth: 1, 
        borderColor: colors.line, 
        borderRadius: 6,
        paddingVertical: 12, 
        alignItems: "center", 
        justifyContent: "center", 
        marginTop: 16,
    },
    chooseText: { 
        color: colors.text, 
        fontSize: 14 
    },
    chevron: { 
        position: "absolute", 
        right: 12, 
        color: colors.muted, 
        fontSize: 18 },
    buyBtn: {
        backgroundColor: colors.red, 
        borderRadius: 6, 
        paddingVertical: 14,
        alignItems: "center", 
        marginBottom: 8,
    },
    buyText: { 
        color: "#fff", 
        fontWeight: "700", 
        fontSize: 16 
    },
});
