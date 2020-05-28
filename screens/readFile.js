import React from 'react';
//import react in our code.

import { FlatList, Text, View, StyleSheet, ScrollView, SafeAreaView,TouchableHighlight } from 'react-native';
import { Card } from 'react-native-elements';
//import {DrawerNavigator} from 'react-navigation';
import {createAppContainer } from 'react-navigation';
//import {createStackNavigator } from 'react-navigation-stack';
//import { createDrawerNavigator } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/Octicons';
//import firebase from 'firebase';
import Constants from 'expo-constants';
import { AbdoRegularText} from '../components/AbdoRegularText';
import data from './schools.json';

//import * as RNFS from 'react-native-fs';


export default class Lifestyle extends React.Component {

  constructor(props){
  	super(props);
  	this.state={
  		dataSource: []
  	};
  }
  componentDidMount(){
  	this.setState({
  		dataSource: data.users
  	});
  }
  render() {
  	 return (
  <View style={styles.container} >
          <Text style={styles.h2text}>
            Schools in AlGhadeer
          </Text>
            <FlatList
            data={this.state.dataSource}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) =>
            <View style={styles.flatview}>
              <Text style={styles.name}>{item[0].name}</Text>
              <Text style={styles.email}>{item.email}</Text>
            </View>
            }
            keyExtractor={item => item.email}
          />
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 50,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    h2text: {
      marginTop: 10,
      fontFamily: 'Helvetica',
      fontSize: 36,
      fontWeight: 'bold',
    },
    flatview: {
      justifyContent: 'center',
      paddingTop: 30,
      borderRadius: 2,
    },
    name: {
      fontFamily: 'Verdana',
      fontSize: 18
    },
    email: {
      color: 'red'
    }

  });
