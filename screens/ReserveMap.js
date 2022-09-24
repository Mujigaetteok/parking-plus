import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const ReserveMap = ({ navigation: { navigate }, route }) => {
  const date = route.params.date["selectedDate"];
  const now_month = date.slice(0,7)+"-01"
  const now_day = new Date(date).getDay();

  const [isLoading, setLoading] = useState(true);

  const initMapStatus = [
    { id: "A01", isFull: false },
    { id: "A02", isFull: false },
    { id: "A03", isFull: false },
    { id: "A04", isFull: false },
    { id: "A05", isFull: false },
    { id: "A06", isFull: false },
    { id: "A07", isFull: false },
    { id: "A08", isFull: false },
    { id: "A09", isFull: false },
    { id: "A10", isFull: false },
    { id: "A11", isFull: false },
    { id: "A12", isFull: false },
    { id: "A13", isFull: false },
    { id: "A14", isFull: false },
    { id: "A15", isFull: false },
    { id: "A16", isFull: false },
    { id: "A17", isFull: false },
    { id: "A18", isFull: false },
    { id: "A19", isFull: false },
    { id: "A20", isFull: false },
  ];

  const [mapStatus, setMapStatus] = useState([]);

  useEffect(() => {
    setInitMapStatus();
  }, []);

  const setIsFull = (mapIndex, isFull) => {
    initMapStatus[mapIndex]["isFull"] = isFull;
    if (mapIndex == 19) {
      setLoading(false);
      setMapStatus(initMapStatus);
    }
  };

  const checkIsFull = async (mapIndex) => {
    //DB조회해서 사용 시간을 채우는 메소드
    let timeTable = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];
    //Reserve Collection에서 가져오는 쿼리
    let isFull = false;
    await firestore()
    .collection('RESERVE')
    .where('parking_slot_id', '==', initMapStatus[mapIndex]['id'] )
    .where('use_de', '==', date)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        let start = documentSnapshot.get("start_time");
        let end = documentSnapshot.get("end_time");
        for (let i=start; i<=end; i++) {timeTable[i]=1;}
      });
    });

    //Assign Collection에서 가져오는 쿼리
    await firestore()
    .collection('ASSIGN')
    .where('parking_slot_id', '==', initMapStatus[mapIndex]['id'] )
    .where('start_de', '==', now_month)
    .get()
    .then(querySnapshot => {
      if (querySnapshot.empty) return;
      else {
        querySnapshot.forEach(async documentSnapshot => {
          await firestore()
          .collection('ASSIGN')
          .doc(documentSnapshot.id)
          .collection('ASSIGN_SCHEDULE')
          .where('day_index', '==', now_day)
          .get()
          .then(querySnapshot => {
            if (querySnapshot.empty) return;
            else {
              querySnapshot.forEach(documentSnapshot => {
                let start = documentSnapshot.get("start_time");
                let end = documentSnapshot.get("end_time");
                for (let i=start; i<=end; i++) {timeTable[i]=1;}
              });
            }
          });
        });
      }
    });
    if (!(timeTable.includes(0))) {isFull=true;}
    else isFull= false;
    return isFull;
  };

  //전체 spot에 state 적용
  const setInitMapStatus = async () => {
    initMapStatus.forEach(async (spot, i) => {
      let isFull = await checkIsFull(i);
      setIsFull(i, isFull);
    });
  };

  const Blank = () => {
    return <View style={styles.btn}></View>;
  };

  const getIsFull = (mapIndex) => {
    return mapStatus[mapIndex]["isFull"];
  };

  const draw = (start,end) => {
    let sliced = mapStatus.slice(start,end);
    return (
      Object.keys(sliced).map((key,i) => (
        <TouchableOpacity key={key} disabled={getIsFull(i+start)} style={styles.btn}
            onPress={() => {navigate("Time",
              {date:date, spotId:getId(i+start)}
            );}}>
            <Image source={getImage(getIsFull(i+start))}/>
            <Text style = {styles.txt}>{getId(i+start)}</Text>
        </TouchableOpacity>
      ))
    )
  }
  const getImage = (isFull) => {
    return isFull
      ? require("../asset/car.png")
      : require("../asset/available_spot.png");
  };

  const getId = (mapIndex) => {
    return mapStatus[mapIndex]["id"];
  };

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <SafeAreaView>
      <ScrollView horizontal>
        <View style={styles.map}>{draw(0, 7)}</View>

        <View style={styles.map} />

        <View style={styles.map}>
          <Blank></Blank>
          <Blank></Blank>
          {draw(7, 10)}
        </View>

        <View style={styles.map}>
          <Blank></Blank>
          <Blank></Blank>
          {draw(10, 13)}
        </View>
        <View style={styles.map}></View>
        <View style={styles.map}>{draw(13, 20)}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  map: {
    marginTop: 20,
    width: 170,
    height: SCREEN_HEIGHT,
  },
  btn: {
    width: 150,
    height: 70,
    margin: 12,
  },
  txt: {
    fontSize: 20,
    marginStart: 35,
    bottom: 50,
  },
});

export default ReserveMap;
