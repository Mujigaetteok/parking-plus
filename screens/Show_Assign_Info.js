import React from "react";
import { Text, StyleSheet, View } from "react-native";

const Show_Assign_Info = ({ navigation }) => {
  return (
    <View style={styles.contain}>
      <View style={styles.top}>
        <Text style={styles.textA}>배정 정보</Text>
      </View>
      <Text style={styles.textB}>배정구역 A03</Text>
      <View style={styles.info}>
        <Text style={{ paddingBottom: 10, fontWeight: "bold", fontSize: 20 }}>
          Day : 월,화,수,목,금
        </Text>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
          Time : 24:00 ~ 9:00
        </Text>
      </View>
      <Text style={styles.textB}>배정구역 A09</Text>
      <View style={styles.info}>
        <Text style={{ paddingBottom: 10, fontWeight: "bold", fontSize: 20 }}>
          Day : 토,일
        </Text>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
          Time : 12:00 ~ 24:00
        </Text>
      </View>
    </View>
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
  },
});

export default Show_Assign_Info;
