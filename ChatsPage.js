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
import { FlipInYRight } from 'react-native-reanimated';



export default function ChatsPage({ navigation }) {
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

    const getColor = async () => {
      if (userData == null) {
        console.log('user data is null')
        return 
      } else {
        console.log('searching for module color')
        await getUser();
        userData.userChatGroups.forEach(async (element) => {
          const moduleRef = doc(collection(db, "chats"), element);
          const docSnap = await getDoc(moduleRef);
          if (docSnap.exists()) {
              console.log(docSnap.data().color)
              const temp = moduleColor;
              temp[element] = docSnap.data().color;
              console.log(temp);
              setModuleColor(temp)
          } else {
            console.log("No such module chat document!")
          }
        })
      }
    }
    async function onPressHandler(module) {
      const _id = auth.currentUser.email
      const name = userData ? userData.displayName : 'null' 
      const user = { _id, name }
      await AsyncStorage.setItem('user', JSON.stringify(user))
      setUser(user)
      navigation.navigate('InnerChatsPage', {user, module});
    }

    return (
        <ScrollView style={styles.body} contentContainerStyle={{ alignItems: 'center'}}>
          {userData ?
                    (userData.userChatGroups.length === 0
                    ? 
                    <View style={styles.noChatText}>
                      <Text style={styles.noChatText2}>You have not joined any chat groups!</Text>
                    </View>
                    :
            userData.userChatGroups.map(element => {
              return (                
              <Pressable onPress={() => onPressHandler(element)}
                style={({ pressed }) => [
                  { backgroundColor: pressed ? '#ddd' : '#fff' },
                  styles.button,
                ]}
                >
                <View style={{
                  backgroundColor: 'hsl(209, 100%, 80%)',
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
          }))
          :
          <View></View>
          }
        </ScrollView>
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
      textAlign: 'center',
      top: '20%',
      fontSize: 30
    }
})