import React, { useState } from "react";
import { Text, View, Button } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MyInfo_Stack from "./MyInfo_Stack";
import Assign_Stack from "./Assign_Stack";
import Icon from "react-native-vector-icons/MaterialIcons";

const Tab = createBottomTabNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

function Tabs({ navigation }) {
  return (
    <>
      <Tab.Navigator
        initialRouteName="TabMain"
        screenOptions={{ headerShown: false }}
      >
        <Tab.Screen
          name="메인"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" color={color} size={20} />
            ),
          }}
        />
        <Tab.Screen
          name="내 정보 관리"
          component={MyInfo_Stack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="person" color={color} size={20} />
            ),
          }}
        />
        <Tab.Screen
          name="배정 신청 결과"
          component={Assign_Stack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="directions-car" color={color} size={20} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}

export default Tabs;
