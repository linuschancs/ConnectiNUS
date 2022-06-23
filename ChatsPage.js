import React, { useState, useEffect, useCallback } from 'react'

import {
  StyleSheet,
  View,
  Text,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from "firebase/auth";
import { doc, onSnapshot, query, where, setDoc, Timestamp, getFirestore, collection, getDoc } from 'firebase/firestore';
import { useIsFocused } from "@react-navigation/native";



import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function ChatsPage({ navigation }) {
    let auth = getAuth();
    const db = getFirestore()
    const [user, setUser] = useState('')
    const [userData, setUserData] = useState(null);
    const isFocused = useIsFocused();
    
    const getUser = async() => {
        const docRef = doc(collection(db, "users"), auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if( docSnap.exists() ) {
            console.log('User Data:', docSnap.data());
            setUserData(docSnap.data());
        } else {
            console.log('No such User Document')
        }
      }
      useEffect(() => {
          if(isFocused) {
            getUser();
          }
      }, [navigation, isFocused]);



    async function onPressHandler() {
      const _id = auth.currentUser.email
      const name = userData ? userData.displayName : 'null' 
      const user = { _id, name }
      await AsyncStorage.setItem('user', JSON.stringify(user))
      setUser(user)
      navigation.navigate('InnerChatsPage', {user});

    }

    return (
        <View style={styles.body}>

            <Pressable onPress={onPressHandler}
          style={({ pressed }) => [
            { backgroundColor: pressed ? '#ddd' : '#f49d36' },
            styles.button,
          ]}
          >
            <Text style={styles.text2}>
              Join Chatroom
            </Text>
          </Pressable>
                  
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
    },

    text2: {
        width:100,
        textAlign: 'center',
    }
})