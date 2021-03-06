import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  SafeAreaView,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { Switch } from 'react-native-paper';
import { getAuth} from "firebase/auth";

export default function SettingsPage({ navigation }) {
    let auth = getAuth();
    //Display Picture
    const [isSwitchOnDisplayPic, setIsSwitchOnDisplayPic] = React.useState(false);
    const onToggleSwitchDisplayPic = () => setIsSwitchOnDisplayPic(!isSwitchOnDisplayPic);
    //Status
    const [isSwitchOnStatus, setIsSwitchOnStatus] = React.useState(false);
    const onToggleSwitchStatus = () => setIsSwitchOnStatus(!isSwitchOnStatus);
    //Basic Information
    const [isSwitchOnBasicInfo, setIsSwitchOnBasicInfo] = React.useState(false);
    const onToggleSwitchBasicInfo = () => setIsSwitchOnBasicInfo(!isSwitchOnBasicInfo);  
    //Email Address
    const [isSwitchOnEmail, setIsSwitchOnEmail] = React.useState(false);
    const onToggleSwitchEmail = () => setIsSwitchOnEmail(!isSwitchOnEmail);        
    //Telegram Handle
    const [isSwitchOnTele, setIsSwitchOnTele] = React.useState(false);
    const onToggleSwitchTele = () => setIsSwitchOnTele(!isSwitchOnTele);
    //Timetable
    const [isSwitchOnTimetable, setIsSwitchOnTimetable] = React.useState(false);
    const onToggleSwitchTimetable = () => setIsSwitchOnTimetable(!isSwitchOnTimetable);
    //Sound Notification
    const [isSwitchOnSound, setIsSwitchOnSound] = React.useState(false);
    const onToggleSwitchSound = () => setIsSwitchOnSound(!isSwitchOnSound);
    //Vibration Notification
    const [isSwitchOnVibration, setIsSwitchOnVibration] = React.useState(false);
    const onToggleSwitchVibration = () => setIsSwitchOnVibration(!isSwitchOnVibration);
    //Message Preview
    const [isSwitchOnMessage, setIsSwitchOnMessage] = React.useState(false);
    const onToggleSwitchMessage = () => setIsSwitchOnMessage(!isSwitchOnMessage);
    
    const logout = () => {
        auth.signOut()
        .then(()=> {
            console.log('User successfully signed out');
            navigation.navigate('LoginPage');
        })
        .catch((error) => {
            alert(error.message);
            console.log(error);
        })
        
    };
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scroll}
            showsVerticalScrollIndicator={false}>
            <View style={styles.body}>
              <Text style={styles.text2}>
                Privacy
              </Text>   
            </View>

            <View style={styles.slider}>
              <Text style={styles.text}> Display Picture </Text>
            
              <Switch color={"green"} value={isSwitchOnDisplayPic} onValueChange={onToggleSwitchDisplayPic} />
            </View>

            <View style={styles.slider}>
              <Text style={styles.text}> Status </Text>
              <Switch color={"green"} value={isSwitchOnStatus} onValueChange={onToggleSwitchStatus} />
            </View>

            <View style={styles.slider}>
              <Text style={styles.text}> Basic Information (Year, Major) </Text>
              <Switch color={"green"} value={isSwitchOnBasicInfo} onValueChange={onToggleSwitchBasicInfo} />
            </View>

            <View style={styles.slider}>
              <Text style={styles.text}> Email Address </Text>
              <Switch color={"green"} value={isSwitchOnEmail} onValueChange={onToggleSwitchEmail} />
            </View>

            <View style={styles.slider}>
              <Text style={styles.text}> Telegram Handle </Text>
              <Switch color={"green"} value={isSwitchOnTele} onValueChange={onToggleSwitchTele} />
            </View>

            <View style={styles.slider}>
              <Text style={styles.text}> Timetable </Text>
              <Switch color={"green"} value={isSwitchOnTimetable} onValueChange={onToggleSwitchTimetable} />
            </View>

            <View style={styles.body}>
              <Text style={styles.text2}>
                Notifications
              </Text>   
            </View>

            <View style={styles.slider}>
              <Text style={styles.text}> Sound Notification </Text>
              <Switch color={"green"} value={isSwitchOnSound} onValueChange={onToggleSwitchSound} />
            </View>

            <View style={styles.slider}>
              <Text style={styles.text}> Vibration Notification </Text>
              <Switch color={"green"} value={isSwitchOnVibration} onValueChange={onToggleSwitchVibration} />
            </View>

            <View style={styles.slider}>
              <Text style={styles.text}> Message Preview </Text>
              <Switch color={"green"} value={isSwitchOnMessage} onValueChange={onToggleSwitchMessage} />
            </View>


            <TouchableOpacity
                style={styles.userBtn}
                onPress={() => {
                logout();
                }}>
                <Text style={styles.userBtnTxt}>Logout</Text>
                
            </TouchableOpacity>
            </ScrollView>

        </SafeAreaView>
      );
  }
  
  const styles = StyleSheet.create({
      body: {
        flex: 0.6,
        backgroundColor: '#4B8BDF',
        //alignItems: 'left',
        justifyContent: 'center',
        padding: 10
      },
      container: {    
        flex: 1,
        padding: 20,
        backgroundColor: '#4B8BDF',

        },
      clown: {
        alignSelf: "flex-end",
        justifyContent: 'flex-end',


      },
      text: {
        color: '#FFF',
        margin: 10,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
      },

      text2: {
        fontSize: 20,
        fontWeight: 'bold',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF',
        margin: 10,
        //alignItems: 'left',
        justifyContent: 'center',
        
      },

      slider: {
        flex : 0.5,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 5
      },


        userBtn: {
          backgroundColor: '#fff',
          borderColor: '#2e64e5',
          borderWidth: 2,
          borderRadius: 10,
          paddingVertical: 10,
          paddingHorizontal: 10,
          marginHorizontal: '40%',
          flex: 1,
          marginTop: '5%',
          marginBottom: '25%',
          


        },
        userBtnTxt: {
          color: '#2e64e5',
          textAlign: 'center'

        },
        text1: {
            padding: 20,
            textAlign: 'center',
        },
  })