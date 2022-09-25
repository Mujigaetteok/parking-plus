import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "../screens/Main";
import InfoCar from "../screens/InfoCar";
import InfoMember from "../screens/InfoMember";

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="Car" component={InfoCar} />
      <Stack.Screen name="Mem" component={InfoMember} />
    </Stack.Navigator>
  );
};

export default MainStack;
