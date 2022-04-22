import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FavoritesContext = React.createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = React.useState([]);

  React.useEffect(() => {
    const hydrate = async () => {
      const favorites = (await AsyncStorage.getItem("favorites")) ?? "[]";
      setFavorites(JSON.parse(favorites));
    };

    hydrate();
  }, []);

  const addFavorite = async (item) => {
    const newList = [...favorites, item];
    setFavorites(newList);
    await AsyncStorage.setItem("favorites", JSON.stringify(newList));
  };

  const removeFavorite = async (item) => {
    const newList = favorites.filter((favorite) => favorite.id !== item.id);
    setFavorites(newList);
    await AsyncStorage.setItem("favorites", JSON.stringify(newList));
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => React.useContext(FavoritesContext);
