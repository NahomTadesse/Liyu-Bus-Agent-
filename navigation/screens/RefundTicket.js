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
  Pressable,
  Image,
  TouchableWithoutFeedback,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Modal,
  Date,
} from "react-native";
// import Icon from "react-native-vector-icons/Ionicons";
import {
  Icon,
  IconElement,
  Input,
  Button,
  Layout,
} from "@ui-kitten/components";
import { useRoute } from "@react-navigation/native";
import DropShadow from "react-native-drop-shadow";

const screenWidth = Dimensions.get("window").width;

const AlertIcon = (props) => <Icon {...props} name="alert-circle-outline" />;

export default function RefundCancelRequest({ navigation }) {
  const [ticketNum, setTicketNum] = React.useState();

  const [showSideBar, setShowSideBar] = useState(false);
  const [loading, setLoading] = useState(false);
  const isRefund = true;
  const route = useRoute();

  const loginD = route.params.loginD;

  const renderIcon = (props) => (
    <TouchableWithoutFeedback>
      <Text style={{ color: "#006ED5", fontSize: 25, fontWeight: "bold" }}>
        *
      </Text>
    </TouchableWithoutFeedback>
  );

  const Sidebar = () => {
    return (
      <View>
        <Modal
          transparent={true}
          onRequestClose={() => {
            setShowSideBar(false);
          }}
        >
          <View style={{ flex: 1, justifyContent: "center" }}>
            <View
              style={{
                width: screenWidth / 1.6,
                alignSelf: "flex-start",
                position: "relative",
                elevation: 20,
                shadowColor: "black",

                backgroundColor: "#808080",
                opacity: 0.9,

                height: Dimensions.get("window").height,
              }}
            >
              <TouchableOpacity
                style={{ marginBottom: 30 }}
                onPress={() => {
                  setShowSideBar(false);
                }}
              >
                <View
                  style={{
                    flexDirection: "column",

                    top: 20,
                    alignSelf: "flex-end",
                    width: 50,
                    height: 50,
                  }}
                >
                  <Image
                    source={require("../Img/close1.png")}
                    style={{
                      width: 25,
                      height: 25,
                      marginRight: 20,
                      top: 30,
                    }}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={{ marginBottom: 30 }}>
                <View
                  style={{
                    flexDirection: "column",

                    top: 30,
                    alignSelf: "center",
                  }}
                >
                  <Image
                    source={require("../Img/profile10.png")}
                    style={{
                      width: 60,
                      height: 60,
                      marginLeft: 20,
                    }}
                  />
                  <Text
                    style={{ marginTop: 10, marginLeft: 15, color: "white" }}
                  >
                    {loginD.fullName}
                  </Text>
                  <Text style={{ marginTop: 10, color: "white" }}>
                    Abay Bus Sales Agent
                  </Text>
                </View>
              </TouchableOpacity>

              <View style={{ flex: 1, marginTop: 50 }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("home", { loginD });
                    setShowSideBar(false);
                  }}
                  style={{ marginBottom: 30 }}
                >
                  <View style={{ flexDirection: "row", marginLeft: 60 }}>
                    <Image
                      source={require("../Img/ticketsb.png")}
                      style={{
                        width: 20,
                        height: 20,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 18,
                        alignSelf: "center",
                        color: "white",
                        marginLeft: 10,
                      }}
                    >
                      BOOK
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setShowSideBar(false);
                  }}
                  style={{ marginBottom: 30 }}
                >
                  <View style={{ flexDirection: "row", marginLeft: 60 }}>
                    <Image
                      source={require("../Img/refund.png")}
                      style={{
                        width: 20,
                        height: 20,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 18,
                        alignSelf: "center",
                        color: "white",
                        marginLeft: 10,
                      }}
                    >
                      REFUND
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("cancelTicket", { loginD });
                    setShowSideBar(false);
                  }}
                  style={{ marginBottom: 30 }}
                >
                  <View style={{ flexDirection: "row", marginLeft: 60 }}>
                    <Image
                      source={require("../Img/cancel.png")}
                      style={{
                        width: 20,
                        height: 20,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 18,
                        alignSelf: "center",
                        color: "white",
                        marginLeft: 10,
                      }}
                    >
                      CANCELLATION
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("handover", { loginD });
                    setShowSideBar(false);
                  }}
                  style={{ marginBottom: 30 }}
                >
                  <View style={{ flexDirection: "row", marginLeft: 60 }}>
                    <Image
                      source={require("../Img/calculator.png")}
                      style={{
                        width: 20,
                        height: 20,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 18,
                        alignSelf: "center",
                        color: "white",
                        marginLeft: 10,
                      }}
                    >
                      HANDOVER
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("home", { loginD });
                    setShowSideBar(false);
                  }}
                  style={{ marginBottom: 30 }}
                >
                  <View style={{ flexDirection: "row", marginLeft: 60 }}>
                    <Image
                      source={require("../Img/user.png")}
                      style={{
                        width: 20,
                        height: 20,
                      }}
                    />

                    <Text
                      style={{
                        fontSize: 18,

                        color: "white",
                        marginLeft: 10,
                      }}
                    >
                      PROFILE
                    </Text>
                  </View>
                </TouchableOpacity>
                <View style={{ marginTop: 100 }}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("home", { loginD });
                      setShowSideBar(false);
                    }}
                    style={{ marginBottom: 30 }}
                  >
                    <View style={{ flexDirection: "row", marginLeft: 60 }}>
                      <Image
                        source={require("../Img/lang.png")}
                        style={{
                          width: 20,
                          height: 20,
                        }}
                      />

                      <Text
                        style={{
                          fontSize: 18,

                          color: "white",
                          marginLeft: 10,
                        }}
                      >
                        LANGUAGE
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("login");
                      setShowSideBar(false);
                    }}
                    style={{ marginBottom: 30 }}
                  >
                    <View style={{ flexDirection: "row", marginLeft: 60 }}>
                      <Image
                        source={require("../Img/logout.png")}
                        style={{
                          width: 20,
                          height: 20,
                        }}
                      />

                      <Text
                        style={{
                          fontSize: 18,

                          color: "white",
                          marginLeft: 10,
                        }}
                      >
                        SIGN-OUT
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  const SearchTicket = () => {
    if (ticketNum != null) {
      setLoading(true);
      fetch(
        `http://liyu-bus-api.dev.kifiya.et/liyu-bus-api/v1/api/ticket/get-user-tickets/${ticketNum}`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const requestData = data;
          if (requestData.length != 0) {
            navigation.navigate("refundCancelTicket", {
              requestData,
              isRefund,
              ticketNum,
              loginD,
            });
          } else {
            Alert.alert("LIYU BUS", "Sorry, No ticket found. ", [
              { text: "OK", onPress: () => {} },
            ]);
          }
          console.log(requestData);
        })
        .catch((error) => {
          console.error(error);
          Alert.alert(
            "LIYU BUS",
            "Sorry, The session has expired. Please try again later. ",
            [{ text: "OK", onPress: () => {} }]
          );
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      Alert.alert("LIYU BUS", "Fill the required fields ", [
        { text: "OK", onPress: () => {} },
      ]);
    }
  };

  const Refund = () => {
    return (
      <View style={{ marginTop: Dimensions.get("window").height / 6 }}>
        <Text style={{ marginBottom: 20, textAlign: "center", fontSize: 14 }}>
          Find the booked ticket you want to refund
        </Text>
        <DropShadow
          style={{
            shadowColor: "#171717",
            shadowOffset: { width: 1, height: 5 },
            shadowOpacity: 0.4,
            shadowRadius: 2,
          }}
        >
          <View
            style={{
              width: screenWidth / 1.1,
              borderWidth: 1,
              borderRadius: 35,
              backgroundColor: "#EBEBEB",
              borderColor: "#EBEBEB",
              height: 265,
              marginBottom: 40,
              elevation: 10,
              flex: 1,

              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 18, color: "#006ED5", marginLeft: 30 }}>
              Refund a Ticket
            </Text>
            <Text style={{ fontSize: 14, marginLeft: 30, marginVertical: 10 }}>
              Please add the Ticket number
            </Text>
            <Input
              value={ticketNum}
              placeholder="Insert Your Ticket Number"
              accessoryRight={renderIcon}
              keyboardType="numeric"
              onChangeText={(nextValue) => setTicketNum(nextValue)}
              style={{
                width: screenWidth / 1.3,
                marginBottom: 10,
                borderWidth: 1,
                borderRadius: 10,
                alignSelf: "center",
                elevation: 20,
                shadowColor: "black",
                backgroundColor: "#EBEBEB",
              }}
            />
            <Button
              style={{
                width: screenWidth / 1.3,
                borderWidth: 1,
                borderRadius: 10,
                marginTop: 20,
                backgroundColor: "#006ED5",
                alignSelf: "center",
              }}
              onPress={SearchTicket}
            >
              Seacrh
            </Button>
          </View>
        </DropShadow>
      </View>
    );
  };

  return (
    <ScrollView style={{ backgroundColor: "#EBEBEB" }}>
      {showSideBar && Sidebar()}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginBottom: 30,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setShowSideBar(true);
          }}
        >
          <View
            style={{
              alignSelf: "flex-start",
              flex: 1,
              flexDirection: "row",

              marginVertical: 30,
            }}
          >
            <Image
              source={require("../Img/hamburger.png")}
              style={{
                width: 20,
                height: 20,
              }}
            />
            <Text
              style={{
                fontSize: 14,
                marginLeft: 5,
                color: "#006ED5",
                fontWeight: "bold",
              }}
            >
              Refund
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View
            style={{
              flexDirection: "row",

              alignSelf: "flex-end",
              top: 10,
            }}
          >
            <View style={{ flexDirection: "column" }}>
              <Text
                style={{ marginTop: 10, color: "#006ED5", textAlign: "right" }}
              >
                {loginD.fullName}
              </Text>
              <Text style={{}}>Abay Bus Sales Agent</Text>
            </View>
            <Image
              source={require("../Img/profile10.png")}
              style={{
                width: 50,
                height: 50,
                marginLeft: 20,
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, alignSelf: "center" }}>{Refund()}</View>
      {loading && (
        <View style={{ marginTop: 20 }}>
          <ActivityIndicator size={"large"} color="#3c6791" />
        </View>
      )}
    </ScrollView>
  );
}
