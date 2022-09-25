import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, ScrollView, Button } from "react-native";
import firestore from "@react-native-firebase/firestore";

const InfoAssign = ({ navigation }) => {
  const uid = 1;
  const assignColl = firestore().collection("ASSIGN");
  const mon = new Date().getMonth() + 2;
  const year = new Date().getFullYear();
  const form = year + "-" + (mon < 10 ? "0" + mon : mon) + "-" + "01";
  const [assigns, setAssigns] = useState([]);

  useEffect(() => {
    setAssigns([]);
    const rows = assignColl
      .where("member_id", "==", uid.toString())
      .where("start_de", "==", form)
      .where("cncl_status", "==", false);
    var ass = [];
    rows.onSnapshot((snapshot) => {
      snapshot.docs.map((doc) =>
        assignColl
          .doc(doc.id)
          .collection("ASSIGN_SCHEDULE")
          .onSnapshot((snap) => {
            const assign = snap.docs.map((d) => ({
              id: d.id,
              slot: doc.data().parking_slot_id,
              day_id: d.data().day_id,
              use_day: d.data().use_day,
              start_time: d.data().start_time,
              end_time: d.data().end_time,
            }));
            assign.sort((a, b) => a.start_time - b.start_time);

            //
            var i = 0;
            var ar = []; //start_time slice위치
            for (i = 0; i < assign.length - 1; i++) {
              if (assign[i].start_time != assign[i + 1].start_time) {
                ar.push(i + 1);
              }
            }
            var arr = []; // start_time으로 slice
            var slic = [...assign];
            if (ar.length >= 1) {
              for (var j = 0; j < ar.length; j++) {
                if (j == ar.length - 1) {
                  if (slic.slice(0, ar[j] - ar[j - 1]).length != 0) {
                    arr.push(slic.slice(0, ar[j] - ar[j - 1]));
                  }

                  slic = slic.slice(ar[j] - ar[j - 1], slic.length);
                  if (slic.length != 0) {
                    arr.push(slic);
                  }
                } else if (j == 0) {
                  if (slic.slice(0, ar[j]).length != 0) {
                    arr.push(slic.slice(0, ar[j]));
                  }

                  slic = slic.slice(ar[j], slic.length);
                } else {
                  if (slic.slice(0, ar[j] - ar[j - 1]).length != 0) {
                    arr.push(slic.slice(0, ar[j] - ar[j - 1]));
                  }

                  slic = slic.slice(ar[j] - ar[j - 1], slic.length);
                }
              }
            } else {
              arr.push(slic);
            }

            for (var j = 0; j < arr.length; j++) {
              arr[j].sort((a, b) => a.end_time - b.end_time);
            }
            var endSlice = []; // end_time 으로 slice
            for (var j = 0; j < arr.length; j++) {
              var ind = []; // end_time slice 위치
              var spli = [];
              for (var p = 0; p < arr[j].length - 1; p++) {
                if (arr[j][p].end_time != arr[j][p + 1].end_time) {
                  ind.push(p + 1);
                }
              }
              spli = arr[j];
              if (ind.length >= 1) {
                for (var p = 0; p < arr[j].length; p++) {
                  if (p == arr[j].length - 1) {
                    const b = spli.slice(0, ind[p] - ind[p - 1]);
                    if (b.length != 0) endSlice.push(b);
                    spli = spli.slice(ind[p] - ind[p - 1], spli.length);
                    if (spli.length != 0) {
                      endSlice.push(spli);
                    }
                  } else if (p == 0) {
                    const a = spli.slice(0, ind[p]);
                    if (a.length != 0) endSlice.push(a);
                    spli = spli.slice(ind[p], spli.length);
                  } else {
                    const c = spli.slice(0, ind[p] - ind[p - 1]);
                    if (c.length != 0) endSlice.push(c);
                    spli = spli.slice(ind[p] - ind[p - 1], spli.length);
                  }
                }
              } else {
                endSlice.push(spli);
              }
            }

            var resul = [];
            for (var k = 0; k < endSlice.length; k++) {
              var useD = [];
              endSlice[k].sort((a, b) => a.day_id - b.day_id);

              for (var h = 0; h < endSlice[k].length; h++) {
                useD.push(endSlice[k][h].use_day);
              }

              const day = useD.join(", ");

              day != ""
                ? resul.push({
                    slot: endSlice[k][0].slot,
                    use_day: day,
                    start_time: endSlice[k][0].start_time,
                    end_time: endSlice[k][0].end_time,
                  })
                : null;
            }

            if (resul.length != 0) {
              ass.push(resul);
            }

            setAssigns(JSON.parse(JSON.stringify(ass)));
          })
      );
    });
  }, []);

  function Print({ p }) {
    return (
      <View>
        <View style={{ paddingBottom: 20 }}>
          <Text style={styles.textC}>
            {"Day    :  "}
            {p.use_day}
          </Text>
        </View>
        <Text style={styles.textC}>
          {"Time   :  "}
          {p.start_time}
          {":00"}
          {" ~ "}
          {p.end_time}
          {":00"}
        </Text>
      </View>
    );
  }

  const arra = (d) => {
    var len = [];
    for (var g = 0; g < d; g++) {
      len.push(g);
    }
    return len;
  };

  return (
    <ScrollView style={styles.contain}>
      <View style={styles.top}>
        <Text style={styles.textA}>배정 정보</Text>
      </View>
      {assigns.length > 0 ? (
        assigns.map((as, id) => (
          <View key={id}>
            <Text style={styles.textB}>
              {"배정구역 "}
              {as[0].slot}
            </Text>
            <View style={{ marginBottom: 30 }}>
              {arra(as.length).map((val, idn) => (
                <View style={styles.info} key={idn}>
                  <Print key={idn} p={as[val]} />
                </View>
              ))}
            </View>
          </View>
        ))
      ) : (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.textD}>배정 정보가 없습니다</Text>
        </View>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  top: {
    height: 100,
    paddingLeft: 30,
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
  },
  info: {
    backgroundColor: "#F3F6FF",
    paddingVertical: 15,
    paddingLeft: 30,
    marginBottom: 20,
  },
  textB: {
    fontSize: 20,
    paddingLeft: 30,
    fontWeight: "bold",
    marginBottom: 10,
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
});
export default InfoAssign;
