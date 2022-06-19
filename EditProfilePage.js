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



export default function EditProfilePage({ navigation}) {
  
  
    return (
      <SafeAreaView style={styles.body}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
          showsVerticalScrollIndicator={false}>
          <Image
            style={styles.userImg}
            source={require('./assets/profilepic.jpeg')}
          />
            <Text style={styles.userName}>Linus Chan</Text>
            <View style={styles.userInfoWrapper}>
                <Text style={styles.userStatus}>“You're braver than you believe, stronger than you seem and smarter than you think.”</Text>
                <Text style={styles.userInfoHeader}>Timetable</Text>
                <Image style={styles.timetable}
                    resizeMode= 'contain'
                    source={require('./assets/timetable.png')}>
                </Image>
                <Text style={styles.userInfoHeader}>Year, Major</Text>
                <Text>Y1 Computer Science</Text>
                <Text style={styles.userInfoHeader}>Email</Text>
                <Text>E0726447@u.nus.edu</Text>
                <Text style={styles.userInfoHeader}>Telegram Handle</Text>
                <Text>@linuschan</Text>

            </View>
            <TouchableOpacity
                style={styles.userBtn}
                onPress={() => {
                  navigation.navigate('MyProfilePage');
                }}>
                <Text style={styles.userBtnTxt}>Save</Text>
            </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    body: {
      flex:1,
      backgroundColor: '#4B8BDF',
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
       //flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginVertical: 20,
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