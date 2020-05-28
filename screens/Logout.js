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



//will pass user id here
export default function Login({navigation})  {

  const validateEmail = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(reg.test(email)===false)
      setEmailBorders(Colors.darkRed)
  }

  const handleLogin =  () => {

    fetch('https://shurfa-flask.herokuapp.com/login', {
      method: 'POST',
      headers: {
        //Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'sami@gmail.com',
        password: 'sami1234',
      }),
    }).then(res => {
      if(res.status==404){
        setErrorMsgVisibility(true);
        return;
      }
        return res.json();
      })
      .then(async res => {
        navigation.navigate('AuthTabNavigator')
        console.log(res);
        try {
       await AsyncStorage.setItem("email", JSON.stringify(res.email));
       await AsyncStorage.setItem("id", JSON.stringify(res.id));
       await AsyncStorage.setItem("name", JSON.stringify(res.name));
       await AsyncStorage.setItem("nbhd", JSON.stringify(res.nbhd));
       await AsyncStorage.setItem("notStat", JSON.stringify(res.notStat));
       await AsyncStorage.setItem("password", JSON.stringify(res.password));
       await AsyncStorage.setItem("points", JSON.stringify(res.points));
        } catch (error) {
          console.log("Something went wrong", error);
        } // user full info are retrieved
    });

  }



  useEffect(() => {

  }, []);

  const [email, setEmail] = useState('');
  const [emailBorders, setEmailBorders] = useState(Colors.beightGray);
  const [password, setPassword] = useState('');

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={{flex:1,  alignItems:'center'}}>

    <Image
      style={{width: 130, height: 150,marginTop:30, marginBottom:7}}
      source={require("../assets/images/icon.png")}
    />

    <View style={styles.form}>


      <View>
        <TextInput
        style={[styles.inputBar]}
          placeholder="البريد الإلكتروني"
           keyboardType="email-address"></TextInput>
            </View>


          <TextInput
          style={[styles.inputBar]}
          secureTextEntry={true}
          onChangeText={(password) => {
                setPassword(password)
                  }}
          placeholder="كلمة المرور"></TextInput>

          <TouchableOpacity>
          <AbdoMediumText size={12} textAlign={'left'} color={Colors.blue} style={{ marginTop:20, marginRight:15}}>نسيت كلمة المرور؟</AbdoMediumText>
          </TouchableOpacity>

          <GradientButton
            textStyle={{margin: 5,paddingTop:10}}
            gradientBegin="#7BC3B5"
            gradientEnd="#ABDBD1"
            gradientDirection="diagonal"
            height={45}
            width={300}
            radius={25}
            style={{ marginTop:30}}
            onPressAction={()=>{handleLogin()}}
          >
            <AbdoRegularText size={18}>
              دخول
            </AbdoRegularText>
          </GradientButton>

          <View style={{flexDirection: 'row', alignItems:'center', justifyContent:'center', paddingTop:30}}>

          <View style={styles.horizontalRuler} />
          <AbdoRegularText size={18} style={{color:Colors.lightGray, alignSelf:'center', paddingHorizontal:10}}>أو</AbdoRegularText>
          <View style={styles.horizontalRuler} />

          </View>

          <TouchableOpacity style={styles.clearButton}>
          <AbdoRegularText size={18} style={{color:Colors.darkBlue, paddingTop:10}}>
            التسجيل كمستخدم جديد
          </AbdoRegularText>
          </TouchableOpacity>

    </View>
    </View>
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
  },
  clearButton: {
    height:45,
    width:300,
    alignSelf:'center',
    paddingTop:5,
    marginTop:20,
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
