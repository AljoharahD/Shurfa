import * as WebBrowser from "expo-web-browser";
import React, {useState, useEffect} from "react";
import {withNavigation} from "react-navigation";
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
  Button,
  Alert,
  AsyncStorage
} from "react-native";

import DeleteWatchlist from '../components/alertMessages/DeleteWatchlist';
import SuccessWatchlist from '../components/alertMessages/SuccessWatchlist';
import DeleteWatchlistSuccess from '../components/alertMessages/DeleteWatchlistSuccess';
import ComparisonForm from '../components/alertMessages/ComparisonForm';

import {SmallLogo} from "../components/SmallLogo";
import {RiyadhsRegions} from "../components/RiyadhsRegions";
import {SearchBar} from "../components/SearchBar";
import {Demographics} from "../components/neighborhoodProfile/Demographics";
import {POIMap} from "../components/neighborhoodProfile/POIMap";
import {Education} from "../components/neighborhoodProfile/Education";
import {Facilities} from "../components/neighborhoodProfile/Facilities";
import {Sentiment} from "../components/neighborhoodProfile/sentiment";
import {Lifestyle} from "../components/neighborhoodProfile/Lifestyle";
import {Gallery} from "../components/neighborhoodProfile/Gallery";
import {Events} from "../components/neighborhoodProfile/Events";
import {Inquiries} from "../components/neighborhoodProfile/Inquiries";
import {AbdoRegularText} from "../components/AbdoRegularText";
import {MonoText} from "../components/StyledText";
import Colors from "../constants/Colors";
import EntypoIcons from "../components/EntypoIcons";
import IonIcon from "../components/IonIcon";
import FeatherIcon from "../components/FeatherIcon";
import FeatherIconCustom from "../components/FeatherIconCustom";
import MaterialIcons from "../components/MaterialCommunityIcons";
import DefMaterialIcons from "../components/MaterialIcons";
import RiyadhDistricts from '../RiyadhDistricts.json'



