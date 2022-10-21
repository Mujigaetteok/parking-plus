import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/AntDesign";
import Icon3 from "react-native-vector-icons/MaterialCommunityIcons";
import Icon4 from "react-native-vector-icons/Ionicons";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { useIsFocused } from "@react-navigation/native";

const Main = ({ navigation: { navigate } }) => {
  const uid = auth().currentUser.uid.toString();
  const memberColl = firestore().collection("MEMBER");
  const carColl = firestore().collection("CAR");
  const isFocused = useIsFocused();
  const [users, setUsers] = useState([]);
  const [carN, setCarN] = useState();
  const [car, setCar] = useState();
  const d = new Date();

  useEffect(() => {
    memberColl.where("id", "==", uid.toString()).onSnapshot((snapshot) => {
      const memArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setUsers(memArray);
    });
  }, [isFocused]);

  function Dday() {
    let diff;
    if (endDate(0) < d) {
      diff = startDate(1) - d;
      return (
        <Text style={{ color: "#1D1617", fontSize: 14 }}>
          {startDate(1).getMonth() + 1}월 배정 신청까지{" "}
          <Text style={{ fontWeight: "bold" }}>
            {Math.floor(diff / (1000 * 60 * 60 * 24))}
          </Text>
          일 남았습니다!
        </Text>
      );
    }
    if (startDate(0).getDate() > d.getDate()) {
      diff = startDate(0) - d;
      return (
        <Text style={{ color: "#1D1617", fontSize: 14 }}>
          {startDate(0).getMonth() + 1}월 배정 신청까지{" "}
          <Text style={{ fontWeight: "bold" }}>
            {Math.floor(diff / (1000 * 60 * 60 * 24))}
          </Text>
          일 남았습니다!
        </Text>
      );
    } else if (startDate(0).getDate() == d.getDate()) {
      diff = startDate(1) - d;
      return (
        <Text style={{ color: "#1D1617", fontSize: 14 }}>
          {startDate(1).getMonth() + 1}월 배정 신청{" "}
          <Text style={{ fontWeight: "bold" }}>첫째날</Text>
          입니다!
        </Text>
      );
    } else if (endDate(0).getDate() == d.getDate()) {
      diff = startDate(1) - d;
      return (
        <Text style={{ color: "#1D1617", fontSize: 14 }}>
          {startDate(0).getMonth() + 1}월 배정 신청{" "}
          <Text style={{ fontWeight: "bold" }}>마지막날</Text>
          입니다!
        </Text>
      );
    } else if (
      startDate(0).getDate() < d.getDate() &&
      endDate(0) > d.getDate()
    ) {
      diff = endDate(0) - d;
      return (
        <Text style={{ color: "#1D1617", fontSize: 14 }}>
          {startDate(0).getMonth() + 1}월 배정 신청 종료까지{" "}
          <Text style={{ fontWeight: "bold" }}>
            {Math.floor(diff / (1000 * 60 * 60 * 24))}
          </Text>
          일 남았습니다!
        </Text>
      );
    }
  }

  useEffect(() => {
    carColl.onSnapshot((snapshot) => {
      const carArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const currentCar = carArray.filter((car) => car.member_id == uid);
      setCarN(currentCar.length.toString());
      if (currentCar.length != 0) {
        setCar(currentCar[0].idnt_no.toString());
      }
    });
  }, [isFocused]);

  const startDate = (n) => {
    const last = new Date(
      new Date(new Date().setMonth(d.getMonth() + 1 + n)).setDate(0)
    );
    const lastDay = new Date(last.setDate(last.getDate() - 13));
    return lastDay;
  };

  const endDate = (n) => {
    const last = new Date(
      new Date(new Date().setMonth(d.getMonth() + 1 + n)).setDate(0)
    );
    const lastDay = new Date(last.setDate(last.getDate() - 7));
    return lastDay;
  };

  return (
    <View style={styles.contain}>
      <View style={{ flex: 0.5 }} />
      <View style={styles.top}>
        <ImageBackground
          source={require("./Image/1.png")}
          resizeMode="cover"
          style={{
            paddingHorizontal: 25,
            flex: 1,
          }}
          imageStyle={{
            borderRadius: 25,
          }}
        >
          <View style={{ flex: 1 }}>
            <View style={{ flex: 0.5 }} />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ flex: 1, justifyContent: "center" }}>
                {users.map((user, id) => (
                  <View key={id}>
                    <Text
                      style={{
                        color: "#FFFFFF",
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      {user.name}
                      {"님"}
                    </Text>
                    <Text style={{ color: "#FFFFFF", fontSize: 13 }}>
                      {user.apt_name} {user.dong_no}
                      {"동 "}
                      {user.hosu_no}
                      {"호"}
                    </Text>
                  </View>
                ))}
              </View>
              <Icon4
                name="person-circle"
                color="white"
                size={55}
                style={{ marginRight: 10 }}
              />
            </View>

            <View style={{ flex: 1, justifyContent: "center" }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <ImageBackground
                  source={require("./Image/2.png")}
                  resizeMode="cover"
                  style={{
                    paddingHorizontal: 20,
                  }}
                  imageStyle={{
                    borderRadius: 30,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() => navigate("Mem")}
                  >
                    <Text style={{ color: "#FFFFFF", fontSize: 11 }}>
                      View More
                    </Text>
                  </TouchableOpacity>
                </ImageBackground>
              </View>
            </View>
            <View style={{ flex: 0.8 }} />
          </View>
        </ImageBackground>
      </View>
      <View style={{ flex: 1 }} />
      <View style={styles.form}>
        <Dday />
        <ImageBackground
          source={require("./Image/5.png")}
          resizeMode="cover"
          imageStyle={{ borderRadius: 15 }}
          style={{
            height: 27,
            width: 70,
          }}
        >
          <TouchableOpacity
            onPress={() => navigate("배정 신청")}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#FFFFFF", fontSize: 12 }}>Go</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
      <View style={{ flex: 1, backgroundColor: "white" }} />
      <View style={{ flex: 7 }}>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <ImageBackground
            source={require("./Image/4.png")}
            resizeMode="cover"
            imageStyle={{ borderRadius: 25 }}
            style={{ flex: 5 }}
          >
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => navigate("주차장 지도")}
            >
              <Text style={styles.mapT}>MAP</Text>
            </TouchableOpacity>
          </ImageBackground>

          <View style={{ flex: 0.3, backgroundColor: "white" }} />
          <TouchableOpacity style={styles.carV} onPress={() => navigate("Car")}>
            <View style={{ flex: 1 }}>
              <Icon3
                name="car"
                color="white"
                size={25}
                style={{ marginVertical: 15 }}
              />
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
              {carN == 0 ? (
                <Text style={styles.carText}>차량 없음</Text>
              ) : carN == 1 ? (
                <Text style={styles.carText}>{car}</Text>
              ) : (
                <Text style={styles.carText}>
                  {car}
                  {" 외 "}
                  {carN - 1}
                </Text>
              )}

              <Text style={{ color: "#E2E9FD", fontSize: 15 }}>차량정보</Text>
            </View>
            <View style={styles.otherV}>
              <View>
                <Text style={{ color: "#FFFFFF", fontSize: 13 }}>
                  View More
                </Text>
              </View>
              <Icon2
                name="checksquare"
                color="white"
                size={20}
                style={{ marginHorizontal: 10, marginVertical: 15 }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 1, backgroundColor: "white" }} />
      <View style={styles.bottom}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ color: "#1D1617", fontWeight: "bold", fontSize: 16 }}>
            Other
          </Text>
        </View>
        <View style={{ flex: 1.5, justifyContent: "center" }}>
          <View style={styles.otherV}>
            <View style={{ flexDirection: "row" }}>
              <Icon
                name="envelope-o"
                color="#92A3FD"
                size={18}
                style={{ marginRight: 10 }}
              />
              <Text style={styles.otherT}>공지사항</Text>
            </View>
            <Icon2 name="right" color="#7B6F72" size={15} />
          </View>
          <View style={styles.otherV}>
            <View style={{ flexDirection: "row" }}>
              <Icon3
                name="shield-check-outline"
                color="#92A3FD"
                size={18}
                style={{ marginRight: 10 }}
              />
              <Text style={styles.otherT}>고객센터</Text>
            </View>
            <Icon2 name="right" color="#7B6F72" size={15} />
          </View>
          <View style={styles.otherV}>
            <View style={{ flexDirection: "row" }}>
              <Icon2
                name="setting"
                color="#92A3FD"
                size={18}
                style={{ marginRight: 10 }}
              />
              <Text style={styles.otherT}>앱가이드</Text>
            </View>
            <Icon2 name="right" color="#7B6F72" size={15} />
          </View>
        </View>
        <View style={{ flex: 0.3 }} />
      </View>
      <View style={{ flex: 2 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 15,
  },
  carText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
  },
  top: {
    flex: 5,
    backgroundColor: "white",
    borderRadius: 25,
    borderColor: "#92A3FD",
    shadowColor: "#000000",
    ...Platform.select({
      ios: {
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 16.0,
      },
      android: {
        elevation: 7,
      },
    }),
  },
  bottom: {
    flex: 5,
    backgroundColor: "white",
    borderRadius: 25,
    shadowColor: "#000000",
    ...Platform.select({
      ios: {
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 16.0,
      },
      android: {
        elevation: 5,
      },
    }),
    borderColor: "#EEEEEE",
    paddingHorizontal: 25,
    justifyContent: "space-between",
  },
  form: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#EEF1FF",
    alignItems: "center",
    paddingHorizontal: 25,

    flex: 2,
    borderRadius: 17,
  },
  otherT: { color: "#7B6F72", fontSize: 12 },
  otherV: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mapT: {
    color: "#000000",
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: 25,
    paddingVertical: 23,
  },
  carV: {
    flex: 3,
    backgroundColor: "#567DF4",
    borderRadius: 25,
    paddingHorizontal: 15,
  },
});

export default Main;
