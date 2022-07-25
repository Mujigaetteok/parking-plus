import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const Show_Success = ({ navigation: { navigate, reset } }) => {
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
          marginBottom: 20,
        }}
      >
        Success!
      </Text>

      <Text style={{ fontSize: 16, color: "white" }}>
        Yey, selecting day and time
      </Text>
      <Text style={{ fontSize: 16, color: "white" }}>
        is submitted successfully!
      </Text>
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
});

export default Show_Success;
