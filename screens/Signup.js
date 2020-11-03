import React, { useState } from "react";
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity,
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
                navigation.navigate("rootTabs", {
                  screen: "Notes", 
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

  return (
    <View style={styles.container}>
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
        <Text style={styles.buttonText}>Create Account</Text>
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
  );
};

export default Signup;

const styles = StyleSheet.create({

container: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: "#3A5F0B",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  input:{
    backgroundColor: "white",
    padding: 20,
    borderRadius: 33,
    marginBottom: 15
  },

  button: {
    backgroundColor: "lightgreen",
    borderRadius: 33,
    marginBottom: 10,
    padding: 20,
  },

  buttonText: {
      textAlign: "center",
      color: "white",
      fontWeight: "700",
  },
});