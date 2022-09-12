import React, { useRef, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import firestore from '@react-native-firebase/firestore';

const ReserveForm = ({ navigation: { navigate }, route }) => {
  const date = route.params.date;
  const spotId = route.params.spotId;
  const startTime = route.params.startTime;
  const timeValue = route.params.timeValue;

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(1);
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
            <Text style={styles.textA}>주차 예약</Text>
          </View>

          <View>
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.textB}>예약 날짜</Text>
              <View style={styles.info}>
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>{date}</Text>
              </View>
            </View>

            <View style={{ marginBottom: 20 }}>
              <Text style={styles.textB}>주차 공간</Text>
              <View style={styles.successLoc} activeOpacity={0.5}>
                <Text style={{ fontWeight: "bold", paddingVertical: 10, fontSize: 18 }}>{spotId}</Text>
              </View>
            </View>
          </View>

          <View>
            <Text style={styles.textB}>시간</Text>
            <View style={styles.successLoc}>
              <View style={{ justifyContent: "center" }}>
                <Text style={{fontSize: 18, fontWeight: "bold",}}>{startTime+":00"}</Text>
              </View>
              <View style={{ justifyContent: "center" }}>
                <Text style={{ fontSize: 18 }}> 부터 </Text>
              </View>
                <View style={{ width: 110 }}>
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
                      height: 100,
                    }}
                  />
                </View>
            <View style={{ justifyContent: "center" }}>
              <Text style={{ fontSize: 18 }}> 시간 </Text>
            </View>
          </View>  
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.buttonArea}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigate("Success", {text: "주차 예약이"});
              firestore()
              .collection('RESERVE')
              .add({
                member_id:"asdf",
                cncl_status: false,
                start_time: timeValue,
                end_time: timeValue+ value-1,
                parking_slot_num: spotId,
                use_de: date})}}>
            <Text style={styles.buttonTitle}>시간 선택 완료</Text>
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
  },
  contain: {
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
    backgroundColor: "#F3F6FF",
    borderRadius: 20,
    paddingLeft: 20,
    justifyContent: "space-between",
    marginBottom: 10,
  },
  textD: {
    fontSize: 14,
    color: "white",
    backgroundColor: "#AAF54B",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 25,
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
  buttonTitle: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ReserveForm;
