import React, { useRef, useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import BottomSheet from "react-native-gesture-bottom-sheet";
import Icon from "react-native-vector-icons/Ionicons";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import firestore from "@react-native-firebase/firestore";

const InfoCar = ({ navigation: { navigate } }) => {
  const uid = 1;
  const carColl = firestore().collection("CAR");
  const [cars, setCars] = useState([]);
  const [car, setCar] = useState("");

  useEffect(() => {
    carColl.onSnapshot((snapshot) => {
      const carArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const currentCar = carArray.filter((car) => car.member_id == uid);
      setCars(currentCar);
    });
  }, []);

  const addCar = async () => {
    try {
      await carColl.add({
        member_id: uid,
        idnt_no: car,
      });
      setCar("");
    } catch (error) {
      console.log(error.message);
    }
  };

  /*
 useEffect(() => {
    carColl.onSnapshot((snapshot) => {
      const carArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const currentCar = carArray.filter((car) => car.member_id == uid);
      setCars(currentCar);
    });
  }, []);
  */

  /*
  useEffect(() => {
    carColl.onSnapshot((snapshot) => {
      const carArray = snapshot.docs.map((doc) =>
        doc.member_id == uid
          ? {
              id: doc.id,
              ...doc.data(),
            }
      );
      setCars(carArray);
    });
  }, []);
  */

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
          <Text style={styles.textB}>차량 번호</Text>

          {cars.map((car, id) => (
            <View style={styles.info} key={id}>
              <Icon
                name="car-outline"
                color="#677191"
                size={20}
                style={{ marginRight: 15 }}
              />
              <Text style={styles.textC}>{car.idnt_no}</Text>
            </View>
          ))}

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
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
    flexDirection: "row",
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
    paddingBottom: 10,
    color: "#192342",
  },
  textC: {
    fontSize: 16,
    color: "#677191",
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
