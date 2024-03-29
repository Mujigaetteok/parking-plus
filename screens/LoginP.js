import React, { useState } from "react";
import { Button, TextInput, View } from "react-native";
import auth from "@react-native-firebase/auth";

const LoginP = ({ navigation: { navigate } }) => {
  const [confirm, setConfirm] = useState(null);

  const [code, setCode] = useState("");

  const [phoneNumber, setPhoneNumber] = useState();

  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
      navigate("RegisterStack", { screen: "Register2" });
    } catch (error) {
      console.log("Invalid code.");
    }
  }

  async function signout() {
    auth().signOut();
  }

  return (
    <>
      <TextInput value={phoneNumber} onChangeText={setPhoneNumber} />
      <Button
        title="Phone Number Sign In"
        onPress={() => signInWithPhoneNumber(phoneNumber)}
      />
      {confirm ? (
        <View>
          <TextInput value={code} onChangeText={setCode} />
          <Button title="Confirm Code" onPress={() => confirmCode()} />
        </View>
      ) : null}
      <Button title="logOut" onPress={() => signout} />
    </>
  );
};

export default LoginP;
