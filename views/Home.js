import React from "react";
import { StyleSheet, View } from "react-native";
import ParkingSpots from "../components/ParkingSpots";

export default function Home() {
  return (
    <View style={styles.container}>
      <ParkingSpots />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#202020",
  },
});
