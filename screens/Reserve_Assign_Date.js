import React, { useRef } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import BottomSheet from "react-native-gesture-bottom-sheet";

const Reserve_Assign_Date = ({ navigation: { navigate }, route }) => {
  const loc = route.params.location;
  const bottomSheetView = (loc) => {
    return (
      <View style={styles.containBottom}>
        <View style={{ marginTop: 40 }} />
        <View style={{ marginBottom: 40 }}>
          <Text style={styles.textB}>요일</Text>
          <View style={styles.successLoc}>
            <Text style={styles.textE}>월</Text>
            <Text style={styles.textE}>화</Text>
            <Text style={styles.textE}>수</Text>
            <Text style={styles.textE}>목</Text>
            <Text style={styles.textE}>금</Text>
            <Text style={styles.textE}>토</Text>
            <Text style={styles.textE}>일</Text>
          </View>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.textB}>시간</Text>
          <View style={styles.successLoc}>
            <Text style={styles.time}>14 : 00</Text>
            <View style={{ justifyContent: "center" }}>
              <Text style={{ fontSize: 18 }}> ~ </Text>
            </View>
            <Text style={styles.time}>21 : 00</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigate("Detail", { location: loc })}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            시간 선택 완료
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  const bottomSheet = useRef();
  const dd = () => {
    return <View style={{ backgroundColor: "white" }} />;
  };
  return (
    <ScrollView style={styles.contain}>
      <View style={styles.top}>
        <Text style={styles.textA}>주차 배정 결과</Text>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.textB}>아파트</Text>
        <View style={styles.info}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
            파플아파트 1단지
          </Text>
        </View>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.textB}>기간</Text>
        <View style={styles.info}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
            2022.03.01 ~ 2022.03.31
          </Text>
        </View>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.textB}>주차 공간</Text>
        <View style={styles.info}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>{loc}</Text>
        </View>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.textB}>결과</Text>
        <View style={styles.successLoc}>
          <Text style={styles.textD}>success</Text>
          <View />
        </View>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.textB}>요일 선택</Text>
        <View style={styles.successLoc}>
          <Text style={styles.textE}>월</Text>
          <Text style={styles.textE}>화</Text>
          <Text style={styles.textE}>수</Text>
          <Text style={styles.textE}>목</Text>
          <Text style={styles.textE}>금</Text>
          <Text style={styles.textE}>토</Text>
          <Text style={styles.textE}>일</Text>
        </View>
      </View>
      <BottomSheet
        hasDraggableIcon
        ref={bottomSheet}
        height={400}
        enabledContentGestureInteraction={false}
      >
        {bottomSheetView(loc)}
      </BottomSheet>
      <TouchableOpacity
        style={styles.button}
        onPress={() => bottomSheet.current.show()}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          요일 선택 완료
        </Text>
      </TouchableOpacity>
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
  },
  contain: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 30,
  },
  containBottom: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 30,
  },
  info: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  adressInfo: {
    backgroundColor: "#F3F6FF",
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  textB: {
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  textC: {
    marginLeft: 20,
    paddingVertical: 10,
    fontWeight: "bold",
  },
  successLoc: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textD: {
    fontSize: 14,
    backgroundColor: "#AAF54B",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 7,
    color: "white",
  },
  textE: {
    fontSize: 16,
    backgroundColor: "#D9D9D9",
    borderRadius: 21,
    paddingHorizontal: 14,
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
  time: {
    fontSize: 18,
    backgroundColor: "#F3F6FF",
    borderRadius: 21,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontWeight: "bold",
  },
});

export default Reserve_Assign_Date;
