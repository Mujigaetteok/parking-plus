import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { DrawerNavigator } from "./Drawer";
import Login from "../screens/Login";

const Stack = createStackNavigator();

const Login_Stack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="메인으로 이동" component={DrawerNavigator} />
    </Stack.Navigator>
  );
};

export default Login_Stack;
