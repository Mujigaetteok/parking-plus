import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import Icon from "react-native-vector-icons/Ionicons";
import auth from "@react-native-firebase/auth";
import { useIsFocused } from "@react-navigation/native";

const InfoReserve = ({ navigation: { navigate } }) => {
  const uid = auth().currentUser.uid.toString();
  const reserveColl = firestore().collection("RESERVE");
  const [reser, setReser] = useState([]);
  const isFocused = useIsFocused();
  const d = new Date();

  useEffect(() => {
    const reserc = reserveColl
      .where("member_id", "==", uid.toString())
      .where("cncl_status", "==", false)
      .onSnapshot((snapshot) => {
        const reserArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const currentReser = reserArray.filter(
          (re) =>
            d.getMonth() == new Date(re.use_de).getMonth() &&
            d.getDate() <= new Date(re.use_de).getDate()
        );
        currentReser.sort((a, b) => new Date(a.use_de) - new Date(b.use_de));
        setReser(currentReser);
        return () => {
          reserArray();
        };
      });
    return () => {
      reserc();
    };
  }, [isFocused]);

  const delAlert = (id, alertForm) =>
    Alert.alert(
      alertForm,
      "예약을 삭제하시겠습니까?",
      [
        {
          text: "취소",
          style: "default",
        },
        {
          text: "삭제",
          style: "destructive",
          onPress: () => del(id),
        },
      ],
      { cancelable: false }
    );

  const del = async (id) => {
    try {
      const res = await reserveColl
        .doc(id)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.ref.update({ cncl_status: true });
        });
      return () => {
        res();
      };
    } catch (error) {
      console.log(error.message);
    }
  };

  function DatePrint({ day }) {
    const d = day.split("-");
    return (
      <View>
        <Text
          style={{
            fontSize: 15,
            color: "#7B6F72",
          }}
        >
          {d[1]} {d[2]}
        </Text>
      </View>
    );
  }

  function DayPrint({ date }) {
    var week = ["Sun", "Mon", "Tus", "Wen", "Thu", "Fri", "Sat"];
    var day = new Date(date).getDay();
    return (
      <View>
        <Text
          style={{
            fontSize: 12,
            color: "#7B6F72",
          }}
        >
          {week[day]}
        </Text>
      </View>
    );
  }

  function TimePrint({ start, end }) {
    var st = start.toString();
    var en = end.toString();
    if (st.length == 1 || en.length == 1) {
      if (st.length == 1) {
        st = "0" + st;
      }
      if (en.length == 1) {
        en = "0" + en;
      }
    }
    return (
      <Text style={{ color: "#7B6F72", fontSize: 13, marginTop: 4 }}>
        {st}
        {":00"}
        {" ~ "}
        {en}
        {":00"}
      </Text>
    );
  }

  return (
    <ScrollView style={styles.contain}>
      <View style={styles.top}>
        <Text style={styles.textA}>예약 정보</Text>
      </View>
      {reser.length > 0 ? (
        reser.map((r, id) => (
          <View key={id}>
            <View style={styles.infos}>
              <View style={{ flexDirection: "row" }}>
                <ImageBackground
                  source={require("./Image/6.png")}
                  resizeMode="cover"
                  imageStyle={{ borderRadius: 13 }}
                  style={{
                    height: 60,
                    width: 61,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <DatePrint day={r.use_de} />

                  <DayPrint date={r.use_de} />
                </ImageBackground>
                <View
                  style={{
                    justifyContent: "center",
                    marginLeft: 15,
                  }}
                >
                  <Text style={{ color: "#1D1617", fontSize: 15 }}>
                    {r.parking_slot_id}
                  </Text>

                  <TimePrint start={r.start_time} end={r.end_time} />
                </View>
              </View>
              <TouchableOpacity
                onPress={() =>
                  delAlert(reser[id].id, r.use_de + "  " + r.parking_slot_id)
                }
              >
                <Icon name="md-close-outline" color="#7B6F72" size={25} />
              </TouchableOpacity>
            </View>
          </View>
        ))
      ) : (
        <View style={{ alignItems: "center" }}>
          <Text style={styles.textC}>예약 정보가 없습니다</Text>
        </View>
      )}
      {}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  top: {
    height: 100,
    justifyContent: "center",
    marginHorizontal: 10,
    marginBottom: 10,
  },
  textA: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#192342",
  },
  contain: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  info: {
    backgroundColor: "#F3F6FF",
    paddingTop: 20,
    paddingHorizontal: 30,
    marginBottom: 40,
  },
  textB: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 30,
    marginHorizontal: 10,
    color: "#192342",
  },
  textC: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#192342",
  },
  textD: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#192342",
  },
  infos: {
    height: 93,
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 13,
    marginHorizontal: 10,
    marginBottom: 25,
    backgroundColor: "white",
    borderRadius: 25,
    shadowColor: "#EDEDED",
    ...Platform.select({
      ios: {
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 16.0,
      },
      android: {
        elevation: 3,
      },
    }),
  },
});

export default InfoReserve;
