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
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { useIsFocused } from "@react-navigation/native";

const AssignResult1 = ({ navigation: { navigate } }) => {
  const uid = auth().currentUser.uid.toString();
  const memberColl = firestore().collection("MEMBER");
  const assignColl = firestore().collection("ASSIGN");
  const assignApplyColl = firestore().collection("ASSIGN_APPLY");
  const parkingSlotColl = firestore().collection("PARKING_SLOT");
  const isFocused = useIsFocused();
  const d = new Date();
  const [users, setUsers] = useState([]);
  const [assigns, setAssigns] = useState([]);
  const [slots, setSlots] = useState([]);
  const [count, setCount] = useState(0);
  const [apply, setApply] = useState([]);
  const [memA, setMemA] = useState([]);
  const [checkAss, setCheckAss] = useState([]);

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

  useEffect(() => {
    const form = getYe() + "-" + getMon() + "-" + "01";
    assignColl
      .where("cncl_status", "==", false)
      .where("start_de", "==", form)
      .onSnapshot((snapshot) => {
        const ch = snapshot.docs.map((doc) => ({
          id: doc.id,
        }));
        setCheckAss(ch);
      });
  }, [isFocused]);

  const getMon = () => {
    const day = new Date(new Date(new Date().setMonth(d.getMonth() + 1)));
    let month = (day.getMonth() + 1).toString();
    if (month.toString().length == 1) {
      month = "0" + month.toString();
    }
    return month;
  };

  const getYe = () => {
    const day = new Date(new Date(new Date().setMonth(d.getMonth() + 1)));
    let year = day.getFullYear().toString();
    return year;
  };

  const term = () => {
    return getYe() + "년 " + getMon() + "월";
  };

  useEffect(() => {
    const applyForm = getYe() + "-" + getMon();
    var count = 0;
    assignApplyColl
      .where("apply_term", "==", applyForm)
      .get()
      .then((res) => {
        res.forEach((doc) => {
          count += doc.data().apply_count;
        });
        setCount(count);
      });
  }, [isFocused]);

  useEffect(() => {
    const applyForm = getYe() + "-" + getMon();
    assignApplyColl
      .where("apply_term", "==", applyForm)
      .onSnapshot((snapshot) => {
        const slotsArray = snapshot.docs.map((doc) => ({
          member_id: doc.data().member_id,
          apply_count: doc.data().apply_count,
        }));
        setApply(slotsArray);
      });
  }, [isFocused]);

  useEffect(() => {
    const applyForm = getYe() + "-" + getMon();
    var ap = [];
    assignApplyColl
      .where("apply_term", "==", applyForm)
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          for (var i = 0; i < doc.data().apply_count; i++) {
            ap.push(doc.data().member_id);
          }
        });
        setMemA(JSON.parse(JSON.stringify(ap)));
      });
  }, [isFocused]);

  useEffect(() => {
    parkingSlotColl.onSnapshot((snapshot) => {
      const slotsArray = snapshot.docs.map((doc) => ({
        slot_no: doc.data().slot_no,
      }));
      setSlots(slotsArray);
    });
  }, [isFocused]);

  const getRandomIndex = (len) => {
    const s = new Set();
    while (Array.from(s).length < len) {
      s.add(parseInt(Math.random() * len) + 1);
    }
    return Array.from(s);
  };

  const getRandomIndexCon = (len, p) => {
    const s = new Set();
    while (Array.from(s).length < p) {
      s.add(parseInt(Math.random() * len) + 1);
    }
    return Array.from(s);
  };

  const lowCount = async (count, leng) => {
    const ran = getRandomIndexCon(leng, count);
    var coun = 0;
    for (var i = 0; i < apply.length; i++) {
      for (var j = 0; j < apply[i].apply_count; j++) {
        try {
          coun++;
          await assignColl.add({
            start_de: startDate(),
            end_de: endDate(),
            parking_slot_id: slots[ran[coun - 1] - 1].slot_no,
            member_id: apply[i].member_id,
            cncl_status: false,
          });
        } catch (error) {
          console.log(error.message);
        }
      }
    }
  };

  const moreCount = async (count, leng) => {
    const ran = getRandomIndex(leng);
    const cran = getRandomIndexCon(count, leng);
    for (var i = 0; i < ran.length; i++) {
      try {
        console.log(memA);
        await assignColl.add({
          start_de: startDate(),
          end_de: endDate(),
          parking_slot_id: slots[ran[i] - 1].slot_no,
          member_id: memA[cran[i] - 1],
          cncl_status: false,
        });
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const startDate = () => {
    return getYe() + "-" + getMon() + "-01";
  };

  const endDate = () => {
    const day = new Date(new Date(new Date().setMonth(d.getMonth() + 2)));
    const mon = (day.getMonth() + 1).toString();
    const dayF = day.getFullYear() + "-" + (mon < 10 ? "0" + mon : mon) + "-01";
    const lastDay = new Date(
      new Date(dayF).setDate(new Date(dayF).getDate() - 1)
    );
    return (
      lastDay.getFullYear() +
      "-" +
      (lastDay.getMonth() + 1).toString() +
      "-" +
      lastDay.getDate()
    );
  };

  const assignSlots = () => {
    count <= slots.length
      ? lowCount(count, slots.length)
      : moreCount(count, slots.length);
  };

  return (
    <View style={styles.contain}>
      <View style={{ flex: 9, marginBottom: 20 }}>
        <ScrollView>
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
                  onPress={() =>
                    navigate("Day", { location: as.parking_slot_id })
                  }
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
                    <Text style={{ fontSize: 14, color: "white" }}>
                      Success
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <View style={{ alignItems: "center" }}>
                {checkAss.length > 0 ? (
                  <Text style={styles.textE}>배정에 실패하셨습니다</Text>
                ) : (
                  <Text style={styles.textE}>
                    아직 배정이 진행되지 않았습니다
                  </Text>
                )}
              </View>
            )}
          </View>
        </ScrollView>
      </View>
      <View style={{ flex: 1 }}>
        {checkAss.length > 0 ? null : (
          <View style={styles.buttonArea}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                assignSlots();
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                배정 시작
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
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
  buttonArea: {
    width: "100%",
    height: hp("5%"),
  },
  button: {
    backgroundColor: "#567DF4",
    width: "100%",
    height: "140%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
});

export default AssignResult1;
