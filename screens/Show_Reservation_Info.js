import React from "react";
import { Text, StyleSheet, View } from "react-native";

const Show_Reservation_Info = ({ navigation: { navigate } }) => {
  return (
    <View style={styles.contain}>
      <View style={styles.top}>
        <Text style={styles.textA}>예약 정보</Text>
      </View>
      <Text style={styles.textB}>2022.06.25</Text>
      <View style={styles.info}>
        <Text style={{ paddingBottom: 10, fontWeight: "bold", fontSize: 20 }}>
          Location : A07
        </Text>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
          Time : 10:00 ~ 21:00
        </Text>
      </View>
      <Text style={styles.textB}>2022.06.26</Text>
      <View style={styles.info}>
        <Text style={{ paddingBottom: 10, fontWeight: "bold", fontSize: 20 }}>
          Location : A11
        </Text>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
          Time : 7:00 ~ 24:00
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
    color: "#567DF4",
  },
});

export default Show_Reservation_Info;
