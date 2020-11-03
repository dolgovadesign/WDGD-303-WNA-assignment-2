import React, { useState } from "react";
import { 
    StyleSheet,
    Text, 
    View, 
    TextInput, 
    TouchableOpacity, 
} from "react-native";
import firebase from "firebase";

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
            navigation.navigate("ScreenStack");
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
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button} 
                onPress={() => {
                  navigation.navigate("Signup");
                }}
            >
                <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({

container: {
    flex: 1,
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