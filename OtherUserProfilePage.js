import React, {useState, useEffect, useContext} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    SafeAreaView,
  } from 'react-native';
import { database, collection, getFirestore, query, where, onSnapshot } from "firebase/firestore";   
import { useIsFocused } from "@react-navigation/native";
import { Avatar } from 'react-native-paper';

export default function OtherUserProfilePage({ route, navigation }) {
    
    const db = getFirestore();
    const {user} = route.params; 
    const [userData, setUserData] = useState(null);
    const isFocused = useIsFocused();

    const getUser = async () => {
        const q = query(collection(db, "users"), where("email", "==", user._id));
        const temp =  await onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setUserData(doc.data());
                console.log(doc.data());
            });
        });
      }
    useEffect(() => {
        if(isFocused) {
          getUser();
        }
    }, [navigation, isFocused]);

    const getInitials = (string) => {
      const names = string.split(' ')
      let initials = names[0].substring(0, 1).toUpperCase();
      if (names.length > 1) {
          initials += names[names.length - 1].substring(0, 1).toUpperCase();
      } else {
  
      }
      return initials;
    };

    return (
      <SafeAreaView style={styles.body}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
          showsVerticalScrollIndicator={false}>
          {userData ? (userData.profilePic ? <Avatar.Image size={160} source={{uri: userData.profilePic}} style={{backgroundColor: userData.userColor}}/> : <Avatar.Text size={160} label={getInitials(userData.displayName)} style={{backgroundColor: userData.userColor}}/>): <View></View>}
            <Text style={styles.userName}>{userData ? userData.displayName : 'null'}</Text>
            <TouchableOpacity
                style={styles.userBtn}>
                <Text style={styles.userBtnTxt}>Add Friend</Text>
            </TouchableOpacity>
            <View style={styles.userInfoWrapper}>
                {userData ? (userData.userStatus ? <Text style={styles.userStatus}>{userData.userStatus}</Text> : <View></View>): <View></View>}
                {userData ? (userData.NUSModsLink ? <Text style={styles.userInfoHeader}>Timetable</Text> : <View></View>): <View></View>}
                {userData ? (userData.NUSModsLink ? <Image style={styles.timetable}
                    resizeMode= 'contain'
                    source={{uri: userData.NUSModsTimetable}}>
                </Image> : <View></View>): <View></View>}
                {userData ? (userData.yearMajor ? <Text style={styles.userInfoHeader}>Year, Major</Text> : <View></View>): <View></View>}
                {userData ? (userData.yearMajor ? <Text>{userData.yearMajor}</Text> : <View></View>): <View></View>}
                {userData ? (userData.email ? <Text style={styles.userInfoHeader}>Email</Text> : <View></View>): <View></View>}
                {userData ? (userData.email ? <Text>{userData.email}</Text> : <View></View>): <View></View>}
                {userData ? (userData.telegramHandle ? <Text style={styles.userInfoHeader}>Telegram Handle</Text> : <View></View>): <View></View>}
                {userData ? (userData.telegramHandle ? <Text>{userData.telegramHandle}</Text> : <View></View>): <View></View>}
            </View>
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
      userImg: {
        height: 150,
        width: 150,
        borderRadius: 75,
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
      userBtnWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 10,
      },
      userBtn: {
        borderColor: '#2e64e5',
        borderWidth: 2,
        borderRadius: 3,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginHorizontal: 5,
      },
      userBtnTxt: {
        color: '#2e64e5',
      },
      userInfoWrapper: {
        //flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginVertical: 20,
      },
      userInfoHeader: {
        flex: 1,
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 20,
        marginBottom: 5,
        fontWeight: 'bold',
      },
      userStatus: {
        textAlign: 'center',
      },
      timetable: {
        //flex:1,
        width:200,
        height:100,
      },
})
