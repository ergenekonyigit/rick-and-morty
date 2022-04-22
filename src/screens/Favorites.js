import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Favorites = () => {

  useFocusEffect(
    useCallback(() => {
      const getFavorites = async() => {
        const list = await AsyncStorage.getItem('favorites');
      };
      getFavorites();
    }, []);
  );

  return (
    <View>
      <Text>Favorites</Text>
    </View>
  )
};

const styles = StyleSheet.create({})