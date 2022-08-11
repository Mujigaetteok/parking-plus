import React from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";

const InfoAssign = ({ navigation }) => {
  return (
    <ScrollView style={styles.contain}>
      <View style={styles.top}>
        <Text style={styles.textA}>배정 정보</Text>
      </View>
      <Text style={styles.textB}>배정구역 A03</Text>
      <View style={styles.info}>
        <View style={{ flexDirection: "row", paddingBottom: 20 }}>
          <Text style={styles.textC}>Day {"  "}: </Text>
          <Text style={styles.textC}> 월,화,수,목,금</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textC}>Time : </Text>
          <Text style={styles.textC}> 00:00 ~ 09:00</Text>
        </View>
      </View>
      <Text style={styles.textB}>배정구역 A09</Text>
      <View style={styles.info}>
        <View style={{ flexDirection: "row", paddingBottom: 20 }}>
          <Text style={styles.textC}>Day {"  "}: </Text>
          <Text style={styles.textC}> 토,일</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textC}>Time : </Text>
          <Text style={styles.textC}> 12:00 ~ 24:00</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  top: {
    height: 100,
    paddingLeft: 30,
    justifyContent: "center",
  },
  textA: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#192342",
  },
  contain: {
    flex: 1,
    backgroundColor: "white",
  },
  info: {
    backgroundColor: "#F3F6FF",
    paddingVertical: 15,
    paddingLeft: 30,
    marginBottom: 40,
  },
  textB: {
    fontSize: 20,
    paddingLeft: 30,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#192342",
  },
  textC: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#192342",
  },
});

export default InfoAssign;
