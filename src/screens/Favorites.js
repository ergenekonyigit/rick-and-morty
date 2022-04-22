import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";
import Animated, {
  ZoomIn,
  LightSpeedOutLeft,
  useSharedValue,
  withTiming,
  withSpring,
  withDelay,
  useAnimatedStyle,
  useDerivedValue,
  runOnJS,
  Transition,
  Layout,
  SequencedTransition,
} from "react-native-reanimated";
import { useFavorites } from "../context/FavoritesContext";
import { Card } from "../components";
import { responsive } from "../utils/responsive";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

export const Favorites = ({ navigation }) => {
  const { favorites } = useFavorites();
  const { colors } = useTheme();

  const renderItem = ({ item }) => <FavoriteCard item={item} />;

  const keyExtractor = (item) => `${item?.id}`;

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

const FavoriteCard = ({ item }) => {
  const { removeFavorite } = useFavorites();
  const transitionValueX = useSharedValue(0);
  const start = useSharedValue(0);
  const { colors } = useTheme();

  const gesture = Gesture.Pan()
    .onStart(() => {
      console.log("started gesture");
    })
    .onUpdate((e) => {
      transitionValueX.value = e.translationX + start.value;
    })
    .onEnd((e) => {
      console.log("aaaa", e);
      start.value = transitionValueX.value;
      if (transitionValueX.value < -200) {
        runOnJS(removeFavorite)(item);
      } else {
        transitionValueX.value = withSpring(0);
        start.value = 0;
      }
    });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: transitionValueX.value }],
    };
  });

  const swipeDeleteContainerStyle = {
    position: "absolute",
    height: responsive.number(150),
    width: responsive.deviceWidth - responsive.number(32),
    backgroundColor: colors.dead,
    justifyContent: "center",
    alignItems: "flex-end",
    borderRadius: responsive.number(16),
  };

  const swipeDeleteTextStyle = {
    color: colors.background,
    padding: responsive.number(10),
    fontWeight: "500",
  };

  return (
    <>
      <Animated.View
        style={swipeDeleteContainerStyle}
        entering={ZoomIn.delay(300)}
        exiting={LightSpeedOutLeft}
      >
        <Text style={swipeDeleteTextStyle}>Remove from Favorites</Text>
      </Animated.View>
      <GestureDetector gesture={gesture}>
        <Animated.View
          entering={ZoomIn}
          exiting={LightSpeedOutLeft}
          style={animatedStyles}
          layout={SequencedTransition}
        >
          <Card
            item={item}
            //onPress={() => navigation.navigate("Details", { item })}
          />
        </Animated.View>
      </GestureDetector>
    </>
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
