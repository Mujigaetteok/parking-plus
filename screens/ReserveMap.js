// 
import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image ,Dimensions,
  ScrollView,
  SafeAreaView,
  ImageBackground,
  Alert} from 'react-native';

const {width:SCREEN_WIDTH, height:SCREEN_HEIGHT} = Dimensions.get('window')



const ReserveMap = ({ navigation: { navigate }, route }) => {

  const [MapStatus, setStatus] = useState([
    {id: "A01", status: false },
    {id: "A02", status: false },
    {id: "A03", status: true },
    {id: "A04", status: true },
    {id: "A05", status: true },
    {id: "A06", status: true },
    {id: "A07", status: true },
    {id: "A08", status: true },
    {id: "A09", status: true },
    {id: "A10", status: true },
    {id: "A11", status: true },
    {id: "A12", status: true },
    {id: "A13", status: true },
    {id: "A14", status: true },
    {id: "A15", status: true },
    {id: "A16", status: true },
    {id: "A17", status: true },
    {id: "A18", status: true },
    {id: "A19", status: true },
    {id: "A20", status: true }
  ]);

  const isAvailable = (i) => {
    return MapStatus[i].status? true : false;
  };

  const getImage = (available) => {
    return available?  require('../asset/available_spot.png'): require('../asset/car.png');
  }

  const getId = (i) => {
    return MapStatus[i].id;
  }

  const draw = (start,end) => {
    let sliced = MapStatus.slice(start,end);
    return (
      Object.keys(sliced).map((key,i) => (
        <TouchableOpacity disabled={!isAvailable(i+start)} style={styles.btn}
            onPress={() => {navigate("Time");}}>
            <Image source={getImage(isAvailable(i+start))}/>
            <Text style = {styles.txt} disabled={true}>{sliced[key].id}</Text>
        </TouchableOpacity>
      ))
    )
  }

  const Blank = () => {
      return (
        <View style={styles.btn}></View>
      )
    }

    return (
    <SafeAreaView>
      <ScrollView horizontal>
        <View style={styles.map}>
            {draw(0,7)}
        </View>
        <View style={styles.map}>

        </View>
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
        <View style={styles.map}>

        </View>
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

export default ReserveMap;
