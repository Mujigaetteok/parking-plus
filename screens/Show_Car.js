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

const Show_Car = ({ navigation: { navigate } }) => {
  const [car, setCar] = useState("");
  const bottomSheetView = () => {
    return (
      <ScrollView>
        <View style={styles.containBottom}>
          <View style={{ marginTop: 40 }} />
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.textB}>차량 번호</Text>
            <TextInput
              placeholder="차량 번호를 입력하세요"
              style={styles.infoInput}
              returnKeyType="done"
              value={car}
              onChangeText={setCar}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => bottomSheet.current.close()}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>등록</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };
  const bottomSheet = useRef();
  return (
    <ScrollView style={styles.contain}>
      <View style={styles.top}>
        <Text style={styles.textA}>차량 정보</Text>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.textB}>차량 번호</Text>
        <View style={styles.info}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>12가 3456</Text>
        </View>
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
      <TouchableOpacity
        style={styles.button}
        onPress={() => bottomSheet.current.show()}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>차량 등록</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  top: {
    height: 100,
    justifyContent: "center",
  },
  containBottom: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 30,
  },
  textA: {
    fontSize: 24,
    fontWeight: "bold",
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
  },
  infoInput: {
    backgroundColor: "#F3F6FF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 10,
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
  },
  textC: {
    fontSize: 16,
    marginLeft: 20,
    paddingVertical: 10,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#567DF4",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    marginBottom: 20,
  },
});
export default Show_Car;
