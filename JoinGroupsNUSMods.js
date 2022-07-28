import React, { useState, useEffect, useCallback } from 'react'

import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth } from "firebase/auth";
import { collection, getFirestore, doc, getDoc, updateDoc, setDoc, query, increment, FieldValue } from "firebase/firestore";   
import { useIsFocused } from "@react-navigation/native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


export default function JoinGroupsNUSMods({ navigation }) {
    let auth = getAuth();
    const db = getFirestore();
    const [user, setUser] = useState('')
    const [userData, setUserData] = useState(null);

    const [modsLink, setModsLink] = useState(null);
    const isFocused = useIsFocused();

    const handlePress = () => {
        if (modsLink.length < 30) {
            Alert.alert("Invalid Link Error", "Please enter a valid NUS Mods Sharing Link");
            return;
        } else if (modsLink.substring(0,30) != "https://nusmods.com/timetable/") {
            Alert.alert("Invalid Link Error", "Please enter a valid NUS Mods Sharing Link");
            return;
        }
      let mods = modsLink.split('?');
      let mods2 = mods[1].split('&');
      let finalModuleList = [];
      for (let i = 0; i < mods2.length; i++) {
        let mods3 = mods2[i].split('=');
        finalModuleList.push(mods3[0])
      }
      console.log(finalModuleList);
      finalModuleList.forEach(async (moduleCode) => {
        if (userData.userChatGroups.includes(moduleCode)) {
            return;
        }
        const docRef = doc(collection(db, "users"), auth.currentUser.uid);
        const temp = userData.userChatGroups;
        userData.userChatGroups.push(moduleCode);
        updateDoc(docRef, {
                userChatGroups: temp,
        })
        .then(() => {
            getUser();
            console.log('Chat Group Joined!');
            console.log(userData.userChatGroups)
        })
        const moduleRef = doc(collection(db, "chats"), moduleCode);
        const docSnap = await getDoc(moduleRef);
        if (docSnap.exists()) {
            setDoc(moduleRef, {
                counter: increment(1),
            }, {merge : true});
        } else {
            setDoc(moduleRef, {
                color: pastel,
                counter: increment(1),
            }, {merge : true});
            console.log('Added color')
        }
        const moduleUsersRef = doc(collection(moduleRef, "users"), auth.currentUser.uid);
        setDoc(moduleUsersRef, {
            displayName: userData.displayName,
            email: userData.email,
            uid: userData.uid,
        });
      })
      navigation.navigate('ChatsPage');
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