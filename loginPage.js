import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image, 
  
} from 'react-native';

export default function loginPage({ navigation }) {
    const onPressHandler = () => {
      navigation.navigate('ScreenB');
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
  
        <View style={styles.bottom}>
          <Pressable onPress={onPressHandler}
          style={({ pressed }) => ({ backgroundColor: pressed ? '#ddd' : '#f49d36' })}
          >
            <Text style={styles.text}>
            Go to Screen B
            </Text>
          </Pressable>
  
          <Text style={styles.text}>
            Do not have an account? Sign up here
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
    justifyContent: 'center',

  },
  
  center: {
    flex: 'column',
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

  text: {
    color: '#FFF',
    margin: 10,
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
    height:200,
  },




});

