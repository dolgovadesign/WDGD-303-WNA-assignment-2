import React from "react";
import { StyleSheet, Text, View, Image, Button, Alert } from "react-native";

export default function Home({ navigation }) {

  const onButtonPress = () => {
    Alert.alert("\"I believe, the world needs more Canada\"  \n -Bono");
  };

  return (
    <View style={styles.container}>
        <Text style={[styles.text, styles.textTitle]}>Canadian</Text>
        <Image style={styles.logo} source={require('../assets/logo.png')}/>
        <Text style={styles.text}>Adventures</Text>
        <Text style={styles.textTiny}>My Gratitude Journey</Text>
        <Button color="white" style={styles.clickButton} title="Click Me" onPress={onButtonPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3A5F0B",
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    color: "white",
    fontSize: 55,
    fontWeight: "700",
  },

  textTitle:{
    color: "white",
    fontSize: 68,
    fontWeight: "700"
  },

  textTiny:{
    color: "#111509",
    fontSize: 21,
    fontWeight: "700",
    marginTop: 21,
  },
  
  logo: {
    padding: 20,
    width: 77,
    height: 77,
  },

});
