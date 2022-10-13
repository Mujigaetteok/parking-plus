import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InfoHome from "../screens/InfoHome";
import InfoAssign from "../screens/InfoAssign";
import InfoReserve from "../screens/InfoReserve";
import InfoMember from "../screens/InfoMember";
import InfoCar from "../screens/InfoCar";
import InfoAssign2 from "../screens/InfoAssign2";

const StackNav = createNativeStackNavigator();

const MyInfoStack = () => {
  return (
    <StackNav.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <StackNav.Screen name="InfoMain" component={InfoHome} />
      <StackNav.Screen name="Assignment" component={InfoAssign} />
      <StackNav.Screen name="Assignment2" component={InfoAssign2} />
      <StackNav.Screen name="Reservation" component={InfoReserve} />
      <StackNav.Screen name="Car" component={InfoCar} />
      <StackNav.Screen name="Personal" component={InfoMember} />
    </StackNav.Navigator>
  );
};

export default MyInfoStack;
