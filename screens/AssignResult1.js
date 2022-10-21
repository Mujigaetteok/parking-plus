import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/Feather";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { useIsFocused } from "@react-navigation/native";

const AssignResult1 = ({ navigation: { navigate } }) => {
  const uid = auth().currentUser.uid.toString();
  const memberColl = firestore().collection("MEMBER");
  const assignColl = firestore().collection("ASSIGN");
  const isFocused = useIsFocused();
  const d = new Date();
  const [users, setUsers] = useState([]);
  const [assigns, setAssigns] = useState([]);

  useEffect(() => {
    memberColl.where("id", "==", uid.toString()).onSnapshot((snapshot) => {
      const memArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(memArray);
    });
  }, [isFocused]);

  useEffect(() => {
    const form = getYe() + "-" + getMon() + "-" + "01";
    assignColl
      .where("member_id", "==", uid.toString())
      .where("cncl_status", "==", false)
      .where("start_de", "==", form)
      .onSnapshot((snapshot) => {
        const assignArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAssigns(assignArray);
      });
  }, [isFocused]);

  const getMon = () => {
    const day = new Date(new Date(new Date().setMonth(d.getMonth() + 2)));
    let month = day.getMonth().toString();
    if (month.toString().length == 1) {
      month = "0" + month.toString();
    }
    return month;
  };

  const getYe = () => {
    const day = new Date(new Date(new Date().setMonth(d.getMonth() + 2)));
    let year = day.getFullYear().toString();
    return year;
  };

  const term = () => {
    return getYe() + "년 " + getMon() + "월";
  };

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
          {users.map((user, id) => (
            <Text style={styles.textC} key={id}>
              {user.apt_name}
            </Text>
          ))}
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
          <Text style={styles.textC}>{term()}</Text>
        </View>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.textB}>주차 공간</Text>
        <View style={{ height: 10 }} />
        {assigns.length > 0 ? (
          assigns.map((as, id) => (
            <TouchableOpacity
              key={id}
              style={styles.successLoc}
              activeOpacity={0.5}
              onPress={() => navigate("Day", { location: as.parking_slot_id })}
            >
              <View style={{ alignItems: "center", flexDirection: "row" }}>
                <Icon
                  name="car-outline"
                  color="#677191"
                  size={20}
                  style={{ marginRight: 15 }}
                />
                <Text style={styles.textE}>{as.parking_slot_id}</Text>
              </View>
              <View style={styles.textD}>
                <Text style={{ fontSize: 14, color: "white" }}>Success</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={{ alignItems: "center" }}>
            <Text style={styles.textE}>배정된 공간이 없습니다</Text>
          </View>
        )}
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
    borderRadius: 25,
    paddingLeft: 20,
    justifyContent: "space-between",
    marginBottom: 10,
    height: 50,
  },
  textD: {
    backgroundColor: "#AAF54B",
    paddingHorizontal: 17,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  textE: {
    fontWeight: "bold",
    paddingVertical: 10,
    fontSize: 18,
    color: "#192342",
  },
});

export default AssignResult1;
