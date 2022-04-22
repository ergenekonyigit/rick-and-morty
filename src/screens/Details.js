import { StyleSheet, Text, View } from "react-native";
import React, { useReducer } from "react";
import { DetailCard, Button } from "../components";
import { responsive } from "../utils/responsive";
import HeartIcon from "../assets/icons/heart.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers } from "../utils/combineReducer";

const initialState = {
  favoriteList : [],
};

export const Details = ({ route }) => {
  const { item = {} } = route?.params;
  const [state, setState] = useReducer(combineReducers, initialState);

  const { favoriteList = [] } = state || {};

  const isFavorite = (item) => {

    const itemIndex = favoriteList.findIndex((favorite) => favorite.id === item.id);
    return itemIndex > -1;
  }

  const addFavorite = async() => {
    if (isFavorite(item)) {
      const newList = favoriteList.filter((favorite) => favorite.id !== item.id );
      
      await AsyncStorage.setItem('favorites', JSON.stringify(newList));
      
      setState({ favoriteList: newList });
    } else {
      const newList = [...favoriteList, item];
      await AsyncStorage.setItem('favorites', JSON.stringify(newList));

      setState({ favoriteList: newList });
    }
  }

  return (
    <View style={styles.container}>
      <DetailCard item={item} />
      <Button
        title={isFavorite(item) ? 'Added': 'Add to Favorite'}
        onPress={addFavorite}
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
