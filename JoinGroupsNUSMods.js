import React, { useState, useEffect, useCallback } from 'react'

import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from "firebase/auth";
import { doc, onSnapshot, query, where, setDoc, Timestamp, getFirestore, collection, getDoc } from 'firebase/firestore';
import { useIsFocused } from "@react-navigation/native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


export default function JoinGroupsNUSMods({ navigation }) {
    let auth = getAuth();
    const db = getFirestore();
    const [user, setUser] = useState('')
    const [userData, setUserData] = useState(null);

    const [modsLink, setModsLink] = useState(null);
    const isFocused = useIsFocused();

    const handlePress = async() => {
      let mods = modsLink.split('?');
      let mods2 = mods[1].split('&');
      let finalModuleList = []
      for (let i = 0; i < mods2.length; i++) {
        let mods3 = mods2[i].split('=');
        final.push(mods3[0])
      }
    }
    
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
        <View style={styles.body}>
          <Text style={styles.text}>Enter your NUSMods Sharing Link Below!</Text>
          <View style={styles.input}>

          <TextInput 
            placeholder="NUSMods Sharing Link"
            placeholderTextColor="#666666"
            onChangeText={text => setModsLink(text)}
            autoCorrect={false}
            style={styles.textInput}
          />

          </View>
          <TouchableOpacity
            style={styles.userBtn}
            onPress={handlePress}>
            <Text style={styles.userBtnTxt}>Join Groups</Text>
          </TouchableOpacity>


        </View>
    );
}



const styles = StyleSheet.create({
    body: {
      flex:1,
      paddingTop: 20,
      justifyContent:'center',
      alignItems: 'center',
    },

    userBtn: {
      justifyContent:'center',
      alignSelf: 'center',
      width: 80,
      borderColor: '#2e64e5',
      borderWidth: 2,
      borderRadius: 3,
      paddingVertical: 8,
      paddingHorizontal: 5,
      marginHorizontal: 5,
    },
    userBtnTxt: {
      textAlign: 'center',
      color: '#2e64e5',
    },
    action: {
      flexDirection: 'row',
      marginTop: 10,
      marginBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 5,
    },
    text: {
      padding:20
    },
    textInput: {
      fontSize: 15,
      borderColor: 'gray', borderWidth: 2,
      padding:10
    },
    input: {
      paddingBottom:20,
      width: 250,
    }

})