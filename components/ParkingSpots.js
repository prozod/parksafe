import {
  View,
  Text,
  StyleSheet,
  Platform,
  Linking,
  Pressable,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ParkingCard from "./ParkingCard";
import { AppContext } from "../AppCtx";

// 172.20.10.2:80
// 192.168.179.34:80

export default function ParkingSpots() {
  const [sensorData, setSensorData] = useState("");
  const { reservedSpots, setReservedSpots } = useContext(AppContext);
  let awarenessDistance = 10;
  useEffect(() => {
    function getAlerts() {
      fetch("http://192.168.179.34:80/refresh")
        .then((res) => res.json())
        .then((data) => setSensorData(data));
    }
    getAlerts();
    const interval = setInterval(() => getAlerts(), 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  // 1) beep cand parchezi pe locul gresit rezervat din aplicatie (ex: rezervat loc 2, parcat pe loc 3 --- beep/vibratie)

  // 2) atunci cand rezervi un loc din aplicatie, sa mergi la bariera si sa-ti deschida (daca nu ai rezervat, bariera nu se ridica)
  // cand rezervi un loc
  //daca nu sunt locuri libere, senzorul NU va deschide bariera

  // 3) proximitatea pt. a gasi un loc de parcare (ex: in raza de 1km, sa nu poti rezerva de la 50km distanta)

  // 4) intre orele X si Y, sansele/probabilitatea de a gasi loc este X

  // 5) integrare senzor masina self pilot, parcare proximitate (comma.ai etc.)

  let flag1 = 0; // 1 = liber, 0 = ocupat
  let flag2 = 0;
  let flag3 = 0;

  let fullAddress = "46.069042, 23.572632";

  const url = Platform.select({
    ios: `maps:0,0?q=${fullAddress}`,
    android: `geo:0,0?q=${fullAddress}`,
  });

  sensorData.distance1 < awarenessDistance ? (flag1 = 0) : (flag1 = 1);
  sensorData.distance2 < awarenessDistance ? (flag2 = 0) : (flag2 = 1);
  sensorData.distance3 < awarenessDistance ? (flag3 = 0) : (flag3 = 1);

  let freeSpots = flag1 + flag2 + flag3;
  console.log(freeSpots, "flags: ", flag1, flag2, flag3);
  console.log(
    "SPOT 1 STATUS: ",
    reservedSpots[0].reserved,
    sensorData.distance1,
    "SPOT 2 STATUS: ",
    reservedSpots[1].reserved,
    sensorData.distance2,
    "SPOT 3 STATUS: ",
    reservedSpots[2].reserved,
    sensorData.distance3
  );
  useEffect(() => {
    console.log("RESERVED SPOTS STATE CHANGED: ", reservedSpots);
  }, [reservedSpots]);

  return (
    <View style={styles.container}>
      <Text style={styles.availabilityText}>
        Locuri disponibile ({freeSpots}/3)
      </Text>
      <Pressable style={styles.button} onPress={() => Linking.openURL(url)}>
        {/* <Text style={{ color: "white", backgroundColor: "red", padding: 5 }}>
          Mars la camin
        </Text> */}
      </Pressable>
      {freeSpots == 0 ? (
        <Text style={styles.noparkingspots}>
          Nu sunt locuri de parcare disponibile
        </Text>
      ) : (
        <View style={styles.cards}>
          {sensorData.distance1 > awarenessDistance && (
            <ParkingCard
              id="1"
              name="Parcare universitate (loc 1)"
              distance={sensorData.distance1}
              location="Strada Unirii, 37C"
              number="32"
              price="GRATUIT"
              reserved={reservedSpots[0].reserved}
            />
          )}
          {sensorData.distance2 > awarenessDistance && (
            <ParkingCard
              id="2"
              name="Parcare universitate (loc 2)"
              distance={sensorData.distance2}
              location="Strada Unirii, 37C"
              number="75"
              price="GRATUIT"
              reserved={reservedSpots[1].reserved}
            />
          )}
          {sensorData.distance3 > awarenessDistance && (
            <ParkingCard
              id="3"
              name="Parcare universitate (loc 3)"
              distance={sensorData.distance3}
              location="Strada Unirii, 37C"
              number="70"
              price="GRATUIT"
              reserved={reservedSpots[2].reserved}
            />
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginVertical: 25,
  },
  availabilityText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  noparkingspots: {
    color: "#fff",
  },
});
