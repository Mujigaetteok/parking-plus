import React, { useRef, useState } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ScrollView } from "react-native-gesture-handler";

function Join({ navigation: { navigate } }) {
  const emailInput = useRef();
  const passwordInput = useRef();
  const phoneInput = useRef();
  const aptInput = useRef();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [aptName, setAptName] = useState("");
  const [dongNo, setDongNo] = useState("");
  const [hosuNo, setHosuNo] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // 이름 입력 후 enter 누르면 Email 칸으로 넘어가게
  const onSubmitNameEditing = () => {
    emailInput.current.focus();
  };
  // Email 입력 후 enter 누르면 Password 칸으로 넘어가게
  const onSubmitEmailEditing = () => {
    passwordInput.current.focus();
  };
  // Password 입력 후 enter 누르면 Phone 칸으로 넘어가게
  const onSubmitPasswordEditing = () => {
    phoneInput.current.focus();
  };
  // Phone 입력 후 enter 누르면 Apt 칸으로 넘어가게
  const onSubmitPhoneEditing = () => {
    aptInput.current.focus();
  };
  const onSubmit = async () => {
    // setLoading(true);
    if (email === "" || password === "") {
      return Alert.alert("Fill in the form.");
    }
    if (loading) {
      return;
    }
    try {
      // 회원가입
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password
      );
      // firestore에 저장
      firestore().collection("MEMBER").add({
        id: auth().currentUser.uid,
        name: name,
        email: email,
        apt_name: aptName,
        dong_no: dongNo,
        hosu_no: hosuNo,
        phone: phone,
      });
      console.log(userCredential);
    } catch (e) {
      switch (e.code) {
        case "auth/weak-password": {
          Alert.alert("더 강력한 비밀번호를 작성하세요!");
        }
      }
    }
  };
  return (
    <View style={styles.container}>
      <View style={{ flex: 9 }}>
        <ScrollView>
          <View style={styles.top}>
            <Text style={styles.textA}>Welcome</Text>
            <Text style={styles.textA}>to Parking Plus</Text>
          </View>
          <View style={styles.formArea}>
            <Text style={styles.label}>이름</Text>
            <TextInput
              placeholder="Name"
              value={name}
              returnKeyType="next"
              style={styles.textForm}
              onChangeText={(text) => setName(text)}
              onSubmitEditing={onSubmitNameEditing}
            >
              {/* <Icon
                name="person"
                color="#677191"
                size={20}
                style={{ marginRight: 15 }}
              /> */}
            </TextInput>
            <Text style={styles.label}>ID</Text>
            <TextInput
              ref={emailInput}
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
              {/* <Icon2
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
              returnKeyType="next"
              style={styles.textForm}
              onChangeText={(text) => setPassword(text)}
              onSubmitEditing={onSubmitPasswordEditing}
            >
              {/* <Icon3
                name="lock"
                color="#677191"
                size={20}
                style={{ marginRight: 15 }}
              /> */}
            </TextInput>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              ref={phoneInput}
              placeholder="01012345678"
              keyboardType="numeric"
              value={phone}
              returnKeyType="next"
              style={styles.textForm}
              onChangeText={(text) => setPhone(text)}
              onSubmitEditing={onSubmitPhoneEditing}
            >
              {/* <Icon3
                name="lock"
                color="#677191"
                size={20}
                style={{ marginRight: 15 }}
              /> */}
            </TextInput>
            <Text style={styles.label}>아파트</Text>
            <TextInput
              ref={aptInput}
              placeholder="파플아파트"
              value={aptName}
              returnKeyType="next"
              style={styles.textForm}
              onChangeText={(text) => setAptName(text)}
            >
              {/* <Icon4
                name="magnifying-glass"
                color="#677191"
                size={20}
                style={{ marginRight: 15 }}
              /> */}
              {/* <TouchableOpacity onPress={() => bottomSheet.current.show()}>
                <Text style={styles.textD}>Search your apartment</Text>
              </TouchableOpacity> */}
            </TextInput>
            {/* <BottomSheet
              hasDraggableIcon
              ref={bottomSheet}
              height={400}
              enabledContentGestureInteraction={false}
              sheetBackgroundColor="white"
            >
              <View>
                <View style={{ marginTop: 20, paddingHorizontal: 30 }}>
                  <ScrollView>
                    <View style={styles.bottomInfo}>
                      <Icon4
                        name="magnifying-glass"
                        color="#677191"
                        size={20}
                        style={{ marginRight: 15 }}
                      />
                      <Text style={styles.textD}>Search your apartment</Text>
                    </View>
                    <TouchableOpacity
                      style={{ flexDirection: "row", marginBottom: 10 }}
                    >
                      <View
                        style={{
                          flexDirection: "column",
                          width: 50,
                          height: 50,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Icon5 name="parking" color="#FF317B" size={20} />
                      </View>
                      <View>
                        <Text style={styles.textE}>파플아파트 1단지</Text>
                        <Text style={styles.textC}>
                          대전시 유성구 대학로 99번길
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </ScrollView>
                </View>
              </View>
            </BottomSheet> */}

            <Text style={styles.label}>주소</Text>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row", flex: 1 }}>
                  <View style={styles.adressInfo}>
                    <TextInput
                      value={dongNo}
                      style={styles.textD}
                      onChangeText={(text) => setDongNo(text)}
                    ></TextInput>
                  </View>
                  <Text style={styles.textC}>동</Text>
                </View>
                <View style={{ flexDirection: "row", flex: 1 }}>
                  <View style={styles.adressInfo}>
                    <TextInput
                      value={hosuNo}
                      style={styles.textD}
                      onChangeText={(text) => setHosuNo(text)}
                    ></TextInput>
                  </View>
                  <Text style={styles.textC}>호</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

      <View style={{ flex: 1 }}>
        <View style={styles.buttonArea}>
          <TouchableOpacity style={styles.button} onPress={onSubmit}>
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonTitle}>가입</Text>
            )}
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
  bottomInfo: {
    backgroundColor: "#F3F6FF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    flexDirection: "row",
    marginBottom: 20,
  },
  adressInfo: {
    backgroundColor: "#F3F6FF",
    borderRadius: 100,
    paddingVertical: 10,
    alignItems: "center",
    flex: 3,
  },
  textB: {
    marginTop: 40,
    textAlign: "center",
  },
  textC: {
    fontSize: 16,
    marginLeft: 10,
    paddingVertical: 10,
    fontWeight: "bold",
    color: "#677191",
    flex: 1,
  },
  textD: {
    fontSize: 16,
    color: "#677191",
  },
  textE: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: "bold",
    color: "#192342",
    flex: 1,
  },
});

export default Join;
