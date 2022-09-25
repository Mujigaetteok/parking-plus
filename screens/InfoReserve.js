import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import firestore from "@react-native-firebase/firestore";

const InfoReserve = ({ navigation: { navigate } }) => {
  const uid = 1;
  const reserveColl = firestore().collection("RESERVE");
  const [reser, setReser] = useState([]);
  const d = new Date();

  useEffect(() => {
    reserveColl
      .where("member_id", "==", uid.toString())
      .where("cncl_status", "==", false)
      .onSnapshot((snapshot) => {
        const reserArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const currentReser = reserArray.filter(
          (re) => d <= new Date(re.use_de)
        );
        currentReser.sort((a, b) => new Date(a.use_de) - new Date(b.use_de));
        setReser(currentReser);
      });
  }, []);

  return (
    <ScrollView style={styles.contain}>
      <View style={styles.top}>
        <Text style={styles.textA}>예약 정보</Text>
      </View>
      {reser.length > 0 ? (
        reser.map((r, id) => (
          <View key={id}>
            <Text style={styles.textB}>{r.use_de}</Text>
            <View style={styles.info}>
              <View style={{ flexDirection: "row", paddingBottom: 20 }}>
                <Text style={styles.textC}>Location : </Text>
                <Text style={styles.textC}> {r.parking_slot_id}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.textC}>Time {"       "}: </Text>
                <Text style={styles.textC}>
                  {" "}
                  {r.start_time}
                  {":00"}
                  {" ~ "}
                  {r.end_time}
                  {":00"}
                </Text>
              </View>
            </View>
          </View>
        ))
      ) : (
        <View style={{ alignItems: "center" }}>
          <Text style={styles.textC}>예약 정보가 없습니다</Text>
        </View>
      )}
      {}
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
