import React from 'react';

import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  
} from 'react-native';

export default function LoginPage({ navigation }) {
    const onPressHandler = () => {
      navigation.navigate('LoginDetailsPage');
    }

    const onPressSignUp = () => {
      navigation.navigate('SignUpPage');
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
  
        <View style={styles.bottom}>
          <Pressable onPress={onPressHandler}
          style={({ pressed }) => [
            { backgroundColor: pressed ? '#ddd' : '#f49d36' },
            styles.button,
          ]}
          >
            <Text style={styles.text}>
            Login
            </Text>
          </Pressable>
  
          <Text style={styles.text}>
          Do not have an account? Sign up <Text onPress={()=> onPressSignUp()} style={styles.text2}>Here </Text>
          </Text>
  
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
    flex: 1,
    backgroundColor: '#275B9F',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  bottom: {
    flex: 1,
    backgroundColor: '#275B9F',
    alignItems: 'center',
    justifyContent: 'flex-start',

  },

  button: {
    width: 58,
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
    flex:1,
    width:300,
    height:100,
  },

  imageLogo: {
    flex:1,
    width:200,
    height:100,
  },


  text2: {
    textDecorationLine: 'underline',
  }

});

