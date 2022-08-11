import React, { useRef, useState } from "react";
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

const InfoCar = ({ navigation: { navigate } }) => {
  const [car, setCar] = useState("");
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
          <TouchableOpacity
            style={styles.button}
            onPress={() => bottomSheet.current.close()}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>등록</Text>
          </TouchableOpacity>
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
          <View style={styles.info}>
            <Icon
              name="car-outline"
              color="#677191"
              size={20}
              style={{ marginRight: 15 }}
            />
            <Text style={styles.textC}>12가 3456</Text>
          </View>

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
      <View style={{ flex: 1, justifyContent: "center" }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => bottomSheet.current.show()}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>차량 등록</Text>
        </TouchableOpacity>
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
  button: {
    backgroundColor: "#567DF4",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    marginBottom: 20,
  },
});
export default InfoCar;
