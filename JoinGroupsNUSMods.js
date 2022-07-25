import React, { useState, useEffect, useCallback } from 'react'

import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from "firebase/auth";
import { doc, onSnapshot, query, where, setDoc, Timestamp, getFirestore, collection, getDoc } from 'firebase/firestore';
import { useIsFocused } from "@react-navigation/native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


export default function joinGroupsNUSMods({ navigation }) {
    let auth = getAuth();
    const db = getFirestore();
    const [user, setUser] = useState('')
    const [userData, setUserData] = useState(null);
    //const [moduleColor, setModuleColor] = useState({});
    const isFocused = useIsFocused();
    
    const getUser = async() => {
        const docRef = doc(collection(db, "users"), auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if( docSnap.exists() ) {
            console.log('User Data:', docSnap.data());
            setUserData(docSnap.data());
        } else {
            console.log('No such User Document')
            return '#fff'
        }
      }
      useEffect(() => {
          if(isFocused) {
            getUser();
            //getColor();
          }
      }, [navigation, isFocused]);

    return (
        <View></View>
    );
}

const styles = StyleSheet.create({
    body: {
      flex:1,
      backgroundColor: '#4B8BDF',
      paddingTop: 20
    },
    noChatText: {
      justifyContent: 'center',
      textAlign: 'center',
      marginTop: '50%'
    },
    noChatText2: {
      justifyContent: 'center',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 15
    },
    button: {
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
      textAlign: 'center',
      top: '20%',
      fontSize: 30
    },
    userBtn: {
      alignSelf: 'flex-end',
      marginRight: 20
    },
})