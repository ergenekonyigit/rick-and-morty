import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { responsive } from "../utils/responsive";
import { useTheme } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/core";
import ChevronLeft from "../assets/icons/chevron-left.svg";

export const Header = ({ title, back = false }) => {
  const { top } = useSafeAreaInsets();
  const { colors } = useTheme();
  const navigation = useNavigation();

  const containerStyle = {
    paddingTop: top,
    paddingHorizontal: responsive.number(16),
    backgroundColor: colors.background,
    flexDirection: "row",
    alignItems: "center",
  };

  const titleStyle = {
    color: colors.text,
  };

  return (
    <View style={containerStyle}>
      {back ? (
        <Pressable style={styles.backStyle} onPress={() => navigation.pop()}>
          <ChevronLeft color={colors.text} />
        </Pressable>
      ) : null}
      <Text style={[styles.title, titleStyle]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: responsive.fontSize(24),
    fontWeight: "900",
    lineHeight: responsive.number(36),
  },
  backStyle: {
    paddingRight: responsive.number(10),
    paddingVertical: responsive.number(5),
  },
});
