import { app, database } from './firebaseConfig';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, {useState} from 'react';
import { collection, addDoc } from 'firebase/firestore';

import { 
  StyleSheet, 
  Text,
  View,
  Pressable,
  Image,
  TextInput
  } from 'react-native';

  export default function LoginDetailsPage({ navigation }) {

    let auth = getAuth();

    const onPressHandler = () => {
      signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
          if (auth.currentUser.emailVerified) { //This will return true or false
            console.log('Email is verified')
            console.log(response.user)
            navigation.navigate('ChatsPage');
          } else {
            console.log('Email not verified')
            alert("Your email has not been verified");
          }
      //console.log(response.user)
      //navigation.navigate('ChatsPage');
      })
      .catch((err) => {
        alert(err.message);
      });
    };

    const onPressForgetPassword = () => {
      navigation.navigate('PasswordResetPage')
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

          <TextInput style={styles.input} value={email} onChangeText={text => setEmail(text)} placeholder= 'Email' placeholderTextColor="black">
          </TextInput>
          <TextInput secureTextEntry={true} style={styles.input} value={password} onChangeText={text => setPassword(text)} placeholder= 'Password' placeholderTextColor="black">
          </TextInput>
  
          <Text style={styles.text}>
            Forgot Password? Click <Text onPress={()=> onPressForgetPassword()} style={styles.text2}>Here</Text>
          </Text>

          <View style={styles.bottom}>
          <Pressable onPress={onPressHandler}
          style={({ pressed }) => [
            { backgroundColor: pressed ? '#ddd' : '#f49d36' },
            styles.button,
          ]}
          >
            <Text style={styles.text}>
              Sign In
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
    flex: 1.5,
    backgroundColor: '#275B9F',
    alignItems: 'center',
    justifyContent: 'center',
  },

  bottom: {
    flex: 1,
    backgroundColor: '#275B9F',
    alignItems: 'center',
    justifyContent: 'flex-start',

  },

  button: {
    width: 65,
    height: 37,
    borderRadius: 10,
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
    width:300,
    height:100,

  },

  imageLogo: {
    flex:1,
    width:200,
    height:100,
  },

  input: {
    borderWidth: 1,
    width: 200,
    height: 35,
    margin:5,
    padding:10,
    alignItems: 'Center',
    justifyContent: 'Center',

  },
  
  text2: {
    textDecorationLine: 'underline',
  }

});

