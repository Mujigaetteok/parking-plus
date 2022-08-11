import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";

const InfoHome = ({ navigation: { navigate } }) => {
  return (
    <View style={styles.contain}>
      <View style={styles.top}>
        <Text style={styles.textB}>내 정보 관리</Text>
      </View>
      <TouchableOpacity
        style={styles.block}
        activeOpacity={0.8}
        onPress={() => navigate("Assignment")}
      >
        <Text style={styles.textA}>배정 정보</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.block}
        activeOpacity={0.8}
        onPress={() => navigate("Reservation")}
      >
        <Text style={styles.textA}>예약 정보</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.block}
        activeOpacity={0.8}
        onPress={() => navigate("Car")}
      >
        <Text style={styles.textA}>차량 정보</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.block}
        activeOpacity={0.8}
        onPress={() => navigate("Personal")}
      >
        <Text style={styles.textA}>개인 정보</Text>
      </TouchableOpacity>
      <View style={{ flex: 4 }} />
      <View />
    </View>
  );
};

const styles = StyleSheet.create({
  top: {
    height: 100,
    paddingLeft: 30,
    justifyContent: "center",
  },
  contain: {
    flex: 1,
    backgroundColor: "white",
  },

  block: {
    flex: 1.3,
    backgroundColor: "#F3F6FF",
    justifyContent: "center",
    paddingLeft: 30,
    borderBottomColor: "white",
    borderBottomWidth: 0.5,
  },
  textA: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#192342",
  },
  textB: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#192342",
  },
});

export default InfoHome;
