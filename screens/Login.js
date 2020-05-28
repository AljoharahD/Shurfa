import {withNavigation} from "react-navigation";
import React, { useState, useEffect } from 'react';
import {
  Image,
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  AsyncStorage
} from "react-native";
import IonIcon from '../components/IonIcon';
import { AbdoRegularText } from '../components/AbdoRegularText';
import Colors from '../constants/Colors';
import {AbdoMediumText} from "../components/AbdoMediumText";
import FeatherIconCustom from "../components/FeatherIconCustom";
import GradientButton from "react-native-gradient-buttons";
import { BackButton } from '../components/BackButton';

import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

//will pass user id here
export default function Login({navigation})  {

  const [email, setEmail] = useState('');
  const [emailBorders, setEmailBorders] = useState(Colors.brightGray);
  const [password, setPassword] = useState('');
  const [errorMsgVisibility, setErrorMsgVisibility] = useState('none');
  const [notFoundMsg, setNotFoundMsg] = useState('none');
  const [nullMsgVisibility, setNullMsgVisibility] = useState('none');
  const [expoPushToken, setExpoPushToken] = useState('NULL');

  const validateEmail = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(reg.test(email)===false)
      setEmailBorders(Colors.darkRed)
  }

  const handleLogin =  () => {
    console.log('expoPushToken'+expoPushToken)
    if (email==''||password==''){
      setNullMsgVisibility('flex');
      return;
    }

    fetch('https://shurfa-flask.herokuapp.com/login', {
      method: 'POST',
      headers: {
        //Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        token:expoPushToken,
      }),
    }).then(res => {

      console.log(res.status)
      if(res.status==404){
        return 404;
      }
      else if(res.status==500){
        return 500;
      }
        return res.json();
      })
      .then(async res => {
        console.log(res)
        if (res===404){
        setErrorMsgVisibility('flex');
        return false;}
        if (res===500 || res===503){
          alert("حدث خطأ ما! فضلًا أعد المحاولة")
          return false;}
        else {
        try {

      await AsyncStorage.setItem("LOGGED_IN", "true");
       await AsyncStorage.setItem("email", JSON.stringify(res.email));
       await AsyncStorage.setItem("id", JSON.stringify(res.id));
       await AsyncStorage.setItem("name", JSON.stringify(res.name));
       await AsyncStorage.setItem("nbhd", JSON.stringify(res.nbhd));
       await AsyncStorage.setItem("nbhdEn", JSON.stringify(res.nbhdEn));
       await AsyncStorage.setItem("nbhdID", JSON.stringify(res.nbhdID));
       await AsyncStorage.setItem("notStat", JSON.stringify(res.notStat));
       await AsyncStorage.setItem("password", JSON.stringify(res.password));
       await AsyncStorage.setItem("points", JSON.stringify(res.points));
       await AsyncStorage.setItem("level", JSON.stringify(res.level));
        await AsyncStorage.setItem("token", JSON.stringify(res.token));
       navigation.navigate('AuthTabNavigator')
       return true;
        } catch (error) {
          console.log("Something went wrong", error);
        } // user full info are retrieved
      }
    });

  }

  const registerForPushNotificationsAsync = async () => {
    console.log('here to update login notification')
    if (Constants.isDevice) {

      let token = '';


        const { status }= await Permissions.getAsync(Permissions.NOTIFICATIONS);
        if (status=='granted'){
       token = await Notifications.getExpoPushTokenAsync();
       console.log('token is:'+token)
        setExpoPushToken(token);
      }



    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }
  };



  useEffect(() => {
registerForPushNotificationsAsync();
  }, []);



  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView>
    <View style={{flex:1,  alignItems:'center'}}>

    <Image
      style={{width: 130, height: 150,marginTop:15, marginBottom:7}}
      source={require("../assets/images/icon.png")}
    />

    <View style={styles.form}>


      <View>
        <TextInput
        style={[styles.inputBar]}
        onChangeText={(email) => {
              setErrorMsgVisibility('none');
              setNotFoundMsg('none');
              setNullMsgVisibility('none');
              setEmail(email)
                }}
          placeholder="البريد الإلكتروني"
           keyboardType="email-address"
           ></TextInput>
            </View>


          <TextInput
          style={[styles.inputBar]}
          secureTextEntry={true}
          onChangeText={(password) => {
                setErrorMsgVisibility('none');
                setNotFoundMsg('none');
                setNullMsgVisibility('none');
                setPassword(password)
                  }}
          placeholder="كلمة المرور"></TextInput>

          <TouchableOpacity style={{marginTop:15, width:'40%',alignSelf:'flex-end'}} onPress={()=>{navigation.navigate('PasswordRecovery')}}>
          <AbdoMediumText size={12} textAlign={'left'} color={Colors.blue} style={{ marginRight:15}}>نسيت كلمة المرور؟</AbdoMediumText>
          </TouchableOpacity>

          <AbdoRegularText size={12} textAlign={'center'} style={{height:22,color:Colors.darkRed,lineHeight:28, display:errorMsgVisibility}}>
          البريد الإلكتروني/كلمة المرور غير صحيحة
         </AbdoRegularText>

         <AbdoRegularText size={12} textAlign={'center'} style={{height:22,color:Colors.darkRed,lineHeight:28, display:notFoundMsg}}>
         البريد الإلكتروني غير مسجل. فضلًا، سجل كمستخدم جديد.
        </AbdoRegularText>


         <AbdoRegularText size={12} textAlign={'center'} style={{height:22,color:Colors.darkRed,lineHeight:28, display:nullMsgVisibility}}>
         فضلًا، أدخل بياناتك
        </AbdoRegularText>

          <GradientButton
            textStyle={{margin: 5,paddingTop:10}}
            gradientBegin="#7BC3B5"
            gradientEnd="#ABDBD1"
            gradientDirection="diagonal"
            height={45}
            width={300}
            radius={25}
            style={{ marginTop:15}}
            onPressAction={()=>{handleLogin()}}
          >
            <AbdoRegularText size={18}>
              دخول
            </AbdoRegularText>
          </GradientButton>

          <View style={{flexDirection: 'row', alignItems:'center', justifyContent:'center', paddingTop:15}}>

          <View style={styles.horizontalRuler} />
          <AbdoRegularText size={18} style={{color:Colors.lightGray, alignSelf:'center', paddingHorizontal:10}}>أو</AbdoRegularText>
          <View style={styles.horizontalRuler} />

          </View>

          <TouchableOpacity onPress={()=>{navigation.navigate('Register')}} style={styles.clearButton}>
          <AbdoRegularText size={18} style={{color:Colors.darkBlue, paddingTop:10}}>
            التسجيل كمستخدم جديد
          </AbdoRegularText>
          </TouchableOpacity>

    </View>
    </View>
    </ScrollView>
     </TouchableWithoutFeedback>
  );

}

