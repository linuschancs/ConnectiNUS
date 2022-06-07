import React, {useState} from 'react';
import { app, database } from './firebaseConfig';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image, 
  TextInput
  
} from 'react-native';

export default function SignUpPage({ navigation }) {

    let auth = getAuth();

    const onPressHandler = () => {
      createUserWithEmailAndPassword(auth, email, password)
     .then((response) => {
        console.log(response.user)
        sendEmailVerification(auth.currentUser);
        navigation.navigate('SuccessfulSignUpPage');
      })
      .catch((err) => {
        alert(err.message);
      })
    };

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  
    return (
      <View style={styles.body}>      
        <View style={styles.top}>
          <Image style={styles.nusLogo}
          resizeMode='contain'
          source={require('./assets/nuswhite2.png')}>
          </Image>
        </View>
        <View style={styles.center}>
          <Image style={styles.imageName}
          resizeMode='contain'
          source={require('./assets/name.png')}>
          </Image>
          <Image style={styles.imageLogo}
          resizeMode='contain'
          source={require('./assets/logo.png')}>
          </Image>
        </View>

        <Text style={styles.textok}>
            Sign up with your NUS email - eXXXXXXX@u.nus.edu to create an account with us!
        </Text>

        <TextInput style={styles.input} value={email} onChangeText={text => setEmail(text)} placeholder= 'Email' placeholderTextColor="black">
        </TextInput>
        <TextInput style={styles.input} value={password} onChangeText={text => setPassword(text)}placeholder= 'Password' placeholderTextColor="black">
        </TextInput>
        <TextInput style={styles.input} value={password} onChangeText={text => setPassword(text)} placeholder= 'Confirm Password' placeholderTextColor="black">
        </TextInput>

        <View style={styles.bottom}>
          <Pressable onPress={onPressHandler}
          style={({ pressed }) => [
            { backgroundColor: pressed ? '#ddd' : '#f49d36' },
            styles.button,
          ]}
          >

          <Text style={styles.text}>
              Confirm Sign Up
            </Text>
          </Pressable>

        </View>
  
      </View>
  );
  }
      
const styles = StyleSheet.create({
  body: {
    flex:1,
    backgroundColor: '#275B9F',
    alignItems: 'center',
    justifyContent: 'center',

  },
  top: {
    flex:1,
    backgroundColor: '#275B9F',
    alignItems: 'center',
    justifyContent: 'flex-end',

  },
  
  center: {
    flex: 1.2,
    backgroundColor: '#275B9F',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 5,
  },

  bottom: {
    flex: 1,
    backgroundColor: '#275B9F',
    alignItems: 'center',
    justifyContent: 'flex-start',

  },

  button: {
    width: 125,
    height: 37,
    borderRadius: 10,
    margin: 5
  },

  text: {
    color: '#FFF',
    margin: 10,
    alignItems: 'Center',
    justifyContent: 'Center',
  },

  nusLogo: {
    width:200,
    height:100,
  },

  imageName: {
    width:300,
    height:100,

  },

  imageLogo: {
    flex:1,
    width:200,
    height:100,
  },

  textok: {
    color: "#FFF",
    width: 350,
    textAlign: 'center',
    margin: 5,
  },

  input: {
    borderWidth: 1,
    width: 200,
    height: 35,
    margin: 5,
    padding:10,
    alignItems: 'Center',
    justifyContent: 'Center',

  },

});

