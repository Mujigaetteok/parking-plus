import React from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const Show_Assign = ({ navigation: { navigate } }) => {
  return (
    <View style={styles.contain}>
      <View style={styles.top}>
        <Text style={styles.textA}>주차 배정 결과</Text>
      </View>
      <ScrollView>
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.textB}>아파트</Text>
          <View style={styles.info}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              파플아파트 1단지
            </Text>
          </View>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.textB}>기간</Text>
          <View style={styles.info}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              2022.03.01 ~ 2022.03.31
            </Text>
          </View>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.textB}>주차 공간</Text>
          <TouchableOpacity
            style={styles.successLoc}
            activeOpacity={0.5}
            onPress={() => navigate("Day", { location: "A03" })}
          >
            <Text
              style={{ fontWeight: "bold", paddingVertical: 10, fontSize: 18 }}
            >
              A03
            </Text>
            <Text style={styles.textD}>success</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.successLoc}
            activeOpacity={0.5}
            onPress={() => navigate("Day", { location: "A09" })}
          >
            <Text
              style={{ fontWeight: "bold", paddingVertical: 10, fontSize: 18 }}
            >
              A09
            </Text>
            <Text style={styles.textD}>success</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  top: {
    height: 100,

    justifyContent: "center",
  },
  textA: {
    fontSize: 24,
    fontWeight: "bold",
  },
  contain: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 30,
  },
  info: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  adressInfo: {
    backgroundColor: "#F3F6FF",
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  textB: {
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  textC: {
    marginLeft: 20,
    paddingVertical: 10,
    fontWeight: "bold",
  },
  successLoc: {
    flexDirection: "row",
    backgroundColor: "#F3F6FF",
    borderRadius: 20,
    paddingLeft: 20,
    justifyContent: "space-between",
    marginBottom: 10,
  },
  textD: {
    fontSize: 14,
    color: "white",
    backgroundColor: "#AAF54B",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 25,
  },
});

export default Show_Assign;
