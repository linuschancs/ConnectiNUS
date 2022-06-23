import React, { useState, useEffect, useCallback } from 'react'

import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ScrollView
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
        <ScrollView style={styles.body} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>

            <Pressable onPress={onPressHandler}
            style={({ pressed }) => [
              { backgroundColor: pressed ? '#ddd' : '#fff' },
              styles.button,
            ]}
            >
            <View style={styles.groupPic}>
              <Text style={styles.groupText}>CS</Text>
            </View>

            <Text style={styles.text1}>
              CS1101S
            </Text>
          </Pressable>
                  
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    body: {
      //flex:1,
      backgroundColor: '#4B8BDF',
    },
    groupPic: {
        position: 'absolute',
        top: '20%',
        left: '5%',
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: '#badfda'
    },
    button: {
      position: 'absolute',
      top: '10%',
      backgroundColor: '#fff',
      height: 100,
      width: 300,
      borderRadius: 20,
      shadowOpacity: 0.3,
    },
    text1: {
      position: 'absolute',
      top: '30%',
      fontWeight: 'bold',
      fontSize: 30,
      left: '30%',
    },
    groupText: {
      top: '20%',
      left: '20%',
      fontSize: 30
    }
})