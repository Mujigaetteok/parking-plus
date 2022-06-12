import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { StackNavigator } from "./Stack";
import About from '../screens/AboutScreen';
import ReserveDate from '../screens/ReserveDate';
import Map from '../screens/Map';


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{}}
    >
      <Drawer.Screen name="Home" component={StackNavigator} options={{drawerLabel: 'HOME'}} />
      <Drawer.Screen name="About" component={About} options={{drawerLabel: 'ABOUT'}} />
      <Drawer.Screen name="주차공간 조회" component={Map} options={{drawerLabel: '주차공간 조회'}} />
      <Drawer.Screen name="주차공간 예약" component={ReserveDate} options={{drawerLabel: '주차공간 예약'}} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;