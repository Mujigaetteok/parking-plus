import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Text, View } from "react-native";
import MyInfoStack from "./MyInfoStack";
import AssignStack from "./AssignStack";
import Main from "../screens/Main";
import MainStack from "./MainStack";
import Map from "../screens/Map";
import AssignForm from "../screens/AssignForm";
import ReserveStack from "./ReserveStack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          marginTop: 70,
          marginBottom: 50,
          paddingVertical: 20,
          paddingHorizontal: 30,
          backgroundColor: "#F3F6FF",
        }}
      >
        <Text style={{ color: "#192342", fontSize: 16, fontWeight: "bold" }}>
          홍길동님
        </Text>
        <Text style={{ fontSize: 14, color: "#677191" }}>
          파플아파트 1단지 101동 101호
        </Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}
const DrawerNav = createDrawerNavigator();

const Drawer = () => {
  return (
    <>
      <DrawerNav.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        initialRouteName="DrawerMain"
        screenOptions={{
          headerShown: true,
          headerTitle: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "white" },
          backBehavior: "history",

          drawerLabelStyle: {
            fontWeight: "bold",
          },
          headerRight: () => (
            <Icon
              name="bell-outline"
              color="black"
              size={22}
              style={{ marginHorizontal: 22 }}
            ></Icon>
          ),
        }}
      >
        <DrawerNav.Screen name="홈" component={MainStack} />
        <DrawerNav.Screen name="내 정보 관리" component={MyInfoStack} />
        <DrawerNav.Screen name="배정 신청" component={AssignForm} />
        <DrawerNav.Screen name="배정 신청 결과" component={AssignStack} />
        <DrawerNav.Screen name="주차장 지도" component={Map} />
        <DrawerNav.Screen name="주차공간 예약" component={ReserveStack} />
      </DrawerNav.Navigator>
    </>
  );
};

export default Drawer;
