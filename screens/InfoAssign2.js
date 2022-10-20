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
import Icon from "react-native-vector-icons/EvilIcons";
import Icon2 from "react-native-vector-icons/Ionicons";
import { useIsFocused } from "@react-navigation/native";

const InfoAssign2 = ({ navigation: { navigate }, route }) => {
  const assignColl = firestore().collection("ASSIGN");
  const [assign, setAssign] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const asc = assignColl
      .doc(route.params.did)
      .collection("ASSIGN_SCHEDULE")
      .onSnapshot((snap) => {
        const ass = snap.docs.map((d) => ({
          id: d.id,
          day_id: d.data().day_id,
          use_day: d.data().use_day,
          start_time: d.data().start_time,
          end_time: d.data().end_time,
        }));
        ass.sort((a, b) => a.day_id - b.day_id);
        setAssign(ass);
        return () => {
          ass();
        };
      });
    return () => {
      asc();
    };
  }, [isFocused]);

  const delAlert = (did, id, alertForm) =>
    Alert.alert(
      alertForm,
      "배정을 삭제하시겠습니까?",
      [
        {
          text: "취소",
          style: "default",
        },
        {
          text: "삭제",
          style: "destructive",
          onPress: () => {
            del(did, id), cnc(did);
          },
        },
      ],
      { cancelable: false }
    );

  const del = async (did, id) => {
    try {
      await assignColl.doc(did).collection("ASSIGN_SCHEDULE").doc(id).delete();
    } catch (error) {
      console.log(error.message);
    }
  };

  const cnc = async (did) => {
    const asc = await assignColl
      .doc(did)
      .collection("ASSIGN_SCHEDULE")
      .onSnapshot((snap) => {
        snap.size == 0
          ? assignColl
              .doc(did)
              .get()
              .then(function (querySnapshot) {
                querySnapshot.ref.update({ cncl_status: true });
              })
          : null;
      });
    return () => {
      asc();
    };
  };

  function PrintWeek() {
    var ar = [];
    for (var i = 0; i < assign.length; i++) {
      ar.push(assign[i].use_day);
    }
    const we = ar.join(", ");
    return (
      <View>
        <Text style={{ color: "#7B6F72", fontSize: 13, marginTop: 4 }}>
          {we}
        </Text>
      </View>
    );
  }

  function Print({ p }) {
    var st = p.start_time.toString();
    var en = p.end_time.toString();
    if (st.length == 1) {
      st = "0" + st;
    }
    if (en.length == 1) {
      en = "0" + en;
    }
    const alertForm = p.use_day + "요일  " + st + ":00 ~" + en + ":00";
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingBottom: 17,
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon name="clock" color="#7B6F72" size={35} />
          <Text style={{ ...styles.textC, marginHorizontal: 18 }}>
            {p.use_day}
            {"   |   "}
            {st}
            {":00"}
            {" ~ "}
            {en}
            {":00"}
          </Text>
        </View>
        {route.params.status ? (
          <TouchableOpacity
            onPress={() => delAlert(route.params.did, p.id, alertForm)}
          >
            <Icon2 name="md-close-outline" color="#7B6F72" size={25} />
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }

  return (
    <ScrollView style={styles.contain}>
      <View style={styles.top}>
        <Text style={styles.textA}>배정 정보</Text>
      </View>
      <Text style={styles.textB}>현재 배정내역</Text>
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
            <Text
              style={{
                fontSize: 12,
                color: "#7B6F72",
              }}
            >
              {route.params.year}
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: "#7B6F72",
                fontWeight: "bold",
              }}
            >
              {route.params.monf}
            </Text>
          </ImageBackground>
          <View
            style={{
              justifyContent: "center",
              marginLeft: 15,
            }}
          >
            <Text style={{ color: "#1D1617", fontSize: 15 }}>
              {route.params.slot}
            </Text>
            <PrintWeek />
          </View>
        </View>
      </View>
      <View style={{ height: 35 }} />
      <Text style={styles.textB}>이용상세시각</Text>
      <View style={styles.info}>
        {assign.map((as, idn) => (
          <View key={idn}>
            <Print p={as} />
          </View>
        ))}
      </View>
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
    paddingHorizontal: 20,
  },
  textB: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 25,
    marginHorizontal: 10,
    color: "#192342",
  },
  textC: {
    fontSize: 16,
    color: "#7B6F72",
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
    marginBottom: 20,
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
export default InfoAssign2;
