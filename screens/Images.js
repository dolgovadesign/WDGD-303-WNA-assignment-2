import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, ScrollView, ActivityIndicator, Alert } from 'react-native';
import firebase from "firebase";
import "@firebase/firestore";

export default function Images({navigation}) {
    const [imageUrls, setImageUrls] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            const unsubscribe = navigation.addListener('focus', async () => {
                setLoading(true);
                                
                try {
                    const result = await firebase.storage().ref().child('/images').listAll();
                    const imageRefs = result.items;
                    console.log(`Loaded ${imageRefs.length} images`);

                    const urls = [];

                    for (let i = 0; i < imageRefs.length; i++) {
                        const url = await imageRefs[i].getDownloadURL();
                        urls.push(url);
                    }

                    setImageUrls(urls);
                } catch(error) {
                    Alert.alert('Image Load Failed', `Loading of images failed: ${error.message}`);
                }

                setLoading(false);
              });
          
              // Return the function to unsubscribe from the event so it gets removed on unmount
              return unsubscribe;
        })();
      }, [navigation]);

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            {loading ? (
                <ActivityIndicator size="large" style={styles.loadingIndicator} />
            ) : imageUrls.map((url, i) => (
                <Image style={styles.image} key={i} source={{ uri: url }}></Image>))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: { 
        flex: 1,
        display: "flex", 
        flexDirection: "row", 
        flexWrap: "wrap", 
        justifyContent: "center", 
        alignItems: "center",
        backgroundColor: "darkgreen"
    },
    loadingIndicator: {
        zIndex: 5,
        width: '100%',
        height: '100%',
    },
    image: {
        height: 100,
        width: 100,
        margin: 10,
        borderRadius: 11,
        borderWidth: 1,
        borderColor: "white",
    }
  });
  