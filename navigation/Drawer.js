import React, { useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Tabs from "./Tabs";
import MyInfo_Stack from "./MyInfo_Stack";
import Assign_Stack from "./Assign_Stack";
import Show_Map from "../screens/Show_Map";

const DrawerNav = createDrawerNavigator();

const Drawer = () => {
  return (
    <>
      <DrawerNav.Navigator
        initialRouteName="DrawerMain"
        drawerPosition="left"
        backBehavior="history"
        screenOptions={{
          headerShown: true,
          headerTitle: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "white" },
        }}
      >
        <DrawerNav.Screen name="홈" component={Tabs} />
        <DrawerNav.Screen name="내 정보 관리" component={MyInfo_Stack} />
        <DrawerNav.Screen name="배정 신청 결과" component={Assign_Stack} />
        <DrawerNav.Screen name="주차장 지도" component={Show_Map} />
      </DrawerNav.Navigator>
    </>
  );
};

export default Drawer;
