import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,

  Dimensions,

  ActivityIndicator,
  Pressable,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Modal,
  Image,
  Alert,

} from "react-native";
// import Icon from "react-native-vector-icons/Ionicons";
import { useRoute } from "@react-navigation/native";
import {
  Icon,
  IconElement,
  Input,
  Button,
  Layout,
  Drawer,
  DrawerItem,
  IndexPath,
} from "@ui-kitten/components";
const { Navigator, Screen } = createDrawerNavigator();
import DropShadow from "react-native-drop-shadow";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeScreen from "./HomeScreen";
import Login from "./Login";

const screenWidth = Dimensions.get("window").width;

const AlertIcon = (props) => <Icon {...props} name="alert-circle-outline" />;

export default function Handover({ navigation }) {
  const [cash, setCash] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  // const [cashAmount, setCashAmuont] = React.useState("");
  const [showSideBar, setShowSideBar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isCheck, setCheck] = useState(false);
  const [totalAmount, settotalAmount] = useState(0);
  const [totalTicket, setTotalTicket] = useState(0);
  const [DifferenceAmount, setDifferenceAmount] = useState(0);
  const [TotalCollectedAmount, setTotalCollectedAmount] = useState();
  const route = useRoute();
  const loginD = route.params.loginD;
  useEffect(() => {
    collectedCash();
  }, []);
  const renderIcon = (props) => (
    <TouchableWithoutFeedback>
      <Text style={{ color: "#006ED5", fontSize: 25, fontWeight: "bold" }}>
        *
      </Text>
    </TouchableWithoutFeedback>
  );

  const checkAmount = () => {
    setDifferenceAmount(totalAmount - cash);
  };

  const collectedCash = async () => {
    await fetch(
      "https://liyu-bus-api.dev.kifiya.et/liyu-bus-api/v1/api/collection-center-worker/collected-cash-amount-by-sales-person",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loginD.access_token}`,
        },
      }
    )
      .then((response) => response.json())

      .then((res) => {
        //setTotalCollectedAmount(res);
        const collectedAmount = res;

        if (res.apierror == undefined) {
          console.log("dfsdsdf----", collectedAmount);
          settotalAmount(collectedAmount.totalCollectedAmount);
        } else {
          Alert.alert(
            "LIYU BUS",
            "Sorry, The booking session has expired. Please start a new booking.",
            [{ text: "OK", onPress: () => {} }]
          );
          console.log(res.apierror);
        }
        // console.log(bookRes);
      })

      .catch((error) => {
        Alert.alert(
          "LIYU BUS",
          "Sorry, The booking session has expired. Please start a new booking.",
          [{ text: "OK", onPress: () => {} }]
        );
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const submitCash = () => {
    console.log(loginD.access_token);
    setLoading(true);
    fetch(
      "https://liyu-bus-api.dev.kifiya.et/liyu-bus-api/v1/api/collection-center-worker/cash-handover-request",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loginD.access_token}`,
        },
        body: JSON.stringify({
          totalOnHandAmount: cash,
          totalCollectedAmount: totalAmount,
          differenceAmount: totalAmount - cash,
        }),
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.errorCode == null) {
          // setLoginD(data)

          navigation.navigate("success", { loginD });
        } else {
          return Alert.alert(
            "LIYU BUS",
            " Sorry The session has expired. Please try again later.",
            [{ text: "OK", onPress: () => {} }]
          );
        }
      })
      .catch((error) => {
        console.error(error);
        Alert.alert(
          "LIYU BUS",
          "Sorry The booking session has expired. Please start a new booking. ",
          [{ text: "OK", onPress: () => {} }]
        );
      })
      .finally(() => {
        setLoading(false);
        // console.log("fvbfbfdbbbdbddf", loginD);
      });
  };
  const handover = () => {
    return (
      <View style={{ marginTop: 20 }}>
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
              height: 332,
              marginBottom: 40,
              elevation: 10,
              flex: 1,
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            <View style={{ marginTop: 20, marginBottom: 20 }}>
              <Text
                style={{
                  fontSize: 18,
                  color: "#006ED5",
                  marginLeft: 30,
                }}
              >
                Handover Your Sale
              </Text>
              <Text
                style={{ fontSize: 14, marginLeft: 30, marginVertical: 10 }}
              >
                Please Add Your Sales Amount
              </Text>
              <Input
                value={cash}
                placeholder="Insert Your Cash Amount"
                accessoryRight={renderIcon}
                keyboardType="numeric"
                onChangeText={(nextValue) => setCash(nextValue)}
                style={{
                  width: screenWidth / 1.3,
                  marginBottom: 10,
                  borderWidth: 1,
                  borderRadius: 10,
                  alignSelf: "center",
                  backgroundColor: "#EBEBEB",
                  elevation: 20,
                  shadowColor: "black",
                }}
              />
              <TouchableOpacity
                style={{
                  width: screenWidth / 1.3,
                  borderWidth: 1,
                  borderRadius: 10,
                  marginTop: 20,
                  borderColor: "#006ED5",
                  backgroundColor: "#EBEBEB",
                  alignSelf: "center",
                  height: 50,
                }}
                onPress={checkAmount}
              >
                <Text
                  style={{
                    color: "#006ED5",
                    alignSelf: "center",
                    flex: 1,
                    textAlignVertical: "center",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  Check
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  width: screenWidth / 1.3,
                  borderWidth: 1,
                  borderRadius: 10,
                  marginTop: 20,
                  height: 50,
                  backgroundColor: "#006ED5",
                  borderColor: "#006ED5",
                  alignSelf: "center",
                }}
                onPress={submitCash}
              >
                <Text
                  style={{
                    alignSelf: "center",
                    flex: 1,
                    textAlignVertical: "center",
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  Submit
                </Text>
              </TouchableOpacity>
              {loading && (
                <View style={{ marginTop: 20 }}>
                  <ActivityIndicator size={"large"} color="#3c6791" />
                </View>
              )}
            </View>
          </View>
        </DropShadow>
      </View>
    );
  };

  const TotalSales = () => {
    return (
      <View style={{ marginTop: 10 }}>
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <Text
            style={{
              textAlign: "left",
              fontSize: 14,
              color: "black",
              marginLeft: 10,
              top: 10,
            }}
          >
            TOTAL SALES AMOUNT
          </Text>
          <Text
            style={{
              flex: 1,
              textAlign: "right",
              fontSize: 24,
              color: "#006ED5",
              fontWeight: "bold",
              marginRight: 20,
            }}
          >
            {`${totalAmount} ETB`}
          </Text>
        </View>
      </View>
    );
  };
  const TotalTicket = () => {
    return (
      <View style={{ marginTop: 10 }}>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              textAlign: "left",
              fontSize: 14,
              color: "black",
              marginLeft: 10,
              top: 10,
            }}
          >
            TOTAL SOLD TICKETS
          </Text>
          <Text
            style={{
              flex: 1,
              textAlign: "right",
              fontSize: 24,
              color: "#006ED5",
              fontWeight: "bold",
              marginRight: 20,
            }}
          >
            {`${totalTicket} Tickets`}
          </Text>
        </View>
      </View>
    );
  };
  ////////////////////////////////////////////////////////////////////////
  const Difference = () => {
    return (
      <View style={{ marginTop: 20 }}>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              fontSize: 24,
              color: "#006ED5",
              fontWeight: "bold",
              marginLeft: 10,
            }}
          >
            {`${
              DifferenceAmount < 0 ? DifferenceAmount * -1 : DifferenceAmount
            }ETB`}
          </Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              fontSize: 14,
              color: "black",
              fontWeight: "bold",
              marginLeft: 10,
            }}
          >
            DIFFERENCE
          </Text>
        </View>
      </View>
    );
  };
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
                    navigation.navigate("refundTicket", { loginD });
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
                      navigation.navigate("login", { loginD });
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
              Handover
            </Text>
          </View>
        </TouchableOpacity>
        <Pressable>
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
        </Pressable>
      </View>

      <View style={{ alignSelf: "center" }}>
        {TotalSales()}
        {TotalTicket()}
        {Difference()}
        {handover()}
      </View>
    </ScrollView>
  );
}
