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


import "isomorphic-fetch"

export default class WatchlistNotifications extends Component {

    constructor(props) {
        super(props);
        this.state = {
          watchlist:[],
          addingToWatchlistStatus:null,
          notificationStatus:null,
          nbhd: '',
          userID: '',
          nbhdID:'',
          nbhdEn: '',


        }
    }
//inqID is:522
//inqID is:642
//inqID is:812 | flags 2 | deleted
//inqID is: 1712 | flag 1
// inqID is: 52 | flag 0
// inquID is: 32 | flag 0
// inquID is:1752 | flag:0
// inquID is:1742 | flag:0

 addToWatchlist = async () => {
   let response=null;

try {

let url = 'https://shurfa-flask.herokuapp.com/addnbhd';
console.log(url);
await fetch(url, {
method: 'POST',
headers: {
  'Content-Type': 'application/json',
},
body: JSON.stringify({
  "nbhd": this.state.nbhdName,
  "userID": this.state.userID,
  "nbhdID":this.state.nbhdID,
  "nbhdEn": this.state.nbhdEn
}),
}).then(res => {
return res.status;
})
.then(res => {
  response = res;
  this.setState({addingToWatchlistStatus: response})
});
}
catch(e){
console.log('error cached!'+e.messgae)
}
    }

toggleNotification = async () => {
      let userID = this.state.userID;
      let id = this.state.nbhdID;
      let response = null;
      let url = 'https://shurfa-flask.herokuapp.com/togglenbhdnot/'+id+'/'+userID;
      console.log(url);
      await fetch(url)
      .then(res => {
        if (res.status == 404)
        return 404;
        return res.json();
    }).then(res => {
      response = res;
      this.setState({notificationStatus: response})

    })
    }


    //userID: 232 | Sami
    //userID: 622 | Layla
    // existing neighborhood: 10100003025 - 10100003024 - 10100003023- Layla
    // nonexisting neighborhood: 10100003001 - Layla - حي العمل - Al Amal
    // it requires :
    //"nbhd": nbhdName,
    //"userID": userID,
    //"nbhdID":nbhdID,
    //"nbhdEn": nbhdEn

    //toggle function: Toggled successfully
    //userID: 622 | Layla
    //10100003024 id


    render() {
      return (
        <Text>hello</Text>
      )}

  }
