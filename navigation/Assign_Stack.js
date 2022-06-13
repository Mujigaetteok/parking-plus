import React from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Show_Assign from "../screens/Show_Assign";
import Reserve_Assign from "../screens/Reserve_Assign";
import Reserve_Assign_Date from "../screens/Reserve_Assign_Date";
import Show_Success from "../screens/Show_Success";

const Stack = createNativeStackNavigator();

const Assign_Stack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Main" component={Show_Assign} />
      <Stack.Screen name="Day" component={Reserve_Assign_Date} />
      <Stack.Screen name="Detail" component={Reserve_Assign} />
      <Stack.Screen name="Success" component={Show_Success} />
    </Stack.Navigator>
  );
};

export default Assign_Stack;