export default function NeighborhoodProfile({navigation}) {
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [results, setResults] = useState([]);
  const [mapLayout, setMapLayout] = useState(0);
  const [eduLayout, setEduLayout] = useState(0);
  const [facLayout, setFacLayout] = useState(0);
  const [sentimentLayout, setSentimentLayout] = useState(0);
  const [lifestyleLayout, setLifestyleLayout] = useState(0);
  const [galleryLayout, setGalleryLayout] = useState(0);
  const [eventsLayout, setEventsLayout] = useState(0);
  const [inquiriesLayout, setInquiriesLayout] = useState(0);

  const [maps, setMaps] = useState(0);
  const [boundaries, setBoundaries] = useState([]);

  const [education, setEducation] = useState(0);
  const [lifestyle, setLifestyle] = useState(0);
  const [facilities, setFacilities] = useState(0);
  const [sentiment, setSentiment] = useState(0);
  const [gallery, setGallery] = useState(0);
  const [events, setEvents] = useState(0);
  const [inquiries, setInquiries] = useState(0);
  const [twitter, setTwitter] = useState(0);
  const [coloredIcon, setColoredIcon] = useState("maps");
  const [_scrollView, setScrollView] = useState([]);
  const [key, setKey] = useState(0);
  const [uID, setUID] = useState('');

  const findDimesions = () => {
    if (maps != 0 && events != 0) return;
    if (mapLayout) {
      mapLayout.measure((x, y, w, h, pX, pY) => {
        setMaps(y);
      });

      eduLayout.measure((x, y, w, h, pX, pY) => {
        setEducation(y);
      });

      facLayout.measure((x, y, w, h, pX, pY) => {
        setFacilities(y);
      });

      lifestyleLayout.measure((x, y, w, h, pX, pY) => {
        setLifestyle(y);
      });

      sentimentLayout.measure((x, y, w, h, pX, pY) => {
        setSentiment(y);
      });


      galleryLayout.measure((x, y, w, h, pX, pY) => {
        setGallery(y);
      });

      eventsLayout.measure((x, y, w, h, pX, pY) => {
        setEvents(y);
      });

      inquiriesLayout.measure((x, y, w, h, pX, pY) => {
        setInquiries(y);
      });
    }
  };

  const moveScroll = section => {
    switch (section) {
      case "maps":
        _scrollView.scrollTo({y: maps});
        break;

      case "education":
        _scrollView.scrollTo({y: education});
        break;

      case "lifestyle":
        _scrollView.scrollTo({y: lifestyle});
        break;

      case "facilities":
        _scrollView.scrollTo({y: facilities});
        break;

        case "sentiment":
          _scrollView.scrollTo({y: sentiment});
          break;

      case "gallery":
        _scrollView.scrollTo({y: gallery});
        break;

      case "events":
        _scrollView.scrollTo({y: events});
        break;

      case "inquiries":
        _scrollView.scrollTo({y: inquiries});
        break;
    }
  };

  const handleScroll = event => {
    let position = event.nativeEvent.contentOffset.y;
    if (position > 0 && position < education - 20) {
      setColoredIcon("maps");
    } else if (position >= education - 20 && position < facilities - 20) {
      setColoredIcon("education");
    } else if (position >= facilities - 20 && position < lifestyle - 100) {
      setColoredIcon("facilities");
    } else if (position >= lifestyle - 100 && position < sentiment - 100) {
      setColoredIcon("lifestyle");
    } else if (position >= sentiment - 100 && position < gallery - 100) {
      setColoredIcon("sentiment");
    } else if (position >= gallery - 100 && position < events - 100) {
      setColoredIcon("gallery");
    } else if (position >= events - 100 && position < inquiries - 300) {
      setColoredIcon("events");
    } else if (position >= inquiries - 300) {
      setColoredIcon("inquiries");
    }
  };

  const addToWatchlist = () => {
    //should get the neighborhood name
    let nbhdName = 'الربيع' // later we change
    let userID = 152;
    let url = 'https://shurfa-flask.herokuapp.com/addnbhd';
    console.log(url);
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "nbhd": nbhdName,
        "userID": userID
      }),
    }).then(res => {
      return res.json();
    })
    .then(res => {
      console.log("response is: ");
      console.log(res);
      Alert.alert("تمت إضافة الحي إلى قائمتك")
  });

  }

  const handleComparison = (navigation,) => {


  if (navigation.state.params.searchComparisonNbhd)
  return (<ComparisonForm cancelAlerts={()=>cancelAlerts()} navigation={navigation}/>)

  }

  useEffect(() => {
    findDimesions();
  });

  useEffect(() => {
    navigation.setParams({searchComparisonNbhd: false});
    addedToWatchlist()
    retrieveUserData()
  },[]);

  async function retrieveUserData() {
    let userId= await AsyncStorage.getItem("id");
    navigation.setParams({userId: userId});
  }

  async function addedToWatchlist(){
    let userID = await AsyncStorage.getItem("id")
    if(userID=='') return;
    if (userID==null) {
      navigation.setParams({guest: true});
      return;
    }
    let url = 'https://shurfa-flask.herokuapp.com/watchlist/'+userID;

    fetch(url).then(res => {
        return res.json();
    }).then(res => {

        let watchlist = [];
        for (var i = 0; i < res.length; i++) {
          if(res[i].nbhd == navigation.state.params.neighborhoodName){
            navigation.setParams({isAddedToWatchlist: true});

          return;}
        } //end for

    });
  }

  async function removeNeighborhood (nbhd) {
    console.log('success! entered method')
    let userId= await AsyncStorage.getItem("id");
    let currentNbhd = await AsyncStorage.getItem("nbhd");
    currentNbhd = currentNbhd.replace(/"/g,"");
    console.log("current nbhd : " + currentNbhd);
    console.log("nbhd : " + nbhd)
    if (currentNbhd == nbhd){
      console.log("remove nbhd from async storage")
      await AsyncStorage.setItem("nbhd", JSON.stringify(-1));
    }
    console.log('userId'+userId)
    console.log('nbhd'+nbhd)
    let url = 'https://shurfa-flask.herokuapp.com/deletenbhd';
      console.log(url);
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nbhd: nbhd,
          userID: userId,
        }),
      }).then(res => {
        return res.status;
      })
      .then(res => {
        if(res!==200){
        Alert.alert("حدث خطأ ما! أعد المحاولة")
        return;}
        navigation.setParams({DeleteWatchlistSuccess: true});
        console.log("response is: ");
      })
      navigation.setParams({isAddedToWatchlist: false});
  }

  function cancelAlerts() {
    navigation.setParams({confirmDeleteWatchlist: false});
    navigation.setParams({successWatchlist: false});
    navigation.setParams({DeleteWatchlistSuccess: false});
    navigation.setParams({searchComparisonNbhd: false});

  }





  return [
    <View style={styles.container}>
    {navigation.state.params.confirmDeleteWatchlist?<DeleteWatchlist cancelDeletion={()=>cancelAlerts()} removeNeighborhood={()=> removeNeighborhood(navigation.state.params.neighborhoodName)}/>:null}
    {navigation.state.params.successWatchlist?<SuccessWatchlist cancelDeletion={()=>cancelAlerts()}/>:null}
    {navigation.state.params.DeleteWatchlistSuccess?<DeleteWatchlistSuccess cancelDeletion={()=>cancelAlerts()}/>:null}
    {navigation.state.params.searchComparisonNbhd?handleComparison(navigation):null}
      <View style={[styles.navigationBar]}>
        <View style={[styles.horizontalIcons]} horizontal={true}>
          <TouchableOpacity onPress={() => {
              moveScroll("maps")}
            }>
            <FeatherIconCustom
              style={styles.navIcon}
              name={"map"}
              color={coloredIcon == "maps" ? Colors.darkMint : Colors.lightGray}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            moveScroll("education")}
            }>
            <FeatherIconCustom
              style={styles.navIcon}
              name={"book-open"}
              color={
                coloredIcon == "education" ? Colors.darkMint : Colors.lightGray
              }
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            moveScroll("facilities")}
          }>
            <DefMaterialIcons
              style={styles.navIcon}
              name={"business"}
              color={
                coloredIcon == "facilities" ? Colors.darkMint : Colors.lightGray
              }
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            moveScroll("lifestyle")}
          }>
            <MaterialIcons
              style={styles.navIcon}
              name={"flower-outline"}
              color={
                coloredIcon == "lifestyle" ? Colors.darkMint : Colors.lightGray
              }
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            moveScroll("sentiment")}
          }>
            <MaterialIcons
              style={styles.navIcon}
              name={"comment-text-outline"}
              color={
                coloredIcon == "sentiment" ? Colors.darkMint : Colors.lightGray
              }
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            moveScroll("gallery")}
          }>
            <FeatherIconCustom
              style={styles.navIcon}
              name={"image"}
              color={
                coloredIcon == "gallery" ? Colors.darkMint : Colors.lightGray
              }
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            moveScroll("events")}}
            >
            <FeatherIconCustom
              style={styles.navIcon}
              name={"calendar"}
              color={
                coloredIcon == "events" ? Colors.darkMint : Colors.lightGray
              }
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            moveScroll("inquiries")}
          }>
            <MaterialIcons
              style={styles.navIcon}
              name={"comment-question-outline"}
              color={
                coloredIcon == "inquiries" ? Colors.darkMint : Colors.lightGray
              }
            />
          </TouchableOpacity>


        </View>
      </View>

      <ScrollView
        onScroll={event => handleScroll(event)}
        scrollEventThrottle={16}
        ref={scrollView => {
          setScrollView(scrollView);
        }}
      >
        <View style={[styles.innerContainer]}>
          <View>
            <Demographics
              neighborhoodName={navigation.state.params.neighborhoodName}
              neighborhoodID={navigation.state.params.neighborhoodID}
            />
          </View>

          <View
            ref={map => {
              setMapLayout(map);
            }}
          >
            <POIMap
              neighborhoodName={navigation.state.params.neighborhoodName}
              neighborhoodID={navigation.state.params.neighborhoodID}
              boundaries={boundaries}
            />
          </View>

          <View
            ref={education => {
              setEduLayout(education);
            }}
            style={{flex: 1, width: "100%"}}
          >
            <Education
              neighborhoodID={navigation.state.params.neighborhoodID}
              neighborhoodName={navigation.state.params.neighborhoodName}
            />
          </View>

          <View
            ref={facilities => {
              setFacLayout(facilities);
            }}
            style={{flex: 1, width: "100%"}}
          >
            <Facilities
              neighborhoodID={navigation.state.params.neighborhoodID}
              neighborhoodName={navigation.state.params.neighborhoodName}
            />
          </View>

          <View
            ref={lifestyle => {
              setLifestyleLayout(lifestyle);
            }}
            style={{flex: 1, width: "100%"}}
          >
            <Lifestyle
              neighborhoodID={navigation.state.params.neighborhoodID}
              neighborhoodName={navigation.state.params.neighborhoodName}
            />
          </View>

          <View
            ref={sentiment => {
              setSentimentLayout(sentiment);
            }}
            style={{flex: 1, width: "100%"}}
          >
            <Sentiment
              neighborhoodName={navigation.state.params.neighborhoodName}
            />
          </View>

          <View
            ref={gallery => {
              setGalleryLayout(gallery);
            }}
            style={{flex: 1, width: "100%"}}
          >
            <Gallery
              neighborhoodName={navigation.state.params.neighborhoodName}
              neighborhoodNameEn={navigation.state.params.neighborhoodNameEn}
            />
          </View>

          <View
            ref={events => {
              setEventsLayout(events);
            }}
            style={{flex: 1, width: "100%"}}
          >
            <Events
              neighborhoodName={navigation.state.params.neighborhoodName}
            />
          </View>

          <View
            ref={inquiries => {
              setInquiriesLayout(inquiries);
            }}
            style={{flex: 1, width: "100%"}}
          >
            <Inquiries
              neighborhoodName={navigation.state.params.neighborhoodName}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  ];
}


