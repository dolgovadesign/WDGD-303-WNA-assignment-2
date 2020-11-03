import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { AntDesign, Entypo } from "@expo/vector-icons";

import Home from "./screens/Home";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Screen from "./screens/Screen";
import SubScreen from "./screens/SubScreen";

import firebase from "firebase";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDigFvTQ_oLglpgZvSyhXYhzFVPdJp_K2Y",
  authDomain: "dynamicsourceapp.firebaseapp.com",
  databaseURL: "https://dynamicsourceapp.firebaseio.com",
  projectId: "dynamicsourceapp",
  storageBucket: "dynamicsourceapp.appspot.com",
  messagingSenderId: "233224635229",
  appId: "1:233224635229:web:4c4335abcbddff6e15deb4"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Drawer = createDrawerNavigator();
const ScreenStack = createStackNavigator();

const ScreenStackNavigator = () => {
  return (
    <ScreenStack.Navigator>
      <ScreenStack.Screen name="Screen" component={Screen} />
      <ScreenStack.Screen name="SubScreen" component={SubScreen} />
    </ScreenStack.Navigator>
  );
};

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Log Out"
        onPress={() => {
          console.log("logout");
          firebase
            .auth()
            .signOut()
            .then(() => {
              console.log("Signout successfull!");
              props.navigation.closeDrawer();
            })
            .catch((err) => alert(err.message));
        }}
      />
    </DrawerContentScrollView>

  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Login" component={Login} />
      <Drawer.Screen name="Signup" component={Signup} />
      <Drawer.Screen
        name="ScreenStack"
        component={ScreenStackNavigator}
        options={{ title: "Screen" }}
      />
    </Drawer.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}









