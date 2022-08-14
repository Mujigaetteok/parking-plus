import React, { useContext, useState } from "react";
import { format } from "date-fns";
import { Calendar } from "react-native-calendars";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";

const ReserveDate = ({ navigation: { navigate }, route }) => {
  const posts = [];
  const markedDates = posts.reduce((acc, current) => {
    const formattedDate = format(new Date(current.date), 'yyyy-MM-dd');
    acc[formattedDate] = {marked: true};
    return acc;
  }, {});

  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd"),
  );
  const markedSelectedDates = {
    ...markedDates,
    [selectedDate]: {
      selected: true,
      marked: markedDates[selectedDate]?.marked,
    }
  }

  return (
    <View style={styles.contain}>
    <View style={{ flex: 9, marginBottom: 20 }}>
      <Calendar 
        style={styles.calendar} 
        markedDates={markedSelectedDates}
        theme={{
          selectedDayBackgroundColor: '#009688',
          arrowColor: '#009688',
          dotColor: '#009688',
          todayTextColor: '#009688',
        }} 
        onDayPress={(day) => {
          setSelectedDate(day.dateString)
        }} />
        </View>
        <View style={{flex:1, justifyContent: "center" }}>
        <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigate("Map");
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              날짜 선택 완료
            </Text>
          </TouchableOpacity>
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
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  button: {
    backgroundColor: "#567DF4",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    marginBottom: 20,
  }
});

export default ReserveDate;