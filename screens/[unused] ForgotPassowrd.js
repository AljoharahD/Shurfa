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
  AsyncStorage,
  Alert
} from "react-native";
import IonIcon from '../components/IonIcon';
import { AbdoRegularText } from '../components/AbdoRegularText';
import Colors from '../constants/Colors';
import {AbdoMediumText} from "../components/AbdoMediumText";
import FeatherIconCustom from "../components/FeatherIconCustom";
import GradientButton from "react-native-gradient-buttons";
import { BackButton } from '../components/BackButton';


//will pass user id here
export default function ForgotPassword({navigation})  {

  const validateEmail = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    console.log("Validation");
    if(reg.test(email)===false)
      setEmailBorders(Colors.darkRed)
    return false;
  }

  handleForgotPassword = () => {
    if (!validateEmail)
        return;
        console.log("not wrong");
        let url = 'https://shurfa-flask.herokuapp.com/sendemail/'+email;
        fetch(url).then(res => {
            return res.json();
        }).then((responseJson) => {
            console.log(responseJson);
            Alert.alert(
                'تم استعادة كلمة المرور بنجاح!',
                'فضلا تفقد بريدك الإلكتروني',
                [
                  {text: 'شكرًا!', onPress: () => {
                    navigation.navigate('Login');
                  }
                },
                ],
                {cancelable: false},
                );
        })
  }

  useEffect(() => {

  }, []);

  const [email, setEmail] = useState('');
  const [emailBorders, setEmailBorders] = useState('#D7D7D7');

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
        style={[{borderColor: emailBorders, borderWidth: 0.5, borderRadius:25}, styles.inputBar]}
          placeholder="البريد الإلكتروني"
           keyboardType="email-address"
           onChangeText={(email) => {
                  setEmail(email);
                  setEmailBorders('#D7D7D7')
            }}
            onEndEditing={(email) =>{validateEmail(email);} }
            value={email}
           >
           </TextInput>
            </View>
          <GradientButton
            textStyle={{margin: 5,paddingTop:10}}
            gradientBegin="#7BC3B5"
            gradientEnd="#ABDBD1"
            gradientDirection="diagonal"
            height={45}
            width={300}
            radius={25}
            style={{ marginTop:30}}
            onPressAction={()=>{handleForgotPassword()}}
          >
            <AbdoRegularText size={18}>
              استعادة كلمة المرور
            </AbdoRegularText>
          </GradientButton>

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
    backgroundColor: "white",
    flexDirection: "row",
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


ForgotPassword.navigationOptions = ({navigation}) => ({
  headerTintColor:Colors.darkMint,
  headerTitle: () => <AbdoMediumText size={18} color={Colors.darkMint}>استعادة كلمة المرور</AbdoMediumText>,
  headerStyle: {
        height:55,
      },



});


const NavigationConnected = withNavigation(ForgotPassword);
export {NavigationConnected as ForgotPassword};
