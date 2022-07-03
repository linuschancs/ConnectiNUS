import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function ChatGroupDetails({ navigation }) {
    return (
        <View style={styles.body}>

            <Text style={styles.text1}> This is the Chat Group Details Page. This page has not been implemented.</Text>      
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