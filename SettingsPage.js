import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image, 
  TextInput
  
} from 'react-native';

export default function SettingsPage({ navigation }) {
    return (
        <View style={styles.body}>
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