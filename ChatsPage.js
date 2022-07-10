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


    async function onPressHandler(module) {
      const _id = auth.currentUser.email
      const name = userData ? userData.displayName : 'null' 
      const user = { _id, name }
      await AsyncStorage.setItem('user', JSON.stringify(user))
      setUser(user)
      navigation.navigate('InnerChatsPage', {user, module});
    }



    return (
        <ScrollView style={styles.body} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
          {userData ?
            userData.userChatGroups.map(element => {
              return (                
              <Pressable onPress={() => onPressHandler(element)}
                style={({ pressed }) => [
                  { backgroundColor: pressed ? '#ddd' : '#fff' },
                  styles.button,
                ]}
                >
                <View style={{
                  backgroundColor: 'hsl(' + Math.floor(Math.random() * 360) + ', 100%, 80%)',
                  position: 'absolute',
                  top: '20%',
                  left: '5%',
                  height: 60,
                  width: 60,
                  borderRadius: 30,
                  }}>
                  <Text style={styles.groupText}>{element.substring(0,2)}</Text>
                </View>

                <Text style={styles.text1}>
                  {element}
                </Text>
              </Pressable>);
          })
          :
          <View style={styles.groupPic}>
            <Text style={styles.groupText}>You have not joined any chat groups!</Text>
          </View>
          }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    body: {
      flex:1,
      backgroundColor: '#4B8BDF',
    },
    groupPic: {

    },
    button: {
      bottom: '10%',
      marginVertical: '5%',
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