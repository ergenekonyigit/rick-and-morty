import { StyleSheet, TextInput, View } from "react-native";
import React from "react";
import SearchIcon from "../assets/icons/search.svg";
import { useTheme } from "@react-navigation/native";
import { responsive } from "../utils/responsive";

export const SearchInput = ({ onChangeText }) => {
  const { colors } = useTheme();

  const containerStyle = {
    backgroundColor: colors.tabBackground,
  };

  const inputStyle = {
    color: colors.text,
  };
  return (
    <View style={styles.wrapper}>
      <View style={[styles.container, containerStyle]}>
        <SearchIcon />
        <TextInput
          style={[styles.input, inputStyle]}
          placeholder="Search"
          placeholderTextColor={colors.secondaryText}
          onChangeText={(t) => onChangeText(t)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: responsive.number(16),
    marginBottom: responsive.number(16),
    marginTop: responsive.number(10),
  },
  container: {
    height: responsive.number(40),
    borderRadius: responsive.number(33),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: responsive.number(18),
  },
  input: {
    //backgroundColor: "red",
    width: "100%",
    height: "100%",
    fontWeight: "500",
    fontSize: responsive.fontSize(16),
    lineHeight: responsive.fontSize(19),
    marginLeft: responsive.number(12),
  },
});
