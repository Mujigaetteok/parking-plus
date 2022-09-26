import React, { useEffect } from "react";
import auth from "@react-native-firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginP from "./screens/LoginP";
import Root from "./navigation/Root";
import RegisterStack from "./navigation/RegisterStack";

const Stack = createNativeStackNavigator();

function App() {
  useEffect(() => {
    console.log(auth().currentUser);
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        {/* <Stack.Screen name="LoginP" component={LoginP} /> */}
        <Stack.Screen name="Root" component={Root} />
        <Stack.Screen name="RegisterStack" component={RegisterStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
