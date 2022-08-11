// 
import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image ,Dimensions, ScrollView, SafeAreaView, ImageBackground, Alert} from 'react-native';

const {width:SCREEN_WIDTH, height:SCREEN_HEIGHT} = Dimensions.get('window')

// const Spot = () => {
//   return (
//     <TouchableOpacity 
//     style={styles.btn}
//     onPress={() => {
//       navigate("Time");
//     }}>
//       <Image source={require('../asset/available_spot.png')}/>

//     </TouchableOpacity>
//   )
// }

// const Car = () => {
//   return(
//     <View style={styles.btn}>
//       <Image source={require('../asset/car.png')}/>
//     </View>
//   )
// }
// const Blank = () => {
//     return (
//       <View style={styles.btn}></View>
//     )
//   }

const ReserveMap = ({ navigation: { navigate }, route }) => {

  const Spot = () => {
    return (
      <TouchableOpacity 
      style={styles.btn}
      onPress={() => {
        navigate("Time");
      }}>
        <Image source={require('../asset/available_spot.png')}/>
      </TouchableOpacity>
    )
  }
  
  const Car = () => {
    return(
      <View style={styles.btn}>
        <Image source={require('../asset/car.png')}/>
      </View>
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
        <View style={{width:170, height:SCREEN_HEIGHT, backgroundColor:'#DDDDDD'}}>
            <Spot></Spot><Text style={styles.txt}>A01</Text>
            <Spot></Spot><Text style={styles.txt}>A02</Text>
            <Spot></Spot><Text style={styles.txt}>A03</Text>
            <Spot></Spot><Text style={styles.txt}>A04</Text>
            <Spot></Spot><Text style={styles.txt}>A05</Text>
            <Spot></Spot><Text style={styles.txt}>A06</Text>
            <Car></Car>
        </View>
        <View style={{width:170, height:SCREEN_HEIGHT, backgroundColor:'#DDDDDD'}}>

        </View>
        <View style={{width:170, height:SCREEN_HEIGHT, backgroundColor:'#DDDDDD'}}>
            <Blank></Blank>
            <Blank></Blank>
            <Spot></Spot><Text style={styles.txt}>A08</Text>
            <Car></Car>
            <Spot></Spot><Text style={styles.txt}>A10</Text>

        </View>
        <View style={{width:170, height:SCREEN_HEIGHT, backgroundColor:'#DDDDDD'}}>
            <Blank></Blank>
            <Blank></Blank>
            <Spot></Spot><Text style={styles.txt}>A11</Text>
            <Spot></Spot><Text style={styles.txt}>A12</Text>
            <Spot></Spot><Text style={styles.txt}>A13</Text>

        </View>
        <View style={{width:170, height:SCREEN_HEIGHT, backgroundColor:'#DDDDDD'}}>

        </View>
        <View style={{width:170, height:SCREEN_HEIGHT, backgroundColor:'#DDDDDD'}}>
            <Spot></Spot><Text style={styles.txt}>A14</Text>
            <Car></Car>
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

export default ReserveMap;
