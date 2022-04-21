import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useReducer } from "react";
import { getCharacters } from "../api";
import { responsive } from "../utils/responsive";
import { useTheme } from "@react-navigation/native";
import { Card } from "../components";
import { combineReducers } from "../utils/combineReducer";

const initialState = {
  characters: [],
  loading: true,
};

export const Home = ({ navigation }) => {
  const [state, setState] = useReducer(combineReducers, initialState);

  const { characters = [], loading } = state || {};
  const { colors } = useTheme();

  useEffect(() => {
    const init = async () => {
      setState({ loading: true });
      const response = await getCharacters();
      const { data: { results = [] } = {} } = response || {};
      setState({ characters: results, loading: false });
    };
    init();
  }, []);

  const keyExtractor = (item) => `${item?.id}`;

  const renderItem = ({ item }) => <Card item={item} />;

  const listEmptyComponent = () => {
    return <Text>No Data Found</Text>;
  };

  const containerStyle = {
    backgroundColor: colors.background,
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {loading ? (
        <ActivityIndicator color={colors.primary} size="large" />
      ) : (
        <FlatList
          data={characters}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainerStyle}
          ListEmptyComponent={listEmptyComponent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "yellow",
  },
  contentContainerStyle: {
    paddingTop: responsive.number(10),
    paddingHorizontal: responsive.number(16),
  },
});
