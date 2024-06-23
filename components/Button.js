import "react-native-gesture-handler";
import { StyleSheet, Pressable, View, Text } from "react-native";
import React, { useContext } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { AppContext } from "../AppCtx";

export default function Button(props) {
  const { currentDevice, _ } = useContext(AppContext);
  const { reservedSpots, setReservedSpots } = useContext(AppContext);
  function closeBarrier() {
    console.log("CLOSE FN TRIGGERED ON ANULEAZA");
    fetch("http://192.168.179.34:80/close")
      .then((res) => res.json())
      .then((data) => console.log("Barrier closed"));
    open = false;
  }
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        style={styles.button}
        onPress={() => {
          console.log(
            `You pressed button ${props.id} from ${currentDevice}, .`
          );

          const getReservedSpot = (id) => {
            return reservedSpots.find((spot) => Number(spot.id) === Number(id));
          };

          if (
            getReservedSpot(props.id) != undefined &&
            getReservedSpot(props.id)?.reserved == true
          ) {
            switch (props.type) {
              case "action":
                break;
              case "cancel":
                const updatedSpots = reservedSpots.map((spot) =>
                  Number(spot.id) === Number(props.id)
                    ? { ...spot, reserved: false }
                    : spot
                );

                setReservedSpots(updatedSpots);
                closeBarrier();

                break;
              default:
                console.error("Wrong button type");
            }
          } else {
            const updatedSpots = reservedSpots.map((spot) =>
              Number(spot.id) === Number(props.id)
                ? { ...spot, reserved: true }
                : spot
            );
            setReservedSpots(updatedSpots);
          }
        }}
      >
        <FontAwesome
          name="bandcamp"
          size={18}
          color="#fff"
          style={styles.buttonIcon}
        />
        <Text style={styles.buttonLabel}>{props.text}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    borderRadius: 10,
    width: "fit-content",
    height: "fit-content",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#32CB82",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
  },
});
