// In App.js in a new project

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Router from "./src/router";
import { StatusBar } from "react-native";
import { useFonts } from "expo-font";
import { useState, useContext } from "react";

import { FilterContext } from "./contex/GlobalState";

function App() {
  // const [fontsLoaded] = useFonts({
  //   "PublicSans-Light": require("./assets/fonts/PublicSans-Light.ttf"),
  //   "PublicSans-Regular": require("./assets/fonts/PublicSans-Regular.ttf"),
  //   "PublicSans-SemiBold": require("./assets/fonts/PublicSans-SemiBold.ttf"),
  //   "PublicSans-Bold": require("./assets/fonts/PublicSans-Bold.ttf"),
  // });

  // if (!fontsLoaded) {
  //   return null;
  // }

  const [filter, setFilter] = useState({genre: '', ph: '', tahun: '', penonton: '', film: '', column: '', sorting: ''});

  return (
    <FilterContext.Provider value={[filter, setFilter]}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Router />
      </NavigationContainer>
    </FilterContext.Provider>
  );
}

export default App;
