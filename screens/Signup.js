import React, { useState } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity,
  ImageBackground,
  Image,
  Dimensions
} from "react-native";
import firebase from "firebase";

const Signup = ({ navigation }) => {
  const [signupForm, setSignupForm] = useState({
    email: "",
    password: "",
    name: "",
  });

  const onChangeTextEmail = (email) => {
    setSignupForm({
      ...signupForm,
      email,
    });
  };

  const onChangeTextPassword = (password) => {
    setSignupForm({
      ...signupForm,
      password,
    });
  };

  const onChangeTextName = (name) => {
    setSignupForm({
      ...signupForm,
      name,
    });
  };

  const createAccount = () => {
    return new Promise(() => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(signupForm.email, signupForm.password)
        .then((res) => {
           firebase
              .firestore()
              .collection("Users")
              .doc(res.user.uid)
              .set({
                uid: res.user.uid,
                email: res.user.email,
                name: signupForm.name,
              })
              .then(() => {
                console.log("User successfully created!");
                navigation.navigate("Home", {
                  screen: "Screen", 
                  params: { email: res.user.email }, 
                });           
              })
              .catch((err) => {
                console.log(err);
                alert("Create account failed, Error:" + err.message);
              });
        })
        .catch((err) => alert(err.message));
    });
  };

  const { width, height } = Dimensions.get('window')

  return (

    <View style={styles.container}>
          <ImageBackground 
            source={require("../assets/background.png")} 
            style={{ height: height, width: width, resizeMode: 'cover' }}>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={require("../assets/logo.png")}/>
            </View>

    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Email" 
        autoCapitalize = "none"
        onChangeText={onChangeTextEmail}
      />

      <TextInput style={styles.input}
        placeholder="Password" 
        secureTextEntry 
        onChangeText={onChangeTextPassword}
      />

      <TextInput style={styles.input} 
        placeholder="Your Name" 
        onChangeText={onChangeTextName}
      />
      <TouchableOpacity style={styles.button} onPress={createAccount}>
        <Text style={styles.buttonText}>SIGN UP</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button} 
        onPress={() => {
          navigation.navigate("Login");
        }}
      >
        <Text style={styles.buttonText}>Go to login</Text>
      </TouchableOpacity>
    </View>
    </ImageBackground>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  input:{
    backgroundColor: "white",
    padding: 20,
    borderRadius: 33,
    marginBottom: 15
  },

  button: {
    borderRadius: 33,
    borderWidth: 2,
    borderColor: "white",
    marginBottom: 10,
    padding: 20,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "700",
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    marginTop: 100,
    width: 170,
    height: 170,
  },

  form: {
    flex: 1,
    marginTop: 15,
    paddingLeft: 33,
    paddingRight: 33,

  }
});