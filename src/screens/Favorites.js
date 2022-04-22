import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Animated, { ZoomIn, LightSpeedOutLeft } from "react-native-reanimated";
import { useFavorites } from "../contex/FavoritesContext";
import { Card } from "../components";
import { responsive } from "../utils/responsive";

export const Favorites = ({ navigation }) => {
  const { favorites, removeFavorite } = useFavorites();
  const { colors } = useTheme();

  const swipeDeleteContainerStyle = {
    backgroundColor: colors.dead,
    marginBottom: responsive.number(16),
    justifyContent: "center",
    alignItems: "flex-end",
    width: "100%",
    borderRadius: responsive.number(16),
  };

  const swipeDeleteTextStyle = {
    color: colors.background,
    padding: responsive.number(10),
    fontWeight: "500",
  };

  const RightSwipeAction = () => (
    <View style={swipeDeleteContainerStyle}>
      <Text style={swipeDeleteTextStyle}>Remove from Favorites</Text>
    </View>
  );

  const keyExtractor = (item) => `${item?.id}`;

  const renderItem = ({ item }) => (
    <Animated.View entering={ZoomIn} exiting={LightSpeedOutLeft}>
      <Swipeable
        renderRightActions={RightSwipeAction}
        onSwipeableOpen={() => removeFavorite(item)}
      >
        <Card
          item={item}
          onPress={() => navigation.navigate("Details", { item })}
        />
      </Swipeable>
    </Animated.View>
  );

  const listEmptyComponent = () => {
    return <Text>No Data Found</Text>;
  };

  const containerStyle = {
    backgroundColor: colors.background,
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <FlatList
        data={favorites}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainerStyle}
        ListEmptyComponent={listEmptyComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingTop: responsive.number(10),
    alignItems: "center",
  },
});
