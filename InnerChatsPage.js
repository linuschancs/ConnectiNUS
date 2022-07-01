// @refresh reset

import React, { useState, useEffect, useCallback } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, TextInput, View, Button, Pressable, Text } from 'react-native';
import { app, database, chatsRef } from './firebaseConfig';
import { doc, onSnapshot, query, where, setDoc, Timestamp, getFirestore, collection, getDoc } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { useIsFocused } from "@react-navigation/native";
import ChatHeader from './components/ChatHeader';

export default function InnerChatsPage({route, navigation}) {

    let auth = getAuth();
    const db = getFirestore()
    const {user} = route.params;  
    const [messages, setMessages] = useState([])

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
    
    const onPressUser = () => {
        navigation.navigate('OtherUserProfilePage')
    }


    useEffect(() => {
        const unsubscribe = onSnapshot(chatsRef, (querySnapshot) => {
            const messagesFirestore = querySnapshot.docChanges()
                .filter(({ type }) => type === 'added')
                .map(({ doc }) => {
                    const message = doc.data();

                    //const time = new Timestamp ( message.createdAt['seconds'] , message.createdAt['nanoseconds'] )
                    return { ...message, createdAt: message.createdAt.toDate()}
                })
                .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            appendMessages(messagesFirestore)
            
        })
        return () => unsubscribe()
    }, [])

    const appendMessages = useCallback(
        (messages) => {
            setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
        },
        [messages]
    )

    async function handleSend(messages) {
        const writes = messages.map(async (m) => {
            const messageRef = doc(chatsRef)
            try {
                await setDoc(messageRef, m)
            }
            catch(error) {
                console.log('error sending message', error)
            }
        });

        await Promise.all(writes)
    }
    const onPressGroup = () => {
        navigation.navigate('ChatGroupDetails');
    }
    return (
        <View style={{flex: 1}}>
            <Pressable style={styles.header} onPress={onPressGroup}>
              <Text style={styles.headertext}>CS1101S</Text>
            </Pressable>
            <GiftedChat messages={messages} renderUsernameOnMessage={true} onPressAvatar={onPressUser} user={user} onSend={handleSend} />
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },
    input: {
        height: 50,
        width: '100%',
        borderWidth: 1,
        padding: 15,
        marginBottom: 20,
        borderColor: 'gray',
    },
    header: {
        width: '100%',
        height: '10%',
        backgroundColor: '#6EB5FF',
        alignItems: 'center',
    },
    headertext: {
        fontWeight: 'bold',
        fontSize: 25,
        top: '40%'
    }
})
