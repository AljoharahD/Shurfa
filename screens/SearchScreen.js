import * as WebBrowser from "expo-web-browser";
import React, {useState, useEffect} from "react";

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
import {RiyadhsRegions} from "../components/RiyadhsRegions";
import {SearchBar} from "../components/SearchBar";
import {AbdoRegularText} from "../components/AbdoRegularText";
import {MonoText} from "../components/StyledText";
import Colors from "../constants/Colors";
import EntypoIcons from "../components/EntypoIcons";
import IonIcon from "../components/IonIcon";
import FeatherIcon from "../components/FeatherIcon";
import FeatherIconCustom from "../components/FeatherIconCustom";
import RiyadhDistrictsRegions from "../RiyadhDistrictsRegions.json";

export default function SearchScreen({navigation}) {
  const [neighborhoods, setNeighborhoods] = useState([
    ["mlz", "mlz", ""],
    ["mlz", "mlz", ""]
  ]);
  const [results, setResults] = useState([]);

  const search = text => {
    if (text == "") {
      setResults([]);
      return;
    }
    let searchResults = [];
    //Search in the neighborhoods array for any name that has the parameter text
    neighborhoods.map(u => {
      if (u[0].includes(text)) searchResults.push(u);
    });
    console.log(searchResults);

    //Only show the similar ones on the results
    setResults(searchResults);
  };

  useEffect(() => {

    let neighborhoodsArray = [];
    RiyadhDistrictsRegions.map((district, index) => {
      neighborhoodsArray.push([
        district.name_ar,
        district.name_en,
        district.district_id
      ]);
      setNeighborhoods(neighborhoodsArray);
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.innerContainer]}>
        <View style={[styles.adjacent]}>
          <FeatherIconCustom name={"map"} color={Colors.mediumGray} />
          <AbdoRegularText
            size={18}
            style={{color: Colors.mediumGray, lineHeight: 28}}
          >
            {" "}
            استكشف أحياء الرياض
          </AbdoRegularText>
        </View>
        <SearchBar onChangeText={text => search(text)} autoFocus={true} />
        <TextInput></TextInput>
      </View>

      <View
        style={{
          justifyContent: "center",
          flexGrow: 1,
          alignItems: "center",
          width: Dimensions.get("window").width,
          backgroundColor: "white"
        }}
      >
        {results.map(district => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("NeighborhoodProfile", {
                  neighborhoodName: district[0],
                  neighborhoodNameEn: district[1],
                  neighborhoodID: district[2],
                });
              }}
              style={[styles.neighborhoodTouchable]}
            >
              <View style={[styles.neighborhoodCard]}>
                <View style={[styles.verticalAlignment]}>
                  <AbdoRegularText
                    size={18}
                    style={{color: Colors.darkBlue, lineHeight: 28, left: 20}}
                  >
                    {" "}
                    {district[0]}
                  </AbdoRegularText>
                  <IonIcon
                    size={24}
                    name={"ios-arrow-back"}
                    color={Colors.darkBlue}
                    style={{position: "absolute", right: 20}}
                  />
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}

SearchScreen.navigationOptions = {
  headerTintColor: Colors.darkMint,
  headerTitle: () => <SmallLogo />,
  headerStyle: {
    height: 55
  }
};

const styles = StyleSheet.create({
  adjacent: {
    marginTop: 35,
    marginBottom: 20,
    flexDirection: "row"
  },
  container: {
    flex: 1
  },
  innerContainer: {
    justifyContent: "center",
    flexGrow: 1,
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
  }
});
