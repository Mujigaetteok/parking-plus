import React from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";

const InfoReserve = ({ navigation: { navigate } }) => {
  return (
    <ScrollView style={styles.contain}>
      <View style={styles.top}>
        <Text style={styles.textA}>예약 정보</Text>
      </View>
      <Text style={styles.textB}>2022.06.25</Text>
      <View style={styles.info}>
        <View style={{ flexDirection: "row", paddingBottom: 20 }}>
          <Text style={styles.textC}>Location : </Text>
          <Text style={styles.textC}> A07</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textC}>Time {"       "}: </Text>
          <Text style={styles.textC}> 10:00 ~ 21:00</Text>
        </View>
      </View>
      <Text style={styles.textB}>2022.06.26</Text>
      <View style={styles.info}>
        <View style={{ flexDirection: "row", paddingBottom: 20 }}>
          <Text style={styles.textC}>Location : </Text>
          <Text style={styles.textC}> A11</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textC}>Time {"       "}: </Text>
          <Text style={styles.textC}> 07:00 ~ 24:00</Text>
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
    marginBottom: 10,
    paddingLeft: 30,
    fontWeight: "bold",
    color: "#567DF4",
  },
  textC: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#192342",
  },
});

export default InfoReserve;
