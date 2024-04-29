import "react-native-gesture-handler";
import { StyleSheet, Pressable, View, Text } from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Button(props) {
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        style={styles.button}
        onPress={() => alert("You pressed a button.")}
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
    paddingHorizontal: 20,
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
