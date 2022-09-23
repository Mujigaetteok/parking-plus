import React, { useRef, useState } from "react";
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
import BottomSheet from "react-native-gesture-bottom-sheet";
import Icon from "react-native-vector-icons/Octicons";
import Icon2 from "react-native-vector-icons/Feather";
import Icon3 from "react-native-vector-icons/Feather";
import Icon4 from "react-native-vector-icons/Entypo";
import Icon5 from "react-native-vector-icons/FontAwesome5";
import { ScrollView } from "react-native-gesture-handler";

function Register4({ navigation: { navigate } }) {
  const bottomSheet = useRef();

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
            <TextInput style={styles.textForm}>
              <Icon
                name="person"
                color="#677191"
                size={20}
                style={{ marginRight: 15 }}
              />
            </TextInput>
            <Text style={styles.label}>ID</Text>
            <TextInput style={styles.textForm}>
              <Icon2
                name="smartphone"
                color="#677191"
                size={20}
                style={{ marginRight: 15 }}
              />
            </TextInput>
            <Text style={styles.label}>Password</Text>
            <TextInput style={styles.textForm}>
              <Icon3
                name="lock"
                color="#677191"
                size={20}
                style={{ marginRight: 15 }}
              />
            </TextInput>
            <Text style={styles.label}>아파트</Text>
            <Text style={styles.textForm}>
              <Icon4
                name="magnifying-glass"
                color="#677191"
                size={20}
                style={{ marginRight: 15 }}
              />
              <TouchableOpacity onPress={() => bottomSheet.current.show()}>
                <Text style={styles.textD}>Search your apartment</Text>
              </TouchableOpacity>
            </Text>
            <BottomSheet
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
            </BottomSheet>

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
                    <TextInput style={styles.textD}></TextInput>
                  </View>
                  <Text style={styles.textC}>동</Text>
                </View>
                <View style={{ flexDirection: "row", flex: 1 }}>
                  <View style={styles.adressInfo}>
                    <Text style={styles.textD}></Text>
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
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigate("Login")}
          >
            <Text style={styles.buttonTitle}>가입</Text>
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

export default Register4;
