import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TextInput,
  Image,

  TouchableOpacity,
  Platform,
  Pressable,

  Alert,

  KeyboardAvoidingView,

  Modal,
  TouchableWithoutFeedback,
  RefreshControl
} from "react-native";


import {
  NavigationContainer,
  useFocusEffect,
  useIsFocused,
} from "@react-navigation/native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons/faCalendarDays";




import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { Calendar } from "react-native-ethiopian-calendar";

import DropShadow from "react-native-drop-shadow";

import moment from "moment";

import { Autocomplete, AutocompleteItem, Icon } from "@ui-kitten/components";
import { FlatList, TouchableHighlight } from "react-native-gesture-handler";

const filter = (item, query) =>
  item.value.toLowerCase().includes(query.toLowerCase());

const StarIcon = (props) => <Icon {...props} name="star" />;
export default function HomeScreen({ navigation }) {
  const [numberOfPassengers, setNumberOfPassengers] = useState(1);
  const [BusNameListDrop, setBusNameListDrop] = useState([]);
  const [fromNameValue, setFromNameValue] = useState("");
  const [toNameValue, setToNameValue] = useState("");
  const [value, setValue] = useState(null);
  const [valuefrom, setValuefrom] = useState('');
  const [valueBus, setValueBus] = useState(null);
  const [valueTo, setValueTo] = useState('');
  const [mode, setMode] = React.useState("GC");
  const [locale, setLocale] = React.useState("AMH");
  const [selectedDate, setSelectedDate] = React.useState("");
  const [selectedReturnDate, setSelectedReturnDate] = React.useState("");
  const [modeReturn, setModeReturn] = React.useState("EC");
  const [localeReturn, setLocaleReturn] = React.useState("AMH");
  const [Theme, seTTheme] = useState("black");
  const [isActiveSearch, setIsActiveSearch] = useState(false);
  const [showDropDown,setShowDropDown] =useState(false)

  const [showPopuularRoute, setShowPopularRoute] = React.useState(false);

  const [loading, setLoading] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const [showSideBar, setShowSideBar] = useState(false);
  const [isRefund, setIsRefund] = useState(false);
  const route = useRoute();
  const loginD = route.params.loginD;
  const activeDate = moment().add(1, "day").format("YYYY-MM-D");

  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true);
  //   setTimeout(() => {
  //     setRefreshing(false);
  //   }, 2000);
  // }, []);
  const isFocused = useIsFocused();

  useEffect(() => {
    setValuefrom("");
    setValueTo("");
    setSelectedDate("");
    setSelectedReturnDate("");
    setBusName("");
    setBusUuid("");
    setInputFrom("");
    setInputTo("");
    setValue("");
    setBusName("");
    setBusUuid("");
    setValueBus("");
    setShowPopularRoute(false);
    setInputFrom("");
    setInputTo("");
    setIsActiveSearch(isActiveSearch)
  }, [isFocused]);

  useEffect(() => {
    getPopularRoute();
  }, []);

  useEffect(() => {
    isActiveSearch && searchBtn();
    console.log(
      "heyyyy",
      fromText,
      "dsvdfv",
      toText,
      "accc",
      dateDeparture,
      "active",
      isActiveSearch
    );
    setIsActiveSearch(false);
  }, [isActiveSearch]);
  const searchResult = "Search Result";
  const KeyboardAwareScrollView = Platform.select({
    ios: KeyboardAvoidingView,
    android: ScrollView,
  });
  //////
  const [InputFromName, setInputFromName] = useState("From");
  const [InputToName, setInputToName] = useState("To");
  /////
  const [busName, setBusName] = useState(value);
  const [dataLocation, setDataLocation] = useState([]);

  const [departureDateText, setDepartureDate] = useState();
  const [returnDateText, setReturnDate] = useState();

  const [toText, setInputTo] = useState("");
  const [fromText, setInputFrom] = useState("");
  const [isEnabledOneWay, setEnabledOneWay] = useState(true);
  const [isEnabledTwoWay, setEnabledTwoWay] = useState(false);

  const [selected, setSelected] = useState("");
  const [indexValue, setIndexValue] = useState(0);
  // const [availableSchedule , setAvailableSchedule] = useState([])
  const [date, setDate] = useState(new Date());
  // const [mode,setMode]= useState('date')
  // const [modeReturn , setReturnMode] = useState('date')
  const [show, setShow] = useState(false);
  const [showReturn, setShowReturn] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [busUuid, setBusUuid] = useState();
  const [popularRoutes, setPopularRoutes] = useState();
  // const [value, setValue] = React.useState(null);
  const [data, setData] = React.useState(dataLocation);

  const testCheck = () => {
    console.log("dataaaa----------------------------", loginD);
  };
  const pRoute = () => {
    return (
      popularRoutes && popularRoutes.map((pr, index) => {
        return (
          <TouchableOpacity
            onPress={() => {
              setInputFrom(pr.departure.uuid);
              setInputTo(pr.destination.uuid);
              dateDeparture == activeDate;
              setIsActiveSearch(true);
            }}
            style={{ backgroundColor: "#EBEBEB", }}
          >
        
            <View style={{ alignSelf: "center" }}>
          
              <DropShadow
                style={{
                  shadowColor: "#171717",
                  shadowOffset: { width: 1, height: 1 },
                  shadowOpacity: 0.1,
                  shadowRadius: 2,
                }}
              >
                <View
                  style={{
                    width: screenWidth / 1.1,
                    height: 70,
                    backgroundColor: "#EBEBEB",
                    borderWidth: 0.5,
                    borderRadius: 10,
                    borderColor:  "#EBEBEB",
                    marginBottom: 10,
                    marginTop: 5,
                    justifyContent: "center",
                    borderTopColor:"#006ED5",
                    borderStartColor:"#006ED5"
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "bold",
                        flex: 1,
                        textAlign: "left",
                        marginLeft: 10,
                      }}
                    >
                        {pr.departure.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        marginRight: 10,
                        marginLeft: 10,
                      }}
                    >
                      --------------------------------
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "bold",
                        flex: 1,
                        textAlign: "right",
                        marginRight: 10,
                      }}
                    >
                        {pr.destination.name}
                    </Text>
                  </View>
                </View>
              </DropShadow>
           
          </View>
          </TouchableOpacity>
        );
      })
    );
  };
  const getPopularRoute = () => {
    fetch(
      "http://liyu-bus-api.dev.kifiya.et/liyu-bus-api/v1/api/route/get-active-route"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPopularRoutes(data);
      })
      .catch((error) => {
        console.error(error);
        Alert.alert(
          "LIYU BUS",
          "Sorry, The booking session has expired. Please start a new booking. ",
          [{ text: "OK", onPress: () => {} }]
        );
      });
  };
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    setValuefrom("");
    setValueTo("");
    setSelectedDate("");
    setSelectedReturnDate("");
    setBusName("");
    setBusUuid("");
    setInputFrom("");
    setInputTo("");
    setValue("");
    setBusName("");
    setBusUuid("");
    setValueBus("");
    setInputFrom("");
    setInputTo("");
    getPopularRoute();
    setRefreshing(false)
  
  }, [refreshing]);

  const onSelect = (index) => {
    if (data[index].key != toText) {
      setValuefrom(data[index].value);
      setInputFrom(data[index].key);
      setShowPopularRoute(true);
    } else {
      setValuefrom("");
    }
  };

  const onChangeText = (query) => {
    setValuefrom(query);
    setData(dataLocation.filter((item) => filter(item, query)));
  };


  const clearInput = () => {
    setValuefrom("");
    setData(dataLocation);
  };
  const clearInputBus = () => {
    setValueBus("");
    setBusName("");
    setBusUuid("");
    // setData(dataLocation);
    // setData(BusNameListDrop);
    setBusNameListDrop(BusNameListDrop);
  };
  const renderGoingTo = (props) => (
    <TouchableWithoutFeedback>
      <Image
        source={require("../Img/map.png")}
        style={{
          width: 20,
          height: 20,
        }}
      />
    </TouchableWithoutFeedback>
  );
  const renderLeavingFrom = (props) => (
    <TouchableWithoutFeedback>
      <Image
        source={require("../Img/circle.png")}
        style={{
          width: 20,
          height: 25,
        }}
      />
    </TouchableWithoutFeedback>
  );
  const renderCloseIconBus = (props) => (
    <TouchableWithoutFeedback onPress={clearInputBus}>
      <Icon
        {...props}
        name={valueBus == "" ? "arrow-ios-downward-outline" : "close"}
      />
    </TouchableWithoutFeedback>
  );
  const showdrop = ()=>{
  
    console.log("clicked-----------")
  }
  const renderCloseIcon = (props) => (
    <TouchableWithoutFeedback onPress={valuefrom == "" ? showdrop :clearInput}>
      <Icon
        {...props}
        name={valuefrom == "" ? "arrow-ios-downward-outline" : "close"}
      />
    </TouchableWithoutFeedback>
  );
  const onSelectBus = (index) => {
    console.log("data-------------", data);
    // setValueTo(dataLocation[index].value);

    /////////////////
    setValueBus(BusNameListDrop[index].label);
    setBusName(BusNameListDrop[index].label);
    setBusUuid(BusNameListDrop[index].value);
  };

  const onSelectTo = (index) => {
    console.log("data-------------", data);
    // setValueTo(dataLocation[index].value);
    if (data[index].key != fromText) {
      setValueTo(data[index].value);
      setInputTo(data[index].key);
    } else {
      setValueTo("");
    }
  };

  const onChangeTextTo = (query) => {
    setValueTo(query);
    setData(dataLocation.filter((item) => filter(item, query)));
  };
  const clearInputTo = () => {
    setValueTo("");
    setData(dataLocation);
  };

  const renderCloseIconTo = (props) => (
    <TouchableWithoutFeedback onPress={clearInputTo}>
      <Icon
        {...props}
        name={valueTo == "" ? "arrow-ios-downward-outline" : "close"}
      />
    </TouchableWithoutFeedback>
  );

  const renderOption = (item, index) => {
    // console.log(item,index)
    return (
      <AutocompleteItem
        key={item.key}
        title={item.value}

        // accessoryLeft={StarIcon}
      />
    );
  };

  const renderOptionBus = (item, index) => {
    // console.log(item,index)
    return (
      <AutocompleteItem
        key={item.value}
        title={item.label}

        // accessoryLeft={StarIcon}
      />
    );
  };

  const showMode = (currenttMode) => {
    setShow(true);
  };

  const showModeFalse = (event, selectedDate) => {
    setShow(false);
  };
  const showModeFalseReturn = (event, selectedReturnDate) => {
    setShowReturn(false);
  };
  const showModeReturn = (currenttMode) => {
    setShowReturn(true);
  };

  // const locationData = route.params.locationData

  const changeText = () => {
    // setInputFromName(InputToName)
    setValuefrom(valueTo);
    setInputFrom(toText);
    // setInputToName(InputFromName)
    setValueTo(valuefrom);
    setInputTo(fromText);

    console.log(InputToName);
    console.log(InputFromName);
  };

  ///////////
  const fetchLocation = async () => {
    axios
      .get("http://liyu-bus-api.dev.kifiya.et/liyu-bus-api/v1/api/location")
      .then((response) => {
        // Store Values in Temporary Array
        let newArray = response.data.map((item, index) => {
          return { key: item.uuid, value: item.name };
        });
        //Set Data Variable
        setDataLocation(newArray);
      })
      .catch((e) => {
        console.log(e);
        Alert.alert(
          "LIYU BUS",
          "Sorry, The booking session has expired. Please start a new booking. ",
          [{ text: "OK", onPress: () => {} }]
        );
      });
  };
  useEffect(() => {
    //Get Values from database
    fetchLocation();
  }, []);

  /////////////////
  const [input, setInputText] = useState("");
  const handleOnChangeText = (text) => {
    setInputText(text);
    console.log(input);
  };

  const checkOneWayForm = () => {
    if (fromText && toText && selectedDate != "" && valuefrom && valueTo) {
      return true;
    }
    else if (isActiveSearch) {
      return true;
    }
    else {
      Alert.alert("LIYU BUS", "Please Fill Out The Required Fields", [
        { text: "OK", onPress: () => {} },
      ]);
    }
  };

  const checkTwoWayForm = () => {
    if (fromText && toText && selectedDate && selectedReturnDate != "") {
      return true;
    } else {
      Alert.alert("LIYU BUS", `Please Fill Out The Required Fields`, [
        { text: "OK", onPress: () => {} },
      ]);
    }
  };

  async function searchBtn() {
    if (fromText !== toText) {
      if (isEnabledTwoWay == false && checkOneWayForm() == true) {
        setLoading(true);

        await fetch(
          "https://liyu-bus-api.dev.kifiya.et/liyu-bus-api/v1/api/schedule/get-schedule",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              departureLocationUUId: fromText,
              destinationLocationUUId: toText,
              departureDate: dateDeparture,
              // returnDate: ,
              // busCompanyId: 0,
              busCompanyUUId: busUuid,
            }),
          }
        )
          .then((response) => response.json())

          /////////////
          .then((res) => {
            console.log(res);
            if (res.apierror != undefined) {
              Alert.alert("LIYU BUS", res.apierror.message, [
                { text: "OK", onPress: () => {} },
              ]);
            } else {
              var availableSchedule = res;
              if (
                availableSchedule.schedules.length == 0 &&
                availableSchedule.alternate.length == 0
              ) {
                Alert.alert(
                  "LIYU BUS",
                  "Sorry, the date bus is fully booked. Please choose another date",
                  [{ text: "OK", onPress: () => {} }]
                );
              } else {
                navigation.navigate("search", {
                  availableSchedule,
                  isEnabledTwoWay,
                  dateDeparture,
                  fromText,
                  toText,
                  busUuid,
                  loginD,
                });
              }
            }
          })

          .catch((error) => {
            console.error(error);

            Alert.alert(
              "LIYU BUS",
              "Sorry, The booking session has expired. Please start a new booking. ",
              [{ text: "OK", onPress: () => {} }]
            );
            return;
          })
          .finally(() => setLoading(false));
        console.log("fromid:" + fromText);
        console.log("toid:" + toText);
        console.log("date:" + dateDeparture);
      } else if (isEnabledTwoWay == true && checkTwoWayForm()) {
        setLoading(true);
        await fetch(
          "https://liyu-bus-api.dev.kifiya.et/liyu-bus-api/v1/api/schedule/get-round-trip-schedule",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              departureLocationUUId: fromText,
              destinationLocationUUId: toText,
              departureDate: dateDeparture,
              returnDate: dateReturn,
              // busCompanyId: 0,
              busCompanyUUId: busUuid,
            }),
          }
        )
          .then((response) => response.json())
          /////////////
          .then((res) => {
            if (res.apierror != undefined) {
              Alert.alert("LIYU BUS", res.apierror.message, [
                { text: "OK", onPress: () => {} },
              ]);
            } else {
              var availableSchedule = res;

              if (
                res.roundTripSchedule.firstTrip.length == 0 &&
                res.roundTripSchedule.secondTrip.length == 0
              ) {
                Alert.alert(
                  "LIYU BUS",
                  "Sorry, the date bus is fully booked. Please choose another date.",
                  [{ text: "OK", onPress: () => {} }]
                );
              } else {
                navigation.navigate("search", {
                  availableSchedule,
                  isEnabledTwoWay,
                  dateDeparture,
                  dateReturn,
                  fromText,
                  toText,
                  busUuid,
                  loginD,
                });
              }
            }
          })

          .catch((error) => {
            console.error(error);
            Alert.alert(
              "LIYU BUS",
              "Sorry, The booking session has expired. Please start a new booking. ",
              [{ text: "OK", onPress: () => {} }]
            );
          })
          .finally(() => setLoading(false));

        console.log("fromid:" + fromText);
        console.log("toid:" + toText);
      }
    } else if (valuefrom == valueTo) {
      Alert.alert("LIYU BUS", "Please, Fill in the required information ", [
        { text: "OK", onPress: () => {} },
      ]);
    } else {
      Alert.alert("LIYU BUS", "Fill in the required information", [
        { text: "OK", onPress: () => {} },
      ]);
    }
  }

  const [selectedtwo, setSelectedtwo] = React.useState("");
  const [datatwo, setDatatwo] = React.useState([]);

  ////////////////
  const list = () => {
    locat.map((l) => console.log(l.name));
  };

  const DepMonth = selectedDate && selectedDate?.gregorian.month.toString();
  const DepDate = selectedDate && selectedDate?.gregorian.date.toString();
  const dateDeparture =  isActiveSearch
  ? activeDate
  :
    selectedDate &&
    `${selectedDate?.gregorian.year}-${DepMonth.length < 2 ? "0" : ""}${
      selectedDate?.gregorian.month
    }-${DepDate.length < 2 ? "0" : ""}${selectedDate.gregorian.date}`;
  const dateDepartureFormat =
    selectedDate &&
    `${DepDate.length < 2 ? "0" : ""}${selectedDate.gregorian.date}-${
      DepMonth.length < 2 ? "0" : ""
    }${selectedDate?.gregorian.month}-${selectedDate?.gregorian.year}`;

  const returnMonth =
    selectedReturnDate && selectedReturnDate?.gregorian.month.toString();
  const returnDate =
    selectedReturnDate && selectedReturnDate?.gregorian.date.toString();
  const dateReturn =
    selectedReturnDate &&
    `${selectedReturnDate?.gregorian.year}-${
      returnMonth.length < 2 ? "0" : ""
    }${selectedReturnDate?.gregorian.month}-${
      returnDate.length < 2 ? "0" : ""
    }${selectedReturnDate.gregorian.date}`;

  const dateReturnFormat =
    selectedReturnDate &&
    `${returnDate.length < 2 ? "0" : ""}${selectedReturnDate.gregorian.date}-${
      returnMonth.length < 2 ? "0" : ""
    }${selectedReturnDate?.gregorian.month}-${
      selectedReturnDate?.gregorian.year
    }`;

  const checkDate = (date) => {
    const dDate = `${date.gregorian.year}-${
      date.gregorian.month.toString().length < 2 ? "0" : ""
    }${date.gregorian.month}-${
      date.gregorian.date.toString().length < 2 ? "0" : ""
    }${date.gregorian.date}`;
    // const selectedDate = moment(new Date( `${date.gregorian.year}-0${date.gregorian.month}-${date.gregorian.date}`) )
    const selectedDate = moment(new Date(dDate));

    const today = moment();

    const isInBetween = selectedDate.isBetween(
      moment().subtract(1, "day"),
      moment().add(6, "day")
    );
    console.log("moment date: ", isInBetween);
    console.log();
    if (isInBetween) {
      return true;
    } else {
      return false;
    }
  };
  const checkDateRetun = (date) => {
    const dDate = `${date.gregorian.year}-${
      date.gregorian.month.toString().length < 2 ? "0" : ""
    }${date.gregorian.month}-${
      date.gregorian.date.toString().length < 2 ? "0" : ""
    }${date.gregorian.date}`;
    // const selectedDate = moment(new Date( `${date.gregorian.year}-0${date.gregorian.month}-${date.gregorian.date}`) )
    const selectedDate = moment(new Date(dDate));

    const today = moment();

    const isInBetween = selectedDate.isBetween(
      moment().subtract(1, "day"),
      moment().add(6, "day")
    );
    console.log("moment date: ", isInBetween);
    console.log();
    if (isInBetween && dDate != dateDeparture && dDate > dateDeparture) {
      return true;
    } else {
      return false;
    }
  };
  const Sidebar = () => {
    return (
      <View>
        <Modal
          transparent={true}
          onBackdropPress={() => {
            setShowSideBar(false);
          }}
          // onRequestClose={setShowSideBar(false)}
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
                      marginLeft: 35,
                    }}
                  />
                  <Text
                    style={{ marginTop: 10, marginLeft: 30, color: "white" }}
                  >
                    {loginD.fullName}
                  </Text>
                  <Text
                    style={{ marginTop: 10, color: "white", marginLeft: 10 }}
                  >
                    Abay Bus Sales Agent
                  </Text>
                </View>
              </TouchableOpacity>

              <View style={{ flex: 1, marginTop: 50 }}>
                <TouchableOpacity
                  onPress={() => {
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
                    setIsRefund(true);
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
                    setIsRefund(false);
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
  return (
    <ScrollView
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }
      style={{
        backgroundColor: "#EBEBEB",
        height: Dimensions.get("screen").height,
      }}
      stickyHeaderIndices={[0]}
    >
      {showSideBar && Sidebar()}
      <View style={{ backgroundColor: "#EBEBEB", marginBottom: 10 }}>
        <View style={{ flex: 1, flexDirection: "row", marginBottom: 10 }}>
          <TouchableOpacity
            onPress={() => {
              setShowSideBar(true);
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignSelf: "flex-start",
                marginVertical: 30,
                marginLeft: 30,
              }}
            >
              <Image
                source={require("../Img/hamburger.png")}
                style={{
                  width: 20,
                  height: 20,
                }}
              />
            </View>
          </TouchableOpacity>
          <Pressable>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                marginLeft: 100,
                top: 10,
              }}
            >
              <View style={{ flexDirection: "column" }}>
                <Text
                  style={{
                    marginTop: 10,
                    color: "#006ED5",
                    textAlign: "right",
                  }}
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
      </View>
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
            borderColor: "#EBEBEB",
            borderRadius: 40,
            backgroundColor: "#EBEBEB",
            marginBottom: 40,
            elevation: 10,
            alignSelf: "center",
          }}
        >
          <View style={{ flex: 1, marginTop: 30 }}>
            <View style={styles.toggle}>
            
       
            </View>
          </View>

          <DropShadow
            style={{
              shadowColor: "#171717",
              shadowOffset: { width: 1, height: 5 },
              shadowOpacity: 0.4,
              shadowRadius: 2,
            }}
          >
            <Autocomplete
              placeholder="Leaving From"
              placeholderTextColor={"grey"}
              value={valuefrom}
              style={{
                backgroundColor: "#EBEBEB",
                width: screenWidth / 1.3,
                borderWidth: 0,
                margin: 10,
                elevation: 10,
                left: 8,
                height: 50,
                borderWidth: 1,
                borderRadius: 10,
              }}
              size="large"
              accessoryRight={renderCloseIcon}
              accessoryLeft={renderLeavingFrom}
              onChangeText={onChangeText}
              onSelect={onSelect}
            >
              {data.map(renderOption)}
            </Autocomplete>
          </DropShadow>
          <Pressable></Pressable>

          <DropShadow
            style={{
              shadowColor: "#171717",
              shadowOffset: { width: 1, height: 5 },
              shadowOpacity: 0.4,
              shadowRadius: 2,
            }}
          >
            <Autocomplete
              placeholder="Going To"
              placeholderTextColor={"grey"}
              value={valueTo}
              onSelect={onSelectTo}
              accessoryRight={renderCloseIconTo}
              accessoryLeft={renderGoingTo}
              style={{
                backgroundColor: "#EBEBEB",
                width: screenWidth / 1.3,
                borderWidth: 1,
                borderRadius: 10,
                elevation: 10,
                margin: 10,
                left: 8,
                height: 50,
              }}
              size="large"
              placement="top"
              onChangeText={onChangeTextTo}
            >
              {data.map(renderOption)}
            </Autocomplete>
          </DropShadow>

          <Pressable onPress={() => showMode("date")}>
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
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#EBEBEB",
                  width: screenWidth / 1.3,
                  marginLeft: 18,
                  borderWidth: 1,
                  borderColor: "#EBEBEB",
                  elevation: 10,
                  borderRadius: 10,
                  marginBottom: 20,
                  marginTop: 10,
                }}
              >
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  size={20}
                  style={{
                    color: "grey",
                    padding: 10,
                    marginRight: 10,
                    marginLeft: 10,
                  }}
                />
                <TextInput
                  // placeholder='Departure Date'
                  placeholder={
                    selectedDate == "" ? "Leaving On" : dateDepartureFormat
                  }
                  underlineColorAndroid="transparent"
                  placeholderTextColor="grey"
                  style={styles.textInput}
                  editable={false}
                  keyboardType="numeric"
                />
              </View>
            </DropShadow>
          </Pressable>

          {show && (
            <View>
              <TouchableOpacity
                onPressOut={() => {
                  return setShow(!show);
                }}
              >
                <Modal
                  transparent={true}
                  onRequestClose={() => {
                    setShow(false);
                  }}
                  close
                >
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    <View
                      style={{
                        width: screenWidth / 1.1,
                        alignSelf: "center",
                        position: "relative",
                        elevation: 20,
                        shadowColor: "black",
                        borderWidth: 5,
                        borderRadius: 10,
                        borderColor: "#EBEBEB",
                      }}
                    >
                      <DropShadow
                        style={{
                          shadowColor: "#171717",
                          shadowOffset: { width: 10, height: 20 },
                          shadowOpacity: 0.4,
                          shadowRadius: 2,
                        }}
                      >
                        <Calendar
                          hideHeaderButtons={true}
                          mode={mode}
                          onDatePress={(date) => {
                            checkDate(date);
                            setSelectedDate(
                              checkDate(date)
                                ? date
                                : Alert.alert(
                                    "LIYU BUS",
                                    "The selected date should be within 5 days",
                                    [
                                      {
                                        text: "OK",
                                        onPress: () => {
                                          setSelectedDate("");
                                        },
                                      },
                                    ]
                                  )
                            );
                            showModeFalse();
                            setDepartureDate(
                              selectedDate &&
                                `${selectedDate.ethiopian.date}/${selectedDate?.ethiopian.month}/${selectedDate?.ethiopian.year}`
                            );
                            console.log(date);
                          }}
                          onModeChange={(selectedMode) => setMode(selectedMode)}
                          onLanguageChange={(lang) => setLocale(lang)}
                          locale={locale}
                          theme={{
                            switchButtonColor: "#f27f22",
                            arrowColor: "#3c6791",
                            selectedDayBackgroundColor: "#3c6791",
                            todayTextColor: "#006ED5",
                          }}
                        />
                      </DropShadow>
                    </View>
                  </View>
                </Modal>
              </TouchableOpacity>
            </View>
          )}

          {isEnabledTwoWay && (
            <Pressable
              onPress={() => (isEnabledTwoWay ? showModeReturn("date") : "")}
            >
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
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#EBEBEB",
                    width: screenWidth / 1.3,
                    marginLeft: 18,
                    borderWidth: 1,
                    borderColor: "#EBEBEB",
                    elevation: 10,
                    borderRadius: 10,
                  }}
                >
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    size={20}
                    style={{
                      color: "grey",
                      padding: 10,
                      marginRight: 10,
                      marginLeft: 10,
                    }}
                  />
                  <TextInput
                    placeholder={
                      selectedReturnDate == "" ? "Return On" : dateReturnFormat
                    }
                    placeholderTextColor="grey"
                    // placeholderTextColor={'#000'}
                    style={styles.textInput}
                    editable={false}
                    // onChangeText={text => setReturnDate(text)}
                  />
                </View>
              </DropShadow>
            </Pressable>
          )}
     

          {loading && (
            <View>
              <ActivityIndicator size={"large"} color="#3c6791" />
            </View>
          )}
          {showReturn && (
            <TouchableOpacity
              activeOpacity={0}
              onPressOut={() => {
                setShowReturn(false);
              }}
            >
              <Modal
                transparent={true}
                onRequestClose={() => {
                  setShowReturn(false);
                }}
              >
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <View
                    style={{
                      width: screenWidth / 1.1,
                      alignSelf: "center",
                      position: "relative",
                      elevation: 20,
                      shadowColor: "black",
                      borderWidth: 5,
                      borderRadius: 10,
                      borderColor: "#EBEBEB",
                    }}
                  >
                    <DropShadow
                      style={{
                        shadowColor: "#171717",
                        shadowOffset: { width: 10, height: 20 },
                        shadowOpacity: 0.4,
                        shadowRadius: 2,
                      }}
                    >
                      <Calendar
                        mode={mode}
                        hideHeaderButtons={true}
                        onDatePress={(date) => {
                          checkDateRetun(date);
                          setSelectedReturnDate(
                            checkDateRetun(date)
                              ? date
                              : Alert.alert(
                                  "LIYU BUS",
                                  "The selected date should be within 5 days ",
                                  [
                                    {
                                      text: "OK",
                                      onPress: () => {
                                        setSelectedReturnDate("");
                                      },
                                    },
                                  ]
                                )
                          );
                          showModeFalseReturn();
                          setReturnDate(
                            selectedReturnDate &&
                              `${selectedReturnDate?.ethiopian.year}-${selectedReturnDate?.ethiopian.month}-${selectedReturnDate.ethiopian.date}`
                          );
                        }}
                        onModeChange={(selectedMode) =>
                          setModeReturn(selectedMode)
                        }
                        onLanguageChange={(lang) => setLocaleReturn(lang)}
                        locale={locale}
                        theme={{
                          switchButtonColor: "#f27f22",
                          arrowColor: "#3c6791",
                          selectedDayBackgroundColor: "#3c6791",
                          todayTextColor: "#006ED5",
                        }}
                      />
                    </DropShadow>
                  </View>
                </View>
              </Modal>
            </TouchableOpacity>
          )}

          <View
            style={{
              height:
                Dimensions.get("screen").height -
                Dimensions.get("screen").height +
                100,
            }}
          >
            <TouchableOpacity
              onPress={searchBtn}
              style={{
                backgroundColor: "#006ED5",
                width: screenWidth / 1.3,
                height: 55,
                borderRadius: 15,
                alignSelf: "center",
                position: "absolute",
                bottom: 0,
                marginBottom: 20,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  textAlign: "center",
                  flex: 1,
                  textAlignVertical: "center",
                }}
              >
                Search
              </Text>
            </TouchableOpacity>

          </View>
        </View>
      </DropShadow>
      <Text style={{ color: "#006ED5", fontSize: 18, marginLeft: 20 }}>
        Popular Routes
      </Text>
      
      {pRoute()}

    </ScrollView>
  );
}

const screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  text: { flex: 1, alignItems: "", justifyContent: "center" },
  welcome: {},
  toggle: {
    flex: 1,
    alignItems: "flex-start",
    flexDirection: "row",
    left: 8,
    marginTop: 5,
    marginLeft: 10,
  },
  textInput: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: "#EBEBEB",
    color: "#424242",

    borderColor: "#fff",
    borderRadius: 10,
  },
  textInputFromTo: {
    borderTopWidth: 3,
    borderLeftWidth: 3,
    padding: 5,

    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: "white",
    fontSize: 10,
    borderRadius: 10,
    borderTopColor: "#3c6791",
    borderLeftColor: "#3c6791",
    shadowOffset: 10,
    width: screenWidth / 2,
  },
  twoWayIcon: {
    fontSize: 40,
    color: "red",
  },

  dropdown: {
    margin: 10,
    height: 50,
    left: 8,
    width: screenWidth / 1.1,
    backgroundColor: "white",
    borderWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderColor: "#3c6791",
    borderRadius: 10,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  // itemTextStyle:{
  //   color:'grey'
  // }
});
