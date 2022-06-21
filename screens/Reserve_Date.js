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


class ReserveDate extends Component {
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
  render(navigation) {
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
        <TouchableOpacity onPress={() => this.props.navigation.navigate('ReserveMap')} style={styles.confirm_btn}>
          <Text style={styles.txt}>확인</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  confirm_btn: {
    width:SCREEN_WIDTH,
    backgroundColor:'#567DF4'
  },
  txt: {
    fontSize:30,
    color:'#FFFFFF'
  }
});

export default ReserveDate;
