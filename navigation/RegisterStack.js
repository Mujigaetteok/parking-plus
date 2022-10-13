import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Join from "../screens/Join";

const StackNav = createNativeStackNavigator();

const RegisterStack = () => {
  return (
    <StackNav.Navigator
      initialRouteName="Register"
      screenOptions={{ headerShown: false }}
    >
      <StackNav.Screen name="Join" component={Join} />
    </StackNav.Navigator>
  );
};

export default RegisterStack;
