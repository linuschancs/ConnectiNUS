import React, {useState} from 'react';
import { 
  StyleSheet, 
  Text,
  View, 
  Image,
  Button,
  } from 'react-native';

const App = () => {
  hello

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
        <Button title= "Login" color = "#F49D36">
        </Button>

        <Text style={styles.text}>
          Do not have an account? Sign up here
        </Text>

      </View>

    </View>
    );
  };
      
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

export default App;
