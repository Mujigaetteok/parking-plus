import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Drawer from "./Drawer";
import Login from "../screens/Login";

const Stack = createStackNavigator();

const LoginStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="홈" component={Drawer} />
    </Stack.Navigator>
  );
};

export default LoginStack;