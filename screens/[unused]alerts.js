import * as WebBrowser from 'expo-web-browser';
import React from 'react';
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
} from 'react-native';
import { SmallLogo } from '../components/SmallLogo';
import { RiyadhsRegions } from '../components/RiyadhsRegions';
import { SearchBar } from '../components/SearchBar';
import { AbdoRegularText } from '../components/AbdoRegularText';
import { MonoText } from '../components/StyledText';
import Colors from '../constants/Colors';
import EntypoIcons from '../components/EntypoIcons';
import IonIcon from '../components/IonIcon';
import FeatherIcon from '../components/FeatherIcon';
import FeatherIconCustom from '../components/FeatherIconCustom';
import GradientButton from 'react-native-gradient-buttons';
import { Card } from 'react-native-elements';

import AwesomeAlert from 'react-native-awesome-alerts';

export default class Alerts extends React.Component {

  constructor(props) {
    super(props);
    this.state = { showAlert: false };
  };

  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };

  render() {
    const {showAlert} = this.state;

    return (
      <View style={styles.container}>

        <Text>I'm AwesomeAlert</Text>
        <TouchableOpacity onPress={() => {
          this.showAlert();
        }}>
          <View style={styles.button}>
            <Text style={styles.text}>Try me!</Text>
          </View>
        </TouchableOpacity>

        <AwesomeAlert
        style
          show={showAlert}
          showProgress={false}
          title=<View style={{ borderRadius:3, backgroundColor:'white', width:200, height:110, marginLeft:70}}>
          </View>
          message=
          <AbdoRegularText size={18} style={{color:Colors.gray, marginBottom:40}}  >
          تمت إضافة الحي إلى قائمتك</AbdoRegularText>

          //messageStyle={fontSize= 10}
          alertContainerStyle={{}}
          contentContainerStyle={{
            height:180,
            width:200,
            backgroundColor:'#F7FBE5',
             paddingTop:70,
            }}

          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={false}
          cancelText="No, cancel"
          confirmText="Yes, delete it"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {
            this.hideAlert();
          }}
          onConfirmPressed={() => {
            this.hideAlert();
          }}
        />
      </View>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  button: {
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 5,
    backgroundColor: "#AEDEF4",
  },
  text: {
    color: '#fff',
    fontSize: 15
  }
});
