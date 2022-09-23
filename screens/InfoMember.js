import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, ScrollView, Button } from "react-native";
import Icon from "react-native-vector-icons/Octicons";
import Icon2 from "react-native-vector-icons/Feather";
import Icon3 from "react-native-vector-icons/Ionicons";
import firestore from "@react-native-firebase/firestore";

const InfoMember = ({ navigation: { navigate } }) => {
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
    <ScrollView style={styles.contain}>
      <View style={styles.top}>
        <Text style={styles.textA}>개인 정보</Text>
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
          {users.map((user, id) => (
            <Text style={styles.textD} key={id}>
              {user.name}
            </Text>
          ))}
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
          {users.map((user, id) => (
            <Text style={styles.textD} key={id}>
              {user.phone}
            </Text>
          ))}
        </View>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.textB}>아파트</Text>
        <View style={styles.info}>
          <Icon3
            name="location-outline"
            color="#677191"
            size={20}
            style={{ marginRight: 15 }}
          />
          {users.map((user, id) => (
            <Text style={styles.textD} key={id}>
              {user.apt_name}
            </Text>
          ))}
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
                {users.map((user, id) => (
                  <Text style={styles.textD} key={id}>
                    {user.dong_no}
                  </Text>
                ))}
              </View>
              <Text style={styles.textC}>동</Text>
            </View>
            <View style={{ flexDirection: "row", flex: 1 }}>
              <View style={styles.adressInfo}>
                {users.map((user, id) => (
                  <Text style={styles.textD} key={id}>
                    {user.hosu_no}
                  </Text>
                ))}
              </View>
              <Text style={styles.textC}>호</Text>
            </View>
          </View>
        </View>
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
  info: {
    backgroundColor: "#F3F6FF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    flexDirection: "row",
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
});
export default InfoMember;
