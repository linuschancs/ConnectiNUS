import React, {useState, useEffect, useContext} from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
} from 'react-native';
import ModData from "./nusMods2022.json";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { collection, getFirestore, doc, getDoc, updateDoc, setDoc, query, increment, FieldValue } from "firebase/firestore";   
import { getAuth } from "firebase/auth";
import { useIsFocused } from "@react-navigation/native";

export default function SearchPage({ navigation }) {
        const [text, setText] = useState("");
        const [filtered, setFiltered] = useState([])
        const [searching, setSearching] = useState(false)
        const [module, setModule] = useState('')
        const [modulecount, setModuleCount] = useState(0)
        const [userData, setUserData] = useState(null);
        const isFocused = useIsFocused();
        
        let auth = getAuth();
        const db = getFirestore();

        const hue = Math.floor(Math.random() * 360);
        const pastel = 'hsl(' + hue + ', 100%, 80%)';

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

        const getModuleCount = async (item) => {
            const moduleRef = doc(collection(db, "chats"), item);
            const docSnap = await getDoc(moduleRef);
            if( docSnap.exists() ) {
                console.log('Module Doc Data:', docSnap.data());
                setModuleCount(docSnap.data().counter);
            } else {
                console.log('No such Document')
                setModuleCount(0);
            }
        }

        const onSearch = (text) => {
          if (text === "") {
            setSearching(false)
            setFiltered([])
          }
          else {
            setSearching(true)
            const temp = text.toUpperCase()
            const tempList = ModData.filter(item => {
                return item.moduleCode.includes(temp)
            })
            setFiltered(tempList)
          }
      
        }

        const joinGroup = async (moduleCode) => {
            Alert.alert(
                'Chat Group Joined!',
                'You have successfully joined this chat group.'
            );
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
            getModuleCount(moduleCode);
            const moduleUsersRef = doc(collection(moduleRef, "users"), auth.currentUser.uid);
            setDoc(moduleUsersRef, {
                displayName: userData.displayName,
                email: userData.email,
                uid: userData.uid,
            });
        }
        useEffect(() => {
            if(isFocused) {
              getUser();
              if(module != '') {getModuleCount(module.moduleCode);}
            }
        }, [navigation, isFocused]);

        return (
          <SafeAreaView style={styles.body}>
            <View style={styles.container}>
                <TextInput
                style={styles.textInput}
                placeholder="Enter your Module Code..."
                placeholderTextColor='white'
                value={text}
                onChangeText={(value) => {onSearch(value); setText(value);}}
                color = 'white'
                />
                <TouchableOpacity
                style={styles.clearButton}
                onPress={() => {setSearching(false); setFiltered([]); setModule(''); setText('');}}
                >
                  <FontAwesome5
                    name="times-circle"
                    size={30}
                    color="#fff"
                    style={{
                      opacity: 0.8,
                    }}
                  />
                </TouchableOpacity>
            </View>
            <View style={styles.subContainer}>
                {
                    filtered.length !== 0 ?

                        filtered.slice(0,5).map(item => {
                            return (
                                <TouchableOpacity style={styles.itemView} onPress={() => {setModule(item); setFiltered([]); setSearching(false); getModuleCount(item.moduleCode);}}>
                                    <Text style={styles.itemText}>{item.moduleCode}</Text>
                                </TouchableOpacity>
                            )
                        }) 

                        : searching
                        ?
                        <View
                            style={styles.noResultView}>
                            <Text style={styles.noResultText}>No search items matched</Text>
                        </View>
                        : <View></View>
                }
            </View>
                {
                    module ?
                    <View style={styles.moduleCard}>
                        <Text style={styles.moduleHeader}>{module.moduleCode}</Text>
                        <Text style={styles.moduleInfo}>{module.title}</Text>
                        <Text style={styles.moduleNumber}>Number of Chat Users: {modulecount}
                        </Text>
                        {
                            userData.userChatGroups.includes(module.moduleCode) ?
                            <TouchableOpacity
                            style={styles.userBtn2}
                            >
                            <Text style={styles.userBtnTxt2}>Chat Joined</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                            style={styles.userBtn1} onPress={() => joinGroup(module.moduleCode)}
                            >
                            <Text style={styles.userBtnTxt1}>Join Chat</Text>
                            </TouchableOpacity>

                        }

                    </View>
                    :
                    <View></View>
                }
            </SafeAreaView>

        )
    };

const styles = StyleSheet.create({
    body: {
      flex:1,
      backgroundColor: '#4B8BDF',
      alignItems: 'center',
      //justifyContent: 'center',
      //marginTop: '20%',
    },

    textInput: {
        //backgroundColor: '#BFBFBF',
        borderColor: 'white',
        borderWidth: 1.5,
        width: '100%',
        borderRadius: 10,
        height: 50,
        fontSize: 20,
        //fontWeight: 'bold',
        paddingHorizontal: 10,
        top: '5%',
      },
    container: {
        position: 'absolute',
        top: '5%',
        width: '80%',
        alignItems: 'center',
    },
    clearButton: {
        alignSelf: 'flex-end',
        right: '5%',
        bottom: '43%'
    },
    subContainer: {
        position: 'absolute',
        backgroundColor: '#A7C7E7',
        marginHorizontal: 20,
        borderRadius: 10,
        flexWrap: 'wrap',
        top: '11.5%',
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        zIndex: 1,
    },
    itemView: {
        backgroundColor: 'white',
        height: 30,
        width: '90%',
        marginBottom: 10,
        justifyContent: 'center',
        borderRadius: 4,
        marginTop: 10,
    },
    itemText: {
        color: 'black',
        paddingHorizontal: 10,
    },
    noResultView: {
        alignSelf: 'center',
        // margin: 20,
        height: 100,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    noResultText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    moduleCard: {
        position: 'absolute',
        top: '20%',
        backgroundColor: '#fff',
        height: 200,
        width: 300,
        borderRadius: 20,
        shadowOpacity: 0.3,
    },
    moduleHeader: {
        fontWeight: 'bold',
        fontSize: 20,
        top: '5%',
        left: '5%',
        flex: 1
    },
    moduleInfo:{
        flex: 1,
        left: '5%'
    },
    moduleNumber: {
        flex: 1,
        left: '5%',
        bottom: '5%'
    },
    userBtn1: {
        bottom: '5%',
        alignSelf: 'center',
        width: 80,
        borderColor: '#2e64e5',
        borderWidth: 2,
        borderRadius: 3,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginHorizontal: 5,
    },
    userBtnTxt1: {
    textAlign: 'center',
    color: '#2e64e5',
    },
    userBtn2: {
        bottom: '5%',
        alignSelf: 'center',
        width: 80,
        borderColor: '#2ab05b',
        borderWidth: 2,
        borderRadius: 3,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginHorizontal: 5,
    },
    userBtnTxt2: {
    textAlign: 'center',
    color: '#2ab05b',
    },
})