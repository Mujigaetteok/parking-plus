import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Drawer from "./Drawer";
import AssignStack from "./AssignStack";
import MyInfoStack from "./MyInfoStack";
import AssignResultSuccess from "../screens/AssignResultSuccess";

const Nav = createNativeStackNavigator();

const Root = () => {
  return (
    <>
      <Nav.Navigator screenOptions={{ headerShown: false }}>
        <Nav.Screen name="Drawer" component={Drawer} />
        <Nav.Screen name="MyInfo" component={MyInfoStack} />
        <Nav.Screen name="Assign" component={AssignStack} />
        <Nav.Screen name="Success" component={AssignResultSuccess} />
      </Nav.Navigator>
    </>
  );
};

export default Root;
