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

const Main = ({ navigation: { navigate } }) => {
  const uid = 1;
  const memberColl = firestore().collection("MEMBER");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    memberColl.where("id", "==", uid.toString()).onSnapshot((snapshot) => {
      const memArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setUsers(memArray);
    });
  }, []);
  return (
    <View style={styles.contain}>
      <View style={{ flex: 0.5 }} />
      <View
        style={{
          flex: 5,
          backgroundColor: "white",
          borderRadius: 25,
          borderColor: "#92A3FD",
          shadowColor: "#92A3FD",
          ...Platform.select({
            ios: {
              shadowOffset: { width: 4, height: 4 },
              shadowOpacity: 0.3,
            },
            android: {
              elevation: 7,
            },
          }),
        }}
      >
        <ImageBackground
          source={require("./Image/1.png")}
          resizeMode="cover"
          style={{
            paddingHorizontal: 25,
            flex: 1,
          }}
          imageStyle={{
            borderRadius: 25,
            shadowColor: "gray",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
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
                    borderRadius: 25,
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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "#EEF1FF",
          alignItems: "center",
          paddingHorizontal: 25,

          flex: 2,
          borderRadius: 17,
        }}
      >
        <Text style={{ color: "#1D1617", fontSize: 14 }}>
          3월 배정 신청까지 <Text style={{ fontWeight: "bold" }}>17일</Text>{" "}
          남았습니다!
        </Text>
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
              <Text
                style={{
                  color: "#000000",
                  fontSize: 24,
                  fontWeight: "bold",
                  paddingHorizontal: 25,
                  paddingVertical: 23,
                }}
              >
                MAP
              </Text>
            </TouchableOpacity>
          </ImageBackground>

          <View style={{ flex: 0.3, backgroundColor: "white" }} />
          <TouchableOpacity
            style={{
              flex: 3,
              backgroundColor: "#567DF4",
              borderRadius: 25,
              paddingHorizontal: 15,
            }}
            onPress={() => navigate("Car")}
          >
            <View style={{ flex: 1 }}>
              <Icon3
                name="car"
                color="white"
                size={25}
                style={{ marginVertical: 15 }}
              />
            </View>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text
                style={{ color: "#FFFFFF", fontSize: 18, fontWeight: "bold" }}
              >
                2021 Audi Q3
              </Text>
              <Text style={{ color: "#E2E9FD", fontSize: 16 }}>B 1234 CD</Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View />
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
      <View
        style={{
          flex: 5,
          backgroundColor: "white",
          borderRadius: 25,
          shadowColor: "#EEEEEE",
          ...Platform.select({
            ios: {
              shadowOffset: { width: 5, height: 5 },
              shadowOpacity: 0.4,
            },
            android: {
              elevation: 5,
            },
          }),
          borderColor: "#EEEEEE",
          paddingHorizontal: 25,
          justifyContent: "space-between",
        }}
      >
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ color: "#1D1617", fontWeight: "bold", fontSize: 16 }}>
            Other
          </Text>
        </View>
        <View style={{ flex: 1.5, justifyContent: "center" }}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Icon
                name="envelope-o"
                color="#92A3FD"
                size={18}
                style={{ marginRight: 10 }}
              />
              <Text style={{ color: "#7B6F72", fontSize: 12 }}>공지사항</Text>
            </View>
            <Icon2 name="right" color="#7B6F72" size={15} />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Icon3
                name="shield-check-outline"
                color="#92A3FD"
                size={18}
                style={{ marginRight: 10 }}
              />
              <Text style={{ color: "#7B6F72", fontSize: 12 }}>고객센터</Text>
            </View>
            <Icon2 name="right" color="#7B6F72" size={15} />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Icon2
                name="setting"
                color="#92A3FD"
                size={18}
                style={{ marginRight: 10 }}
              />
              <Text style={{ color: "#7B6F72", fontSize: 12 }}>앱가이드</Text>
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  successLoc: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  text: {
    fontSize: 30,
  },
});

export default Main;
