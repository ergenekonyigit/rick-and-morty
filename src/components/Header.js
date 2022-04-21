import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { responsive } from "../utils/responsive";
import { useTheme } from "@react-navigation/native";

export const Header = ({ title }) => {
  const { top } = useSafeAreaInsets();
  const { colors } = useTheme();
  console.log('aaaa', colors)

  const containerStyle = {
    paddingTop: top,
    paddingHorizontal: responsive.number(16),
    backgroundColor: colors.background,
  };

  const titleStyle = {
    color: colors.text,
  };

  return (
    <View style={containerStyle}>
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
});
