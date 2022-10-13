import React, { useEffect } from "react";
import auth from "@react-native-firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Root from "../navigation/Root";
import RegisterStack from "../navigation/RegisterStack";

const Stack = createNativeStackNavigator();

function Home() {
  useEffect(() => {
    console.log(auth().currentUser);
  }, []);
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Root" component={Root} />
        <Stack.Screen name="RegisterStack" component={RegisterStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Home;
