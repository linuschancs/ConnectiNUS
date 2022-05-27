import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image, 
  TextInput
  
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function SettingsPage({ navigation }) {
    return (
        <View style={styles.body}>
            <Pressable
            style={{
                position: 'absolute',
                right:50,
                top: 50,
                borderWidth:1,
                borderColor:'rgba(0,0,0,0.2)',
                alignItems:'center',
                justifyContent:'center',
                width:50,
                height:50,
                backgroundColor:'#fff',
                borderRadius:50,
                }}
            >
            <FontAwesome5 name={"user"}  size={30} color="#01a699" />
            </Pressable> 
            <Text style={styles.text1}> This is the Settings Page. This page has not been implemented.</Text>      
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
      flex:1,
      backgroundColor: '#4B8BDF',
      alignItems: 'center',
      justifyContent: 'center',
    },

    text1: {
        textAlign: 'center',
    }
})