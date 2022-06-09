// import React from "react";
// import { Text, View } from "react-native";
// import { Calendar } from 'react-native-calendars';
// import { TouchableOpacity } from "react-native-gesture-handler";

// export const MonthlyCalendar = () => {
//     return (
//         <View style={{marginTop: 50}}>
//             <Calendar
//                 minDate={Date()}/>
//             <TouchableOpacity>
//                 <Text>확인</Text>
//             </TouchableOpacity>
//         </View>
//     );
// };

// export default MonthlyCalendar;

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';

const {width:SCREEN_WIDTH, height:SCREEN_HEIGHT} = Dimensions.get('window')

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
  }
  render() {
    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    return (
      <View style={styles.container}>
        <View style={{flex:3}}>
          <CalendarPicker
          onDateChange={this.onDateChange}
          minDate={Date()}
          selectedDayColor={'#567DF4'}
          textStyle={{}}
          scaleFactor={SCREEN_WIDTH}
        />
        </View>

        <View style={{flex:1}}>
          <TouchableOpacity>
              <Text>확인</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 100,
  },
  confirm_btn: {

  }
});