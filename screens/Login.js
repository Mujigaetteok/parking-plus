import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/Feather";

function Login({ navigation: { navigate } }) {
  return (
    <View style={styles.container}>
      <View style={{ flex: 9 }}>
        <View style={styles.top}>
          <Text style={styles.textA}>Login to</Text>
          <Text style={styles.textA}>your account</Text>
        </View>
        <View style={styles.formArea}>
          <Text style={styles.label}>ID</Text>
          <TextInput style={styles.textForm}>
            <Icon
              name="smartphone"
              color="#677191"
              size={20}
              style={{ marginRight: 15 }}
            />
          </TextInput>
          <Text style={styles.label}>Password</Text>
          <TextInput style={styles.textForm}>
            <Icon
              name="lock"
              color="#677191"
              size={20}
              style={{ marginRight: 15 }}
            />
          </TextInput>
        </View>
        <TouchableOpacity
          onPress={() => navigate("RegisterStack", { screen: "Register1" })}
        >
          <Text style={styles.textB}>계정이 없으신가요?</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.buttonArea}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigate("Root")}
          >
            <Text style={styles.buttonTitle}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 30,
  },
  top: {
    height: 230,
    justifyContent: "center",
  },
  textA: {
    fontSize: 24,
    fontWeight: "bold",
  },
  formArea: {
    width: "100%",
    marginTop: wp("-5%"),
    paddingBottom: wp("40%"),
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    paddingTop: 10,
    paddingBottom: 10,
    color: "#192342",
  },
  textForm: {
    backgroundColor: "#F3F6FF",
    width: "100%",
    height: hp("6%"),
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    flexDirection: "row",
    fontSize: 16,
  },
  buttonArea: {
    width: "100%",
    height: hp("5%"),
  },
  button: {
    backgroundColor: "#567DF4",
    width: "100%",
    height: "140%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  buttonTitle: {
    color: "white",
    fontWeight: "bold",
  },
  icon: {
    margin: wp("10%"),
  },
  textB: {
    marginTop: 40,
    textAlign: "center",
  },
});

export default Login;
