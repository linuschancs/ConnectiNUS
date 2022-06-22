// @refresh reset

import React, { useState, useEffect, useCallback } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, TextInput, View, Button } from 'react-native';
import { app, database, chatsRef, usersRef } from './firebaseConfig';
import { doc, onSnapshot, query, where, setDoc, Timestamp } from 'firebase/firestore';
import { getAuth } from "firebase/auth";




export default function InnerChatsPage() {
    let auth = getAuth();

    const displayName = query((usersRef), where("email", "==" , auth.currentUser.email))
    const [user, setUser] = useState('null')
    const [name, setName] = useState('')
    const [messages, setMessages] = useState([])

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

    async function handlePress() {
        const _id = Math.random().toString(36).substring(7)
        const user = { _id, name }
        await AsyncStorage.setItem('chats', JSON.stringify(user))
    }

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

    if (user) {
        return <GiftedChat messages={messages} user={user} onSend={handleSend} />
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
})
}