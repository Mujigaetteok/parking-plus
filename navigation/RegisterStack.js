import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register1 from "../screens/Register1";
import Register2 from "../screens/Register2";
import Register4 from "../screens/Register4";
import Login from "../screens/Login";

const StackNav = createNativeStackNavigator();

const RegisterStack = () => {
  return (
    <StackNav.Navigator
      initialRouteName="Register"
      screenOptions={{ headerShown: false }}
    >
      <StackNav.Screen name="Register1" component={Register1} />
      <StackNav.Screen name="Register2" component={Register2} />
      <StackNav.Screen name="Register4" component={Register4} />
      <StackNav.Screen name="Login" component={Login} />
    </StackNav.Navigator>
  );
};

export default RegisterStack;
