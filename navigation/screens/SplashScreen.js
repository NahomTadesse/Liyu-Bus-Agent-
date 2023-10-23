import { width } from "@fortawesome/free-solid-svg-icons/faPenToSquare";
import { useState, useEffect } from "react";
import * as React from "react";
import {
  View,
  Pressable,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

import { useRoute } from "@react-navigation/native";
import { all } from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBus } from "@fortawesome/free-solid-svg-icons/faBus";
const screenWidth = Dimensions.get("window").width;

export default function SplashScreen({ navigation }) {
  const getStarted = () => {
    //     navigation.navigate('languageselection')
    navigation.navigate("login");
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#EBEBEB",
      }}
    >
      <FontAwesomeIcon icon={faBus} size={250} style={{ color: "#3c6791" }} />
      <Text style={{ fontSize: 50, color: "#3c6791", top: 10 }}>LIYU BUS</Text>
      <Text style={{ color: "#3c6791", top: 5 }}>{`Search > Book > Go`}</Text>

      <Pressable
        onPress={getStarted}
        style={{
          backgroundColor: "#f27f22",
          width: screenWidth / 1.1,
          height: 50,
          borderRadius: 15,
          alignItems: "center",
          justifyContent: "center",
          top: 70,
        }}
      >
        <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
          GET STARTED
        </Text>
      </Pressable>
    </View>
  );
}
