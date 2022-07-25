import React, { useState, useRef } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import BottomSheet from "react-native-gesture-bottom-sheet";
import DropDownPicker from "react-native-dropdown-picker";

const Reserve_Assign = ({ navigation: { navigate }, route }) => {
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
    }))
  );

  const changeTime = (key) => {
    const newDay = [...dayTime];
    start >= 0 && start <= 23 && end >= 0 && end <= 23
      ? ((newDay[key].start = items[ind(start)].label),
        (newDay[key].end = items[ind(end)].label),
        setDayTime(newDay))
      : null;
    setStart(null);
    setEnd(null);
  };

  const bottomSheetView = (key) => {
    return (
      <View style={styles.containBottom}>
        <View style={{ marginTop: 40 }} />
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.textB}>시간</Text>
          <View style={styles.successLoc}>
            <View style={{ width: 110 }}>
              <DropDownPicker
                open={open}
                value={start}
                items={items}
                setOpen={setOpen}
                setValue={setStart}
                setItems={setItems}
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
            <View style={{ justifyContent: "center" }}>
              <Text style={{ fontSize: 18 }}> ~ </Text>
            </View>
            <View style={{ width: 110 }}>
              <DropDownPicker
                open={opent}
                value={end}
                items={items}
                setOpen={setOpent}
                setValue={setEnd}
                setItems={setItems}
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
        {start !== null && end !== null ? (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              bottomSheet.current.close();
              changeTime(key);
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              시간 선택 완료
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  };

  const bottomSheet = useRef();

  return (
    <ScrollView style={styles.contain}>
      <View style={styles.top}>
        <Text style={styles.textA}>주차 배정 결과</Text>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.textB}>주차 공간</Text>
        <View style={styles.info}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
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
                <Text style={styles.textP}>{route.params.week[key].day}</Text>
              ) : (
                <Text style={styles.textE}>{route.params.week[key].day}</Text>
              )}
            </View>
          ))}
        </View>
      </View>
      <View style={{ marginBottom: 20 }}>
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
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigate("Success")}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>완료</Text>
      </TouchableOpacity>
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
  button: {
    backgroundColor: "#567DF4",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    marginBottom: 20,
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
});

export default Reserve_Assign;
