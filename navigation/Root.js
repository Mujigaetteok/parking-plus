import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View, Button } from "react-native";
import {Drawer} from "./Drawer";
import Assign_Stack from "./Assign_Stack";
import MyInfo_Stack from "./MyInfo_Stack";

const Nav = createNativeStackNavigator();

const Root = () => {
  return (
    <>
      <Nav.Navigator screenOptions={{ headerShown: false }}>
        <Nav.Screen name="Drawer" component={Drawer} />
        <Nav.Screen name="MyInfo" component={MyInfo_Stack} />
        <Nav.Screen name="Assign" component={Assign_Stack} />
      </Nav.Navigator>
    </>
  );
};

export {Root};
