import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ActivityIndicator, Button, ImageBackground, Dimensions } from "react-native";
import firebase from "firebase";
import "@firebase/firestore";

export default function Home({ navigation }) {
  const [userInfo, setUserInfo] = useState();
  const [screen, setScreen] = useState([]);
  const [loading, setLoading] = useState();

  const { width, height } = Dimensions.get('window')
  
  const getUserData = (uid) => {
    const docRef = firebase.firestore().collection("Users").doc(uid);
    
    docRef.get().then(function (doc) {
      if (doc.exists) {
        const userData = doc.data();
        setUserInfo(userData);
        setScreen(userData.screen);
        setTimeout(() => {
          setLoading(false);
        }, 600);
      } else {
        setLoading(false);
        console.log("Document not exist!");
      }
    });
  };

  useEffect(() => {
    const isFocused = navigation.addListener("focus", () => {
      setLoading(true);
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          getUserData(user.uid);
        } else {
          setUserInfo(null);
          setLoading(false);
          navigation.navigate("Login");
        }
      });
    });

    return isFocused;
  }, [userInfo, loading, navigation, screen]);

  if (loading) {
    return (
      <View style={styles.content}>
        <ActivityIndicator color="darkslateblue" />
      </View>
    );
  }

  if (!userInfo) {
    return (
      <View style={styles.content}>
        <Text>User not found!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground 
            source={require("../assets/background.png")} 
            style={{ height: height, width: width, resizeMode: 'cover' }}>
     <View style={styles.content}>
          <Text style={[styles.text, styles.textTitle]}>Quotes</Text>
          <Text style={styles.text}>c.o.l.l.e.c.t.i.o.n</Text>
          <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('../assets/logo.png')}/>
          </View>
          <Button color="lightgreen" style={styles.clickButton} title="Go To Images" onPress={() => navigation.navigate("Images")} />
      </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },

  text: {
    color: "white",
    fontSize: 35,
    fontWeight: "300",
    textAlign: "center",
    padding: 27,
  },

  textTitle:{
    marginTop: 200,
    padding: 33,
    borderWidth: 5,
    borderRadius: 33,
    borderStyle: 'dashed',
    borderColor: "lightgreen",
    color: "white",
    fontSize: 68,
    fontWeight: "700",
  },
  
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  logo: {
    width: 111,
    height: 111,
  },

  content: {
    flex: 1,
    marginTop: 15,
    paddingLeft: 33,
    paddingRight: 33,
  },

  clickButton: {
    color: "blue"
  }

});
