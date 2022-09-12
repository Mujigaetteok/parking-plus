import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import firestore from '@react-native-firebase/firestore';

const ReserveTime = ({ navigation: { navigate }, route }) => {
  const date = route.params.date;
  const spotId = route.params.spotId;

  const [isLoading, setLoading] = useState(true);
  const [timeList, setTimeList] = useState([]);
  const initTimeList = [
    {time: "00", status: false, value:0 },
    {time: "01", status: false, value:1 },
    {time: "02", status: false, value:2 },
    {time: "03", status: false, value:3 },
    {time: "04", status: false, value:4 },
    {time: "05", status: false, value:5 },
    {time: "06", status: false, value:6 },
    {time: "07", status: false, value:7 },
    {time: "08", status: false, value:8 },
    {time: "09", status: false, value:9 },
    {time: "10", status: false, value:10 },
    {time: "11", status: false, value:11 },
    {time: "12", status: false, value:12 },
    {time: "13", status: false, value:13 },
    {time: "14", status: false, value:14 },
    {time: "15", status: false, value:15 },
    {time: "16", status: false, value:16 },
    {time: "17", status: false, value:17 },
    {time: "18", status: false, value:18 },
    {time: "19", status: false, value:19 },
    {time: "20", status: false, value:20 },
    {time: "21", status: false, value:21 },
    {time: "22", status: false, value:22 },
    {time: "23", status: false, value:23 },
  ];

  useEffect(() => {
    setInitTimeList();
  }, []);

  const isUse = (i) => {
    return timeList[i].status? true : false;
  };

  const getStyle = (isUse) => {
    return isUse? styles.availableTime : styles.unavailableTime;
  }

  const getTime = (i) => {
    return timeList[i].time;
  }

  const getValue = (i) => {
    return timeList[i].value;
  }

  const drawTimeBlock = (start,end) => {
    let sliced = timeList.slice(start,end);
    return (
      Object.keys(sliced).map((key,i) => (
        <TouchableOpacity disabled={isUse(i+start)} style={getStyle(!isUse(i+start))}
            onPress={() => {navigate("Form",
              {date:date, spotId:spotId, startTime:getTime(i+start), timeValue:getValue(i+start)}
            );}}>
            <Text style = {styles.textTime}>{getTime(i+start)}</Text>
        </TouchableOpacity>
      ))
    )
  }

  const setInitTimeList= async () => {
    //Reserve Collection에서 가져오는 쿼리
    console.log("start setInit");
    firestore()
    .collection('RESERVE')
    .where('parking_slot_num', '==', spotId )
    .where('use_de', '==', date)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        let start = documentSnapshot.get("start_time");
        let end = documentSnapshot.get("end_time");
        console.log(start,end);
        for (let i=start; i<=end; i++) {
          initTimeList[i]["status"]=true;
          console.log("setInitTimeList["+i+"] = true");
        }
      });
      setTimeList(initTimeList);setLoading(false);
    });
  }

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
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