import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { DetailCard, Button } from "../components";
import { responsive } from "../utils/responsive";
import HeartIcon from "../assets/icons/heart.svg";

export const Details = ({ route }) => {
  return (
    <View style={styles.container}>
      <DetailCard item={route.params.item} />
      <Button
        title="Add to Favorites"
        onPress={() => console.log("pressed")}
        Icon={HeartIcon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: responsive.number(16),
  },
});
