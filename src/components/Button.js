import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import { responsive } from "../utils/responsive";

export const Button = ({ title, onPress, Icon = null }) => {
  const { colors } = useTheme();

  const buttonStyle = {
    backgroundColor: colors.primary,
    height: responsive.number(50),
    borderRadius: responsive.number(16),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  };

  const titleStyle = {
    color: colors.background,
  };

  return (
    <Pressable onPress={onPress} style={buttonStyle}>
      {Icon ? (
        <Icon color={colors.background} style={styles.iconStyle} />
      ) : null}
      <Text style={[styles.title, titleStyle]}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: responsive.fontSize(16),
    fontWeight: "500",
  },
  iconStyle: {
    marginRight: responsive.number(10),
  },
});
