import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import Icon from "react-native-vector-icons/AntDesign";
import { useIsFocused } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";

const InfoAssign = ({ navigation: { navigate } }) => {
  const uid = auth().currentUser.uid.toString();
  const assignColl = firestore().collection("ASSIGN");
  const mon = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const form = year + "-" + (mon < 10 ? "0" + mon : mon) + "-" + "01";
  const [assigns, setAssigns] = useState([]);
  const [assignBe, setAssignBe] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    setAssigns([]);
    const rows = assignColl
      .where("member_id", "==", uid.toString())
      .where("start_de", "==", form)
      .where("cncl_status", "==", false);
    var ass = [];
    const rc = rows.onSnapshot((snapshot) => {
      const assc = snapshot.docs.map((doc) => {
        const asc = assignColl
          .doc(doc.id)
          .collection("ASSIGN_SCHEDULE")
          .onSnapshot((snap) => {
            const assign = snap.docs.map((d) => ({
              id: d.id,
              did: doc.id,
              slot: doc.data().parking_slot_id,
              start_de: doc.data().start_de,
              day_id: d.data().day_id,
              use_day: d.data().use_day,
              start_time: d.data().start_time,
              end_time: d.data().end_time,
            }));

            assign.sort((a, b) => a.day_id - b.day_id);

            if (assign.length > 0) {
              ass.push(assign);
            }

            setAssigns(JSON.parse(JSON.stringify(ass)));
          });

        return () => {
          asc();
        };
      });
      return () => {
        assc();
      };
    });

    return () => {
      rc();
    };
  }, [isFocused]);

  useEffect(() => {
    setAssignBe([]);
    const rows = assignColl
      .where("member_id", "==", uid.toString())
      .where("cncl_status", "==", false);
    var assn = [];
    const rc = rows.onSnapshot((snapshot) => {
      const assc = snapshot.docs.map((doc) => {
        const asc = assignColl
          .doc(doc.id)
          .collection("ASSIGN_SCHEDULE")
          .onSnapshot((snap) => {
            const assign = snap.docs.map((d) => ({
              id: d.id,
              did: doc.id,
              slot: doc.data().parking_slot_id,
              start_de: doc.data().start_de,
              day_id: d.data().day_id,
              use_day: d.data().use_day,
              start_time: d.data().start_time,
              end_time: d.data().end_time,
            }));

            assign.sort((a, b) => a.day_id - b.day_id);
            if (
              assign.length > 0 &&
              new Date(doc.data().start_de) < new Date(form)
            ) {
              assn.push(assign);
            }
            assn.sort(
              (a, b) => new Date(b[0].start_de) - new Date(a[0].start_de)
            );

            setAssignBe(JSON.parse(JSON.stringify(assn)));
          });
        return () => {
          asc();
        };
      });
      return () => {
        assc();
      };
    });
    return () => {
      rc();
    };
  }, [isFocused]);

  function PrintWeek({ p }) {
    var ar = [];
    for (var i = 0; i < p.length; i++) {
      ar.push(p[i].use_day);
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

  function YearPrint({ day }) {
    const d = day.split("-");
    return (
      <View>
        <Text
          style={{
            fontSize: 12,
            color: "#7B6F72",
          }}
        >
          {d[0]}
        </Text>
      </View>
    );
  }

  function MonthPrint({ day }) {
    const d = day.split("-");
    return (
      <View>
        <Text
          style={{
            fontSize: 15,
            color: "#7B6F72",
            fontWeight: "bold",
          }}
        >
          {d[1]}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.contain}>
      <View style={styles.top}>
        <Text style={styles.textA}>배정 정보</Text>
      </View>
      <Text style={styles.textB}>현재 배정내역</Text>
      {assigns.length > 0 ? (
        assigns.map((as, id) => (
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
                  <YearPrint day={as[0].start_de} />
                  <MonthPrint day={as[0].start_de} />
                </ImageBackground>
                <View
                  style={{
                    justifyContent: "center",
                    marginLeft: 15,
                  }}
                >
                  <Text
                    style={{
                      color: "#1D1617",
                      fontSize: 15,
                    }}
                  >
                    {as[0].slot}
                  </Text>
                  <PrintWeek p={as} />
                </View>
              </View>
              <TouchableOpacity
                onPress={() =>
                  navigate("Assignment2", {
                    slot: as[0].slot,
                    did: as[0].did,
                    year: as[0].start_de.split("-")[0],
                    monf: as[0].start_de.split("-")[1],
                    status: true,
                  })
                }
              >
                <Icon name="rightcircleo" color="#ADA4A5" size={24} />
              </TouchableOpacity>
            </View>
          </View>
        ))
      ) : (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.textD}>배정 정보가 없습니다</Text>
        </View>
      )}
      <View style={{ height: 35 }} />
      <Text style={styles.textB}>과거 배정내역</Text>
      {assignBe.length > 0 ? (
        assignBe.map((as, id) => (
          <View key={id}>
            <View style={styles.info}>
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    backgroundColor: "#F5F8F8",
                    height: 60,
                    width: 61,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 13,
                  }}
                >
                  <YearPrint day={as[0].start_de} />
                  <MonthPrint day={as[0].start_de} />
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    marginLeft: 15,
                  }}
                >
                  <Text style={{ color: "#1D1617", fontSize: 15 }}>
                    {as[0].slot}
                  </Text>
                  <PrintWeek p={as} />
                </View>
              </View>
              <TouchableOpacity
                onPress={() =>
                  navigate("Assignment2", {
                    slot: as[0].slot,
                    did: as[0].did,
                    year: as[0].start_de.split("-")[0],
                    monf: as[0].start_de.split("-")[1],
                    status: false,
                  })
                }
              >
                <Icon name="rightcircleo" color="#ADA4A5" size={24} />
              </TouchableOpacity>
            </View>
          </View>
        ))
      ) : (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.textD}>과거 배정 정보가 없습니다</Text>
        </View>
      )}
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
    height: 63,
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    marginHorizontal: 10,
    marginBottom: 20,
  },
  textB: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 25,
    marginHorizontal: 10,
    color: "#192342",
  },
  textC: {
    fontSize: 15,
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
    shadowColor: "#000000",
    ...Platform.select({
      ios: {
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 16.0,
      },
      android: {
        elevation: 2,
      },
    }),
  },
});
export default InfoAssign;
