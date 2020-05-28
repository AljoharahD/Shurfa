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


export default class SearchScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
          searchResults:[],
          riyadhDistricts:['الوادي','الملز','الواحة','السلي','السويدي','وادي لبن','الياسمين','الملقا']
        }
    }

    search = (nbhdName) => {
      if (nbhdName == "") {
        this.setState({searchResults: []})
        return this.state.searchResults.length;
      }
      let results = [];
      //Search in the neighborhoods array for any name that has the parameter text
         this.state.riyadhDistricts.map( (district, index) => {
           if (district.includes(nbhdName))
           results.push(district);
         })
      //Only show the similar ones on the results
       this.setState({searchResults: results})
       return results.length;
    };

    render() {
      return (
        <Text>hello</Text>
      )}

  }
