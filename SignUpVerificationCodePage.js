import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image, 
  TextInput
  
} from 'react-native';

export default function SignUpVerificationCodePage({ navigation }) {
    const onPressHandler = () => {
      navigation.navigate('SuccessfulSignUpPage');
    }
  
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
            We have sent a verification code to your email, enter it here to successfully create your account!
        </Text>

        <TextInput style={styles.input} placeholder= 'Verification Code' placeholderTextColor="black">
        </TextInput>

        <View style={styles.bottom}>
          <Pressable onPress={onPressHandler}
          style={({ pressed }) => [
            { backgroundColor: pressed ? '#ddd' : '#f49d36' },
            styles.button,
          ]}
          >

            <Text style={styles.text}>
              Submit
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
    width: 68,
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

