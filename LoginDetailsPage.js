import React, {useState} from 'react';
import { 
  StyleSheet, 
  Text,
  View,
  Pressable,
  Image,
  TextInput
  } from 'react-native';

  export default function LoginDetailsPage({ navigation }) {

    const onPressHandler = () => {
      // navigation.navigate('Screen_A');
      navigation.navigate('ChatsPage');
    }

    const onPressForgetPassword = () => {
      navigation.navigate('PasswordResetPage');
    }
  
    return (
      <View style={styles.body}>      
        <View style={styles.top}>
          <Image style={styles.nusLogo}source={require('./assets/nuswhite2.png')}>
          </Image>
        </View>
        <View style={styles.center}>
          <Image style={styles.imageName}source={require('./assets/name.png')}>
          </Image>
          <Image style={styles.imageLogo}source={require('./assets/logo.png')}>
          </Image>
        </View>

          <TextInput style={styles.input} placeholder= 'Email' placeholderTextColor="black">
          </TextInput>
          <TextInput secureTextEntry={true} style={styles.input} placeholder= 'Password' placeholderTextColor="black">
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

