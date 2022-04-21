import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export const About = ({route}) => {
  const navigation = useNavigation();
  const { appName = "About" } = route.params || {};

  return (
    <View>
      <Text>{appName}</Text>
      <Button title="Back" onPress={() => navigation.pop()} />
    </View>
  );
};

const styles = StyleSheet.create({});
