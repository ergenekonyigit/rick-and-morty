import { StyleSheet, Image, View, Text } from "react-native";
import React from "react";
import { responsive } from "../utils/responsive";
import { useTheme } from "@react-navigation/native";

export const DetailCard = ({ item }) => {
  const { colors } = useTheme();

  const containerStyle = {
    backgroundColor: colors.appCard,
  };

  const textLabelStyle = {
    color: colors.secondaryText,
    width: responsive.number(170),
  };

  const textStyle = {
    color: colors.text,
    width: responsive.number(170),
  };

  const statusStyle = {
    backgroundColor: item?.status === "Alive" ? colors.alive : colors.dead,
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Image source={{ uri: item?.image }} style={styles.image} />
      <View style={styles.detailContainer}>
        <Text style={[styles.detailLabel, textLabelStyle]}>Status:</Text>
        <View style={styles.statusContainer}>
          <View style={[styles.status, statusStyle]} />
          <Text style={[styles.statusText, textStyle]}>
            {item?.status} - {item?.species}
          </Text>
        </View>

        <Text style={[styles.detailLabel, textLabelStyle]}>Gender:</Text>
        <Text style={[styles.detail, textStyle]}>{item?.gender}</Text>

        <Text style={[styles.detailLabel, textLabelStyle]}>
          Last known location:
        </Text>
        <Text style={[styles.detail, textStyle]} numberOfLines={1}>
          {item?.location?.name}
        </Text>

        <Text style={[styles.detailLabel, textLabelStyle]}>Origin:</Text>
        <Text style={[styles.detail, textStyle]} numberOfLines={1}>
          {item?.origin?.name}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "auto",
    width: "100%",
    marginBottom: responsive.number(16),
    borderRadius: responsive.number(16),
    padding: responsive.number(8),
  },
  image: {
    width: "100%",
    height: responsive.number(275),
    borderRadius: responsive.number(12),
  },
  name: {
    fontSize: responsive.fontSize(16),
    fontWeight: "bold",
    lineHeight: responsive.number(19),
    paddingBottom: responsive.number(4),
  },
  statusText: {
    fontSize: responsive.fontSize(10),
    lineHeight: responsive.number(12),
  },
  detailContainer: {
    padding: responsive.number(8),
  },
  detailLabel: {
    fontSize: responsive.fontSize(10),
    lineHeight: responsive.number(12),
    marginTop: responsive.number(12),
  },
  detail: {
    fontSize: responsive.fontSize(12),
    lineHeight: responsive.number(14),
    marginTop: responsive.number(4),
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  status: {
    width: 6,
    height: 6,
    borderRadius: 12,
    marginRight: responsive.number(6),
  },
});
