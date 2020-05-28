import * as WebBrowser from "expo-web-browser";
import React ,{ Component } from 'react';

import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  StatusBar,
  Dimensions,
  TextInput,
  Button
} from "react-native";

import {SmallLogo} from "../components/SmallLogo";
import {SearchBar} from "../components/SearchBar";
import {AbdoRegularText} from "../components/AbdoRegularText";
import {MonoText} from "../components/StyledText";
import Colors from "../constants/Colors";
import EntypoIcons from "../components/EntypoIcons";
import IonIcon from "../components/IonIcon";
import FeatherIcon from "../components/FeatherIcon";
import FeatherIconCustom from "../components/FeatherIconCustom";
//import RiyadhDistrictsRegions from "../RiyadhDistrictsRegions.json";
import "isomorphic-fetch"

export default class Register extends Component {



    constructor(props) {
        super(props);
        this.state = {
          name:'',
          email:'',
          emailBorders:'gray',
          password:'',
          confPassword:'',
          nbhd: null,
          nbhdEn:-1,
          nbhdID:-1,
          passErrorMsg:'none',
          errorMsgVisibility:'none',
          failedRegistration:'none',
          expoPushToken:'fakeToken[x15M23e3452]',
          registerationStatus:0,
        }
    }


    validateEmail = () => {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
      if(reg.test(this.state.email)===false)
        this.setState({emailBorders:'red'});
    }

    identicalPass = () => {
      if (this.state.password !== this.state.confPassword){
          this.setState({passErrorMsg:'flex'});
      }
      else {
        this.setState({passErrorMsg:'none'});
      }
  }

     handleRegister =  async () => {
       this.identicalPass();

       if(this.state.name=='' || this.state.email=='' || this.state.password=='' || this.state.confPassword==''){
         this.setState({errorMsgVisibility:'flex'});
         this.setState({
                 registerationStatus: 'missing fields'
             });
             return;
       }
       if(this.state.errorMsgVisibility=='flex'||this.state.passErrorMsg=='flex'){
         this.setState({
                 registerationStatus: 404
             });
             return;
       }
       await fetch('https://shurfa-flask.herokuapp.com/adduser', {
         method: 'POST',
         headers: {
           //Accept: 'application/json',
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
           name: this.state.name, //replaced with values from input fields
           email: this.state.email,
           password: this.state.password,
           nbhd: this.state.nbhd,
           nbhdEn: '-',
           nbhdID: '-',
           notStat:0,
           token:this.state.expoPushToken,
         }),
       }).then(res => {

         return res.status;

         })
         .then(res => {
           if(res==404){
             this.setState({
                     registerationStatus: 404
                 });
           }

           if(res==200){
             this.setState({
                     registerationStatus: 200
                 });
           }
           if(res==500){
             this.setState({
                     registerationStatus: 500
                 });
           }
           if(res==503){
             this.setState({
                     registerationStatus: 503
                 });
           }

       });

    }

    fetchFile =   () => {

    return 1
        /*  RiyadhDistrictsRegions.map((neighborhood, index) => {
            if (neighborhood.id ==10100003001)
              return 1;
              else return -1;
          })
*/
    }
    render() {
      return (
        <Text>hello</Text>
      )}

  }
