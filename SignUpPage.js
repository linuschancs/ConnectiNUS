import React, {useState} from 'react';
import { app, database, createUserDocument } from './firebaseConfig';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image, 
  TextInput,
  SafeAreaView
  
} from 'react-native';

export default function SignUpPage({ navigation }) {
  
    let auth = getAuth();
    const [email, setEmail] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [displayName, setDisplayName] = useState('')

    const onPressHandler = () => {
      if (displayName == "") {
        console.log("No Display Name")
        alert("Please enter a valid display name.");
      } else if (password1 == password2) {
        createUserWithEmailAndPassword(auth, email, password1)
        .then((response) => {
           console.log(response.user)
           sendEmailVerification(auth.currentUser);
           createUserDocument(email, displayName, auth.currentUser.uid, pastel);
           navigation.navigate('SuccessfulSignUpPage');
         })
         .catch((err) => {
           alert(err.message);
         })
      } else {
        alert('Please ensure your passwords match');
        console.log('Password Mismatch')
      }
    };

    const hue = Math.floor(Math.random() * 360);
    const pastel = 'hsl(' + hue + ', 100%, 80%)';
  
    return (
      <SafeAreaView style={styles.body}>      
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
        <TextInput style={styles.input} value={displayName} onChangeText={text => setDisplayName(text)} placeholder= 'Display Name' placeholderTextColor="black">
        </TextInput>
        <TextInput style={styles.input} value={email} onChangeText={text => setEmail(text)} placeholder= 'Email' placeholderTextColor="black">
        </TextInput>
        <TextInput style={styles.input} value={password1} onChangeText={text => setPassword1(text)}placeholder= 'Password' placeholderTextColor="black">
        </TextInput>
        <TextInput style={styles.input} value={password2} onChangeText={text => setPassword2(text)} placeholder= 'Confirm Password' placeholderTextColor="black">
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
  
      </SafeAreaView>
  );
  }
      
const styles = StyleSheet.create({
  body: {
    alignContent: 'flex-start',
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
    flex: 1.5,
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
    alignItems: 'center',
    justifyContent: 'center',
  },

  nusLogo: {
    width:200,
    height:100,
  },

  imageName: {
    flex: 1,
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
    width: 180,
    height: 30,
    margin: 5,
    paddingLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

});

