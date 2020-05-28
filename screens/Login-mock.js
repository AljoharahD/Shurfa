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

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
          email:'',
          password:'',
          token:'fakeToken[x15M23e3452]',
          loginStatus:true,
        }
    }

     handleLogin =  async () => {

      if (this.state.email==''||this.state.password==''){
        this.setState({
                loginStatus: 404
            });
      }

      await fetch('https://shurfa-flask.herokuapp.com/login', {
        method: 'POST',
        headers: {
          //Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
          token:this.state.token,
        }),
      }).then(res => {
        return res.status;
        })
        .then( res => {
          if(res==404){
            this.setState({
                    loginStatus: 404
                });
          }

          if(res==200){
            this.setState({
                    loginStatus: 200
                });
          }
          if(res==500){
            this.setState({
                    loginStatus: 500
                });
          }
          if(res==503){
            this.setState({
                    loginStatus: 503
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
