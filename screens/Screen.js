import React from 'react'
import { 
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View, } from 'react-native';
    
    import firebase from "firebase";
    import "@firebase/firestore";


    const Screen = ({ navigation }) => {
        const [userInfo, setUserInfo] = useState();
        const [screen, setScreen] = useState([]);
        const [loading, setLoading] = useState();
      
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
              console.log("DOcument not exist!");
            }
          });
        };

        

export default Screen

const styles = StyleSheet.create({})

