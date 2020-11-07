import React, { useState } from "react";
import { 
    StyleSheet,
    Text, 
    View,
    Image, 
    TextInput, 
    TouchableOpacity, 
    ImageBackground,
    Dimensions
} from "react-native";
import firebase from "firebase";
import { Assets } from "@react-navigation/stack";

const Login = ({ navigation }) => {
    const [loginForm, setLoginForm] = useState({
      email: "test@gmail.com",
      password: "1234567",
    });

    const onChangeTextEmail = (email) => {
      setLoginForm({
        ...loginForm,
        email,
      });
    };

    const onChangeTextPassword = (password) => {
      setLoginForm({
        ...loginForm,
        password,
      });
    };

    const loginHandler = () => {
      return new Promise(() => {
        firebase
          .auth()
          .signInWithEmailAndPassword(loginForm.email, loginForm.password)
          .then((res) => {
            navigation.navigate("Home");
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
              value={loginForm.email} 
              onChangeText={onChangeTextEmail}
            />
            <TextInput 
              style={styles.input} 
              placeholder="Password" 
              value={loginForm.password}
              secureTextEntry 
              onChangeText={onChangeTextPassword}
            />

            <TouchableOpacity style={styles.button} onPress={loginHandler}>
                <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button} 
                onPress={() => {
                  navigation.navigate("Signup");
                }}>
                <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
    );
};

export default Login;
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