import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/Feather";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import firestore from "@react-native-firebase/firestore";

DropDownPicker.setListMode("SCROLLVIEW");

const AssignForm = ({ navigation: { navigate } }) => {
  const uid = 1;
  const carColl = firestore().collection("CAR");
  const assignAppColl = firestore().collection("ASSIGN_APPLY");
  const memberColl = firestore().collection("MEMBER");

  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const d = new Date();

  useEffect(() => {
    memberColl.where("id", "==", uid.toString()).onSnapshot((snapshot) => {
      const memArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(memArray);
    });
  }, []);

  useEffect(() => {
    carColl.onSnapshot((snapshot) => {
      const carArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const currentCar = carArray.filter((car) => car.member_id == uid);

      var arr = [];
      for (var i = 1; i <= currentCar.length; i++) {
        arr.push({ label: i.toString(), value: i });
      }
      setItems(arr);
    });
  }, []);

  const startDate = () => {
    const last = new Date(
      new Date(new Date().setMonth(d.getMonth() + 1)).setDate(0)
    );
    const lastDay = new Date(last.setDate(last.getDate() - 13));
    const mon = lastDay.getMonth() + 1;
    const format = lastDay.getFullYear() + "." + mon + "." + lastDay.getDate();
    return format;
  };

  const endDate = () => {
    const last = new Date(
      new Date(new Date().setMonth(d.getMonth() + 1)).setDate(0)
    );
    const lastDay = new Date(last.setDate(last.getDate() - 7));
    const mon = lastDay.getMonth() + 1;
    const format = lastDay.getFullYear() + "." + mon + "." + lastDay.getDate();
    return format;
  };

  const getMon = () => {
    let month = d.getMonth() + 1;
    if (month === 12) {
      month = 1;
    } else {
      month = month + 1;
    }
    return month;
  };

  const addAssignApp = async () => {
    try {
      await assignAppColl.add({
        apply_term: d.getFullYear() + "-" + getMon(),
        apply_count: value,
        member_id: uid,
      });
      setValue(null);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.contain}>
      <View style={{ flex: 9, marginBottom: 20 }}>
        <ScrollView>
          <View style={styles.top}>
            <Text style={styles.textA}>주차 배정 양식</Text>
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.textB}>주소</Text>
            <View style={styles.info}>
              <Icon
                name="location-outline"
                color="#677191"
                size={20}
                style={{ marginRight: 15 }}
              />
              {users.map((user, id) => (
                <Text style={styles.textD} key={id}>
                  {user.apt_name} {user.dong_no}
                  {"동"} {user.hosu_no}
                  {"호"}
                </Text>
              ))}
            </View>
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.textB}>배정 신청 가능 기간</Text>
            <View style={styles.info}>
              <Icon2
                name="calendar"
                color="#677191"
                size={20}
                style={{ marginRight: 15 }}
              />
              <Text style={styles.textD}>
                {startDate()}
                {" ~ "}
                {endDate()}
              </Text>
            </View>
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.textB}>배정 기간</Text>
            <View style={styles.info}>
              <Icon2
                name="calendar"
                color="#677191"
                size={20}
                style={{ marginRight: 15 }}
              />
              <Text style={styles.textD}>
                {d.getFullYear()}
                {"년"} {getMon()}
                {"월"}
              </Text>
            </View>
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.textB}>차량 개수</Text>

            {items.length > 0 ? (
              <View style={styles.successLoc}>
                <Icon
                  name="car-outline"
                  color="#677191"
                  size={20}
                  style={{ marginRight: 15, marginTop: 5 }}
                />
                <View style={{ flexDirection: "row", flex: 1 }}>
                  <View style={{ flex: 1 }}>
                    <DropDownPicker
                      open={open}
                      value={value}
                      items={items}
                      setOpen={setOpen}
                      setValue={setValue}
                      setItems={setItems}
                      maxHeight={90}
                      placeholder="1"
                      placeholderStyle={{
                        color: "#677191",
                      }}
                      style={{
                        backgroundColor: "#F3F6FF",
                        borderRadius: 21,
                        borderColor: "#F3F6FF",
                        paddingLeft: 20,
                      }}
                      textStyle={{
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                      dropDownContainerStyle={{
                        backgroundColor: "#F3F6FF",
                        borderColor: "#F3F6FF",
                        borderRadius: 21,
                        paddingLeft: 10,
                      }}
                    />
                  </View>
                  <View style={{ justifyContent: "center", flex: 1.5 }}>
                    <Text style={styles.textE}>{"   "}대</Text>
                  </View>
                </View>
              </View>
            ) : (
              <View style={{ alignItems: "center" }}>
                <Text style={styles.textD}>배정 신청할 차량이 없습니다</Text>
              </View>
            )}
          </View>
          <View style={{ height: 100 }} />
        </ScrollView>
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.buttonArea}>
          {value !== null ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                addAssignApp(), navigate("Success", { text: "배정 신청이" });
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                배정 신청
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.buttonT}>
              <Text style={{ color: "white", fontWeight: "bold" }}>
                배정 신청
              </Text>
            </View>
          )}
        </View>
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

  textB: {
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 10,
    color: "#192342",
  },
  successLoc: {
    flexDirection: "row",
    paddingLeft: 20,
    marginBottom: 10,
  },
  textD: {
    fontWeight: "bold",
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
  buttonT: {
    backgroundColor: "#D9D9D9",
    width: "100%",
    height: "140%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  textE: {
    fontSize: 16,
    color: "#677191",
    fontWeight: "bold",
  },
});

export default AssignForm;
