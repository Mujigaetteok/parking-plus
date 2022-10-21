import React, { useState, useEffect } from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Text, View } from "react-native";
import MyInfoStack from "./MyInfoStack";
import AssignStack from "./AssignStack";
import MainStack from "./MainStack";
import Map from "../screens/Map";
import AssignForm from "../screens/AssignForm";
import ReserveStack from "./ReserveStack";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { useIsFocused } from "@react-navigation/native";

function CustomDrawerContent(props) {
  const uid = auth().currentUser.uid.toString();
  const memberColl = firestore().collection("MEMBER");

  const isFocused = useIsFocused();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    memberColl.where("id", "==", uid.toString()).onSnapshot((snapshot) => {
      const memArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setUsers(memArray);
    });
  }, [isFocused]);

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
        {users.map((user, id) => (
          <Text
            style={{ color: "#192342", fontSize: 16, fontWeight: "bold" }}
            key={id}
          >
            {user.name}님
          </Text>
        ))}
        {users.map((user, id) => (
          <Text style={{ fontSize: 14, color: "#677191" }} key={id}>
            {user.apt_name} {user.dong_no}
            {"동 "}
            {user.hosu_no}
            {"호"}
          </Text>
        ))}
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
