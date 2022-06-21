import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const Show_Success = ({ navigation: { navigate, reset }, route }) => {
  useEffect(() => {
    setTimeout(() => {
      navigate("홈");
    }, 10000);
    reset({
      routes: [{ name: "홈" }],
    });
  });

  return (
    <View style={styles.contain}>
      <Icon name="check-circle" size={100} color="white" />
      <Text style={{ fontSize: 24, color: "white", marginBottom: 20 }}>
        Success!
      </Text>
      <Text style={{ fontSize: 16, color: "white" }}>
        Yey, selecting day and time
      </Text>
      <Text style={{ fontSize: 16, color: "white" }}>
        is submitted successfully!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: "#567DF4",
    alignItems: "center",
    paddingTop: 140,
  },
});

export default Show_Success;
