import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image ,Dimensions, ScrollView, SafeAreaView, ImageBackground, Alert} from 'react-native';

const {width:SCREEN_WIDTH, height:SCREEN_HEIGHT} = Dimensions.get('window')

const Spot = () => {
  return (
    <TouchableOpacity style={styles.btn}>
      <Image source={require('../asset/available_spot.png')}/>
    </TouchableOpacity>
  )
}
const Empty = () => {
    return (
      <View style={styles.btn}></View>
    )
  }

function Reserve_Map() {
    return (
    <SafeAreaView>
      <ScrollView horizontal>
        <View style={{width:170, height:SCREEN_HEIGHT, backgroundColor:'#FFFFFF'}}>
            <Spot></Spot><Text style={styles.txt}>A01</Text>
            <Spot></Spot><Text style={styles.txt}>A02</Text>
            <Spot></Spot><Text style={styles.txt}>A03</Text>
            <Spot></Spot><Text style={styles.txt}>A04</Text>
            <Spot></Spot><Text style={styles.txt}>A05</Text>
            <Spot></Spot><Text style={styles.txt}>A06</Text>
            <Spot></Spot><Text style={styles.txt}>A07</Text>
        </View>
        <View style={{width:170, height:SCREEN_HEIGHT, backgroundColor:'#FFFFFF'}}>

        </View>
        <View style={{width:170, height:SCREEN_HEIGHT, backgroundColor:'#FFFFFF'}}>
            <Empty></Empty>
            <Empty></Empty>
            <Spot></Spot><Text style={styles.txt}>A08</Text>
            <Spot></Spot><Text style={styles.txt}>A09</Text>
            <Spot></Spot><Text style={styles.txt}>A10</Text>

        </View>
        <View style={{width:170, height:SCREEN_HEIGHT, backgroundColor:'#FFFFFF'}}>
            <Empty></Empty>
            <Empty></Empty>
            <Spot></Spot><Text style={styles.txt}>A11</Text>
            <Spot></Spot><Text style={styles.txt}>A12</Text>
            <Spot></Spot><Text style={styles.txt}>A13</Text>

        </View>
        <View style={{width:170, height:SCREEN_HEIGHT, backgroundColor:'#FFFFFF'}}>

        </View>
        <View style={{width:170, height:SCREEN_HEIGHT, backgroundColor:'#FFFFFF'}}>
            <Spot></Spot><Text style={styles.txt}>A14</Text>
            <Spot></Spot><Text style={styles.txt}>A15</Text>
            <Spot></Spot><Text style={styles.txt}>A16</Text>
            <Spot></Spot><Text style={styles.txt}>A17</Text>
            <Spot></Spot><Text style={styles.txt}>A18</Text>
            <Spot></Spot><Text style={styles.txt}>A19</Text>
            <Spot></Spot><Text style={styles.txt}>A20</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
    );
  }

const styles = StyleSheet.create({
    btn: {
        width: 150,
        height:70,
        margin:15
    },
    txt: {
        marginTop:-65,
        marginBottom:30,
        marginStart:40,
        fontSize:20
    },
  });

export default Reserve_Map;