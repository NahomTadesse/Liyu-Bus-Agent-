import { React, useEffect, useState } from "react";
import MainContainer from "./navigation/MainContainer";

import SplashScreen from "react-native-splash-screen";


import * as eva from "@eva-design/eva";
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
  Text,
} from "@ui-kitten/components";

import { EvaIconsPack } from "@ui-kitten/eva-icons";

import "react-native-gesture-handler";
function App() {
  // useEffect(() => {
  //   SplashScreen.hide();
  
  // }, []);
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <MainContainer />
   
      </ApplicationProvider>
    </>
  );
}

export default App;
