import React, { useContext, useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import ParkingSpots from "../components/ParkingSpots";
import * as Device from "expo-device";
import { Picker } from "@react-native-picker/picker";
import { AppContext } from "../AppCtx";

export default function Home() {
  let connectedDevice = Device.modelName + Device.deviceName;
  const { _, setCurrentDevice } = useContext(AppContext);
  const [selectedLanguage, setSelectedLanguage] = useState();

  useEffect(() => {
    setCurrentDevice(connectedDevice);
  }, [connectedDevice]);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.noparking}>Device connected: {connectedDevice}</Text> */}

      {/* <Picker
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}
      >
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker> */}

      <ParkingSpots />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#202020",
  },
  noparking: {
    color: "white",
  },
});
