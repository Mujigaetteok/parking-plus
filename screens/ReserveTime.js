import React, { useRef, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const ReserveTime = ({ navigation: { navigate }, route }) => {

  const [timeList, setTime] = useState([
    {cnt: 0, time: "00", status: false },
    {cnt: 1, time: "01", status: false },
    {cnt: 2, time: "02", status: false },
    {cnt: 3, time: "03", status: true },
    {cnt: 4, time: "04", status: true },
    {cnt: 5, time: "05", status: true },
    {cnt: 6, time: "06", status: true },
    {cnt: 7, time: "07", status: true },
    {cnt: 8, time: "08", status: true },
    {cnt: 9, time: "09", status: true },
    {cnt: 10, time: "10", status: true },
    {cnt: 11, time: "11", status: true },
    {cnt: 12, time: "12", status: true },
    {cnt: 13, time: "13", status: true },
    {cnt: 14, time: "14", status: true },
    {cnt: 15, time: "15", status: true },
    {cnt: 16, time: "16", status: true },
    {cnt: 17, time: "17", status: true },
    {cnt: 18, time: "18", status: true },
    {cnt: 19, time: "19", status: true },
    {cnt: 20, time: "20", status: true },
    {cnt: 21, time: "21", status: true },
    {cnt: 22, time: "22", status: true },
    {cnt: 23, time: "23", status: true },
  ]);

  const isAvailable = (i) => {
    return timeList[i].status? true : false;
  };

  const getStyle = (available) => {
    return available? styles.availableTime : styles.unavailableTime;
  }


  // const TimeBlock = (start,end) => {
  //   let sliced = timeList.slice(start,end);
  //   return (
  //     Object.keys(sliced).map((key,i) => {
  //       if (isAvailable(i)) {
  //         <TouchableOpacity style={getStyle(true)}
  //           onPress={() => {navigate("Form");}}>
  //           <Text style = {styles.textTime}>{sliced[key].time}</Text>
  //         </TouchableOpacity>
  //       }
  //       else {
  //         <View style={getStyle(false)}>
  //           <Text style = {styles.textTime}>{sliced[key].time}</Text>
  //         </View>
  //       }
  //   })
  //   )
  // }

  const TimeBlock = (start,end) => {
    let sliced = timeList.slice(start,end);
    return (
      Object.keys(sliced).map((key,i) => (
        <TouchableOpacity disabled={!isAvailable(i+start)} style={getStyle(isAvailable(i+start))}
            onPress={() => {navigate("Form");}}>
            <Text style = {styles.textTime}>{sliced[key].time}</Text>
        </TouchableOpacity>
      ))
    )
  }

  return (
    <View style={styles.contain}>
      <View style={styles.top}>
        <Text style={styles.textA}>예약 시간 선택</Text>
      </View>
      <View style={styles.successLoc}>
        {TimeBlock(0,4)}
      </View>
      <View style={styles.successLoc}>
        {TimeBlock(4,8)}
      </View>
      <View style={styles.successLoc}>
        {TimeBlock(8,12)}
      </View>
      <View style={styles.successLoc}>
        {TimeBlock(12,16)}
      </View>
      <View style={styles.successLoc}>
        {TimeBlock(16,20)}
      </View>
      <View style={styles.successLoc}>
        {TimeBlock(20,24)}
      </View>
      <View style={styles.successLoc}>
        <Text style={styles.availableTime}>예약 가능</Text>
        <Text style={styles.unavailableTime}>예약 불가능</Text>
      </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 30,
  },
  top: {
    height: 100,
    justifyContent: "center",
  },
  textA: {
    fontSize: 24,
    fontWeight: "bold",
  },
  successLoc: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10
  },
  availableTime: {
    backgroundColor: "#AAF54B",
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 7
  },
  unavailableTime: {
    backgroundColor: "#FF317B",
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 7,
  },
  textTime: {
    fontSize: 18,
    color: "white"
  }

});

export default ReserveTime;