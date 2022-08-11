import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Drawer from "./Drawer";
import AssignStack from "./AssignStack";
import MyInfoStack from "./MyInfoStack";
import AssignResultSuccess from "../screens/AssignResultSuccess";
import ReserveSuccess from "../screens/ReserveSuccess";

const Nav = createNativeStackNavigator();

const Root = () => {
  return (
    <>
      <Nav.Navigator screenOptions={{ headerShown: false }}>
        <Nav.Screen name="Drawer" component={Drawer} />
        <Nav.Screen name="MyInfo" component={MyInfoStack} />
        <Nav.Screen name="Assign" component={AssignStack} />
        <Nav.Screen name="AssignSuccess" component={AssignResultSuccess} />
        <Nav.Screen name="ReserveSuccess" component={ReserveSuccess} />
      </Nav.Navigator>
    </>
  );
};

export default Root;
