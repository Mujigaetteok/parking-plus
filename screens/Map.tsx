import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image ,Dimensions, ScrollView} from 'react-native';

const {width:SCREEN_WIDTH, height:SCREEN_HEIGHT} = Dimensions.get('window')

const Spot = () => {
  return (
    <TouchableOpacity style={styles.btn}>
      <Image source={require('../asset/available_spot.png')}/>
      <Text>ID</Text>
    </TouchableOpacity>
  )
}

function Map() {
    return (
      <ScrollView horizontal>
        <Image style={styles.map}
          source={require('../asset/map.png')}/>
        <View></View>
        <View></View>
        <View></View>
        <View></View>
        <View></View>
        <View></View>
      </ScrollView>
    );
  }

  const styles = StyleSheet.create({
    map: {
      height:SCREEN_HEIGHT,
      width:1100,
      justifyContent: 'center', 
      alignItems: 'center'
    },
    btn: {
      margin:30
    }
  });
  
  export default Map;