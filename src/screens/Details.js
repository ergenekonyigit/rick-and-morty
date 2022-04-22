import { StyleSheet, Text, View } from "react-native";
import React, { useReducer } from "react";
import { DetailCard, Button } from "../components";
import { responsive } from "../utils/responsive";
import HeartIcon from "../assets/icons/heart.svg";
import HeartIconFill from "../assets/icons/heartFill.svg";
import { useFavorites } from "../context/FavoritesContext";

export const Details = ({ route }) => {
  const { item = {} } = route?.params;
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const isFavorite = (item) => {
    const itemIndex = favorites.findIndex(
      (favorite) => favorite.id === item.id
    );
    return itemIndex > -1;
  };

  const addToFavorites = async () => {
    if (isFavorite(item)) {
      await removeFavorite(item);
    } else {
      await addFavorite(item);
    }
  };

  return (
    <View style={styles.container}>
      <DetailCard item={item} />
      <Button
        title={isFavorite(item) ? "Added" : "Add to Favorite"}
        onPress={addToFavorites}
        Icon={isFavorite(item) ? HeartIconFill : HeartIcon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: responsive.number(16),
  },
});
