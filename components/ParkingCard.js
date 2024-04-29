import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Button from "./Button";

export default function ParkingCard(props) {
  return (
    <View style={styles.container}>
      <View style={styles.parkingSpotInfo1}>
        <Text style={styles.parkingspotText}>{props.name}</Text>
        <Text style={styles.parkingspotLocation}>{props.location}</Text>
        <Text style={styles.parkingspotNumber}>Locul {props.number}</Text>
      </View>
      <View style={styles.parkingSpotInfoCTA}>
        <Text style={styles.parkingspotPrice}>{props.price}</Text>
        <Button text="Sa pornim!" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    marginTop: 20,
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: "#1C1C1C",
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderStyle: "solid",
  },
  parkingspotText: {
    color: "#fff",
    fontWeight: "bold",
  },
  parkingspotLocation: {
    color: "rgba(255, 255, 255, 0.6)",
  },
  parkingspotNumber: {
    color: "#32CB82",
  },
  parkingSpotInfo1: {
    marginBottom: 30,
  },
  parkingspotPrice: {
    color: "#D6123A",
  },
  parkingSpotInfoCTA: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
});
