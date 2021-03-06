import { StyleSheet, Image, View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { responsive } from "../utils/responsive";
import { useTheme } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useFavorites } from "../context/FavoritesContext";

import HeartIcon from "../assets/icons/heart.svg";
import HeartIconFill from "../assets/icons/heartFill.svg";

const CardContainer = ({
  item,
  onPress,
  isFavorite,
  removeFavorite,
  addFavorite,
}) => {
  const { colors } = useTheme();

  const handleFavorites = async () => {
    if (isFavorite) {
      await removeFavorite(item);
    } else {
      await addFavorite(item);
    }
  };

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

  if (item.id == 1) {
    console.log("render");
  }

  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.container, containerStyle]}
        onPress={onPress}
      >
        <Image source={{ uri: item?.image }} style={styles.image} />
        <View style={styles.rightContainer}>
          <Text style={[styles.name, textStyle]} numberOfLines={1}>
            {item?.name}
          </Text>
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
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.icon} onPress={handleFavorites}>
        {isFavorite ? (
          <HeartIconFill color="red" />
        ) : (
          <HeartIcon color="white" />
        )}
      </TouchableOpacity>
    </>
  );
};

export const Card = ({ item, onPress }) => {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const isFavorite =
    favorites.findIndex((favorite) => favorite.id === item.id) > -1;

  return (
    <CardContainer
      item={item}
      onPress={onPress}
      favorites={favorites}
      addFavorite={addFavorite}
      removeFavorite={removeFavorite}
      isFavorite={isFavorite}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    height: responsive.number(150),
    width: responsive.deviceWidth - responsive.number(32),
    marginBottom: responsive.number(16),
    borderRadius: responsive.number(16),
    padding: responsive.number(4),
    flexDirection: "row",
  },
  image: {
    width: responsive.number(142),
    height: "100%",
    borderRadius: responsive.number(12),
  },
  rightContainer: {
    paddingLeft: responsive.number(16),
    paddingTop: responsive.number(8),
    paddingBottom: responsive.number(12),
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
  detailLabel: {
    fontSize: responsive.fontSize(10),
    lineHeight: responsive.number(12),
    marginTop: responsive.number(6),
  },
  detail: {
    fontSize: responsive.fontSize(12),
    lineHeight: responsive.number(14),
    marginTop: responsive.number(4),
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: responsive.number(10),
  },
  status: {
    width: 6,
    height: 6,
    borderRadius: 12,
    marginRight: responsive.number(6),
  },
  icon: {
    position: "absolute",
    right: responsive.number(10),
    top: responsive.number(10),
  },
});
