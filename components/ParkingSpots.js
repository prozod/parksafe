import { View, Text, StyleSheet } from "react-native";
import React from "react";
import ParkingCard from "./ParkingCard";

export default function ParkingSpots() {
  return (
    <View style={styles.container}>
      <Text style={styles.availabilityText}>Locuri disponibile (3/90)</Text>
      <ParkingCard
        name="Pacare universitate"
        location="Strada Unirii, 37C"
        number="32"
        price="GRATUIT"
      />
      <ParkingCard
        name="Pacare universitate"
        location="Strada Unirii, 37C"
        number="75"
        price="GRATUIT"
      />
      <ParkingCard
        name="Pacare universitate"
        location="Strada Unirii, 37C"
        number="70"
        price="GRATUIT"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
    marginVertical: 25,
  },
  availabilityText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