NeighborhoodProfile.navigationOptions = ({navigation}) => ({
  headerTintColor: Colors.darkMint,
  headerTitle: () => <SmallLogo />,
  headerStyle: {
    height: 55
  },
  headerRight: () => (
    <TouchableOpacity
      style={{marginRight: 15}}
      onPress={async () => {

        if (navigation.state.params.isAddedToWatchlist){
          navigation.setParams({confirmDeleteWatchlist: true});
          return;
        }
try {
   let nbhdName = navigation.state.params.neighborhoodName;
    let userID = navigation.state.params.userId;
    let nbhdID = navigation.state.params.neighborhoodID
    let nbhdEn = navigation.state.params.neighborhoodNameEn
    let url = 'https://shurfa-flask.herokuapp.com/addnbhd';
    console.log(url);
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "nbhd": nbhdName,
        "userID": userID,
        "nbhdID":nbhdID,
        "nbhdEn": nbhdEn
      }),
    }).then(res => {
      return res.status;
    })
    .then(res => {
      console.log('watchlist response isss:'+res)
      if (res!=200) {
      Alert.alert("حدث خطأ ما! أعد المحاولة")
      return
      }
      navigation.setParams({isAddedToWatchlist: true});
      navigation.setParams({successWatchlist: true});
  }); }
  catch(e){
    console.log('error cached!'+e.messgae)
  }
          }}

    >
      {navigation.state.params.guest?null:(<MaterialIcons name={navigation.state.params.isAddedToWatchlist?'bookmark-remove':'bookmark-outline'} size={26} color={Colors.darkMint} />)}
    </TouchableOpacity>
  ),
  headerLeft: () => (
    <TouchableOpacity
      onPress={async () => {

            navigation.setParams({searchComparisonNbhd: true});
      }}
      style={{marginLeft: 15}}
    >
      <MaterialIcons name={"select-compare"} color={Colors.darkMint} />
    </TouchableOpacity>
  )
});

