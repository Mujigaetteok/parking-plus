import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AssignResult1 from "../screens/AssignResult1";
import AssignResult3 from "../screens/AssignResult3";
import AssignResult2 from "../screens/AssignResult2";

const Stack = createNativeStackNavigator();

const AssignStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Main" component={AssignResult1} />
      <Stack.Screen name="Day" component={AssignResult2} />
      <Stack.Screen name="Detail" component={AssignResult3} />
    </Stack.Navigator>
  );
};

export default AssignStack;
