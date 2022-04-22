import { StyleSheet, Pressable, View, Text } from "react-native";
import React, { useEffect } from "react";
import { useTheme } from "@react-navigation/native";
import { responsive } from "../utils/responsive";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const TAB_BOUNDARY = (responsive.deviceWidth - responsive.number(40)) / 2;

export const SwitchTab = ({ selectedTab = 0, onPressTab }) => {
  const { colors } = useTheme();

  const containerStyle = {
    backgroundColor: colors.tabBackground,
  };

  const textStyle = {
    color: colors.text,
  };

  return (
    <View style={styles.wrapper}>
      <View style={[styles.container, containerStyle]}>
        <Indicator selectedTab={selectedTab} />
        <Pressable onPress={() => onPressTab(0)}>
          <Text style={[styles.text, textStyle]}>Characters</Text>
        </Pressable>
        <Pressable onPress={() => onPressTab(1)}>
          <Text style={[styles.text, textStyle]}>Episodes</Text>
        </Pressable>
      </View>
    </View>
  );
};

const Indicator = ({ selectedTab }) => {
  const animatedValue = useSharedValue(0);

  const { colors } = useTheme();

  useEffect(() => {
    if (selectedTab === 0) {
      animatedValue.value = withTiming(0);
    } else if (selectedTab === 1) {
      animatedValue.value = withTiming(TAB_BOUNDARY);
    }
  }, [selectedTab]);

  const indicatorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: colors.tabIndicatior,
      transform: [{ translateX: animatedValue.value }],
    };
  });

  return (
    <Animated.View
      style={[styles.indicatorContainer, indicatorStyle]}
    ></Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: responsive.number(16),
  },
  container: {
    borderRadius: responsive.number(33),
    height: responsive.number(40),
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  text: {
    fontWeight: "500",
    fontSize: responsive.fontSize(16),
    lineHeight: responsive.fontSize(19),
  },
  indicatorContainer: {
    position: "absolute",
    height: responsive.number(36),
    borderRadius: responsive.number(33),
    width: "50%",
    left: 2,
  },
});
