import * as React from "react";
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";

import { faAnglesRight } from "@fortawesome/free-solid-svg-icons/faAnglesRight";
import DropShadow from "react-native-drop-shadow";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import moment from "moment";

import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
  Switch,
  TextInput,
  Button,
  TouchableOpacity,
  Pressable,
  Alert,
  ActivityIndicator,
  Modal,
} from "react-native";
// import {CheckBox} from 'react-native-elements'
import Icon from "react-native-vector-icons/Ionicons";
import CheckBox from "@react-native-community/checkbox";
import { useRoute } from "@react-navigation/native";
import { all } from "axios";

// import { RadioButton } from 'react-native-paper';

const screenWidth = Dimensions.get("window").width;

export default function PaymentOption({ navigation }) {
  const route = useRoute();

  const allData = route.params.allData;
  const returnSeat = route.params.returnSeat;
  const [loading, setLoading] = useState(false);
  const allDataTwo = route.params.allDataTwo;
  const isEnabledTwoWay = route.params.isEnabledTwoWay;
  const returnTicket = route.params.returnTicket;
  const phoneNumberList = route.params.phoneNumberList;
  const ageList = route.params.ageList;
  const passengerOffBoardingPlace = route.params.passengerOffBoardingPlace;
  const passengerOnboardingList = route.params.passengerOnboardingList;
  const passengerOffBoardingPlaceReturn =
    route.params.passengerOffBoardingPlaceReturn;
  const passengerOnboardingListReturn =
    route.params.passengerOnboardingListReturn;
  const loginD = route.params.loginD;
  const index = route.params.index;
  const indexR = route.params.indexR;
  const passengersgenderList = route.params.passengersgenderList;
  const seat = route.params.seat;
  const allDataSecondTrip = route.params.allDataSecondTrip;
  const fullNameList = route.params.fullNameList;
  const [showPopUp, setShowPopUp] = useState(false);
  const [showPopUpRound, setShowPopUpRound] = useState(false);
  const [book, setBook] = useState("");
  const [roundBook, setRoundBook] = useState("");

  const getTicket = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://liyu-bus-api.dev.kifiya.et/liyu-bus-api/v1/api/ticket/get-tickets/${
          isEnabledTwoWay ? roundBook.ticketUUIds : book.ticketUUIds
        }`
      );
      if (!response.ok) {
        throw new Error('Network request failed');
      }
      const data = await response.json();
      if (data === '' || data === undefined) {
        Alert.alert(
          "LIYU BUS",
          "Sorry, The booking session has expired. Please start a new booking.",
          [{ text: "OK", onPress: () => {} }]
        );
      } else {
        const TickettData = data;
        navigation.navigate("ticketScreen", {
          allData,
          phoneNumberList,
          ageList,
          passengerOffBoardingPlace,
          roundBook,
          book,
          TickettData,
          passengerOnboardingList,
          passengersgenderList,
          seat,
          returnTicket,
          isEnabledTwoWay,
          fullNameList,
          loginD,
        });
        console.log("tickets Data--------------", TickettData);
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        "LIYU BUS",
        "Sorry, an error occurred. Please try again later.",
        [{ text: "OK", onPress: () => {} }]
      );
    } finally {
      setLoading(false);
    }
  };
  

  // const getTicketTwoWay = () => {
  //   setLoading(true);
  //   return fetch(
  //     `http://liyu-bus-api.dev.kifiya.et/liyu-bus-api/v1/api/ticket/get-tickets/${roundBook.ticketUUIds}`
  //   )
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       const TickettData = data;
  //       navigation.navigate("ticketScreen", {
  //         allData,
  //         phoneNumberList,
  //         ageList,
  //         passengerOffBoardingPlace,
  //         book,
  //         roundBook,
  //         TickettData,
  //         passengerOnboardingList,
  //         passengersgenderList,
  //         seat,
  //         returnTicket,
  //         isEnabledTwoWay,
  //         fullNameList,
  //         loginD,
  //       });
  //       console.log("tickets Data--------------", TickettData);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       Alert.alert(
  //         "LIYU BUS",
  //         "Sorry, The booking session has expired. Please start a new booking. ",
  //         [{ text: "OK", onPress: () => {} }]
  //       );
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };
  const oneWayPopUp = () => {
    console.log("book result----------------", book);
    return (
      <View>
        <Modal
          transparent={true}
          onRequestClose={() => {
            setShowPopUp(false);
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              backgroundColor: "grey",
              opacity: 0.9,
            }}
          >
            <DropShadow
              style={{
                shadowColor: "#171717",
                shadowOffset: { width: 5, height: 15 },
                shadowOpacity: 0.4,
                shadowRadius: 2,
              }}
            >
              <View
                style={{
                  width: 349,
                  alignSelf: "center",
                  position: "relative",
                  elevation: 20,
                  shadowColor: "black",
                  backgroundColor: "#EBEBEB",
                  borderWidth: 1,
                  borderColor: "#EBEBEB",
                  borderRadius: 30,

                  height: 350,
                }}
              >
                <Text
                  style={{
                    fontSize: 24,
                    color: "#46BF7A",
                    marginTop: 33,
                    alignSelf: "center",
                    fontWeight: "bold",
                  }}
                >
                  COMPLETED
                </Text>
                <Text
                  style={{ fontSize: 18, marginTop: 20, alignSelf: "center" }}
                >
                  The ticket has
                </Text>
                <Text style={{ fontSize: 18, alignSelf: "center" }}>
                  Successfully purchased.
                </Text>
                <Text
                  style={{ fontSize: 14, marginTop: 30, alignSelf: "center" }}
                >
                  The user will receive SMS message Shortly
                </Text>
                <Pressable
                  style={{
                    width: 276,
                    height: 50,
                    marginVertical: 20,
                    borderWidth: 3,
                    borderColor: "#006ED5",
                    alignSelf: "center",
                    borderRadius: 10,
                  }}
                  onPress={() => {
                    getTicket();
                    setShowPopUp(false);
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      color: "#006ED5",
                      flex: 1,
                      textAlignVertical: "center",
                      alignSelf: "center",
                    }}
                  >
                    VIEW A TICKET
                  </Text>
                </Pressable>
                <Pressable
                  style={{
                    width: 276,
                    height: 50,
                    marginBottom: 32,
                    // borderWidth: 1,
                    // borderColor: "#006ED5",
                    alignSelf: "center",
                  }}
                  onPress={() => navigation.navigate("home", { loginD })}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      color: "#006ED5",
                      flex: 1,
                      textAlignVertical: "center",
                      alignSelf: "center",
                    }}
                  >
                    BACK TO HOME
                  </Text>
                </Pressable>
              </View>
            </DropShadow>
          </View>
        </Modal>
      </View>
    );
  };
  const TwoWayPopUp = () => {
    console.log("book resultttt----------------", roundBook);
    return (
      <View>
        <Modal
          transparent={true}
          onRequestClose={() => {
            setShowPopUpRound(false);
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              backgroundColor: "grey",
              opacity: 0.9,
            }}
          >
            <DropShadow
              style={{
                shadowColor: "#171717",
                shadowOffset: { width: 5, height: 15 },
                shadowOpacity: 0.4,
                shadowRadius: 2,
              }}
            >
              <View
                style={{
                  width: 349,
                  alignSelf: "center",
                  position: "relative",
                  elevation: 20,
                  shadowColor: "black",

                  backgroundColor: "#EBEBEB",
                  borderWidth: 1,
                  borderColor: "#EBEBEB",
                  borderRadius: 30,

                  height: 350,
                }}
              >
                <Text
                  style={{
                    fontSize: 24,
                    color: "#46BF7A",
                    marginTop: 33,
                    alignSelf: "center",
                    fontWeight: "bold",
                  }}
                >
                  COMPLETED
                </Text>
                <Text
                  style={{ fontSize: 18, marginTop: 20, alignSelf: "center" }}
                >
                  The ticket has
                </Text>
                <Text style={{ fontSize: 18, alignSelf: "center" }}>
                  Successfully purchased.
                </Text>
                <Text
                  style={{ fontSize: 14, marginTop: 30, alignSelf: "center" }}
                >
                  The user will receive SMS message Shortly
                </Text>
                <Pressable
                  style={{
                    width: 276,
                    height: 50,
                    marginVertical: 20,
                    borderWidth: 3,
                    borderColor: "#006ED5",
                    alignSelf: "center",
                    borderRadius: 10,
                  }}
                  onPress={() => {
                    getTicket();
                    setShowPopUpRound(false);
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      color: "#006ED5",
                      flex: 1,
                      textAlignVertical: "center",
                      alignSelf: "center",
                    }}
                  >
                    VIEW A TICKET
                  </Text>
                </Pressable>
                <Pressable
                  style={{
                    width: 276,
                    height: 50,
                    marginBottom: 32,
                    // borderWidth: 1,
                    // borderColor: "#006ED5",
                    alignSelf: "center",
                  }}
                  onPress={() => navigation.navigate("home", { loginD })}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      color: "#006ED5",
                      flex: 1,
                      textAlignVertical: "center",
                      alignSelf: "center",
                    }}
                  >
                    BACK TO HOME
                  </Text>
                </Pressable>
              </View>
            </DropShadow>
          </View>
        </Modal>
      </View>
    );
  };

  const paymentInfoOneWay = async () => {
    setLoading(true);

    if (isEnabledTwoWay == false) {
      const bookingDetails = seat.map((item, index) => {
        return {
          seatNumber: seat[index],
          passenger: {
            phoneNumber: phoneNumberList[index],
            fullName: fullNameList[index],
            age: ageList[index],
            gender: passengersgenderList[index],
          },
        };
      });

      const bookingData = {
        scheduleUUId: allData.scheduleUUId,
        onBoarding : passengerOnboardingList.item.key,
        offBoarding : passengerOffBoardingPlace.item.key,
        isRoundTrip: false,
        bookingDetails,
      };

      await fetch(
        "https://liyu-bus-api.dev.kifiya.et/liyu-bus-api/agent/v1/api/booking/create-reservation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${loginD.access_token}`,
          },
          body: JSON.stringify(bookingData),
        }
      )
        .then((response) => response.json())

        .then((res) => {
          const bookRes = res;
          // console.log(bookRes);
          if (res.apierror == undefined) {
            setBook(bookRes);
            setShowPopUp(true);
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
    }
  };

  const paymentInfoTwoWay = async () => {
    setLoading(true);

    const bookingDetails = seat.map((item, index) => {
      return {
        seatNumber: seat[index],
        roundTripSeatNumber: returnSeat[index],
        passenger: {
          phoneNumber: phoneNumberList[index],
          fullName: fullNameList[index],
          age: ageList[index],
          gender: passengersgenderList[index],
        },
      };
    });

    const returnBookingRequest = {
      scheduleUUId: allData.firstScheduleUUId,
      roundTripScheduleUUId: allDataSecondTrip.secondScheduleUUId,
      roundTripOnBoardingUUId: passengerOnboardingListReturn.item.key,
      roundTripOffBoardingUUId: passengerOffBoardingPlaceReturn.item.key,
      isRoundTrip: true,
      bookingDetails,
    };

    await fetch(
      "https://liyu-bus-api.dev.kifiya.et/liyu-bus-api/agent/v1/api/booking/create-reservation",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loginD.access_token}`,
        },

        body: JSON.stringify(returnBookingRequest),
      }
    )
      .then((response) => response.json())
      .then((res) => {
        const roundBookres = res;
        // console.log(Roundbook);
        if (res.apierror == undefined) {
          setRoundBook(roundBookres);
          setShowPopUpRound(true);
        } else {
          Alert.alert(
            "LIYU BUS",
            `Sorry, The booking session has expired. Please start a new booking.`,
            [{ text: "OK", onPress: () => {} }]
          );
        }
      })

      .catch((error) => {
        console.error(error);
        Alert.alert(
          "LIYU BUS",
          "Sorry, The booking session has expired. Please start a new booking.",
          [{ text: "OK", onPress: () => {} }]
        );
      })
      .finally(() => setLoading(false));
  };
  const test = () => {
    // console.log(allDataSecondTrip)

    // console.log(allData.firstScheduleUUId);
    console.log(loginD.access_token);
    // const xv = loginD.access_token;
    // console.log(xv.replaceAll("&quot;", '"'));

    // console.log("Bearer" + loginD.access_token);
  };
  ////////////////////////////////////
  const oneWay = () => {
    if (isEnabledTwoWay == false) {
      return (
        <ScrollView>
          <View style={styles.cards}>
            {/* <Pressable onPress={toPassengerInfo}> */}

            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text
                style={{
                  textAlign: "left",
                  color: "#006ED5",
                  fontSize: 18,
                  fontWeight: "bold",

                  textAlignVertical: "center",
                  left: 10,
                  marginTop: 10,
                }}
              >
                {/* {allData.busName} */}
                {`Bus ${index + 1}`}
              </Text>
              <Text
                style={{
                  marginTop: 11,
                  flex: 1,
                  marginRight: 5,
                  textAlign: "right",
                }}
              >
                <Icon
                  name="calendar"
                  style={{ fontSize: 18, marginRight: 10 }}
                />
              </Text>
              <Text
                style={{ marginTop: 11, marginRight: 10, textAlign: "right" }}
              >
                {moment(allData.departureDate).format("dddd").slice(0, 3)}
                {", "}
                {moment(allData.departureDate).format("MMM Do")}
              </Text>
            </View>
            <View style={styles.cityStyle}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  textAlign: "left",

                  marginLeft: 10,
                  color: "#212121",
                  fontWeight: "bold",
                }}
              >
                {allData.depaLocat}
              </Text>
              <View
                style={{ flexDirection: "row", marginTop: 10, marginLeft: 15 }}
              >
                <View
                  style={{
                    height: 0,
                    width: 120,
                    borderWidth: 0.5,
                    borderColor: "black",
                    marginTop: 2,

                    borderRadius: 1,
                  }}
                ></View>
              </View>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  textAlign: "right",
                  flex: 1,
                  right: 10,
                  color: "#212121",
                }}
              >
                {allData.destinlocat}
              </Text>
            </View>
            <View style={styles.timeStyle}>
              <Text
                style={{
                  fontSize: 15,
                  textAlign: "left",
                  flex: 1,
                  left: 10,
                  color: "#212121",
                  marginTop: -5,
                }}
              >
                {allData.departTime}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  right: 10,
                  textAlign: "left",
                  color: "#212121",
                  marginTop: -5,
                }}
              >
                {allData.arrivalT}
              </Text>
            </View>

            <View style={styles.boardingTitleStyle}>
              <Text
                style={{
                  fontSize: 14,
                  textAlign: "left",
                  flex: 1,
                  left: 10,
                  color: "#212121",
                  fontWeight: "normal",
                }}
              >
                Boarding Place
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  textAlign: "right",
                  flex: 1,
                  right: 10,
                  color: "#212121",
                  fontWeight: "normal",
                }}
              >
                Drop-Off Place
              </Text>
            </View>

            <View style={styles.boardingPlaceStyle}>
              <View style={{ width: "44%", marginRight: "12%" }}>
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: "left",
                    flex: 1,
                    marginLeft: 12,

                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  {Object.values(passengerOnboardingList.item.value).map(
                    (item) => item
                  )}
                </Text>
              </View>
              <View
                style={{
                  width: "27%",
                  bottom: 2,
                  marginLeft: 57,
                  fontWeight: "bold",
                  right: "17%",
                }}
              >
                <Text
                  style={
                    passengerOffBoardingPlace.length == 1
                      ? {
                          fontSize: 14,
                          textAlign: "right",
                          marginRight: 80,
                          color: "black",
                          fontWeight: "bold",
                        }
                      : passengerOffBoardingPlace.length == 3
                      ? {
                          fontSize: 14,
                          textAlign: "left",
                          flex: 1,
                          left: 3,
                          marginRight: 10,
                          color: "black",
                          fontWeight: "bold",
                        }
                      : {
                          fontSize: 14,
                          textAlign: "left",
                          flex: 1,

                          marginRight: 8,
                          color: "black",
                          fontWeight: "bold",
                        }
                  }
                >
                  {Object.values(passengerOffBoardingPlace.item.value).map(
                    (item) => item
                  )}
                </Text>
              </View>
            </View>
            <View
              style={{
                width: screenWidth / 1.2,
                height: 0.1,
                borderWidth: 1,
                alignSelf: "center",
                borderStyle: "dashed",
                borderRadius: 50,
                marginTop: 10,
                borderColor: "#006ED5",
              }}
            ></View>
            <View style={{ flex: 1, marginHorizontal: 3 }}>
              <Text
                style={{
                  fontSize: 14,
                  textAlign: "left",
                  flex: 1,
                  left: 10,
                  color: "#006ED5",
                  marginVertical: 10,
                  fontWeight: "bold",
                  alignSelf: "center",
                }}
              >
                {allData.price} ETB
              </Text>
              {/* <Text style ={{fontSize:15,textAlign:'left',flex : 1}}> = 500 ETB</Text> */}
            </View>

            {/* </Pressable> */}
          </View>
          <View>
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <Text
                style={{
                  marginLeft: 20,
                  marginTop: 10,
                  marginBottom: 10,
                  fontWeight: "bold",
                }}
              >{`Passenger(s)`}</Text>
              <View
                style={{
                  flex: 1,
                  justifyContent: "flex-start",
                  marginRight: 20,
                }}
              >
                <View
                  style={{
                    alignSelf: "flex-end",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",

                      marginRight: 10,
                      marginTop: 10,
                    }}
                  >{`Seat(s)`}</Text>
                </View>
              </View>
            </View>
            {fullNameList.map((item, index) => {
              return (
                <View style={{ flexDirection: "row" }}>
                  <View>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "bold",
                        textAlign: "left",

                        marginLeft: 20,
                        color: "#212121",
                      }}
                    >
                      {item}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      marginRight: 40,
                    }}
                  >
                    <View
                      style={{
                        alignSelf: "flex-end",
                        marginRight: 10,
                      }}
                    >
                      <Text
                        style={{
                          color: "#006ED5",
                          fontWeight: "bold",
                        }}
                      >{`${seat[index]}`}</Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>

          <View
            style={{
              width: screenWidth / 1.1,
              borderWidth: 1,
              borderColor: "#006ED5",
              textAlign: "right",
              color: "#006ED5",
              fontSize: 15,
              fontWeight: "bold",
              height: 40,
              flex: 1,
              flexDirection: "row",
              borderBottomEndRadius: 10,
              marginLeft: 15,
              marginTop: 10,
            }}
          >
            <Text
              style={{
                textAlign: "right",
                textAlignVertical: "center",
                flex: 1,
                color: "#006ED5",
                marginRight: 10,

                fontSize: 14,
              }}
            >
              Total Tariff
            </Text>
            <Text
              style={{
                textAlign: "right",
                textAlignVertical: "center",

                color: "#006ED5",
                marginRight: 20,
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              {seat.length * allData.price} ETB
            </Text>
          </View>
          <View style={{ alignSelf: "center", marginTop: 80 }}>
            <Pressable
              // onPress={getTicketBtn}
              onPress={() => {
                paymentInfoOneWay();
              }}
              style={{
                backgroundColor: "#006ED5",
                width: screenWidth / 1.1,
                height: 55,
                borderRadius: 15,
                alignSelf: "center",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                marginTop: 80,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlignVertical: "center",
                  marginRight: 3,
                }}
              >
                Confirm and Finalize
              </Text>
            </Pressable>
            <View />
          </View>
        </ScrollView>
      );
    }
  };
  //////////////////////////////////
  const twoWay = () => {
    if (returnTicket) {
      return (
        <ScrollView>
          <View style={styles.cards}>
            <Text style={{ marginLeft: 10, color: "#006ED5", marginTop: 10 }}>
              First Trip
            </Text>
            {/* <Pressable onPress={toPassengerInfo}> */}
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text
                style={{
                  textAlign: "left",
                  color: "#006ED5",
                  fontSize: 18,
                  fontWeight: "bold",

                  textAlignVertical: "center",
                  marginLeft: 10,
                  marginTop: 10,
                }}
              >
                {`Bus ${index + 1}`}
              </Text>
              <Text
                style={{
                  marginTop: 11,
                  flex: 1,
                  marginRight: 5,
                  textAlign: "right",
                }}
              >
                <Icon
                  name="calendar"
                  style={{ fontSize: 18, marginRight: 10 }}
                />
              </Text>
              <Text
                style={{ marginTop: 11, marginRight: 10, textAlign: "right" }}
              >
                {moment(allData.departureDate).format("dddd").slice(0, 3)}
                {", "}
                {moment(allData.departureDate).format("MMM Do")}
              </Text>
            </View>
            <View style={styles.cityStyle}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  textAlign: "left",

                  left: 10,
                  color: "#212121",
                }}
              >
                {allData.depaLocat}
              </Text>
              <View style={{ flex: 1 }}>
                <View
                  style={
                    allData.depaLocat.length > 10
                      ? {
                          flexDirection: "row",
                          marginTop: 10,
                          left: screenWidth / 25,
                          marginHorizontal: 3,
                        }
                      : {
                          flexDirection: "row",
                          marginTop: 10,
                          left: screenWidth / 20,
                          marginHorizontal: 3,
                        }
                  }
                >
                  <View
                    style={{
                      height: 0,
                      width: 110,

                      borderWidth: 0.5,
                      borderColor: "#3c6791",
                      marginTop: 2,

                      borderRadius: 1,
                    }}
                  ></View>
                </View>
              </View>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  textAlign: "right",
                  flex: 1,
                  marginRight: 10,
                  color: "#212121",
                }}
              >
                {allData.destinlocat}
              </Text>
            </View>
            <View style={styles.timeStyle}>
              <Text
                style={{
                  fontSize: 14,
                  textAlign: "left",
                  flex: 1,
                  marginLeft: 10,
                  color: "#212121",
                  marginTop: -5,
                }}
              >
                {allData.departTime}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  textAlign: "right",
                  flex: 1,
                  marginRight: 10,
                  color: "#212121",
                  marginTop: -5,
                }}
              >
                {allData.arrivalT}
              </Text>
            </View>

            <View style={styles.boardingTitleStyle}>
              <Text
                style={{
                  fontSize: 14,
                  textAlign: "left",
                  flex: 1,
                  marginLeft: 10,
                  color: "#212121",

                  marginTop: -5,
                }}
              >
                Boarding Place
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  textAlign: "right",
                  flex: 1,
                  marginRight: 10,
                  color: "#212121",

                  marginTop: -5,
                }}
              >
                Drop-off Place
              </Text>
            </View>

            <View style={styles.boardingPlaceStyle}>
              <View style={{ width: "44%", marginRight: "12%" }}>
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: "left",
                    flex: 1,
                    marginLeft: 12,
                    fontWeight: "bold",
                    marginTop: -5,
                  }}
                >
                  {Object.values(passengerOnboardingList.item.value).map(
                    (item) => item
                  )}
                </Text>
              </View>
              <View
                style={{
                  width: "27%",
                  bottom: 2,
                  marginLeft: 57,

                  right: "18%",
                }}
              >
                <Text
                  style={
                    passengerOffBoardingPlace.length == 1
                      ? {
                          fontSize: 14,
                          textAlign: "left",
                          flex: 1,

                          marginRight: 10,
                          fontWeight: "bold",
                          left: 3,
                          marginTop: -5,
                        }
                      : passengerOffBoardingPlace.length == 3
                      ? {
                          fontSize: 14,
                          textAlign: "left",
                          flex: 1,
                          left: 3,
                          marginRight: 10,
                          fontWeight: "bold",
                          marginTop: -5,
                        }
                      : {
                          fontSize: 14,
                          textAlign: "left",
                          flex: 1,
                          left: 3,
                          marginRight: 10,
                          fontWeight: "bold",
                          marginTop: -5,
                        }
                  }
                >
                  {Object.values(passengerOffBoardingPlace.item.value).map(
                    (item) => item
                  )}
                </Text>
              </View>
            </View>
            <View>
              <Text style={{ textAlign: "center", right: 3 }}>
                - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                - - - - - - - - -
              </Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  flexDirection: "row",
                  marginBottom: 10,
                  marginTop: 5,
                }}
              >
                <Text
                  style={{
                    textAlignVertical: "center",

                    color: "#006ED5",
                  }}
                >
                  First Trip Tariff{" "}
                </Text>
                <Text
                  style={{
                    textAlignVertical: "center",

                    color: "#006ED5",
                    fontWeight: "bold",
                  }}
                >
                  {/* {allDataSecondTrip.priceReturn}{" "} */}
                  {allData.price} ETB{" "}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.cards}>
            <Text style={{ marginLeft: 10, color: "#006ED5", marginTop: 10 }}>
              Second Trip
            </Text>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text
                style={{
                  textAlign: "left",
                  color: "#006ED5",
                  fontSize: 18,
                  fontWeight: "bold",

                  textAlignVertical: "center",
                  left: 10,
                  marginTop: 10,
                }}
              >
                {/* {allDataSecondTrip.busNameReturn} */}
                {`Bus ${indexR + 1}`}
              </Text>

              <Text
                style={{
                  marginTop: 11,
                  flex: 1,
                  marginRight: 5,
                  textAlign: "right",
                }}
              >
                <Icon
                  name="calendar"
                  style={{ fontSize: 18, marginRight: 10 }}
                />
              </Text>
              <Text
                style={{ marginTop: 11, marginRight: 10, textAlign: "right" }}
              >
                {moment(allDataSecondTrip.travelDateReturn)
                  .format("dddd")
                  .slice(0, 3)}
                {", "}
                {moment(allDataSecondTrip.travelDateReturn).format("MMM Do")}
              </Text>
            </View>
            <View style={styles.cityStyle}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  textAlign: "left",
                  marginHorizontal: 3,
                  marginLeft: 10,
                  color: "#212121",
                  fontWeight: "bold",
                }}
              >
                {allDataSecondTrip.depaLocatReturn}
              </Text>
              <View
                style={
                  allDataSecondTrip.depaLocatReturn.length > 10
                    ? {
                        flexDirection: "row",
                        marginTop: 10,
                        left: screenWidth / 25,
                        marginHorizontal: 3,
                      }
                    : {
                        flexDirection: "row",
                        marginTop: 10,
                        left: screenWidth / 20,
                        marginHorizontal: 3,
                      }
                }
              >
                <View
                  style={{
                    height: 0,
                    width: 110,
                    borderWidth: 0.5,
                    borderColor: "#3c6791",
                    marginTop: 2,

                    borderRadius: 1,
                  }}
                ></View>
              </View>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  textAlign: "right",
                  flex: 1,
                  marginRight: 10,
                  color: "#212121",
                  fontWeight: "bold",
                }}
              >
                {allDataSecondTrip.destinlocatReturn}
              </Text>
            </View>

            <View style={styles.timeStyle}>
              <Text
                style={{
                  fontSize: 14,
                  textAlign: "left",
                  flex: 1,
                  marginLeft: 10,
                  color: "#212121",
                  marginTop: -5,
                }}
              >
                {allDataSecondTrip.departTimeReturn}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  textAlign: "right",
                  flex: 1,
                  marginRight: 10,
                  color: "#212121",
                  marginTop: -5,
                }}
              >
                {allDataSecondTrip.arrivalTReturn}
              </Text>
            </View>

            <View style={styles.boardingTitleStyle}>
              <Text
                style={{
                  fontSize: 14,
                  textAlign: "left",
                  flex: 1,
                  marginLeft: 10,
                  color: "#212121",

                  marginTop: -5,
                }}
              >
                Boarding Place
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  textAlign: "right",
                  flex: 1,
                  marginRight: 10,
                  color: "#212121",

                  marginTop: -5,
                }}
              >
                Drop-off Place
              </Text>
            </View>

            <View style={styles.boardingPlaceStyle}>
              <View style={{ width: "44%", marginRight: "12%" }}>
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: "left",
                    flex: 1,
                    marginLeft: 12,
                    fontWeight: "bold",
                    marginTop: -5,
                  }}
                >
                  {Object.values(passengerOnboardingListReturn.item.value).map(
                    (item) => item
                  )}
                </Text>
              </View>
              <View
                style={{
                  width: "29%",
                  bottom: 2,
                  marginLeft: 57,
                  right: "15%",
                }}
              >
                <Text
                  style={
                    passengerOffBoardingPlace.length == 1
                      ? {
                          fontSize: 14,
                          textAlign: "left",
                          flex: 1,

                          marginRight: 10,
                          marginTop: -5,

                          fontWeight: "bold",
                        }
                      : passengerOffBoardingPlace.length == 3
                      ? {
                          fontSize: 14,
                          textAlign: "left",
                          flex: 1,
                          marginTop: -5,

                          marginRight: 10,
                          left: 1,
                          fontWeight: "bold",
                          Right: 10,
                          marginTop: -5,
                        }
                      : {
                          fontSize: 14,
                          textAlign: "left",
                          flex: 1,
                          left: 2,
                          marginTop: -5,
                          marginRight: 10,
                          fontWeight: "bold",
                        }
                  }
                >
                  {Object.values(
                    passengerOffBoardingPlaceReturn.item.value
                  ).map((item) => item)}
                </Text>
              </View>
            </View>
            <View>
              <Text style={{ textAlign: "center", right: 3 }}>
                - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                - - - - - - - - - -
              </Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "center",
                  marginBottom: 10,
                  marginTop: 5,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    textAlignVertical: "center",

                    color: "#006ED5",
                  }}
                >
                  Second Trip Tariff{" "}
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    textAlignVertical: "center",

                    color: "#006ED5",
                    fontWeight: "bold",
                  }}
                >
                  {allDataSecondTrip.priceReturn} ETB{" "}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
              justifyContent: "center",
            }}
          >
            <View style={{ flexDirection: "column", marginTop: 10 }}>
              <Text
                style={{ left: 10, fontWeight: "bold" }}
              >{`Passenger(s)`}</Text>
              <Text style={{ left: 10, marginTop: 10 }}>
                {fullNameList.map((item, index) => {
                  return item + "\n";
                })}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "column",
                marginTop: 5,

                marginLeft: 30,
                marginRight: 10,
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    top: 3,
                  }}
                >{`First trip Seats`}</Text>

                <Text
                  style={{ fontWeight: "bold", top: 3, marginLeft: 30 }}
                >{`Return Seats`}</Text>
              </View>
              <View
                style={{
                  marginBottom: 2,
                  color: "#006ED5",
                }}
              >
                {seat.map((item, index) => {
                  return (
                    <View style={{ flex: 1, flexDirection: "row" }}>
                      <Text
                        style={{
                          textAlign: "left",
                          marginLeft: 40,
                          color: "#006ED5",
                        }}
                      >{`${seat[index]}`}</Text>
                      <Text
                        style={{
                          flex: 1,
                          textAlign: "right",
                          marginRight: 30,
                          color: "#006ED5",
                        }}
                      >
                        {`${returnSeat[index]}`} {"\n"}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>

          <View
            style={{
              width: screenWidth / 1.1,
              borderWidth: 1,
              borderColor: "#006ED5",
              textAlign: "right",
              color: "white",
              fontSize: 15,
              fontWeight: "bold",
              height: 40,

              borderBottomEndRadius: 10,

              alignSelf: "center",
            }}
          >
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text
                style={{
                  textAlign: "right",
                  textAlignVertical: "center",
                  flex: 1,
                  color: "#006ED5",
                  marginRight: 10,
                }}
              >
                Total Tariff
              </Text>
              <Text
                style={{
                  textAlign: "left",
                  textAlignVertical: "center",
                  fontSize: 15,
                  color: "#006ED5",
                  fontWeight: "bold",
                  marginRight: 10,
                }}
              >
                {seat.length * (allDataSecondTrip.priceReturn + allData.price)}{" "}
                ETB{" "}
              </Text>
            </View>
          </View>
          {/* </Pressable> */}

          <View style={{ alignSelf: "center", marginTop: 10 }}>
            <Pressable
              // onPress={getTicketBtn}
              onPress={paymentInfoTwoWay}
              style={{
                backgroundColor: "#006ED5",
                width: screenWidth / 1.1,
                height: 55,
                borderRadius: 15,
                alignSelf: "center",
                alignItems: "center",
                justifyContent: "center",

                flexDirection: "row",
                marginBottom: 20,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlignVertical: "center",
                  marginRight: 3,
                }}
              >
                Confirm and Finalise
              </Text>
            </Pressable>
            <View />
          </View>
        </ScrollView>
      );
    } else {
      return (
        <View style={styles.cards}>
          {/* <Pressable onPress={toPassengerInfo}> */}

          <Text
            style={{
              width: screenWidth / 1.1,
              backgroundColor: "#3c6791",
              textAlign: "left",
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
              height: 30,
              textAlignVertical: "center",
            }}
          >
            {allDataTwo.busName}
          </Text>
          <View style={styles.topCalendar}>
            <Icon name="calendar" style={styles.calanderIcon} />
            <Text
              style={{
                marginHorizontal: 1,
                marginVertical: 6,
                color: "#3c6791",
                left: 10,
              }}
            >
              {allDataTwo.travelDate}
            </Text>
          </View>
          <View style={styles.cityStyle}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                textAlign: "left",
                marginHorizontal: 3,
                left: 10,
                color: "#3c6791",
              }}
            >
              {allDataTwo.depaLocat}
            </Text>
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                marginHorizontal: 20,
              }}
            >
              <View
                style={{
                  height: 0,
                  width: 110,
                  borderWidth: 0.5,
                  borderColor: "#3c6791",
                  marginTop: 2,

                  borderRadius: 1,
                }}
              ></View>
            </View>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                textAlign: "right",
                flex: 1,
                right: 10,
                color: "#3c6791",
              }}
            >
              {allDataTwo.destinlocat}
            </Text>
          </View>
          <View style={styles.timeStyle}>
            <Text
              style={{
                fontSize: 15,
                textAlign: "left",
                flex: 1,
                left: 20,
                color: "#3c6791",
              }}
            >
              {allDataTwo.departTime}
            </Text>
            <Text
              style={{
                fontSize: 15,
                textAlign: "right",
                flex: 1,
                right: 20,
                color: "#3c6791",
              }}
            >
              {allDataTwo.arrivalT}{" "}
            </Text>
          </View>
          <View style={styles.timeCashStyle}>
            <Icon name="time" style={styles.timeIcon} />
            <Text
              style={{
                textAlign: "left",
                marginVertical: 4,
                left: 10,
                color: "#3c6791",
              }}
            >
              5 hrs 50 min
            </Text>
          </View>

          <View style={styles.cityStyle}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                textAlign: "left",
                marginHorizontal: 3,
                left: 10,
                color: "#3c6791",
                fontWeight: "bold",
              }}
            >
              {allDataTwo.destinlocat}{" "}
            </Text>
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                marginHorizontal: 20,
              }}
            >
              <View
                style={{
                  height: 0,
                  width: 110,
                  borderWidth: 0.5,
                  borderColor: "#3c6791",
                  marginTop: 2,

                  borderRadius: 1,
                }}
              ></View>
            </View>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                textAlign: "right",
                flex: 1,
                right: 10,
                color: "#3c6791",
                fontWeight: "bold",
              }}
            >
              {allDataTwo.depaLocat}
            </Text>
          </View>

          <View style={styles.timeStyle}>
            <Text
              style={{
                fontSize: 15,
                textAlign: "left",
                flex: 1,
                left: 10,
                color: "#3c6791",
              }}
            >
              {allDataTwo.departTime}
            </Text>
            <Text
              style={{
                fontSize: 15,
                textAlign: "right",
                flex: 1,
                right: 10,
                color: "#3c6791",
              }}
            >
              {allDataTwo.arrivalT}{" "}
            </Text>
          </View>
          <View style={styles.boardingTitleStyle}>
            <Text
              style={{
                fontSize: 15,
                textAlign: "left",
                flex: 1,
                left: 10,
                color: "#3c6791",
              }}
            >
              Boarding Place
            </Text>
            <Text
              style={{
                fontSize: 15,
                textAlign: "right",
                flex: 1,
                right: 10,
                color: "#3c6791",
              }}
            >
              Drop-Off Place
            </Text>
          </View>

          <View style={styles.boardingPlaceStyle}>
            <Text
              style={{
                fontSize: 14,
                textAlign: "left",
                flex: 1,
                marginLeft: 10,
                color: "#3c6791",
                marginRight: 25,
              }}
            >
              {/* {Object.values(passengerOnboardingList.item.value).map((item) => item)} */}
            </Text>
            <Text
              style={{
                fontSize: 14,
                textAlign: "right",
                flex: 1,
                right: 10,
                color: "#3c6791",
              }}
            >
              {/* {Object.values(passengerOffBoardingPlace.item.value).map((item) => item)}{" "} */}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                flexDirection: "column",
                marginVertical: 10,
                maxWidth: 100,
                marginRight: 50,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  textAlign: "left",
                  flex: 1,
                  left: 10,
                  color: "#3c6791",
                }}
              >
                Seats
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  textAlign: "left",
                  flex: 1,
                  left: 10,
                  color: "#3c6791",
                  fontWeight: "bold",
                }}
              >
                {seat.map((item) => item).join(", ")}
              </Text>
            </View>

            <View style={{ flexDirection: "column", marginVertical: 10 }}>
              <Text
                style={{
                  fontSize: 15,
                  marginEnd: 70,
                  flex: 1,
                  right: 10,
                  color: "#3c6791",
                }}
              >
                {" "}
                Passengers
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  marginRight: 50,
                  flex: 1,
                  color: "#3c6791",
                  fontWeight: "bold",
                }}
              >
                {seat.length}
              </Text>
            </View>
          </View>
          <View style={{ marginVertical: 3, flex: 1, marginHorizontal: 3 }}>
            <Text
              style={{
                fontSize: 15,
                textAlign: "left",
                flex: 1,
                left: 10,
                color: "#3c6791",
              }}
            >
              Price per passenger
            </Text>
            <Text
              style={{
                fontSize: 15,
                textAlign: "left",
                flex: 1,
                left: 10,
                color: "#3c6791",
                marginVertical: 10,
                fontWeight: "bold",
              }}
            >
              {allDataTwo.price} ETB
            </Text>
            {/* <Text style ={{fontSize:15,textAlign:'left',flex : 1}}> = 500 ETB</Text> */}
          </View>

          <View
            style={{
              width: screenWidth / 1.1,
              backgroundColor: "#f27f22",
              textAlign: "right",
              color: "white",
              fontSize: 15,
              fontWeight: "bold",
              height: 32,

              borderBottomEndRadius: 1,
              borderBottomStartRadius: 1,
            }}
          >
            <Text
              style={{
                textAlign: "right",
                textAlignVertical: "center",
                flex: 1,
                color: "white",
              }}
            >
              Total Price : {seat.length * allDataTwo.price} ETB{" "}
            </Text>
          </View>
          {/* </Pressable> */}
        </View>
      );
    }
  };

  ///////////////////////////
  //////////////////////////
  return (
    <ScrollView style={{ backgroundColor: "#EBEBEB" }}>
      <View>
        {showPopUp && oneWayPopUp()}
        {showPopUpRound && TwoWayPopUp()}
        {returnTicket ? twoWay() : oneWay()}

        {loading && (
          <View>
            <ActivityIndicator size={"large"} color="#3c6791" />
          </View>
        )}
      </View>
      {/* <View>
        <Pressable
          onPress={() => {
            console.log(
              "dvdvdf----",
              roundBook.ticketUUIds,
              "dfdff===",
              isEnabledTwoWay
            );
          }}
          style={{ backgroundColor: "tomato", width: 50, height: 50 }}
        >
          <Text>test</Text>
        </Pressable>
      </View> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "flex-start",
  },
  label: {
    margin: 5,
  },
  calanderIcon: {
    fontSize: 20,
    color: "#212121",

    // marginHorizontal:10,

    marginLeft: 10,
  },
  topCalendar: {
    flex: 1,
    flexDirection: "row",
    marginTop: 10,
  },
  editIcon: {
    fontSize: 40,
    color: "tomato",
    marginHorizontal: 120,
    marginVertical: 30,
  },
  cards: {
    width: screenWidth / 1.1,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#EBEBEB",
    shadowOffset: 10,
    shadowColor: "black",
    marginHorizontal: 10,

    marginTop: 10,
    alignSelf: "center",

    backgroundColor: "#EBEBEB",
    shadowColor: "black",
    elevation: 20,
  },
  cashStyle: {
    width: 80,
    height: 40,
    backgroundColor: "#3c6791",
    color: "white",
    textAlign: "center",
    textAlignVertical: "center",
    borderBottomEndRadius: 10,
  },

  cityStyle: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 10,
  },
  timeStyle: {
    flexDirection: "row",
    marginBottom: 10,
  },
  timeCashStyle: {
    flexDirection: "row",
    marginBottom: 0,

    // justifyContent : 'space-around'
  },
  timeIcon: {
    fontSize: 20,
    color: "#212121",
    left: 10,
    marginTop: 3,
  },
  boardingTitleStyle: {
    flexDirection: "row",
    marginTop: 20,
  },
  boardingPlaceStyle: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 11,
  },
});
