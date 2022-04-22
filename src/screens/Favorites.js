import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
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
  CurvedTransition,
  ZoomOut,
  interpolate,
} from "react-native-reanimated";
import { useFavorites } from "../context/FavoritesContext";
import { Card } from "../components";
import { responsive } from "../utils/responsive";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

export const Favorites = ({ navigation }) => {
  const { favorites } = useFavorites();
  const { colors } = useTheme();

  const renderItem = ({ item }) => (
    <FavoriteCard item={item} navigation={navigation} />
  );

  const keyExtractor = (item) => `${item?.id}`;

  const listEmptyComponent = () => {
    return <Text>No Data Found</Text>;
  };

  const containerStyle = {
    backgroundColor: colors.background,
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Animated.FlatList
        data={favorites}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainerStyle}
        ListEmptyComponent={listEmptyComponent}
        itemLayoutAnimation={Layout.springify()}
      />
    </View>
  );
};

const TOUCH_SLOP = 5;
const TIME_TO_ACTIVATE_PAN = 400;

const FavoriteCard = ({ item, navigation }) => {
  const { removeFavorite } = useFavorites();
  const touchStart = useSharedValue({ x: 0, y: 0, time: 0 });
  const transitionValueX = useSharedValue(0);
  const start = useSharedValue(0);
  const { colors } = useTheme();

  const gesture = Gesture.Pan()
    .manualActivation(true)
    .onTouchesDown((e) => {
      touchStart.value = {
        x: e.changedTouches[0].x,
        y: e.changedTouches[0].y,
        time: Date.now(),
      };
    })
    .onTouchesMove((e, state) => {
      if (Date.now() - (touchStart.value.time > TIME_TO_ACTIVATE_PAN)) {
        console.log("aaaaa");
        state.activate();
      } else if (
        Math.abs(touchStart.value.x - e.changedTouches[0].x) > TOUCH_SLOP ||
        Math.abs(touchStart.value.y - e.changedTouches[0].y) > TOUCH_SLOP
      ) {
        state.fail();
      }
    })
    .onUpdate((e) => {
      if (e.translationX + start.value < 0) {
        transitionValueX.value = e.translationX + start.value;
      }
    })
    .onEnd((e) => {
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

  const swipeDeleteTextStyles = useAnimatedStyle(() => {
    return {
      color: colors.background,
      padding: 10,
      fontWeight: "500",
      transform: [
        {
          scale: interpolate(
            transitionValueX.value,
            [-151, -150, 0, 1],
            [1, 1, 0, 0]
          ),
        },
      ],
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

  return (
    <Animated.View
      entering={ZoomIn}
      exiting={ZoomOut}
      layout={Layout.springify()}
    >
      <Animated.View style={swipeDeleteContainerStyle}>
        <Animated.Text style={swipeDeleteTextStyles}>
          Remove from Favorites
        </Animated.Text>
      </Animated.View>
      <GestureDetector gesture={gesture}>
        <Animated.View style={animatedStyles}>
          <Card
            item={item}
            onPress={() => navigation.navigate("Details", { item })}
          />
        </Animated.View>
      </GestureDetector>
    </Animated.View>
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
