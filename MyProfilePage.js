import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

export default function MyProfilePage({ navigation }) {
    return (
        <View style={styles.body}>

            <Text style={styles.text1}> This is the My Profile Page. This page has not been implemented.</Text>      
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