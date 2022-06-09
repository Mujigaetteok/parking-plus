import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { StackNavigator } from "./Stack";
import About from '../screens/AboutScreen';
import Date from '../screens/ReserveDate';


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown:false}}
    >
      <Drawer.Screen name="Home" component={StackNavigator} options={{drawerLabel: 'HOME'}} />
      <Drawer.Screen name="About" component={About} options={{drawerLabel: 'ABOUT'}} />
      <Drawer.Screen name="주차공간 예약" component={Date} options={{drawerLabel: '주차공간 예약'}} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;