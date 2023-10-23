import React, { useState, useLayoutEffect, useRef, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  Dimensions,
  Switch,
  TextInput,
  Button,
  Pressable,
  Alert,
  Platform,
  Modal,
  Animated,
} from "react-native";
import moment from "moment";
import Icon from "react-native-vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import DropShadow from "react-native-drop-shadow";
import {
  faPenToSquare,
  width,
} from "@fortawesome/free-solid-svg-icons/faPenToSquare";
import { useRoute } from "@react-navigation/native";
import { faPingPongPaddleBall } from "@fortawesome/free-solid-svg-icons";
import { all } from "axios";

export default function SearchResult({ navigation }) {
  const [currenttDate, setCurrentDate] = useState("");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("13/01/2023");

  const route = useRoute();

  const isEnabledTwoWay = route.params.isEnabledTwoWay;
  const allData = route.params.allData;
  const depDate = route.params.depDate;
  const dateReturn = route.params.dateReturn;
  const fromText = route.params.fromText;
  const toText = route.params.toText;
  const busUuid = route.params.busUuid;
  const loginD = route.params.loginD;
  const index = route.params.index;
  const [datetext, setDateText] = useState(dateReturn);
  const [availableSchedule, setSchedule] = useState(
    route.params.availableSchedule
  );

  const navigationn = useNavigation();
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const unsubscribe = navigationn.addListener("beforeRemove", (e) => {
      e.preventDefault();

      Animated.timing(animation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        navigationn.dispatch(e.data.action);
      });
    });

    return unsubscribe;
  }, [animation, navigationn]);

  useLayoutEffect(() => {
    setSchedule(route.params.availableSchedule);
  }, []);

  const [dates, setDates] = useState([{ selected: true, date: moment() }]);

  useLayoutEffect(() => {
    const dateArray = [];

    for (let i = 0; i < 6; i++) {
      const date = moment().add(i, "days");
      dateArray.push({
        selected: date.isSame(moment(datetext), "day"),
        date,
      });
    }

    setDates(dateArray);
  }, [datetext]);

  const dateSearchTwoWay = async (date) => {
    setLoading(true);

    const refechData = JSON.stringify({
      departureLocationUUId: fromText,
      destinationLocationUUId: toText,
      departureDate:
        availableSchedule.roundTripSchedule.firstTrip[0].departureDate,
      returnDate: date,
      busCompanyUUId: busUuid,
    });
    await fetch(
      "https://liyu-bus-api.dev.kifiya.et/liyu-bus-api/v1/api/schedule/get-round-trip-schedule",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: refechData,
      }
    )
      .then((response) => response.json())
      /////////////
      .then((res) => {
        if (res.apierror != undefined) {
          Alert.alert("LIYU BUS", res.apierror.message, [
            { text: "OK", onPress: () => {} },
          ]);
          return;
        } else {
          if (
            res.roundTripSchedule.secondTrip.length > 0 &&
            res.alternateRoundTripSchedule.secondTrip != null
          ) {
            Alert.alert(
              "LIYU BUS",
              "Sorry, the selected bus is fully booked. Please choose another bus or date.",
              [{ text: "OK", onPress: () => {} }]
            );
          } else {
            setSchedule((prevstate) => res);
          }
          /////////////////////////

          setSchedule((prevstate) => res);
          /////////////////////////
          {
            res.roundTripSchedule.secondTrip.length > 0
              ? setDateText(res.roundTripSchedule.secondTrip[0].departureDate)
              : res.alternateRoundTripSchedule.secondTrip.length > 0 &&
                res.alternateRoundTripSchedule.secondTrip != null
              ? setDateText(
                  res.alternateRoundTripSchedule.secondTrip[0].departureDate
                )
              : "";
          }
          ////////////////////////
        }
      })

      .catch((error) => {
        console.error(error);
        Alert.alert(
          "LIYU BUS",
          "Sorry, The selected date is in the past. Please select a future date. ",
          [{ text: "OK", onPress: () => {} }]
        );
      })
      .finally(() => setLoading(false));
  };

  const topDatePicker = () => {
    return (
      <ScrollView horizontal={true}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            gap: 10,
            width: "100%",
            marginBottom: 10,
            marginLeft: 10,
          }}
        >
          {dates.map(({ selected, date }, index) => {
            return (
              <View>
                <Pressable
                  onPress={() => dateSearchTwoWay(date.format("YYYY-MM-DD"))}
                >
                  <View
                    style={
                      selected
                        ? {
                            width: 40,
                            height: 40,
                            borderRadius: 50,
                            backgroundColor: "#006ED5",
                            elevation: 10,
                            shadowColor: "black",
                            margin: 10,
                          }
                        : {
                            width: 40,
                            height: 40,
                            borderRadius: 50,
                            backgroundColor: "#EBEBEB",
                            elevation: 10,
                            shadowColor: "black",
                            margin: 10,
                          }
                    }
                  >
                    <Text
                      style={
                        selected
                          ? {
                              textAlign: "center",
                              flex: 1,
                              textAlignVertical: "center",
                              color: "#EBEBEB",
                            }
                          : {
                              textAlign: "center",
                              flex: 1,
                              textAlignVertical: "center",
                              color: "#006ED5",
                            }
                      }
                    >
                      {date.format("DD")}
                    </Text>
                  </View>
                  <Text style={{ textAlign: "center", color: "#000000" }}>
                    {date.format("dddd").slice(0, 3)}
                  </Text>
                </Pressable>
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  };

  const onChangeBtn = (event, selectedDate) => {
    const currenttDate = selectedDate || date;
    setShow(Platform.OS === "android"), setDate(currenttDate);
    setShow(false);
    let tempDate = new Date(currenttDate);
    let month = (tempDate.getMonth().length = 1
      ? "0" + tempDate.getMonth()
      : tempDate.getMonth());
    let dateDay = (tempDate.getDate().length = 1
      ? "0" + tempDate.getDate()
      : tempDate.getDate());

    let cDate = tempDate.getFullYear() + "-" + month + "-" + dateDay;
    setText(cDate);
  };
  const showMode = (currenttMode) => {
    setShow(true);
    setMode(currenttMode);
  };
  const selectedTwoWaySearch = (allDataSecondTrip, indexR) => {
    navigation.navigate("busseat", {
      allDataSecondTrip,
      allData,
      isEnabledTwoWay,
      returnTicket: true,
      isEnabledTwoWayReturn: true,
      loginD,
      index,
      indexR,
    });
  };

  const test = () => {
    // var x =availableSchedule.twoWayScheduleResponse.secondTrip
    // console.log(x)
    console.log("this---------------", availableSchedule);
  };
  // console.log(availableSchedule);
  ////////////////////////////////////////////////////
  function cardViewTwoWay() {
    var availableTwoTrip =
      availableSchedule.roundTripSchedule.secondTrip == null
        ? availableSchedule.alternateRoundTripSchedule.secondTrip
        : availableSchedule.roundTripSchedule.secondTrip;

    return availableTwoTrip.map((d, index) => {
      var depaLocatReturn = d.route.departureLocationName;
      var destinlocatReturn = d.route.destinationLocationName;
      var arrivalTReturn = d.arrivalTime;
      var departTimeReturn = d.departureTime;
      var priceReturn = d.tariff.amount;
      var reservedSeatListReturn = d.reservedSeats;
      var bookedSeatListReturn = d.bookedSeats;
      var busUuidReturn = d.vehicleType.uuid;
      var travelDateReturn = d.departureDate;
      var busNameReturn = d.busCompany;

      var secondScheduleUUId = d.uuid;
      var boardingPointsReturn = d.boardingPoints;
      var dropOffPointsReturn = d.dropOffPoints;
      var maxAvailableSeatReturn = d.maxAvailableSeat;
      const dateReturn = d.departureDate;
      const dropOffPointsSecond = d.dropOffPoints;
      const boardingPointsSecond = d.boardingPoints;
      const reservedSeatsReturn = d.reservedSeats;
      var allDataSecondTrip = {
        depaLocatReturn,
        secondScheduleUUId,
        destinlocatReturn,
        arrivalTReturn,
        departTimeReturn,
        priceReturn,
        reservedSeatListReturn,
        bookedSeatListReturn,
        busUuidReturn,
        travelDateReturn,
        busNameReturn,
        boardingPointsReturn,
        dropOffPointsReturn,
        maxAvailableSeatReturn,
        dropOffPointsSecond,
        boardingPointsSecond,
        reservedSeatsReturn,
      };

      // console.log(depaLocat)
      // console.log(destinlocat)
      // console.log(arrivalT)
      // console.log(departTime)
      // console.log(travelDate)
      // console.log(busName)
      console.log(secondScheduleUUId);

      return (
        <View>
          <DropShadow
            style={{
              shadowColor: "#171717",
              shadowOffset: { width: 10, height: 5 },
              shadowOpacity: 0.4,
              shadowRadius: 2,
            }}
          >
            <View style={styles.cards}>
              <Pressable
                onPress={() => selectedTwoWaySearch(allDataSecondTrip, index)}
              >
                <View
                  style={{
                    width: screenWidth / 1.12,
                    backgroundColor: "#EBEBEB",
                    height: 50,
                    flexDirection: "row",
                    flex: 1,
                  }}
                >
                  <Text
                    style={{
                      color: "#006ED5",
                      fontSize: 18,
                      textAlignVertical: "center",
                      textAlign: "left",
                      fontWeight: "bold",
                      marginLeft: 20,
                    }}
                  >
                    {/* {allDataSecondTrip.busNameReturn} */}
                    {`Bus ${index + 1}`}
                  </Text>
                  <Text
                    style={{
                      marginTop: 15,
                      flex: 1,
                      marginRight: 5,
                      textAlign: "right",
                    }}
                  ></Text>
                  <Text
                    style={{
                      marginTop: 15,
                      marginRight: 15,
                      textAlign: "right",
                    }}
                  >
                    {/* {moment(dateReturn).format("dddd").slice(0, 3)}
                    {", "}
                    {moment(dateReturn).format("MMM Do")} */}
                    {allDataSecondTrip.maxAvailableSeatReturn} Seats Left
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginTop: 1,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      textAlign: "left",

                      marginLeft: 10,
                      color: "#212121",
                      fontWeight: "bold",
                      marginLeft: 15,
                    }}
                  >
                    {allDataSecondTrip.depaLocatReturn}
                  </Text>
                  {/* <Icon name = 'arrow-forward-outline' style={{textAlign : 'center' , flex : 1}}/> */}
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 10,
                      marginLeft: 5,
                      marginRight: 5,
                    }}
                  >
                    <View
                      style={{
                        height: 0,
                        width: 100,
                        borderWidth: 0.5,
                        borderColor: "#212121",
                        marginTop: 2,

                        borderRadius: 1,
                      }}
                    ></View>
                  </View>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",

                      color: "#212121",
                      textAlign: "right",
                      marginRight: 15,
                    }}
                  >
                    {allDataSecondTrip.destinlocatReturn}
                  </Text>
                </View>
                <View style={styles.timeStyle}>
                  <Text
                    style={{
                      fontSize: 14,
                      flex: 1,
                      textAlign: "left",
                      color: "#212121",
                      marginLeft: 20,
                    }}
                  >
                    {allDataSecondTrip.departTimeReturn}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      flex: 1,
                      textAlign: "right",
                      color: "#212121",
                      marginRight: 20,
                    }}
                  >
                    {allDataSecondTrip.arrivalTReturn}
                  </Text>
                </View>
                <View style={styles.timeCashStyle}>
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 20,
                      marginLeft: 20,
                    }}
                  >
                    {/* <Icon name="bus" style={styles.busIcon} /> */}
                    <Text
                      style={{
                        textAlign: "left",
                        marginVertical: 2,
                        color: "black",
                        fontWeight: "normal",
                      }}
                    >
                      <Icon
                        name="calendar"
                        style={{ fontSize: 18, marginRight: 10 }}
                      />

                      {moment(dateReturn).format("dddd").slice(0, 3)}
                      {", "}
                      {moment(dateReturn).format("MMM Do")}
                    </Text>
                    <Text
                      style={{
                        color: "#006ED5",
                        fontWeight: "bold",
                        flex: 1,
                        fontSize: 14,
                        textAlignVertical: "center",
                        textAlign: "right",
                        marginTop: 3,
                        marginRight: 15,
                        right: 5,
                      }}
                    >
                      {/* {allDataSecondTrip.maxAvailableSeatReturn} Seats Left */}
                      <Text
                        style={{
                          marginTop: 15,
                          flex: 1,
                          marginRight: 5,
                          textAlign: "right",
                        }}
                      ></Text>
                      <Text
                        style={{
                          marginTop: 15,
                          marginRight: 15,
                          textAlign: "right",
                        }}
                      >
                        {allDataSecondTrip.priceReturn != null
                          ? `${allDataSecondTrip.priceReturn} ETB`
                          : "No price added"}
                      </Text>
                    </Text>
                  </View>
                  <View>
                    <Text style={{ textAlign: "center", top: 5, right: 3 }}>
                      - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                      - - - - - - - - - - - -
                    </Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: "row" }}>
                    {/* <Text style={styles.cashStyle}>
                      {allDataSecondTrip.priceReturn != null
                        ? `${allDataSecondTrip.priceReturn} ETB`
                        : "No price added"}
                    </Text> */}
                    <Text
                      style={{
                        color: "#006ED5",
                        fontSize: 14,
                        flex: 1,
                        textAlign: "center",
                        marginRight: 20,
                        marginTop: 10,
                        fontWeight: "bold",
                        marginBottom: 10,
                      }}
                    >
                      Select Seat
                    </Text>
                  </View>
                </View>
              </Pressable>
            </View>
          </DropShadow>
        </View>
      );
    });
  }

  /////////////////////////////////////////////////////

  return (
    <ScrollView
      style={{ backgroundColor: "#EBEBEB" }}
      stickyHeaderIndices={[0]}
    >
      <View style={{ backgroundColor: "#EBEBEB" }}>{topDatePicker()}</View>
      {loading && (
        <View>
          <ActivityIndicator size={"large"} color="#3c6791" />
        </View>
      )}
      {isEnabledTwoWay &&
        availableSchedule.roundTripSchedule.secondTrip.length == 0 && (
          <View
          // style={{
          //   flex: 1,
          //   flexDirection: "row",
          //   alignSelf: "center",
          //   marginLeft: 5,
          //   marginTop: 10,
          //   backgroundColor: "#f27f22",
          //   borderWidth: 1,
          //   borderColor: "#f27f22",
          //   borderRadius: 10,
          // }}
          >
            <Text
              style={{
                color: "#f27f22",
                fontSize: 14,
                marginLeft: 20,
                marginRight: 10,
              }}
            >
              Sorry, No results were found for your bus preference. Please check
              other bus options.
            </Text>
          </View>
        )}
      {isEnabledTwoWay &&
        availableSchedule.roundTripSchedule.secondTrip.length != 0 && (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignSelf: "flex-end",
              marginRight: 20,
              marginTop: 10,
            }}
          >
            <Text style={{ color: "#006ED5" }}>
              {`${availableSchedule.roundTripSchedule.secondTrip.length} Result(s) found`}
            </Text>
          </View>
        )}

      {isEnabledTwoWay &&
        availableSchedule.roundTripSchedule.secondTrip == null && (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignSelf: "flex-end",
              marginRight: 20,
              marginTop: 10,
            }}
          >
            <Text style={{ color: "#006ED5" }}>
              {`${availableSchedule.alternateRoundTripSchedule.secondTrip.length} Result(s) found`}
            </Text>
          </View>
        )}
      <Animated.View
        style={{
          opacity: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
          }),
          transform: [
            {
              translateX: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -50],
              }),
            },
          ],
        }}
      >
        {isEnabledTwoWay ? cardViewTwoWay() : cardViewOneWay()}
      </Animated.View>

      {/* <Pressable
        onPress={() => {
          console.log("dsvvdffvf-------", index);
        }}
        style={{
          backgroundColor: "#f27f22",
          width: screenWidth / 1.3,
          height: 50,
          borderRadius: 15,
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 20,
        }}
      >
        <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
          Next
        </Text>
      </Pressable> */}
    </ScrollView>
  );
}
const screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  calanderIcon: {
    fontSize: 30,
    color: "#3c6791",
    right: 35,
  },
  topCalendar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
    top: 10,
  },
  editIcon: {
    fontSize: 30,
    color: "#f27f22",
    marginLeft: 33,
  },
  cards: {
    elevation: 10,
    backgroundColor: "#EBEBEB",
    width: screenWidth / 1.12,
    borderWidth: 0,

    marginHorizontal: 10,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    flex: 1,
    alignSelf: "center",
    marginVertical: 10,
    borderTopWidth: 5,
    borderColor: "#EBEBEB",
  },
  cashStyle: {
    fontSize: 14,
    color: "#FF6B1B",
    padding: 15,
  },
  cityStyle: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    top: 7,
  },
  timeStyle: {
    flexDirection: "row",
    // justifyContent : 'space-around',

    top: 5,
  },
  timeCashStyle: {},
  busIcon: {
    fontSize: 20,
    color: "#212121",
  },
});
