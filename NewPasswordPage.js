import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image, 
  TextInput
  
} from 'react-native';

export default function NewPasswordPage({ navigation }) {
    const onPressHandler = () => {
      navigation.navigate('SuccessfulPasswordResetPage');
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

        <TextInput style={styles.input} placeholder= 'New Password' placeholderTextColor="black">
        </TextInput>
        <TextInput style={styles.input} placeholder= 'Confirm New Password' placeholderTextColor="black">
        </TextInput>

        <View style={styles.bottom}>
          <Pressable onPress={onPressHandler}
          style={({ pressed }) => [
            { backgroundColor: pressed ? '#ddd' : '#f49d36' },
            styles.button,
          ]}
          >

          <Text style={styles.text}>
              Reset Password
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
    width: 123,
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

