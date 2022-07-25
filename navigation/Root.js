import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Drawer from "./Drawer";
import Assign_Stack from "./Assign_Stack";
import MyInfo_Stack from "./MyInfo_Stack";
import Show_Success from "../screens/Show_Success";

const Nav = createNativeStackNavigator();

const Root = () => {
  return (
    <>
      <Nav.Navigator screenOptions={{ headerShown: false }}>
        <Nav.Screen name="Drawer" component={Drawer} />
        <Nav.Screen name="MyInfo" component={MyInfo_Stack} />
        <Nav.Screen name="Assign" component={Assign_Stack} />
        <Nav.Screen name="Success" component={Show_Success} />
      </Nav.Navigator>
    </>
  );
};

export default Root;
