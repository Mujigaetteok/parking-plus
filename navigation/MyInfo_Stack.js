import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Show_Info from "../screens/Show_Info";
import Show_Assign_Info from "../screens/Show_Assign_Info";
import Show_Reservation_Info from "../screens/Show_Reservation_Info";
import Show_Personal_Info from "../screens/Show_Personal_Info";
import Show_Car from "../screens/Show_Car";

const StackNav = createNativeStackNavigator();

const MyInfo_Stack = () => {
  return (
    <StackNav.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <StackNav.Screen name="InfoMain" component={Show_Info} />
      <StackNav.Screen name="Assignment" component={Show_Assign_Info} />
      <StackNav.Screen name="Reservation" component={Show_Reservation_Info} />
      <StackNav.Screen name="Personal" component={Show_Personal_Info} />
      <StackNav.Screen name="Car" component={Show_Car} />
    </StackNav.Navigator>
  );
};

export default MyInfo_Stack;
