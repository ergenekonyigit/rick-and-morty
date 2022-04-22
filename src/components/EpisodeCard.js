import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { responsive } from "../utils/responsive";
import { useTheme } from "@react-navigation/native";

export const EpisodeCard = ({ item }) => {
  const { colors } = useTheme();

  const containerStyle = {
    backgroundColor: colors.appCard,
  };

  const episodeContainerStyle = {
    backgroundColor: colors.episodeCard,
  };

  const textStyle = {
    color: colors.text,
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.episodeContainer, episodeContainerStyle]}>
        <Text style={styles.episodeText}>{item?.episode}</Text>
      </View>
      <View style={styles.rightContainer}>
        <View>
          <Text style={[styles.label, textStyle]}>Name:</Text>
          <Text style={[styles.detail, textStyle]}>{item?.name}</Text>
        </View>
        <View>
          <Text style={[styles.label, textStyle]}>Air Date:</Text>
          <Text style={[styles.detail, textStyle]}>{item?.air_date}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: responsive.number(100),
    marginBottom: responsive.number(16),
    borderRadius: responsive.number(16),
    padding: responsive.number(4),
    flexDirection: "row",
  },
  rightContainer: {
    marginLeft: responsive.number(16),
    paddingVertical: responsive.number(8),
    flexDirection: "column",
    justifyContent: "space-between",
  },
  episodeContainer: {
    width: responsive.number(100),
    height: "100%",
    borderRadius: responsive.number(12),
    alignItems: "center",
    justifyContent: "center",
  },
  episodeText: {
    fontSize: responsive.fontSize(21),
    fontWeight: "900",
    lineHeight: responsive.number(28),
  },
  label: {
    fontWeight: "400",
    fontSize: responsive.fontSize(10),
    lineHeight: responsive.number(12),
  },
  detail: {
    fontWeight: "400",
    fontSize: responsive.fontSize(12),
    lineHeight: responsive.number(14),
    marginTop: responsive.number(5),
  },
});
