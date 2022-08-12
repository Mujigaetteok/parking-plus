import React from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const Success = ({ navigation: { navigate, reset }, route }) => {
  const Home = () => {
    navigate("홈");
    reset({
      routes: [{ name: "홈" }],
    });
  };

  return (
    <TouchableOpacity onPress={() => Home()} style={styles.contain}>
      <Icon name="check-circle" size={100} color="white" />
      <Text
        style={{
          fontSize: 24,
          color: "white",
        }}
      >
        Success!
      </Text>
      <Text style={{ fontSize: 16 }} />
      <Text style={styles.text}>{route.params.text}</Text>
      <Text style={styles.text}>완료되었습니다!</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: "#567DF4",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    color: "white",
  },
});

export default Success;
