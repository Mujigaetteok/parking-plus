import React, { useRef, useState } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import BottomSheet from "react-native-gesture-bottom-sheet";
import Icon from "react-native-vector-icons/Octicons";
import Icon2 from "react-native-vector-icons/Feather";
import Icon3 from "react-native-vector-icons/Feather";
import Icon4 from "react-native-vector-icons/Entypo";
import Icon5 from "react-native-vector-icons/FontAwesome5";

const Register4 = ({ navigation: { navigate } }) => {
  const bottomSheet = useRef();

  return (
    <ScrollView style={styles.contain}>
      <View style={styles.top}>
        <Text style={styles.textA}>Welcome to Parking Plus</Text>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.textB}>이름</Text>
        <View style={styles.info}>
          <Icon
            name="person"
            color="#677191"
            size={20}
            style={{ marginRight: 15 }}
          />
          <TextInput style={styles.textD}></TextInput>
        </View>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.textB}>ID</Text>
        <View style={styles.info}>
          <Icon2
            name="smartphone"
            color="#677191"
            size={20}
            style={{ marginRight: 15 }}
          />
          <TextInput style={styles.textD}></TextInput>
        </View>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.textB}>Password</Text>
        <View style={styles.info}>
          <Icon3
            name="lock"
            color="#677191"
            size={20}
            style={{ marginRight: 15 }}
          />
          <TextInput style={styles.textD}></TextInput>
        </View>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.textB}>아파트</Text>
        <View style={styles.info}>
          <Icon4
            name="magnifying-glass"
            color="#677191"
            size={20}
            style={{ marginRight: 15 }}
          />
          <BottomSheet
            hasDraggableIcon
            ref={bottomSheet}
            height={400}
            enabledContentGestureInteraction={false}
            sheetBackgroundColor="white"
          >
            <View style={styles.bottomContain}>
              <View style={{ flex: 9, marginBottom: 20 }}>
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
                  <Text style={styles.textB}>RESULT</Text>
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
          <TouchableOpacity onPress={() => bottomSheet.current.show()}>
            <Text style={styles.textD}>Search your apartment</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.textB}>주소</Text>
        <View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
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
              <TextInput style={styles.textC}>호</TextInput>
            </View>
          </View>
        </View>
      </View>
      <View style={{ flex: 1 }} />
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigate("Login")}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>가입</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  top: {
    height: 100,
    justifyContent: "center",
  },
  textA: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#192342",
  },
  contain: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 30,
  },
  bottomContain: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 30,
    marginTop: 20,
  },
  info: {
    backgroundColor: "#F3F6FF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    flexDirection: "row",
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
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: "center",
    flex: 3,
  },
  textB: {
    fontSize: 14,
    fontWeight: "bold",
    paddingBottom: 10,
    color: "#192342",
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
  button: {
    backgroundColor: "#567DF4",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    marginTop: 60,
    marginBottom: 20,
  },
});

export default Register4;
