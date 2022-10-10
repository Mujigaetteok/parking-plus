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

function Register2({ navigation: { navigate } }) {
  return (
    <View style={styles.container}>
      <View style={{ flex: 9 }}>
        <View style={styles.top}>
          <Text style={styles.textA}>Enter</Text>
          <Text style={styles.textA}>verification code</Text>
        </View>
        <View style={styles.formArea}>
          <Text style={styles.label}>Verification code</Text>
          <TextInput style={styles.textForm} />
          <Text style={styles.label}></Text>
          <TextInput />
        </View>
        <Text style={styles.textB}>Resend Code</Text>
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.buttonArea}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigate("Join")}
          >
            <Text style={styles.buttonTitle}>Verify</Text>
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
    paddingBottom: 10,
    color: "#192342",
  },
  textForm: {
    backgroundColor: "#F3F6FF",
    width: "100%",
    height: hp("6%"),
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: 5,
    borderRadius: 100,
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

export default Register2;
