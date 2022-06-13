import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import {Login_stack} from "./navigation/Login_stack";

function App() {
  return (
    <NavigationContainer>
      <Login_stack/>
    </NavigationContainer>
  );
}

export default App;
