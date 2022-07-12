import React, { useState, useEffect, useCallback } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ScrollView,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { doc, deleteDoc, getFirestore, collection, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { useIsFocused } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Avatar } from 'react-native-paper';
import ModData from "./nusMods2022.json";

export default function ChatGroupDetails({ route, navigation }) {
    const db = getFirestore();
    let auth = getAuth();
    const {module} = route.params;
    const moduleTitle = ModData.filter(item => {
        return item.moduleCode.includes(module);
    });
    const [userData, setUserData] = useState(null);
    const [usersData, setUsersData] = useState([]);
    const isFocused = useIsFocused();
    
    const getUsers = async() => {
        const querySnapshot = await getDocs(collection(doc(collection(db, "chats"), module), "users"));
        const arr = [];
        querySnapshot.forEach((doc) => {
            arr.push(doc.data());
        })
        setUsersData(arr);
    }

    const getOwnUser = async() => {
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
            getUsers();
            getOwnUser();
        }
    }, [navigation, isFocused]);

    const getInitials = (string) => {
        const names = string.split(' ')
        let initials = names[0].substring(0, 1).toUpperCase();
        if (names.length > 1) {
            initials += names[names.length - 1].substring(0, 1).toUpperCase();
        }
        return initials;
    };

    const onPressOtherUser = (email) => {
        const user = {
            _id : email
        };
        navigation.navigate('OtherUserProfilePage', {user})
    }

    const onPressOwnUser = () => {
        navigation.navigate('MyProfilePage')
    }

    const onPressLeaveChat = () => {
        const docRef = doc(collection(db, "users"), auth.currentUser.uid);
        const moduleUsersRef = doc(collection(doc(collection(db, "chats"), module), "users"), auth.currentUser.uid);
        deleteDoc(moduleUsersRef);
        const temp = userData.userChatGroups;
        const filtered = temp.filter((element) => {return element != module})
        updateDoc(docRef, {
                userChatGroups: filtered,
        })
        navigation.navigate('ChatsPage')
    }

    return (
        <SafeAreaView style={styles.body}>
            <ScrollView
            style={styles.container}
            contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
            showsVerticalScrollIndicator={false}>
            <Avatar.Text size={160} label={module.substring(0,2)} style={{backgroundColor: '#FFCBC1'}}/>
                <Text style={styles.userName}>{module}</Text>
                <Text style={styles.aboutUser}>{moduleTitle[0].title}</Text>
                <TouchableOpacity
                    style={styles.userBtn}
                    onPress={onPressLeaveChat}>
                    <Text style={styles.userBtnTxt}>Leave Chat</Text>
                </TouchableOpacity>
            <Text style={styles.usersHeader}>Users</Text>
            { userData ?
            <Pressable style={styles.usersList}
            onPress={onPressOwnUser}
            >
            <Avatar.Text size={40} label={getInitials(userData.displayName)} style={styles.avatar}/>
            <Text style={styles.usersName}>
            {userData.displayName}
            </Text>
            </Pressable>
            : <View></View>
            }

                    {
                        usersData ?
                        usersData.map((doc) => {
                            if (doc.email.toLowerCase() == auth.currentUser.email) {
                                return (<View></View>);
                            } else {
                                return (                
                                    <Pressable style={styles.usersList} onPress={() => onPressOtherUser(doc.email.toLowerCase())}
                                      >
                                    <Avatar.Text size={40} label={getInitials(doc.displayName)} style={styles.avatar}/>
                                      <Text style={styles.usersName}>
                                        {doc.displayName}
                                      </Text>
                                    </Pressable>);
                            }
                        }
                        )
                      :
                      <View style={styles.groupPic}>
                        <Text>No users!</Text>
                      </View>
                    }
            </ScrollView>   
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    body: {
      flex:1,
      //backgroundColor: '#4B8BDF',
      //alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
    },
    aboutUser: {
        fontSize: 12,
        fontWeight: '600',
        color: '#666',
        textAlign: 'center',
        marginBottom: 10,
    },
    userBtn: {
        borderColor: '#2e64e5',
        borderWidth: 2,
        borderRadius: 3,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginHorizontal: 5,
        marginVertical: 10
    },
    userBtnTxt: {
        color: '#2e64e5',
    },
    usersHeader: {
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        fontSize: 20,
        marginVertical: '5%'
    },
    usersList: {
        flexDirection: 'row',
        borderColor: '#567',
        borderWidth: 1,
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    usersName: {
        fontSize: 20,
        marginHorizontal: 10,
        marginVertical: 8
    },
    avatar: {
        backgroundColor: '#456',
    }
})