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
import { FlatList } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";
import { all } from "axios";
import DropShadow from "react-native-drop-shadow";

const screenWidth = Dimensions.get("window").width;

export default function BusSeat({ navigation }) {
  const [seatReserved, setSeatReserved] = useState();
  const [seatReservedReal, setSeatReservedReal] = useState([]);
  var x;
  const route = useRoute();
  const allData = route.params.allData;
  const allDataTwo = route.params.allData;
  const returnTicket = route.params.returnTicket;
  const availableSchedule = route.params.availableSchedule;
  const isEnabledTwoWay = route.params.isEnabledTwoWay;
  const allDataSecondTrip = route.params.allDataSecondTrip;
  const isEnabledTwoWayReturn = route.params.isEnabledTwoWayReturn;

  const seat = route.params.seat;
  const loginD = route.params.loginD;
  const index = route.params.index;
  const returnSeat = [];
  useEffect(() => {
    test();
  }, []);

  const toPassengerInfo = () => {
    if (
      returnSeat.length != 0 &&
      returnSeat.length == seat.length &&
      returnSeat.length <= 3
    ) {
      navigation.navigate("Passenger Information", {
        allDataSecondTrip,
        allData,
        loginD,
        returnTicket,
        availableSchedule,
        isEnabledTwoWay,
        seat,
        returnSeat,
        isEnabledTwoWayReturn,
        index,
      });
    } else if (returnSeat.length != seat.length) {
      Alert.alert("LIYU BUS", "Invalid Seat Selection :(", [
        { text: "OK", onPress: () => {} },
      ]);
    } else {
      Alert.alert("LIYU BUS", "Please Select Your Seat ", [
        { text: "OK", onPress: () => {} },
      ]);
    }
  };

  const [Row1, setRow1] = useState([
    { empty: true, selecetd: false, booked: false, seatNumber: 2 },
    { empty: true, selecetd: false, booked: false, seatNumber: 3 },
    { empty: true, selecetd: false, booked: false, seatNumber: 4 },
    { empty: true, selecetd: false, booked: false, seatNumber: 5 },
    { empty: true, selecetd: false, booked: false, seatNumber: 6 },
    { empty: true, selecetd: false, booked: false, seatNumber: 7 },
    { empty: true, selecetd: false, booked: false, seatNumber: 8 },
    { empty: true, selecetd: false, booked: false, seatNumber: 9 },
    { empty: true, selecetd: false, booked: false, seatNumber: 10 },
    { empty: true, selecetd: false, booked: false, seatNumber: 11 },
    { empty: true, selecetd: false, booked: false, seatNumber: 12 },
    { empty: true, selecetd: false, booked: false, seatNumber: 13 },
    { empty: true, selecetd: false, booked: false, seatNumber: 14 },
    { empty: true, selecetd: false, booked: false, seatNumber: 15 },
    { empty: true, selecetd: false, booked: false, seatNumber: 16 },
    { empty: true, selecetd: false, booked: false, seatNumber: 17 },
    { empty: true, selecetd: false, booked: false, seatNumber: 18 },
    { empty: true, selecetd: false, booked: false, seatNumber: 19 },
    { empty: true, selecetd: false, booked: false, seatNumber: 20 },
    { empty: true, selecetd: false, booked: false, seatNumber: 21 },
  ]);
  const [Row2, setRow2] = useState([
    { empty: true, selecetd: false, booked: false, seatNumber: 22 },
    { empty: true, selecetd: false, booked: false, seatNumber: 23 },
    { empty: true, selecetd: false, booked: false, seatNumber: 24 },
    { empty: true, selecetd: false, booked: false, seatNumber: 25 },
    { empty: true, selecetd: false, booked: false, seatNumber: 26 },
    { empty: true, selecetd: false, booked: false, seatNumber: 27 },
    { empty: true, selecetd: false, booked: false, seatNumber: 28 },
    { empty: true, selecetd: false, booked: false, seatNumber: 29 },
    { empty: true, selecetd: false, booked: false, seatNumber: 30 },
    { empty: true, selecetd: false, booked: false, seatNumber: 31 },
    { empty: true, selecetd: false, booked: false, seatNumber: 32 },
    { empty: true, selecetd: false, booked: false, seatNumber: 33 },
    { empty: true, selecetd: false, booked: false, seatNumber: 34 },
    { empty: true, selecetd: false, booked: false, seatNumber: 35 },
    { empty: true, selecetd: false, booked: false, seatNumber: 36 },
    { empty: true, selecetd: false, booked: false, seatNumber: 37 },
    { empty: true, selecetd: false, booked: false, seatNumber: 38 },
    { empty: true, selecetd: false, booked: false, seatNumber: 39 },
    { empty: true, selecetd: false, booked: false, seatNumber: 40 },
    { empty: true, selecetd: false, booked: false, seatNumber: 41 },
  ]);
  const [Row3, setRow3] = useState([
    { empty: true, selecetd: false, booked: false, seatNumber: 42 },
  ]);
  const [Row4, setRow4] = useState([
    { empty: true, selecetd: false, booked: false, seatNumber: 1 },
  ]);

  const reservv = [
    { seatNumber: 30, bookingStatus: "RESERVED" },
    { seatNumber: 10, bookingStatus: "RESERVED" },
    { seatNumber: 22, bookingStatus: "RESERVED" },
  ];

  const li = [];
  const lu = [];

  allDataSecondTrip.reservedSeatListReturn != null &&
    allDataSecondTrip.reservedSeatListReturn.map((item) =>
      li.push(item.seatNumber)
    );

  allDataSecondTrip.bookedSeatListReturn != null &&
    allDataSecondTrip.bookedSeatListReturn.map((item) =>
      lu.push(item.seatNumber)
    );

  const test = () => {
    console.log(allDataSecondTrip.bookedSeatListReturn);

    Row1.map((item, index) => {
      const seatNumb = item.seatNumber.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });

      if (li.includes(seatNumb)) {
        console.log(item.seatNumber + "reserved");
        item.empty = false;
      } else if (lu.includes(seatNumb)) {
        console.log(item.seatNumber + "Booked");
        item.booked = true;
      }
    });

    Row2.map((item, index) => {
      const seatNumb = item.seatNumber.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });

      if (li.includes(seatNumb)) {
        console.log(item.seatNumber + "reserved");
        item.empty = false;
      } else if (lu.includes(seatNumb)) {
        console.log(item.seatNumber + "Booked");
        item.booked = true;
      }
    });

    Row3.map((item, index) => {
      const seatNumb = item.seatNumber.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });

      if (li.includes(seatNumb)) {
        console.log(item.seatNumber + "reserved");
        item.empty = false;
      } else if (lu.includes(seatNumb)) {
        console.log(item.seatNumber + "Booked");
        item.booked = true;
      }
    });

    Row4.map((item, index) => {
      const seatNumb = item.seatNumber.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });

      if (li.includes(seatNumb)) {
        console.log(item.seatNumber + "reserved");
        item.empty = false;
      } else if (lu.includes(seatNumb)) {
        console.log(item.seatNumber + "Booked");
        item.booked = true;
      }
    });
  };

  const onSelectedRow1 = (index) => {
    let tempRow = [];
    tempRow = Row1;
    tempRow.map((item, ind) => {
      if (index == ind) {
        if (item.selecetd == true) {
          item.selecetd = false;
          item.empty = true;
        } else if (item.booked == true) {
          item.booked = true;
          item.selecetd = false;
          item.empty = true;
        } else if (item.empty == false) {
          item.empty = false;
          item.selecetd = false;
          item.booked = false;
        } else if (returnSeat.length <= 2) {
          item.selecetd = true;
          item.empty = false;
        }
        if (returnSeat.length > 2 && item.selecetd == true) {
          Alert.alert("LIYU BUS", "cant select more than three seats ", [
            { text: "OK", onPress: () => {} },
          ]);
        }
      }
    });

    let tempSeat = [];
    tempRow.map((item) => {
      tempSeat.push(item);
    });
    setRow1(tempSeat);
  };
  ///////
  const onSelectedRow2 = (index) => {
    let tempRow = [];
    tempRow = Row2;
    tempRow.map((item, ind) => {
      if (index == ind) {
        if (item.selecetd == true) {
          item.selecetd = false;
          item.empty = true;
        } else if (item.booked == true) {
          item.booked = true;
          item.selecetd = false;
          item.empty = true;
        } else if (item.empty == false) {
          item.empty = false;
          item.selecetd = false;
          item.booked = false;
        } else if (returnSeat.length <= 2) {
          item.selecetd = true;
          item.empty = false;
        }
        if (returnSeat.length > 2 && item.selecetd == true) {
          Alert.alert("LIYU BUS", "cant select more than three seats ", [
            { text: "OK", onPress: () => {} },
          ]);
        }
      }
    });

    let tempSeat = [];
    tempRow.map((item) => {
      tempSeat.push(item);
    });
    setRow2(tempSeat);
  };
  //////////
  const onSelelectRow3 = (index) => {
    let tempRow = [];
    tempRow = Row3;
    tempRow.map((item, ind) => {
      if (index == ind) {
        if (item.selecetd == true) {
          item.selecetd = false;
          item.empty = true;
        } else if (item.booked == true) {
          item.booked = true;
          item.selecetd = false;
          item.empty = true;
        } else if (item.empty == false) {
          item.empty = false;
          item.selecetd = false;
          item.booked = false;
        } else if (returnSeat.length <= 2) {
          item.selecetd = true;
          item.empty = false;
        }

        if (returnSeat.length > 2 && item.selecetd == true) {
          Alert.alert("LIYU BUS", "cant select more than three seats ", [
            { text: "OK", onPress: () => {} },
          ]);
        }
      }
    });

    let tempSeat = [];
    tempRow.map((item) => {
      tempSeat.push(item);
    });
    setRow3(tempSeat);
  };

  const onSelelectRow4 = (index) => {
    let tempRow = [];
    tempRow = Row4;
    tempRow.map((item, ind) => {
      if (index == ind) {
        if (item.selecetd == true) {
          item.selecetd = false;
          item.empty = true;
        } else if (item.booked == true) {
          item.booked = true;
          item.selecetd = false;
          item.empty = true;
        } else if (item.empty == false) {
          item.empty = false;
          item.selecetd = false;
          item.booked = false;
        } else if (returnSeat.length <= 2) {
          item.selecetd = true;
          item.empty = false;
        }
        if (returnSeat.length > 2 && item.selecetd == true) {
          Alert.alert("LIYU BUS", "cant select more than three seats ", [
            { text: "OK", onPress: () => {} },
          ]);
        }
      }
    });

    let tempSeat = [];
    tempRow.map((item) => {
      tempSeat.push(item);
    });
    setRow4(tempSeat);
  };
  ////////
  return (
    <ScrollView
      style={{ backgroundColor: "#EBEBEB" }}
      stickyHeaderIndices={[0]}
    >
      {test()}
      <View
        style={{
          width: screenWidth / 1.3,
          backgroundColor: "#EBEBEB",
          borderRadius: 10,
          marginVertical: 5,
          shadowColor: "black",
          elevation: 20,
          padding: 5,
          alignSelf: "center",
        }}
      >
        <View>
          <View style={{ flexDirection: "row", margin: 5 }}>
            <View
              style={{
                width: 20,
                height: 20,
                backgroundColor: "grey",
                borderRadius: 50,
                left: 20,
              }}
            ></View>
            <Text style={{ color: "#3c6791", left: 30 }}>Available</Text>
            <View
              style={{
                width: 20,
                height: 20,
                backgroundColor: "orange",
                borderRadius: 50,
                left: 80,
              }}
            ></View>
            <Text style={{ textAlign: "right", color: "#3c6791", left: 90 }}>
              Selected
            </Text>
          </View>
          <View style={{ flexDirection: "row", margin: 5 }}>
            <View
              style={{
                width: 20,
                height: 20,
                backgroundColor: "blue",
                borderRadius: 50,
                left: 20,
              }}
            ></View>
            <Text style={{ color: "#3c6791", left: 30 }}>Occupied</Text>
            <View
              style={{
                width: 20,
                height: 20,
                backgroundColor: "black",
                borderRadius: 50,
                left: 80,
              }}
            ></View>
            <Text style={{ textAlign: "right", color: "#3c6791", left: 90 }}>
              Reserved
            </Text>
          </View>
        </View>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text>Click on Seat to select/deselect</Text>
        <ScrollView>
          <View
            style={{
              width: screenWidth / 1.3,
              backgroundColor: "#EBEBEB",
              borderRadius: 10,
              shadowColor: "black",
              elevation: 10,
              transform: [{ scale: 0.97 }],
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Image
                source={require("../Img/steering-wheel.png")}
                style={{ width: 30, height: 30, margin: 20, right: 2 }}
              />

              <FlatList
                data={Row4}
                numColumns={2}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      style={{
                        marginTop: 10,
                        left: 160,
                        transform: [{ scale: 0.87 }],
                      }}
                      onPress={() => {
                        if (
                          item.selecetd == false &&
                          item.empty == false &&
                          item.booked == true
                        ) {
                          Alert.alert("LIYU BUS", "Reserved seat :(", [
                            { text: "OK", onPress: () => {} },
                          ]);
                        } else {
                          onSelelectRow4(index);
                        }
                      }}
                    >
                      {item.empty == false &&
                      item.selecetd == true &&
                      item.booked == false ? (
                        setSeatReserved(seat.push(item.seatNumber)) || (
                          <Image
                            source={require("../Img/car-seat-s.png")}
                            style={{
                              width: 42,
                              height: 42,
                            }}
                          />
                        )
                      ) : item.empty == true &&
                        item.selecetd == false &&
                        item.booked == false ? (
                        <Image
                          source={require("../Img/car-seat.png")}
                          style={{ width: 42, height: 42, opacity: 0.3 }}
                        />
                      ) : item.empty == false &&
                        item.selecetd == false &&
                        item.booked == false ? (
                        <Image
                          source={require("../Img/car-seat-b.png")}
                          style={{ width: 42, height: 42 }}
                        />
                      ) : item.empty == true &&
                        item.selecetd == false &&
                        item.booked == true ? (
                        <Image
                          source={require("../Img/car-blue.png")}
                          style={{ width: 42, height: 42 }}
                        />
                      ) : null}
                      <View
                        style={{
                          width: 40,
                          height: 50,
                          marginTop: -25,
                          borderRadius: 3,
                        }}
                      >
                        <Text
                          style={
                            item.selecetd
                              ? {
                                  color: "black",
                                  textAlign: "center",
                                  zIndex: 1,
                                  fontWeight: "bold",
                                  fontSize: 12,
                                  marginLeft: 2,
                                }
                              : item.empty == false
                              ? {
                                  color: "white",
                                  textAlign: "center",
                                  zIndex: 1,
                                  fontWeight: "bold",
                                  fontSize: 12,
                                  marginLeft: 2,
                                }
                              : item.booked == true
                              ? {
                                  color: "white",
                                  textAlign: "center",
                                  zIndex: 1,
                                  fontWeight: "bold",
                                  fontSize: 12,
                                  marginLeft: 2,
                                }
                              : {
                                  color: "#3c6791",
                                  textAlign: "center",
                                  zIndex: 1,
                                  fontWeight: "bold",
                                  fontSize: 12,
                                  marginLeft: 2,
                                }
                          }
                        >
                          {item.seatNumber}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
            {/* <FontAwesomeIcon icon={faSearch} size={50} style={{ color: "blue" }} />
      <FontAwesomeIcon icon={faBars} size={50} style={{ color: "black" }} /> */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {/* <View  >
            <FlatList data={Row4} renderItem={({item,index})=>{
                    return(

                            <TouchableOpacity style={{flex:1,alignSelf:''}} 
                            
                            onPress={()=>{
                                if(item.selecetd == false && item.empty == false){alert('Already Booked')}
                                else{onSelelectRow3(index)}
                            }}
                            >
                                {item.empty==false && item.selecetd==true ?(<Image source={require('../Img/seat.png')} style={{width:40,height:24,tintColor:'orange'}} />):item.empty == true && item.selecetd == false ?
                                (<Image source={require('../Img/seat.png')} style={{width:40,height:24,opacity:0.3}} />)
                                :item.empty==false && item.selecetd == false ? (<Image source={require('../Img/seat.png')} style={{width:40,height:24,tintColor:'black'}}/>):null }
                            </TouchableOpacity>
                    )
                }}/>
            </View> */}
              <View>
                <FlatList
                  data={Row1}
                  numColumns={2}
                  renderItem={({ item, index }) => {
                    return (
                      <TouchableOpacity
                        style={{
                          margin: -10,
                          marginTop: -5,
                          marginLeft: 20,
                          transform: [{ scale: 0.87 }],
                        }}
                        onPress={() => {
                          if (
                            item.selecetd == false &&
                            item.empty == false &&
                            item.booked == true
                          ) {
                            Alert.alert("LIYU BUS", "Reserved seat :(", [
                              { text: "OK", onPress: () => {} },
                            ]);
                          }
                          // else if (item.selecetd == true && item.empty == false){setSeatReserved(prevstate=>{item.seatNumber})}
                          else {
                            onSelectedRow1(index);
                          }
                        }}
                      >
                        {item.empty == false &&
                        item.selecetd == true &&
                        item.booked == false ? (
                          setSeatReserved(returnSeat.push(item.seatNumber)) || (
                            <Image
                              source={require("../Img/car-seat-s.png")}
                              style={{
                                width: 42,
                                height: 42,
                              }}
                            />
                          )
                        ) : item.empty == true &&
                          item.selecetd == false &&
                          item.booked == false ? (
                          <Image
                            source={require("../Img/car-seat.png")}
                            style={{ width: 42, height: 42, opacity: 0.3 }}
                          />
                        ) : item.empty == false &&
                          item.selecetd == false &&
                          item.booked == false ? (
                          <Image
                            source={require("../Img/car-seat-b.png")}
                            style={{
                              width: 42,
                              height: 42,
                            }}
                          />
                        ) : item.empty == true &&
                          item.selecetd == false &&
                          item.booked == true ? (
                          <Image
                            source={require("../Img/car-blue.png")}
                            style={{ width: 42, height: 42 }}
                          />
                        ) : null}
                        <View
                          style={{
                            width: 40,
                            height: 50,
                            marginTop: -30,
                            borderRadius: 3,
                            top: 5,
                          }}
                        >
                          <Text
                            style={
                              item.selecetd
                                ? {
                                    color: "black",
                                    textAlign: "center",
                                    zIndex: 1,
                                    fontWeight: "bold",
                                    fontSize: 12,
                                    marginLeft: 2,
                                  }
                                : item.empty == false
                                ? {
                                    color: "white",
                                    textAlign: "center",
                                    zIndex: 1,
                                    fontWeight: "bold",
                                    fontSize: 12,
                                    marginLeft: 2,
                                  }
                                : item.booked == true
                                ? {
                                    color: "white",
                                    textAlign: "center",
                                    zIndex: 1,
                                    fontWeight: "bold",
                                    fontSize: 12,
                                    marginLeft: 2,
                                  }
                                : {
                                    color: "#3c6791",
                                    textAlign: "center",
                                    zIndex: 1,
                                    fontWeight: "bold",
                                    fontSize: 12,
                                    marginLeft: 2,
                                  }
                            }
                          >
                            {item.seatNumber}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
              <View>
                <FlatList
                  data={Row3}
                  numColumns={2}
                  renderItem={({ item, index }) => {
                    return (
                      <TouchableOpacity
                        style={{ marginTop: 418, transform: [{ scale: 0.87 }] }}
                        onPress={() => {
                          if (
                            item.selecetd == false &&
                            item.empty == false &&
                            item.booked == true
                          ) {
                            Alert.alert("LIYU BUS", "Reserved seat :(", [
                              { text: "OK", onPress: () => {} },
                            ]);
                          } else {
                            onSelelectRow3(index);
                          }
                        }}
                      >
                        {item.empty == false &&
                        item.selecetd == true &&
                        item.booked == false ? (
                          setSeatReserved(returnSeat.push(item.seatNumber)) || (
                            <Image
                              source={require("../Img/car-seat-s.png")}
                              style={{
                                width: 42,
                                height: 42,
                              }}
                            />
                          )
                        ) : item.empty == true &&
                          item.selecetd == false &&
                          item.booked == false ? (
                          <Image
                            source={require("../Img/car-seat.png")}
                            style={{ width: 42, height: 42, opacity: 0.3 }}
                          />
                        ) : item.empty == false &&
                          item.selecetd == false &&
                          item.booked == false ? (
                          <Image
                            source={require("../Img/car-seat-b.png")}
                            style={{
                              width: 42,
                              height: 42,
                            }}
                          />
                        ) : item.empty == true &&
                          item.selecetd == false &&
                          item.booked == true ? (
                          <Image
                            source={require("../Img/car-blue.png")}
                            style={{ width: 42, height: 42 }}
                          />
                        ) : null}
                        <View
                          style={{
                            width: 40,
                            height: 50,
                            marginTop: -25,
                            borderRadius: 3,
                          }}
                        >
                          <Text
                            style={
                              item.selecetd
                                ? {
                                    color: "black",
                                    textAlign: "center",
                                    zIndex: 1,
                                    fontWeight: "bold",
                                    fontSize: 12,
                                    marginLeft: 2,
                                  }
                                : item.empty == false
                                ? {
                                    color: "white",
                                    textAlign: "center",
                                    zIndex: 1,
                                    fontWeight: "bold",
                                    fontSize: 12,
                                    marginLeft: 2,
                                  }
                                : item.booked == true
                                ? {
                                    color: "white",
                                    textAlign: "center",
                                    zIndex: 1,
                                    fontWeight: "bold",
                                    fontSize: 12,
                                    marginLeft: 2,
                                  }
                                : {
                                    color: "#3c6791",
                                    textAlign: "center",
                                    zIndex: 1,
                                    fontWeight: "bold",
                                    fontSize: 12,
                                    marginLeft: 2,
                                  }
                            }
                          >
                            {item.seatNumber}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
              <View>
                <FlatList
                  data={Row2}
                  numColumns={2}
                  renderItem={({ item, index }) => {
                    return (
                      <TouchableOpacity
                        style={{
                          margin: -10,
                          marginTop: -5,
                          marginRight: 20,
                          transform: [{ scale: 0.87 }],
                        }}
                        onPress={() => {
                          if (
                            item.selecetd == false &&
                            item.empty == false &&
                            item.booked == true
                          ) {
                            Alert.alert("LIYU BUS", "Reserved seat :(", [
                              { text: "OK", onPress: () => {} },
                            ]);
                          } else {
                            onSelectedRow2(index);
                          }
                        }}
                      >
                        {item.empty == false &&
                        item.selecetd == true &&
                        item.booked == false ? (
                          setSeatReserved(returnSeat.push(item.seatNumber)) || (
                            <Image
                              source={require("../Img/car-seat-s.png")}
                              style={{
                                width: 42,
                                height: 42,
                              }}
                            />
                          )
                        ) : item.empty == true &&
                          item.selecetd == false &&
                          item.booked == false ? (
                          <Image
                            source={require("../Img/car-seat.png")}
                            style={{ width: 42, height: 42, opacity: 0.3 }}
                          />
                        ) : item.empty == false &&
                          item.selecetd == false &&
                          item.booked == false ? (
                          <Image
                            source={require("../Img/car-seat-b.png")}
                            style={{
                              width: 42,
                              height: 42,
                            }}
                          />
                        ) : item.empty == true &&
                          item.selecetd == false &&
                          item.booked == true ? (
                          <Image
                            source={require("../Img/car-blue.png")}
                            style={{ width: 42, height: 42 }}
                          />
                        ) : null}
                        <View
                          style={{
                            width: 40,
                            height: 50,
                            marginTop: -30,
                            borderRadius: 3,
                            top: 5,
                          }}
                        >
                          <Text
                            style={
                              item.selecetd
                                ? {
                                    color: "black",
                                    textAlign: "center",
                                    zIndex: 1,
                                    fontWeight: "bold",
                                    fontSize: 12,
                                    marginLeft: 2,
                                  }
                                : item.empty == false
                                ? {
                                    color: "white",
                                    textAlign: "center",
                                    zIndex: 1,
                                    fontWeight: "bold",
                                    fontSize: 12,
                                    marginLeft: 2,
                                  }
                                : item.booked == true
                                ? {
                                    color: "white",
                                    textAlign: "center",
                                    zIndex: 1,
                                    fontWeight: "bold",
                                    fontSize: 12,
                                    marginLeft: 2,
                                  }
                                : {
                                    color: "#3c6791",
                                    textAlign: "center",
                                    zIndex: 1,
                                    fontWeight: "bold",
                                    fontSize: 12,
                                    marginLeft: 2,
                                  }
                            }
                          >
                            {item.seatNumber}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>

              {/* <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
            <FlatList data={Row3} horizontal renderItem={({item,index})=>{
                    return(

                            <TouchableOpacity style={{margin:7}}>
                                {item.empty==false && item.selecetd==true ?(<Image source={require('../Img/seat.png')} style={{width:24,height:24,tintColor:'green'}} />):item.empty == true && item.selecetd == false ?
                                (<Image source={require('../Img/seat.png')} style={{width:24,height:24}} />)
                                :item.empty==false && item.selecetd == false ? (<Image source={require('../Img/seat.png')} style={{width:24,height:24,tintColor:'black'}}/>):null }
                            </TouchableOpacity>
                    )
                }}/>

            </View> */}
            </View>
          </View>
        </ScrollView>
        <View>
          <Pressable
            onPress={toPassengerInfo}
            style={{
              backgroundColor: "#006ED5",
              width: screenWidth / 1.3,
              height: 55,
              borderRadius: 15,
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
              Continue
            </Text>
          </Pressable>
          {/* <Pressable
            onPress={() => {
              console.log(
                "-------------------",
                allDataSecondTrip.bookedSeatListReturn
              );
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
        </View>
      </View>
    </ScrollView>
  );
}
