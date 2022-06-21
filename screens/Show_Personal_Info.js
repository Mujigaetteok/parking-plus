import React, { useState } from "react";
import { Text, StyleSheet, View, ScrollView, TextInput } from "react-native";

const Show_Personal_Info = ({ navigation: { navigate } }) => {
  const [text, setText] = useState("");
  return (
    <ScrollView style={styles.contain}>
      <View style={styles.top}>
        <Text style={styles.textA}>개인 정보</Text>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.textB}>이름</Text>
        <View style={styles.info}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>홍길동</Text>
        </View>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.textB}>ID</Text>
        <View style={styles.info}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>01012345678</Text>
        </View>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.textB}>아파트</Text>
        <View style={styles.info}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            파플아파트 1단지
          </Text>
        </View>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.textB}>주소</Text>
        <View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "row" }}>
              <View style={styles.adressInfo}>
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>101</Text>
              </View>
              <Text style={styles.textC}>동</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.adressInfo}>
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>101</Text>
              </View>
              <Text style={styles.textC}>호</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.textB}>차량 정보</Text>
        <View style={styles.info}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>12가 3456</Text>
        </View>
        <TextInput
          placeholder="차량을 입력하세요"
          style={styles.info}
          returnKeyType="done"
          value={text}
          onChangeText={setText}
          onSubmitEditing={() => navigate("Car", { car: text })}
        />
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
});
export default Show_Personal_Info;
