import React, { useRef, useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import BottomSheet from "react-native-gesture-bottom-sheet";
import Icon from "react-native-vector-icons/Ionicons";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { useIsFocused } from "@react-navigation/native";

const InfoCar = ({ navigation: { navigate } }) => {
  const uid = auth().currentUser.uid.toString();
  const carColl = firestore().collection("CAR");
  const [cars, setCars] = useState([]);
  const [car, setCar] = useState("");
  const isFocused = useIsFocused();

  useEffect(() => {
    const carc = carColl
      .where("member_id", "==", uid.toString())
      .onSnapshot((snapshot) => {
        const carArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCars(carArray);
        return () => {
          carArray();
        };
      });
    return () => {
      carc();
    };
  }, [isFocused]);

  const delAlert = (id, alertForm) =>
    Alert.alert(
      alertForm,
      "차량을 삭제하시겠습니까?",
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
      await carColl.doc(id).delete();
    } catch (error) {
      console.log(error.message);
    }
  };

  const addCar = async () => {
    try {
      const carcc = await carColl.add({
        member_id: uid,
        idnt_no: car,
      });
      setCar("");
      return () => {
        carcc();
      };
    } catch (error) {
      console.log(error.message);
    }
  };

  const bottomSheetView = () => {
    return (
      <View style={styles.contain}>
        <View style={{ flex: 4, justifyContent: "center" }}>
          <Text style={styles.textB}>차량 번호</Text>
          <View style={styles.info}>
            <Icon
              name="car-outline"
              color="#677191"
              size={20}
              style={{ marginRight: 15 }}
            />
            <TextInput
              placeholder="차량 번호를 입력하세요"
              style={styles.textC}
              returnKeyType="done"
              value={car}
              onChangeText={setCar}
            />
          </View>
        </View>
        <View style={{ flex: 1 }} />
        <View style={{ flex: 1 }}>
          <View style={styles.buttonArea}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                bottomSheet.current.close(), addCar();
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>등록</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  const bottomSheet = useRef();
  return (
    <View style={styles.contain}>
      <View style={{ flex: 9, marginBottom: 20 }}>
        <ScrollView>
          <View style={styles.top}>
            <Text style={styles.textA}>차량 정보</Text>
          </View>
          {cars.length > 0 ? (
            <View>
              <Text style={styles.textB}>차량 번호</Text>

              {cars.map((car, id) => (
                <View
                  style={{ justifyContent: "space-between", ...styles.info }}
                  key={id}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Icon
                      name="car-outline"
                      color="#677191"
                      size={20}
                      style={{ marginRight: 15 }}
                    />
                    <Text style={styles.textC}>{car.idnt_no}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => delAlert(cars[id].id, car.idnt_no)}
                  >
                    <Icon name="md-close-outline" color="#7B6F72" size={22} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ) : (
            <View style={{ alignItems: "center" }}>
              <Text style={styles.textD}>등록된 차량이 없습니다</Text>
            </View>
          )}

          <BottomSheet
            hasDraggableIcon
            ref={bottomSheet}
            height={400}
            enabledContentGestureInteraction={false}
            sheetBackgroundColor="white"
          >
            {bottomSheetView()}
          </BottomSheet>
        </ScrollView>
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.buttonArea}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => bottomSheet.current.show()}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              차량 등록
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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

    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
    flexDirection: "row",
    height: 50,
    marginBottom: 15,
  },
  adressInfo: {
    backgroundColor: "#F3F6FF",
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  textB: {
    fontSize: 14,
    fontWeight: "bold",
    paddingBottom: 15,
    color: "#192342",
  },
  textC: {
    fontSize: 16,
    color: "#677191",
  },
  textD: {
    fontSize: 18,
    fontWeight: "bold",
    paddingBottom: 10,
    color: "#192342",
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
});
export default InfoCar;
