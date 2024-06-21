import { AppContext } from "../App";
import React, { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import ParkingSpots from "../components/ParkingSpots";
import * as Device from "expo-device";

export default function Home() {
  let connectedDevice = Device.modelName + Device.deviceName;

  return (
    <View style={styles.container}>
      <Text style={{ color: "#fff" }}>Device: {connectedDevice}</Text>

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
});
