import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useContext, useState } from "react";
import Button from "./Button";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { AppContext } from "../AppCtx";

export default function ParkingCard(props) {
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const { reservedSpots, setReservedSpots } = useContext(AppContext);

  function closeBarrier() {
    console.log("CLOSE FN TRIGGERED");
    fetch("http://192.168.179.34:80/close")
      .then((res) => res.json())
      .then((data) => console.log("Barrier closed"));
    setOpen(false);
    const updatedSpots = reservedSpots.map((spot) =>
      Number(spot.id) === Number(props.id) ? { ...spot, reserved: false } : spot
    );

    setReservedSpots(updatedSpots);
  }
  function openBarrier() {
    console.log("OPEN FN TRIGGERED");
    fetch("http://192.168.179.34:80/open")
      .then((res) => res.json())
      .then((data) => console.log("Barrier opened"));
    setOpen(true);
    setTimeout(closeBarrier, 10000);
  }
  const handlePress = () => {
    console.log("BARRIER STATUS: ", open);
    if (open) {
      closeBarrier();
    } else {
      openBarrier();
    }

    setDisabled(true); // Disable the button
    setTimeout(() => setDisabled(false), 5000); // Re-enable the button after 5 seconds
  };

  //daca bariera e deschisa, atunci dispare butonul de OPEN BARRIER - altfel ramane. --- facut
  //cand ai deschis bariera, sa dispara butonul de anuleaza

  return (
    <View style={props.reserved ? styles.containerReserved : styles.container}>
      <View style={styles.parkingSpotInfo1}>
        <Text style={styles.parkingspotText}>
          {props.name}
          {/* <Text style={styles.parkingspotDistance}>{props.distance}</Text> */}
        </Text>
        <Text style={styles.parkingspotLocation}>{props.location}</Text>
        <Text style={styles.parkingspotNumber}>Locul {props.number}</Text>
      </View>
      <View style={styles.parkingSpotInfoCTA}>
        <Text style={styles.parkingspotPrice}>{props.price}</Text>
        {props.reserved && !open && (
          <Button
            type="cancel"
            id={props.id}
            reserved={props.reserved}
            text="Anuleaza"
          />
        )}
        {props.reserved && !open && (
          <Pressable onPress={handlePress} disabled={disabled}>
            <Text style={[styles.barrierBtn, disabled && styles.disabledBtn]}>
              <FontAwesome
                name="car"
                size={18}
                color="#fff"
                style={styles.buttonIcon}
              />
              Bariera
            </Text>
          </Pressable>
        )}

        {!props.reserved && (
          <Button
            type="action"
            id={props.id}
            reserved={props.reserved}
            text="Ocupa loc"
          />
        )}
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
  containerReserved: {
    borderRadius: 10,
    marginTop: 20,
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: "#1C1C1C",
    borderColor: "#32CB82",
    borderWidth: 1,
    borderStyle: "solid",
  },
  parkingspotText: {
    color: "#fff",
    fontWeight: "bold",
  },
  parkingspotDistance: {
    color: "red",
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
  reservedSpot: {
    borderColor: "#32CB82",
    borderWidth: 2,
    borderStyle: "solid",
  },
  barrierBtn: {
    backgroundColor: "#32CB82",
    color: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonIcon: {
    paddingRight: 10,
    marginRight: 10,
  },
  disabledBtn: {
    backgroundColor: "red",
    color: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});
