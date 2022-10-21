import React, { useEffect, useState, useCallback } from "react";
import auth from "@react-native-firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import InNav from "./navigation/InNav";
import OutNav from "./navigation/OutNav";

import { Alert } from "react-native";
import messaging from "@react-native-firebase/messaging";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const foregroundListener = useCallback(() => {
    messaging().onMessage(async (message) => {
      console.log(message);
      Alert.alert("A new FCM message arrived!", JSON.stringify(message));
    });
  }, []);

  useEffect(() => {
    foregroundListener();
    auth().onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);
  return (
    <NavigationContainer independent={true}>
      {isLoggedIn ? <InNav /> : <OutNav />}
    </NavigationContainer>
  );
}
