import React, { useRef, useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import BottomSheet from "react-native-gesture-bottom-sheet";
import DropDownPicker from "react-native-dropdown-picker";
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/Feather";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import firestore from "@react-native-firebase/firestore";

DropDownPicker.setListMode("SCROLLVIEW");

const AssignResult2 = ({ navigation: { navigate }, route }) => {
  const uid = 1;
  const memberColl = firestore().collection("MEMBER");
  const d = new Date();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    memberColl.where("id", "==", uid.toString()).onSnapshot((snapshot) => {
      const memArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(memArray);
    });
  }, []);

  const term = () => {
    let month = d.getMonth() + 1;
    if (month === 12) {
      month = 1;
    } else {
      month = month + 1;
    }
    return d.getFullYear() + "년 " + month + "월";
  };

  const [week, setWeek] = useState([
    { id: 1, day: "월", status: false },
    { id: 2, day: "화", status: false },
    { id: 3, day: "수", status: false },
    { id: 4, day: "목", status: false },
    { id: 5, day: "금", status: false },
    { id: 6, day: "토", status: false },
    { id: 7, day: "일", status: false },
  ]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [opent, setOpent] = useState(false);
  const [valuet, setValuet] = useState(null);
  const [items, setItems] = useState([
    { label: "00:00", value: 0 },
    { label: "01:00", value: 1 },
    { label: "02:00", value: 2 },
    { label: "03:00", value: 3 },
    { label: "04:00", value: 4 },
    { label: "05:00", value: 5 },
    { label: "06:00", value: 6 },
    { label: "07:00", value: 7 },
    { label: "08:00", value: 8 },
    { label: "09:00", value: 9 },
    { label: "10:00", value: 10 },
    { label: "11:00", value: 11 },
    { label: "12:00", value: 12 },
    { label: "13:00", value: 13 },
    { label: "14:00", value: 14 },
    { label: "15:00", value: 15 },
    { label: "16:00", value: 16 },
    { label: "17:00", value: 17 },
    { label: "18:00", value: 18 },
    { label: "19:00", value: 19 },
    { label: "20:00", value: 20 },
    { label: "21:00", value: 21 },
    { label: "22:00", value: 22 },
    { label: "23:00", value: 23 },
  ]);

  const changeColor = (num) => {
    const index = week.findIndex((i) => i.id === num);
    const st = week[index].status;
    const newWeek = week.map((m) => (m.id === num ? { ...m, status: !st } : m));
    setWeek(newWeek);
  };

  const countDay = () => {
    let con = 0;
    Object.keys(week).map((key) => (week[key].status ? con++ : con));
    return con;
  };

  const loc = route.params.location;
  const bottomSheetView = (loc) => {
    return (
      <View style={styles.containBottom}>
        <View
          style={{
            flex: 2.5,
            justifyContent: "center",
          }}
        >
          <Text style={styles.textB}>요일</Text>
          <View style={styles.successLoc}>
            {Object.keys(week).map((key) =>
              week[key].status ? (
                <Text key={key} style={styles.textP}>
                  {week[key].day}
                </Text>
              ) : null
            )}
            {Object.keys(week).map((key) =>
              week[key].status ? null : (
                <Text key={key} style={styles.textN}>
                  {week[key].day}
                </Text>
              )
            )}
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          <Text style={styles.textB}>시간</Text>
          <View style={styles.successLoc}>
            <View style={{ flex: 2 }}>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
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
                value={valuet}
                items={items}
                setOpen={setOpent}
                setValue={setValuet}
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
        <View style={{ flex: 1 }} />
        <View
          style={{
            flex: 1.5,
            justifyContent: "center",
          }}
        >
          <View style={styles.buttonArea}>
            {value !== null && valuet !== null && value < valuet ? (
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  navigate("Detail", {
                    location: loc,
                    items: items,
                    value: value,
                    valuet: valuet,
                    week: week,
                    weekT: week.filter((m) => m.status !== false),
                  });
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  시간 선택 완료
                </Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.buttonT}>
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  시간 선택 완료
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
            <View style={styles.info}>
              <Icon
                name="car-outline"
                color="#677191"
                size={20}
                style={{ marginRight: 15 }}
              />
              <Text style={styles.textC}>{loc}</Text>
            </View>
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.textB}>결과</Text>
            <View style={styles.successLoc}>
              <Text style={styles.textD}>success</Text>
            </View>
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.textB}>요일 선택</Text>
            <View style={styles.successLoc}>
              {Object.keys(week).map((key) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => changeColor(week[key].id)}
                >
                  {week[key].status ? (
                    <Text style={styles.textP}>{week[key].day}</Text>
                  ) : (
                    <Text style={styles.textE}>{week[key].day}</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={{ flex: 1 }}>
        <BottomSheet
          hasDraggableIcon
          ref={bottomSheet}
          height={400}
          sheetBackgroundColor="white"
        >
          {bottomSheetView(loc)}
        </BottomSheet>
        <View style={styles.buttonArea}>
          {countDay() > 0 ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => bottomSheet.current.show()}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                요일 선택 완료
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.buttonT}>
              <Text style={{ color: "white", fontWeight: "bold" }}>
                요일 선택 완료
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
  containBottom: {
    flex: 1,
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
  textC: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#192342",
  },
  successLoc: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textD: {
    fontSize: 14,
    backgroundColor: "#AAF54B",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginBottom: 10,
    color: "white",
  },
  textE: {
    fontSize: 16,
    backgroundColor: "#D9D9D9",
    borderRadius: 21,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: "#192342",
    fontWeight: "bold",
  },
  textN: {
    fontSize: 16,
    backgroundColor: "white",
    borderRadius: 21,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontWeight: "bold",
    color: "white",
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

export default AssignResult2;
