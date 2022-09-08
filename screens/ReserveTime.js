import React, { useState, useRef } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";

const ReserveTime = ({ navigation: { navigate }, route }) => {
  const [date, setDate] = useState(route.params.date);
  const [spotId, setSpot] = useState(route.params.spotId);

  const [timeList, setTimeList] = useState([
    {time: "00", status: false },
    {time: "01", status: false },
    {time: "02", status: false },
    {time: "03", status: true },
    {time: "04", status: true },
    {time: "05", status: true },
    {time: "06", status: true },
    {time: "07", status: true },
    {time: "08", status: true },
    {time: "09", status: true },
    {time: "10", status: true },
    {time: "11", status: true },
    {time: "12", status: true },
    {time: "13", status: true },
    {time: "14", status: true },
    {time: "15", status: true },
    {time: "16", status: true },
    {time: "17", status: true },
    {time: "18", status: true },
    {time: "19", status: true },
    {time: "20", status: true },
    {time: "21", status: true },
    {time: "22", status: true },
    {time: "23", status: true },
  ]);

  const isUse = (i) => {
    return timeList[i].status? true : false;
  };

  const getStyle = (isUse) => {
    return isUse? styles.availableTime : styles.unavailableTime;
  }

  const getTime = (i) => {
    return timeList[i].time;
  }

  const drawTimeBlock = (start,end) => {
    let sliced = timeList.slice(start,end);
    return (
      Object.keys(sliced).map((key,i) => (
        <TouchableOpacity disabled={isUse(i+start)} style={getStyle(!isUse(i+start))}
            onPress={() => {navigate("Form",
              {date:date, spotId:spotId, startTime:getTime(i+start)}
            );}}>
            <Text style = {styles.textTime}>{getTime(i+start)}</Text>
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
        {drawTimeBlock(0,4)}
      </View>
      <View style={styles.successLoc}>
        {drawTimeBlock(4,8)}
      </View>
      <View style={styles.successLoc}>
        {drawTimeBlock(8,12)}
      </View>
      <View style={styles.successLoc}>
        {drawTimeBlock(12,16)}
      </View>
      <View style={styles.successLoc}>
        {drawTimeBlock(16,20)}
      </View>
      <View style={styles.successLoc}>
        {drawTimeBlock(20,24)}
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