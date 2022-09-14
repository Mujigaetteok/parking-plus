import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image ,Dimensions,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const {width:SCREEN_WIDTH, height:SCREEN_HEIGHT} = Dimensions.get('window')

const Map = () => {
  const [isLoading, setLoading] = useState(true);

  const initMapStatus= [
    {id: "A01", isUse: false },
    {id: "A02", isUse: false },
    {id: "A03", isUse: false },
    {id: "A04", isUse: false },
    {id: "A05", isUse: false },
    {id: "A06", isUse: false },
    {id: "A07", isUse: false },
    {id: "A08", isUse: false },
    {id: "A09", isUse: false },
    {id: "A10", isUse: false },
    {id: "A11", isUse: false },
    {id: "A12", isUse: false },
    {id: "A13", isUse: false },
    {id: "A14", isUse: false },
    {id: "A15", isUse: false },
    {id: "A16", isUse: false },
    {id: "A17", isUse: false },
    {id: "A18", isUse: false },
    {id: "A19", isUse: false },
    {id: "A20", isUse: false }
  ];

  const [mapStatus,setMapStatus] = useState([]);

  const d = new Date();
  const now_date = `${d.getFullYear()}-${(d.getMonth()+1)>9?(d.getMonth()+1):('0'+(d.getMonth()+1))}-${d.getDate()}`
  const now_time = d.getHours();

  useEffect(() => {
    setInitMapStatus();
  }, []);

  const setIsUse = (mapIndex,isUse) => {
    initMapStatus[mapIndex]['isUse'] = isUse;
    if (mapIndex == 19) {setLoading(false);setMapStatus(initMapStatus);};   
  }

  const checkIsUse = async (mapIndex) => {
    //Reserve Collection에서 가져오는 쿼리
    let isUse = false;
    await firestore()
    .collection('RESERVE')
    .where('parking_slot_num', '==', initMapStatus[mapIndex]['id'] )
    .where('use_de', '==', now_date)
    // .where('start_time', '>=', now_time)
    // .where('end_time', '<', now_time)
    .get()
    .then(querySnapshot => {
      if (querySnapshot.empty) isUse=false;
      else {
        querySnapshot.forEach(documentSnapshot => {
          let start = documentSnapshot.get("start_time");
          let end = documentSnapshot.get("end_time");
          if ((now_time>=start) && (now_time<end)) isUse=true;
        });
      }
    });
    return isUse;
  }

  //전체 spot에 state 적용
  const setInitMapStatus = async () => {
    initMapStatus.forEach(async (spot,i) => {
      let isUse = await checkIsUse(i);
      setIsUse(i,isUse);
    });

  }

  const Blank = () => {
    return <View style={styles.btn}></View>
  }

  const getIsUse = (mapIndex) => {
    return mapStatus[mapIndex]['isUse'];
  };
  
  const getImage = (isUse) => {
    return isUse? require('../asset/car.png') : require('../asset/available_spot.png');
  }
  
  const getId = (mapIndex) => {
    return mapStatus[mapIndex]['id'];
  }

  const draw = (start,end) => {
    let sliced = mapStatus.slice(start,end);
    return (
      Object.keys(sliced).map((key,i) => (
        <View style={styles.btn}>
            <Image source={getImage(getIsUse(i+start))}/>
            <Text style = {styles.txt}>{getId(i+start)}</Text>
        </View>
      ))
    )
  }

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  } 
    return (
    <SafeAreaView>
      <ScrollView horizontal>
        <View style={styles.map}>
            {draw(0,7)}
        </View>

        <View style={styles.map}/>

        <View style={styles.map}>
            <Blank></Blank>
            <Blank></Blank>
            {draw(7,10)}
        </View>

        <View style={styles.map}>
            <Blank></Blank>
            <Blank></Blank>
            {draw(10,13)}
        </View>

        <View style={styles.map}/>

        <View style={styles.map}>
          {draw(13,20)}
        </View>
      </ScrollView>
    </SafeAreaView>
    );
  }

const styles = StyleSheet.create({
    map: {
        marginTop:20,
        width:170,
        height:SCREEN_HEIGHT
    },
    btn: {
        width: 150,
        height:70,
        margin:12
    },
    txt: {
        fontSize:20,
        marginStart: 35,
        bottom: 50
  }
    
  });
export default Map;
