import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

export default function AppButton(props) {
    return (
        <TouchableOpacity onPress={props.onPress}>        
            <Text style={[styles.counterBtn, props.style]}>{props.text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    counterBtn: {
      margin: 10,
      backgroundColor: "#425e17",
      paddingHorizontal: 40,
      paddingVertical: 10,
      color: "beige",
      fontSize: 18,
      fontWeight: "bold",
      borderWidth: 3,
      borderRadius: 23,
      borderColor: "white",
      opacity: 0.7,
    }
});