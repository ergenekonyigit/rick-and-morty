import * as React from "react";
import { useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Home } from "../screens/Home";
import { Favorites } from "../screens/Favorites";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { About } from "../screens/About";
import { Details } from "../screens/Details";
import HomeIcon from "../assets/icons/home.svg";
import HeartIcon from "../assets/icons/heart.svg";
import { Header } from "../components";
import { darkTheme, lightTheme } from "../utils/theme";
import { FavoritesProvider } from "../context/FavoritesContext";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeTab"
        component={HomeNavigator}
        options={{
          header: () => <Header title="Rick and Morty" />,
          tabBarIcon: ({ focused, color, size }) => (
            <HomeIcon color={focused ? "#03AEC7" : "gray"} />
          ),
          tabBarActiveTintColor: "#03AEC7",
          tabBarInactiveTintColor: "gray",
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          header: () => <Header title="Favorites" />,
          tabBarIcon: ({ focused, color, size }) => (
            <HeartIcon fill="none" color={focused ? "#03AEC7" : "gray"} />
          ),
          tabBarActiveTintColor: "#03AEC7",
          tabBarInactiveTintColor: "gray",
        }}
      />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  const scheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <FavoritesProvider>
        <NavigationContainer
          theme={scheme === "light" ? lightTheme : darkTheme}
        >
          <Stack.Navigator
            screenOptions={{
              presentation: "fullScreenModal",
              animation: "slide_from_bottom",
            }}
          >
            <Stack.Screen
              name="Main"
              component={TabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Details"
              component={Details}
              options={({ route }) => ({
                header: () => (
                  <Header title={route?.params?.item?.name ?? "Detail"} back />
                ),
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </FavoritesProvider>
    </SafeAreaProvider>
  );
}

export default AppNavigator;
