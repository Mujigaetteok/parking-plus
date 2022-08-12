import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ReserveDate from "../screens/ReserveDate";
import ReserveMap from "../screens/ReserveMap";
import ReserveTime from "../screens/ReserveTime";
import ReserveForm from "../screens/ReserveForm";

const Stack = createNativeStackNavigator();

const AssignStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Date" component={ReserveDate} />
      <Stack.Screen name="Map" component={ReserveMap} />
      <Stack.Screen name="Time" component={ReserveTime} />
      <Stack.Screen name="Form" component={ReserveForm} />
    </Stack.Navigator>
  );
};

export default AssignStack;