const styles = StyleSheet.create({
  navigationBar: {
    height: 40,
    borderColor: Colors.brightGray,
    borderBottomWidth: 0.2,
    backgroundColor: "white",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowColor: "black",
    shadowOffset: {height: 0, width: 0}
  },
  adjacent: {
    marginTop: 35,
    marginBottom: 20,
    flexDirection: "row"
  },
  container: {
    flex: 1
  },
  innerContainer: {
    alignItems: "center",
    width: Dimensions.get("window").width,
    backgroundColor: "white",
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowColor: "black",
    overflow: "visible",
    shadowOffset: {height: -5, width: 0}
  },
  neighborhoodTouchable: {
    width: 350,
    height: 70,
    marginBottom: 15,
    borderRadius: 10,

    justifyContent: "center",
    backgroundColor: Colors.lightBlue,
    alignItems: "center"
  },
  neighborhoodCard: {
    paddingTop: 10,
    flexDirection: "row"
  },
  verticalAlignment: {
    flex: 1,
    flexDirection: "row"
  },
  navIcon: {
    //marginRight: 15
  },
  horizontalIcons: {
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    flex: 1
  },
  mapContainer: {
    width: 330,
    height: 220
  },
  ModalContainer: {
    height: 450,
    alignItems:'center',
    justifyContent:'center',

  },

  slide: {
    height: 450,
    width:350,
    borderRadius: 25,
    padding:0,
    paddingBottom:10,
    backgroundColor: "white",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowColor: "black",
    shadowOffset: {height: 0, width: 0},
    overflow:'hidden'
  },

  clearButton: {
    height:40,
    width:200,
    alignSelf:'center',
    paddingTop:5,
    marginTop:20,
    borderColor:Colors.darkMint,
    borderWidth:1,
    borderRadius:25
  },
  icon:{
    width:'100%',
    backgroundColor:Colors.vLightYellow,
    height:'50%',
    alignItems:'center',
    justifyContent:'center',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25
  },
  neighborhoodTouchable:{

    width: 300,
    height:70,
    marginBottom:15,
    borderRadius: 10,
    alignSelf:'center',
    justifyContent:'center',
    backgroundColor:Colors.lightBlue,
    alignItems: 'center',

  },

  neighborhoodCard:{
paddingTop:10,
    flexDirection: 'row',
  },
  verticalAlignment:{
    flex:1,
    flexDirection: 'row',

  },
});
