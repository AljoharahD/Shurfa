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


import {SmallLogo} from "../components/SmallLogo";
import {RiyadhsRegions} from "../components/RiyadhsRegions";
import {SearchBar} from "../components/SearchBar";
import {CompareDemographics} from "../components/compare/CompareDemographics";
import {CompareEducation} from "../components/compare/CompareEducation";
import {CompareFacilities} from "../components/compare/CompareFacilities";
import {CompareLifestyle} from "../components/compare/CompareLifestyle";
import {AbdoRegularText} from "../components/AbdoRegularText";
import {MonoText} from "../components/StyledText";
import Colors from "../constants/Colors";
import EntypoIcons from "../components/EntypoIcons";
import IonIcon from "../components/IonIcon";
import FeatherIcon from "../components/FeatherIcon";
import Iconfeather from '../components/FeatherIcon';
import FeatherIconCustom from "../components/FeatherIconCustom";
import SimpleLineIcons from '../components/SimpleLineIcons';
import MaterialIcons from "../components/MaterialCommunityIcons";
import DefMaterialIcons from "../components/MaterialIcons";
import RiyadhDistricts from '../RiyadhDistricts.json'
import KPIs from '../components/RowsKPIs.json';


export default function Compare({navigation}) {
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [results, setResults] = useState([]);

  const [demographicsLayout, setDemographicsLayout] = useState(0);
  const [eduLayout, setEduLayout] = useState(0);
  const [facLayout, setFacLayout] = useState(0);
  const [lifestyleLayout, setLifestyleLayout] = useState(0);

  const [boundaries, setBoundaries] = useState([]);

  const [demographics, setDemographics] = useState(0);
  const [education, setEducation] = useState(0);
  const [lifestyle, setLifestyle] = useState(0);
  const [facilities, setFacilities] = useState(0);


  const [coloredIcon, setColoredIcon] = useState("demographics");
  const [_scrollView, setScrollView] = useState([]);
  const [key, setKey] = useState(0);
  const [uID, setUID] = useState('');

  const findDimesions = () => {
    if (education != 0) return;
    if (demographicsLayout) {
      demographicsLayout.measure((x, y, w, h, pX, pY) => {
        setDemographics(y);
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
    }

  };

  const moveScroll = (section) => {
    try{
    switch (section) {
      case "demographics":
        _scrollView.scrollTo({y: demographics});
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
    }
  }
  catch(e){
    console.log(e.message)
  }
  };

  const handleScroll = event => {
    let position = event.nativeEvent.contentOffset.y;
    console.log()
    if (position >= 0 && position < education-30) {
      setColoredIcon("demographics");
    } else if (position >= education-30 && position < facilities-30) {
      setColoredIcon("education");
    } else if (position >= facilities-30 && position < lifestyle-100) {
      setColoredIcon("facilities");
    } else {
      setColoredIcon("lifestyle");
    }
    }



  useEffect(() => {
    console.log('nbhdOne'+navigation.state.params.nbhdOne)
    console.log('nbhdTwo'+navigation.state.params.nbhdTwo)
    findDimesions();
  });


  return [
    <View style={styles.container}>
      <View style={[styles.navigationBar]}>
        <View style={[styles.horizontalIcons]} horizontal={true}>
          <TouchableOpacity onPress={() => moveScroll('demographics')}>
            <FeatherIconCustom
              style={styles.navIcon}
              name={"user"}
              size={24}
              color={coloredIcon == "demographics" ? Colors.darkMint : Colors.lightGray}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => moveScroll("education")}>
            <FeatherIconCustom
              style={styles.navIcon}
              name={"book-open"}
              color={
                coloredIcon == "education" ? Colors.darkMint : Colors.lightGray
              }
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => moveScroll("facilities")}>
            <DefMaterialIcons
              style={styles.navIcon}
              name={"business"}
              color={
                coloredIcon == "facilities" ? Colors.darkMint : Colors.lightGray
              }
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => moveScroll("lifestyle")}>
            <MaterialIcons
              style={styles.navIcon}
              name={"flower-outline"}
              color={
                coloredIcon == "lifestyle" ? Colors.darkMint : Colors.lightGray
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
          <View
          ref={demographics => {
            setDemographicsLayout(demographics);
          }}>
            <CompareDemographics
            nbhdOne={navigation.state.params.nbhdOne} nbhdTwo={navigation.state.params.nbhdOne}
            />
          </View>


          <View
            ref={education => {
              setEduLayout(education);
            }}
            style={{flex: 1, width: "100%"}}
          >
            <CompareEducation
            nbhdOne={navigation.state.params.nbhdOne} nbhdTwo={navigation.state.params.nbhdOne}
            />
          </View>

          <View
            ref={facilities => {
              setFacLayout(facilities);
            }}
            style={{flex: 1, width: "100%"}}
          >
            <CompareFacilities
            nbhdOne={navigation.state.params.nbhdOne} nbhdTwo={navigation.state.params.nbhdOne}
            />
          </View>

          <View
            ref={lifestyle => {
              setLifestyleLayout(lifestyle);
            }}
            style={{flex: 1, width: "100%"}}
          >
            <CompareLifestyle
            nbhdOne={navigation.state.params.nbhdOne} nbhdTwo={navigation.state.params.nbhdOne}
            />
          </View>

        </View>
      </ScrollView>
    </View>
  ];
}


Compare.navigationOptions = ({navigation}) => ({
  headerTintColor: Colors.darkMint,
  headerTitle: () => <SmallLogo />,
  headerStyle: {
    height: 55
  },
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
    marginRight: 15
  },
  horizontalIcons: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flex: 1
  },
  mapContainer: {
    width: 330,
    height: 220
  }
});