const styles = StyleSheet.create({

  form: {
    width:Dimensions.get("window").width*0.85,
    borderRadius:15,
    marginTop:15,
    paddingBottom:30,
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowColor: "black",
    overflow: "visible",
    shadowOffset: {height: 0, width: 0},
    backgroundColor:'white'},

  inputBar: {
    height: 45,
    width: 300,
    alignSelf:'center',
    fontFamily: "Abdo-Master-Regular",
    textAlign: "right",
    paddingLeft:15,
    marginTop: 20,
    borderRadius: 25,
    backgroundColor: "white",
    flexDirection: "row",
    borderColor:Colors.brightGray,
    borderWidth:0.5,
    color: Colors.vDarkGray
  },
  clearButton: {
    height:45,
    width:300,
    alignSelf:'center',
    paddingTop:5,
    marginTop:10,
    borderColor:Colors.darkBlue,
    borderWidth:1,
    borderRadius:25
  },

  horizontalRuler:{
    backgroundColor: Colors.lightGray,
    height: 0.5,
    width:'40%',
  },

});


Login.navigationOptions = ({navigation}) => ({
  headerTintColor:Colors.darkMint,
  headerTitle: () => <AbdoMediumText size={18} color={Colors.darkMint}>الدخول</AbdoMediumText>,
  headerStyle: {
        height:55,
      },



});


const NavigationConnected = withNavigation(Login);
export {NavigationConnected as Login};
