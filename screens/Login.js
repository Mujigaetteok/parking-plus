import React, { useRef, useState } from "react";
import auth from "@react-native-firebase/auth";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/Feather";

function Login({ navigation: { navigate } }) {
  const passwordInput = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Email 입력 후 enter 누르면 Password 칸으로 넘어가게
  const onSubmitEmailEditing = () => {
    passwordInput.current.focus();
  };
  const onSubmitPasswordEditing = async () => {
    if (email === "" || password === "") {
      return Alert.alert("Fill in the form.");
    }
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password
      );
      console.log(userCredential);
    } catch (e) {
      switch (e.code) {
        case "auth/user-not-found": {
          Alert.alert("찾을 수 없는 이메일이네요 :(");
        }
        case "auth/wrong-password": {
          Alert.alert("비밀번호를 다시 입력하세요!");
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 9 }}>
        <View style={styles.top}>
          <Text style={styles.textA}>Login to</Text>
          <Text style={styles.textA}>your account</Text>
        </View>
        <View style={styles.formArea}>
          <Text style={styles.label}>ID</Text>
          <TextInput
            placeholder="Email"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            value={email}
            returnKeyType="next"
            style={styles.textForm}
            onChangeText={(text) => setEmail(text)}
            onSubmitEditing={onSubmitEmailEditing}
          >
            {/* <Icon
              name="smartphone"
              color="#677191"
              size={20}
              style={{ marginRight: 15 }}
            /> */}
          </TextInput>
          <Text style={styles.label}>Password</Text>
          <TextInput
            ref={passwordInput}
            placeholder="6자리 이상 입력해주세요"
            secureTextEntry
            value={password}
            returnKeyType="done"
            style={styles.textForm}
            onChangeText={(text) => setPassword(text)}
          >
            {/* <Icon
              name="lock"
              color="#677191"
              size={20}
              style={{ marginRight: 15 }}
            /> */}
          </TextInput>
        </View>
        <TouchableOpacity onPress={() => navigate("Join")}>
          <Text style={styles.textB}>계정이 없으신가요?</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.buttonArea}>
          <TouchableOpacity
            style={styles.button}
            // onPress={() => navigate("Root")}
            onPress={onSubmitPasswordEditing}
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
