import React from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/Feather";

const AssignResult1 = ({ navigation: { navigate } }) => {
  return (
    <ScrollView style={styles.contain}>
      <View style={styles.top}>
        <Text style={styles.textA}>주차 배정 결과</Text>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.textB}>아파트</Text>
        <View style={styles.info}>
          <Icon
            name="location-outline"
            color="#677191"
            size={20}
            style={{ marginRight: 15 }}
          />
          <Text style={styles.textC}>파플아파트 1단지</Text>
        </View>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.textB}>기간</Text>
        <View style={styles.info}>
          <Icon2
            name="calendar"
            color="#677191"
            size={20}
            style={{ marginRight: 15 }}
          />
          <Text style={styles.textC}>2022년 03월</Text>
        </View>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.textB}>주차 공간</Text>
        <TouchableOpacity
          style={styles.successLoc}
          activeOpacity={0.5}
          onPress={() => navigate("Day", { location: "A03" })}
        >
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <Icon
              name="car-outline"
              color="#677191"
              size={20}
              style={{ marginRight: 15 }}
            />
            <Text style={styles.textE}>A03</Text>
          </View>
          <Text style={styles.textD}>success</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.successLoc}
          activeOpacity={0.5}
          onPress={() => navigate("Day", { location: "A09" })}
        >
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <Icon
              name="car-outline"
              color="#677191"
              size={20}
              style={{ marginRight: 15 }}
            />
            <Text style={styles.textE}>A09</Text>
          </View>
          <Text style={styles.textD}>success</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    color: "#192342",
  },
  contain: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 30,
  },
  info: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
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
    color: "#192342",
  },
  textC: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#192342",
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
  textE: {
    fontWeight: "bold",
    paddingVertical: 10,
    fontSize: 18,
    color: "#192342",
  },
});

export default AssignResult1;
