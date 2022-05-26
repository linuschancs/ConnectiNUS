import React, {useState} from 'react';
import { 
  StyleSheet, 
  Text,
  View,
  Pressable, 
  } from 'react-native';

  export default function ScreenB({ navigation }) {

    const onPressHandler = () => {
      // navigation.navigate('Screen_A');
      navigation.goBack();
    }
  
    return (
      <View style={styles.body}>
        <Text style={styles.text}>
          Screen B
        </Text>
        <Pressable
          onPress={onPressHandler}
          style={({ pressed }) => ({ backgroundColor: pressed ? '#ddd' : '#f49d36' })}
        >
          <Text style={styles.text}>
            Go Back to Screen A
          </Text>
        </Pressable>
      </View>
    )
  }
      
const styles = StyleSheet.create({
  body: {
    flex:1,
    backgroundColor: '#275B9F',
    alignItems: 'center',
    justifyContent: 'center',

  },

  text: {
    color: '#FFF',
    margin: 10,
  },

});

