import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import Icon3 from "react-native-vector-icons/Ionicons";

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
        <View style={{ flexDirection: "row" }}>
          <Icon2 name="lock-outline" color="#192342" size={21} />
          <Text style={styles.textA}>배정 정보</Text>
        </View>
        <Icon name="right" color="#1A1A1A" size={13} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.block}
        activeOpacity={0.8}
        onPress={() => navigate("Reservation")}
      >
        <View style={{ flexDirection: "row" }}>
          <Icon3 name="person-outline" color="#192342" size={21} />
          <Text style={styles.textA}>예약 정보</Text>
        </View>
        <Icon name="right" color="#1A1A1A" size={13} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.block}
        activeOpacity={0.8}
        onPress={() => navigate("Car")}
      >
        <View style={{ flexDirection: "row" }}>
          <Icon3 name="car-outline" color="#192342" size={21} />
          <Text style={styles.textA}>차량 정보</Text>
        </View>
        <Icon name="right" color="#1A1A1A" size={13} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.block}
        activeOpacity={0.8}
        onPress={() => navigate("Personal")}
      >
        <View style={{ flexDirection: "row" }}>
          <Icon3 name="eye-off-outline" color="#192342" size={21} />
          <Text style={styles.textA}>개인 정보</Text>
        </View>
        <Icon name="right" color="#1A1A1A" size={13} />
      </TouchableOpacity>
      <View style={{ flex: 2 }} />
      <View style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: "#F3F6FF",
            height: 53,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>Log out</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View />
    </View>
  );
};

const styles = StyleSheet.create({
  top: {
    height: 100,
    justifyContent: "center",
  },
  contain: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 30,
  },

  block: {
    flex: 1,
    backgroundColor: "#F3F6FF",
    alignItems: "center",
    paddingHorizontal: 20,
    borderBottomColor: "white",
    borderBottomWidth: 0.5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textA: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#192342",
    marginLeft: 15,
  },
  textB: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#192342",
  },
});

export default InfoHome;
