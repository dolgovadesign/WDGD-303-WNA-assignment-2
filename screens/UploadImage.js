import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Button, 
  Image, 
  View, 
  Platform, 
  Alert, 
  ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import firebase from "firebase";
import "@firebase/firestore";

const UploadImage = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        try {
          const { status } = await ImagePicker.requestCameraRollPermissionsAsync();

          if (status !== 'granted') {
            Alert.alert('Permission request failed', 'Sorry, we need camera roll permissions to make this work!');
          }
        } catch (error) {
          Alert.alert('Permission request failed', error.message);
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  const uriToBlob = (uri) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        // return the blob
        resolve(xhr.response);
      };
      
      xhr.onerror = function() {
        // something went wrong
        reject(new Error('uriToBlob failed'));
      };
      // this helps us get a blob
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      
      xhr.send(null);
    });
  };

  const uploadImage = () => {
    return new Promise((resolve, reject) => {
      const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);

      setUploading(true);

      uriToBlob(imageUri)
        .then(blob => {
          var storageRef = firebase.storage().ref();

          return storageRef
            .child(`images/${filename}`)
            .put(blob, { contentType: 'image/jpeg' })
            .then(snapshot => {
              blob.close();
              Alert.alert('Image Uploaded', `Image ${filename} has been successfully uploaded to Firebase storage`);
              setUploading(false);
              setImageUri(null);
              resolve(snapshot);
            })
            .catch(error => {
              console.log(`Failed to upload file: ${error.message}`);
              setUploading(false);
              setImageUri(null);
              reject(error);
            });
        })
        .catch(error => {
          console.log(`Failed to create blob: ${error.message}`);
          setUploading(false);
          setImageUri(null);
          reject(error);
        });
    });
  };

  return (
    <View style={styles.container}>
      {
        uploading ? (
          <ActivityIndicator size="large" style={styles.loadingIndicator} />
        ) : (
          <>
            <Image source={{ uri: imageUri }} style={styles.image} />
            { imageUri 
              ? <Button title="Upload Image" onPress={uploadImage} /> 
              : <Button title="Pick Image" onPress={pickImage} /> }
          </>
        )
      }
    </View>
  );
};  

export default UploadImage;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  image: {
    width: 200,
    height: 200
  },
  loadingIndicator: {
    zIndex: 5,
    width: '100%',
    height: '100%',
  },
});
