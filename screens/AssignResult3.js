import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import BottomSheet from "react-native-gesture-bottom-sheet";
import DropDownPicker from "react-native-dropdown-picker";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import firestore from "@react-native-firebase/firestore";

DropDownPicker.setListMode("SCROLLVIEW");

const AssignResult3 = ({ navigation: { navigate }, route }) => {
  const uid = 1;
  const assignColl = firestore().collection("ASSIGN");
  const mon = new Date().getMonth() + 2;
  const year = new Date().getFullYear();
  const form = year + "-" + (mon < 10 ? "0" + mon : mon) + "-" + "01";
  const loc = route.params.location;

  const [open, setOpen] = useState(false);
  const [opent, setOpent] = useState(false);
  const [items, setItems] = useState([...route.params.items]);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [keyv, setKeyv] = useState();

  const ind = (v) => {
    return items.findIndex((i) => i.value == v);
  };

  const [dayTime, setDayTime] = useState(
    route.params.weekT.map((m) => ({
      ...m,
      start: items[ind(route.params.value)].label,
      end: items[ind(route.params.valuet)].label,
      value: route.params.value,
      valuet: route.params.valuet,
    }))
  );

  const changeTime = (key) => {
    const newDay = [...dayTime];
    start >= 0 && start <= 23 && end >= 0 && end <= 23
      ? ((newDay[key].start = items[ind(start)].label),
        (newDay[key].end = items[ind(end)].label),
        (newDay[key].value = start),
        (newDay[key].valuet = end),
        setDayTime(newDay))
      : null;
    setStart(null);
    setEnd(null);
  };

  const dayAdd = async () => {
    try {
      const rows = await assignColl
        .where("member_id", "==", uid.toString())
        .where("start_de", "==", form)
        .where("cncl_status", "==", false)
        .where("parking_slot_id", "==", loc);
      rows.onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          dayTime.map((day) => {
            const de = assignColl.doc(doc.id).collection("ASSIGN_SCHEDULE");
            de.where("use_day", "==", day.day)
              .get()
              .then((res) => {
                res.size >= 1
                  ? res.forEach(function (doc) {
                      doc.ref.set({
                        use_day: day.day,
                        start_time: day.value,
                        end_time: day.valuet,
                      });
                    })
                  : add(doc.id, day.day, day.value, day.valuet);
              });
          });
        });
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const add = async (id, day, value, valuet) => {
    try {
      await assignColl.doc(id).collection("ASSIGN_SCHEDULE").add({
        use_day: day,
        start_time: value,
        end_time: valuet,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const bottomSheetView = (key) => {
    return (
      <View style={styles.containBottom}>
        <View style={{ flex: 3, justifyContent: "center" }}>
          <Text style={styles.textB}>시간</Text>
          <View style={styles.successLoc}>
            <View style={{ flex: 2 }}>
              <DropDownPicker
                open={open}
                value={start}
                items={items}
                setOpen={setOpen}
                setValue={setStart}
                setItems={setItems}
                maxHeight={120}
                placeholder="00:00"
                placeholderStyle={{
                  color: "#677191",
                }}
                style={{
                  backgroundColor: "#F3F6FF",
                  borderRadius: 21,
                  borderColor: "#F3F6FF",
                }}
                textStyle={{
                  fontSize: 18,
                  fontWeight: "bold",
                }}
                dropDownContainerStyle={{
                  backgroundColor: "#F3F6FF",
                  borderColor: "#F3F6FF",
                  borderRadius: 21,
                }}
              />
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 18 }}> ~ </Text>
            </View>
            <View style={{ flex: 2 }}>
              <DropDownPicker
                open={opent}
                value={end}
                items={items}
                setOpen={setOpent}
                setValue={setEnd}
                setItems={setItems}
                maxHeight={120}
                placeholder="00:00"
                placeholderStyle={{
                  color: "#677191",
                }}
                style={{
                  backgroundColor: "#F3F6FF",
                  borderRadius: 21,
                  borderColor: "#F3F6FF",
                }}
                textStyle={{
                  fontSize: 18,
                  fontWeight: "bold",
                }}
                dropDownContainerStyle={{
                  backgroundColor: "#F3F6FF",
                  borderColor: "#F3F6FF",
                  borderRadius: 21,
                }}
              />
            </View>
          </View>
        </View>

        <View style={{ flex: 1, justifyContent: "center" }}>
          <View style={styles.buttonArea}>
            {start !== null && end !== null && start < end ? (
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  bottomSheet.current.close();
                  changeTime(key);
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  시간 수정 완료
                </Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.buttonT}>
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  시간 수정 완료
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  };

  const bottomSheet = useRef();

  return (
    <View style={styles.contain}>
      <View style={{ flex: 9, marginBottom: 20 }}>
        <ScrollView>
          <View style={{ marginBottom: 20, marginTop: 35 }}>
            <Text style={styles.textB}>주차 공간</Text>
            <View style={styles.info}>
              <Text
                style={{ fontSize: 16, color: "#677191", fontWeight: "bold" }}
              >
                {route.params.location}
              </Text>
            </View>
          </View>
          <View style={{ marginBottom: 30 }}>
            <Text style={styles.textB}>결과</Text>
            <View style={styles.successLoc}>
              <Text style={styles.textD}>success</Text>
              <View />
            </View>
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.textB}>요일과 시간</Text>
            <View style={styles.successLoc}>
              {Object.keys(route.params.week).map((key) => (
                <View key={key}>
                  {route.params.week[key].status ? (
                    <Text style={styles.textP}>
                      {route.params.week[key].day}
                    </Text>
                  ) : (
                    <Text style={styles.textE}>
                      {route.params.week[key].day}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          </View>
          <View>
            {Object.keys(dayTime).map((key) => (
              <View key={key}>
                <View style={styles.successLocS}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.textDay}>
                      {dayTime[key].day}
                      {"  "}
                    </Text>
                    <Text style={styles.textDay}>{dayTime[key].start}</Text>
                    <Text style={styles.textDay}> ~ </Text>
                    <Text style={styles.textDay}>{dayTime[key].end}</Text>
                  </View>
                  <BottomSheet
                    hasDraggableIcon
                    ref={bottomSheet}
                    height={400}
                    sheetBackgroundColor="white"
                  >
                    {bottomSheetView(keyv)}
                  </BottomSheet>
                  <TouchableOpacity
                    style={{ alignItems: "center", justifyContent: "center" }}
                    onPress={() => {
                      setKeyv(key);
                      bottomSheet.current.show();
                    }}
                  >
                    <Text style={styles.editButton}>Edit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.buttonArea}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => (
              dayAdd(), navigate("Success", { text: "배정 공간 스케줄 선택이" })
            )}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>완료</Text>
          </TouchableOpacity>
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
  containBottom: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 30,
  },
  info: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },

  textB: {
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 10,
    color: "#192342",
  },
  textC: {
    marginLeft: 20,
    paddingVertical: 10,
    fontWeight: "bold",
    color: "#192342",
  },
  successLoc: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  successLocS: {
    flexDirection: "row",
    paddingHorizontal: 10,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  textD: {
    fontSize: 14,
    backgroundColor: "#AAF54B",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 7,
    color: "white",
  },
  textE: {
    fontSize: 16,
    backgroundColor: "#D9D9D9",
    borderRadius: 21,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontWeight: "bold",
    color: "#192342",
  },
  textP: {
    fontSize: 16,
    backgroundColor: "#567DF4",
    borderRadius: 21,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontWeight: "bold",
    color: "white",
  },
  time: {
    fontSize: 18,
    backgroundColor: "#F3F6FF",
    borderRadius: 21,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontWeight: "bold",
  },
  textDay: {
    color: "#677191",
    fontWeight: "bold",
    fontSize: 16,
  },
  textIn: {
    color: "#677191",
    fontWeight: "bold",
    fontSize: 16,
    borderBottomWidth: 2,
    height: 24,
    borderBottomColor: "#677191",
  },
  editButton: {
    backgroundColor: "#D9D9D9",
    color: "white",
    borderRadius: 15,
    paddingVertical: 6,
    paddingHorizontal: 12,
    height: 33,
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
});

export default AssignResult3;
