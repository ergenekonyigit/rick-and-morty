import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useRef, useEffect, useReducer } from "react";
import { getCharacters, getEpisodes } from "../api";
import { responsive } from "../utils/responsive";
import { useTheme } from "@react-navigation/native";
import { Card, EpisodeCard, SearchInput, SwitchTab } from "../components";
import { combineReducers } from "../utils/combineReducer";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const initialState = {
  characters: [],
  episodes: [],
  loading: true,
  selectedTab: 0,
  charactersLoadingMore: false,
  episodesLoadingMore: false,
  charactersRefreshLoading: false,
  searchQuery: "",
};

export const Home = ({ navigation }) => {
  const [state, setState] = useReducer(combineReducers, initialState);
  const translationValue = useSharedValue(0);
  const pageRef = useRef(1);
  const episodePageRef = useRef(1);
  const isLastCharacterPage = useRef(false);
  const isLastEpisodePage = useRef(false);

  const {
    characters = [],
    episodes = [],
    loading,
    selectedTab,
    charactersLoadingMore,
    episodesLoadingMore,
    charactersRefreshLoading,
    searchQuery = "",
  } = state || {};
  const { colors } = useTheme();

  const init = async () => {
    const response = await getCharacters(0, searchQuery);
    const { data: { results = [] } = {} } = response || {};
    setState({ characters: results, loading: false });
  };

  const onRefresh = async () => {
    console.log("onRefresh");
    setState({ charactersRefreshLoading: true });
    await init();
    setState({ charactersRefreshLoading: false });
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    const episodeControl = async () => {
      if (selectedTab === 1 && episodes?.length === 0) {
        const response = await getEpisodes();
        const { data: { results = [] } = {} } = response || {};
        setState({ episodes: results });
      }
    };
    episodeControl();
  }, [selectedTab]);

  useEffect(() => {
    if (selectedTab === 0) {
      translationValue.value = withTiming(0);
    } else if (selectedTab === 1) {
      translationValue.value = withTiming(-1 * responsive.deviceWidth);
    }
  }, [selectedTab]);

  const onSearchName = async (query) => {
    console.log("onChangeText", query);
    setState({ searchQuery: query });
    pageRef.current = 0;
    const response = await getCharacters(pageRef.current + 1, searchQuery);
    const { data: { info, results = [] } = {} } = response || {};
    console.log("response info", info);
    setState({ characters: results });
    pageRef.current = pageRef.current + 1;
    if (!info?.next) {
      isLastCharacterPage.current = true;
    }
  };

  const onEndReachedCharacters = async () => {
    if (isLastCharacterPage.current) {
      return;
    }
    setState({ charactersLoadingMore: true });
    const response = await getCharacters(pageRef.current + 1, searchQuery);
    const { data: { info, results = [] } = {} } = response || {};
    setState({
      characters: [...characters, ...results],
      charactersLoadingMore: false,
    });
    pageRef.current = pageRef.current + 1;
    if (!info?.next) {
      isLastCharacterPage.current = true;
    }
  };

  const onEndReachedEpisodes = async () => {
    if (isLastEpisodePage.current) {
      return;
    }

    setState({ episodesLoadingMore: true });
    const response = await getEpisodes(episodePageRef.current + 1);
    const { data: { info, results = [] } = {} } = response || {};
    setState({
      episodes: [...episodes, ...results],
      episodesLoadingMore: false,
    });
    episodePageRef.current = episodePageRef.current + 1;
    if (!info?.next) {
      isLastEpisodePage.current = true;
    }
  };

  const keyExtractor = (item) => `${item?.id}`;

  const renderItemCharacters = ({ item }) => (
    <Card
      item={item}
      onPress={() => navigation.navigate("Details", { item })}
    />
  );

  const renderItemEpisodes = ({ item }) => <EpisodeCard item={item} />;

  const listEmptyComponent = () => {
    return <Text>No Data Found</Text>;
  };

  const containerStyle = {
    backgroundColor: colors.background,
  };

  const listWrapperStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translationValue.value }],
    };
  });

  return (
    <View style={[styles.container, containerStyle]}>
      {loading ? (
        <ActivityIndicator color={colors.primary} size="large" />
      ) : (
        <>
          <SearchInput onChangeText={onSearchName} />
          <SwitchTab
            selectedTab={selectedTab}
            onPressTab={(t) => setState({ selectedTab: t })}
          />
          <Animated.View style={[styles.listWrapper, listWrapperStyle]}>
            <View style={styles.listContainer}>
              <FlatList
                data={characters}
                refreshing={charactersRefreshLoading}
                refreshControl={
                  <RefreshControl
                    refreshing={charactersRefreshLoading}
                    tintColor={colors.primary}
                    onRefresh={onRefresh}
                  />
                }
                keyExtractor={keyExtractor}
                renderItem={renderItemCharacters}
                contentContainerStyle={styles.contentContainerStyle}
                ListEmptyComponent={listEmptyComponent}
                onEndReachedThreshold={0.5}
                onEndReached={onEndReachedCharacters}
                removeClippedSubviews={true}
                ListFooterComponent={() =>
                  charactersLoadingMore ? (
                    <ActivityIndicator color={colors.primary} size="large" />
                  ) : null
                }
              />
            </View>
            <View style={styles.listContainer}>
              <FlatList
                data={episodes}
                keyExtractor={keyExtractor}
                renderItem={renderItemEpisodes}
                contentContainerStyle={styles.contentContainerStyle}
                ListEmptyComponent={listEmptyComponent}
                onEndReachedThreshold={0.5}
                onEndReached={onEndReachedEpisodes}
                ListFooterComponent={() =>
                  episodesLoadingMore ? (
                    <ActivityIndicator color={colors.primary} size="large" />
                  ) : null
                }
              />
            </View>
          </Animated.View>
        </>
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
    paddingBottom: responsive.number(40),
  },
  listWrapper: {
    flexDirection: "row",
  },
  listContainer: {
    width: responsive.deviceWidth,
  },
});
