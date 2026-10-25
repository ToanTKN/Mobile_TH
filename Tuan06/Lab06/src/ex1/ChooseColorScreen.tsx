import React, { useState } from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { SelectPhoneParamList } from "./SelectPhoneApp";
import { ColorKey, Phone } from "../types";
import { COLOR_ORDER, PHONE_COLORS } from "../data/phones";
import { colors, formatPrice } from "../theme";

type Props = NativeStackScreenProps<SelectPhoneParamList, "ChooseColor"> & { phone: Phone };

export function ChooseColorScreen({ navigation, route, phone }: Props) {
  const [picked, setPicked] = useState<ColorKey | undefined>(route.params?.color);
  const [line1, line2] = phone.name.split(" - ");

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Image
          source={PHONE_COLORS[picked ?? phone.defaultColor].image}
          style={styles.thumb}
          resizeMode="contain"
        />
        <View style={styles.headerText}>
          <Text style={styles.small}>{line1}</Text>
          <Text style={styles.small}>{line2}</Text>
          {picked && (
            <>
              <Text style={styles.small}>
                Màu: <Text style={styles.bold}>{PHONE_COLORS[picked].label}</Text>
              </Text>
              <Text style={styles.small}>
                Cung cấp bởi <Text style={styles.bold}>{phone.supplier}</Text>
              </Text>
              <Text style={styles.bold}>{formatPrice(phone.price)}</Text>
            </>
          )}
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.hint}>Chọn một màu bên dưới:</Text>
        <View style={styles.swatches}>
          {COLOR_ORDER.map((key) => (
            <Pressable
              key={key}
              onPress={() => setPicked(key)}
              style={[styles.swatch, { backgroundColor: PHONE_COLORS[key].hex }, picked === key && styles.swatchOn]}
            />
          ))}
        </View>
        <Pressable
          style={styles.doneBtn}
          onPress={() => navigation.navigate("Product", { color: picked }, { merge: true })}
        >
          <Text style={styles.doneText}>XONG</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    root: { 
        flex: 1, 
        backgroundColor: colors.grey 
    },
    header: { 
        flexDirection: "row", 
        alignItems: "center", 
        backgroundColor: "#fff", 
        padding: 16, 
        gap: 12 
    },
    thumb: { 
        width: 90, 
        height: 100 
    },
    headerText: { 
        flex: 1, 
        gap: 2 },
    small: { 
        fontSize: 13, 
        color: colors.text 
    },
    bold: { 
        fontWeight: "700", 
        fontSize: 13, 
        color: colors.text 
    },
    body: { 
        flex: 1, 
        backgroundColor: colors.grey, 
        padding: 16, 
        alignItems: "center" 
    },
    hint: { 
        fontSize: 14, 
        color: colors.text, 
        marginBottom: 12 
    },
    swatches: { 
        gap: 12, 
        alignItems: "center", 
        marginBottom: 24 
    },
    swatch: { 
        width: 80, 
        height: 80, 
        borderWidth: 1, 
        borderColor: colors.line 
    },
    swatchOn: { 
        borderWidth: 3, 
        borderColor: colors.text 
    },
    doneBtn: {
        alignSelf: "stretch", 
        backgroundColor: colors.blue, 
        borderRadius: 4,
        paddingVertical: 12, 
        alignItems: "center", 
        marginTop: "auto",
    },
    doneText: { 
        color: "#fff", 
        fontWeight: "700", 
        fontSize: 16 
    },
});