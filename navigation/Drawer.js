import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Tabs from "./Tabs";
import MyInfoStack from "./MyInfoStack";
import AssignStack from "./AssignStack";
import Map from "../screens/Map";

const DrawerNav = createDrawerNavigator();

const Drawer = () => {
  return (
    <>
      <DrawerNav.Navigator
        initialRouteName="DrawerMain"
        screenOptions={{
          headerShown: true,
          headerTitle: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "white" },
          backBehavior: "history",
        }}
      >
        <DrawerNav.Screen name="홈" component={Tabs} />
        <DrawerNav.Screen name="내 정보 관리" component={MyInfoStack} />
        <DrawerNav.Screen name="배정 신청 결과" component={AssignStack} />
        <DrawerNav.Screen name="주차장 지도" component={Map} />
      </DrawerNav.Navigator>
    </>
  );
};

export default Drawer;
