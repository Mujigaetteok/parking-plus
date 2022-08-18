import React, { useState } from "react";
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

DropDownPicker.setListMode("SCROLLVIEW");

const AssignForm = ({ navigation: { navigate } }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
  ]);

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
              <Text style={styles.textD}>파플아파트 101동 101호</Text>
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
              <Text style={styles.textD}>2022.02.10 ~ 2022.02.17</Text>
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
              <Text style={styles.textD}>2022년 03월</Text>
            </View>
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.textB}>차량 개수</Text>
            <View style={styles.successLoc}>
              <Icon
                name="car-outline"
                color="#677191"
                size={20}
                style={{ marginRight: 15, marginTop: 5 }}
              />
              <View style={{ width: 130 }}>
                <DropDownPicker
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
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
                    height:140 
                  }}
                />
              </View>
              <View style={{ justifyContent: "center" }}>
                <Text style={styles.textE}>{"   "}대</Text>
              </View>
            </View>
          </View>
          <View style={{height:140}} />
        </ScrollView>
      </View>
      <View style={{ flex: 1 }}>
        {value !== null ? (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigate("Success", { text: "배정 신청이" })}
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
  button: {
    backgroundColor: "#567DF4",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    marginBottom: 20,
  },
  buttonT: {
    backgroundColor: "#D9D9D9",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    marginBottom: 20,
  },
  textE: {
    fontSize: 16,
    color: "#677191",
    fontWeight: "bold",
  },
});

export default AssignForm;
