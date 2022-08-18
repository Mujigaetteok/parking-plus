import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Root from "../navigation/Root";
import { TouchableOpacity } from "react-native-gesture-handler";

const Main = ({ navigation: { navigate } }) => {
  return (
    <View style={styles.contain}>
      <View style={{ flex: 4, justifyContent:"center"}}>
        <Text style={styles.text}>파플아파트</Text>
        <Text style={styles.text}>101동 101호 홍길동님</Text>
      </View>
      <View style={{ flex: 4, justifyContent:"center" }}>
        <View>
          <TouchableOpacity onPress={() => navigate("배정 신청")}>
            <Text>3월 배정 신청</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.successLoc}>
          <TouchableOpacity onPress={() => navigate("주차장 지도")}>
            <Text>지도</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate("주차공간 예약")}>
            <Text>앱 가이드</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 2}}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 30,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  successLoc: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10
  },
  text: {
    fontSize: 30,
    
  }
});

export default Main;