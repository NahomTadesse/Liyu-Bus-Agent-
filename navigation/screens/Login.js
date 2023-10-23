import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Switch,
  TextInput,
  ActivityIndicator,
  Pressable,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Date,
  Modal,
  Image,
  Alert,
} from "react-native";
// import Icon from "react-native-vector-icons/Ionicons";
import {
  Icon,
  IconElement,
  Input,
  Button,
  Layout,
} from "@ui-kitten/components";
import DropShadow from "react-native-drop-shadow";

const screenWidth = Dimensions.get("window").width;

const AlertIcon = (props) => <Icon {...props} name="alert-circle-outline" />;

export default function Login({ navigation }) {
  const [phoneNmber, setPhoneNmber] = React.useState();
  const [password, setPassword] = React.useState();
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  // const [loginD, setLoginD] = React.useState("");
  const [loading, setLoading] = useState(false);

  const checkLoginForm = () => {
    if (password && phoneNmber != null) {
      return true;
    } else {
      return false;
    }
  };
  const Login = () => {
    if (checkLoginForm() == true) {
      setLoading(true);
      fetch(
        "https://liyu-bus-api.dev.kifiya.et/liyu-bus-api/admin/v1/api/auth/authenticate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phoneNumber: phoneNmber,
            password: password,
          }),
        }
      )

        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // if (!data.ok) {
          //   throw new Error('Network request failed');
          // }
          console.log(data);
          if (
            data.access_token != undefined &&
            data.refresh_token != undefined
          ) {
            // setLoginD(data)
            const loginD = data;
            navigation.navigate("home", { loginD });
          } else {
            return Alert.alert(
              "LIYU BUS",
              "Incorrect phone number or password ",
              [{ text: "OK", onPress: () => {} }]
            );
          }
        })
        .catch((error) => {
          // navigation.navigate("home");
          console.error(error);
          Alert.alert(
            "LIYU BUS",
            "Sorry The session has expired. Please try again later. ",
            [{ text: "OK", onPress: () => {} }]
          );
        })
        .finally(() => {
          setLoading(false);
          // console.log("fvbfbfdbbbdbddf", loginD);
        })
        .then();
    } else {
      Alert.alert("LIYU BUS", "Fill the required fields ", [
        { text: "OK", onPress: () => {} },
      ]);
    }
 
  };

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );

  const renderIconPhone = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Image
        source={require("../Img/call.png")}
        style={{
          width: 20,
          height: 20,
          marginLeft: 10,
          opacity: 0.6,
        }}
      />
    </TouchableWithoutFeedback>
  );
  const renderIconPassword = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Image
        source={require("../Img/lock.png")}
        style={{
          width: 20,
          height: 20,
          marginLeft: 10,
          opacity: 0.6,
        }}
      />
    </TouchableWithoutFeedback>
  );

  const renderCaption = () => {
    return (
      <View style={styles.captionContainer}>
        {AlertIcon(styles.captionIcon)}
        <Text style={styles.captionText}>
          Should contain at least 8 symbols
        </Text>
      </View>
    );
  };

  return (
    <ScrollView
      style={{
        backgroundColor: "#EBEBEB",
      }}
    >
      <View style={{}}>
        <Text
          style={{
            color: "#006ED5",
            top: 160,
            marginLeft: 50,
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          ABAY BUS SALES APP
        </Text>
        <Text
          style={{
            top: 170,
            marginLeft: 50,
            fontSize: 14,
          }}
        >
          Please Sign-In To Access Your Account
        </Text>
        <DropShadow
          style={{
            shadowColor: "#171717",
            shadowOffset: { width: 5, height: 10 },
            shadowOpacity: 0.4,
            shadowRadius: 2,
          }}
        >
          <View
            style={{
              width: screenWidth / 1.1,
              height: 300,
              backgroundColor: "#EBEBEB",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 200,
              borderWidth: 1,
              borderRadius: 30,
              borderColor: "#EBEBEB",
              elevation: 20,
              shadowColor: "black",
              marginBottom: 60,
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                alignSelf: "flex-start",
                marginLeft: 35,
                fontWeight: "bold",
              }}
            >
              Welcome Back!
            </Text>
            <Text
              style={{
                alignSelf: "flex-start",
                marginLeft: 35,
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              We're glad to see you again
            </Text>
            <DropShadow
              style={{
                shadowColor: "#171717",
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.1,
                shadowRadius: 50,
              }}
            >
              <Input
                value={phoneNmber}
                placeholder="Phone Number"
                accessoryLeft={renderIconPhone}
                keyboardType="numeric"
                onChangeText={(nextValue) => setPhoneNmber(nextValue)}
                style={{
                  width: screenWidth / 1.3,
                  marginBottom: 20,
                  borderWidth: 1,
                  borderRadius: 10,
                  backgroundColor: "#EBEBEB",
                  elevation: 10,
                }}
              />
            </DropShadow>
            <DropShadow
              style={{
                shadowColor: "#171717",
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.1,
                shadowRadius: 50,
              }}
            >
              <Input
                value={password}
                placeholder="Password"
                accessoryLeft={renderIconPassword}
                accessoryRight={renderIcon}
                secureTextEntry={secureTextEntry}
                onChangeText={(nextValue) => setPassword(nextValue)}
                style={{
                  width: screenWidth / 1.3,
                  marginBottom: 10,
                  borderWidth: 1,
                  borderRadius: 10,
                  backgroundColor: "#EBEBEB",
                  elevation: 10,
                }}
              />
            </DropShadow>

            <Button
              style={{
                width: screenWidth / 1.3,
                borderWidth: 1,
                borderRadius: 10,
                marginTop: 30,
                backgroundColor: "#006ED5",
              }}
              onPress={() => {
                Login();
              }}
            >
              Sign In
            </Button>
          </View>
        </DropShadow>
      </View>
      {loading && (
        <View style={{ marginTop: 20 }}>
          <ActivityIndicator size={"large"} color="#3c6791" />
        </View>
      )}

      {/* <Pressable
        onPress={() => {
          console.log("logggggggggggggggge", loginD);
          navigation.navigate("home", { loginD });
        }}
      >
        <Text
          style={{
            textAlign: "right",
            marginTop: 40,
            backgroundColor: "#f27f22",
            padding: 4,
            borderRadius: 5,
            left: 10,
          }}
        >
          test
        </Text>
      </Pressable> */}
    </ScrollView>
  );
}
