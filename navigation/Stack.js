/*import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View, TouchableOpacity } from "react-native";

const ScreenOne = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate("Two")}>
          <Text>go to two</Text>
  </TouchableOpacity>
);
const ScreenTwo = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate("Three")}>
    <Text>go to three</Text>
  </TouchableOpacity>
);
const ScreenThree = ({ navigation: { setOptions } }) => (
  <TouchableOpacity onPress={() => setOptions({ title: "Hello!" })}>
    <Text>Change title</Text>
  </TouchableOpacity>
);

const NativeStack = createNativeStackNavigator();

const Stack = () => (
  <NativeStack.Navigator
    screenOptions={{
      presentation: "modal",
      animation: "fade",
      headerTintColor: 'green',
      headerBackTitleVisible: false,
    }}
  >
    <NativeStack.Screen name="One" component={ScreenOne} />
    <NativeStack.Screen name="Two" component={ScreenTwo} />
    <NativeStack.Screen name="Three" component={ScreenThree} />
    </NativeStack.Navigator>
);

export default Stack; */

/* StackNavigator.js */
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from '../screens/HomeScreen';
import Details from '../screens/DetailScreen';
import Map from '../screens/Map';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="Map" component={Map} />
    </Stack.Navigator>
  );
}

export { StackNavigator };