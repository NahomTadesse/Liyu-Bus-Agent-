import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
  Switch,
  TextInput,
  Alert,
  Button,
  Pressable,
  TouchableOpacity,
  Date,
} from "react-native";
import { useFocusEffect,useIsFocused, } from '@react-navigation/native';
import { SelectList } from "react-native-dropdown-select-list";
import { useRoute } from "@react-navigation/native";
import DropShadow from "react-native-drop-shadow";

import {
  Icon,
  IconElement,
  Input,
 
} from "@ui-kitten/components";

const screenWidth = Dimensions.get("window").width;
const initialLayout = { width: Dimensions.get('window').width };
export default function PassengersInformation({ navigation }) {
  const isFocused = useIsFocused();

  const [selected, setSelected] = useState("");
  // const [validate , setValidation] = useState({age:})
  const [fullName, setFullName] = useState([]);
  const [firstName, setFirstName] = useState([]);
  const [lastName, setLastName] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState([]);
  const [age, setAge] = useState([]);
  const [gender, setGender] = useState([]);
  const [onboarding, setOnBoarding] = useState([]);
  const [offboarding, setOffBoarding] = useState([]);
  const [onboardingReturn, setOnBoardingReturn] = useState([]);
  const [offboardingReturn, setOffBoardingReturn] = useState([]);
  const [textInputPhone, settextinputPhone] = useState(true);
  const [showOption,setShowOption] = useState(false)
  const [refresh, setRefresh] = useState(false);

  useFocusEffect(() => {
    setRefresh(true);

    return () => {
      setRefresh(false);
    };
  });
  const route = useRoute();
  const seat = route.params.seat;
  const loginD = route.params.loginD;
  const index = route.params.index;
  const indexR = route.params.indexR;
  const returnSeat = route.params.returnSeat;
  const allData = route.params.allData;
  const allDataTwo = route.params.allDataTwo;
  const isEnabledTwoWay = route.params.isEnabledTwoWay;
  const returnTicket = route.params.returnTicket;
  const [loading, setLoading] = useState(false);
  const allDataSecondTrip = route.params.allDataSecondTrip;
  const firstNameList = Object.values(firstName);
  const lastNameList = Object.values(lastName);
  const [validatedForm, setValidatedForm] = useState(false);
  const [phoneNumberForQuuick , setPhoneNumberForQuick] = useState()
  const [showTabOne,setShowTabOne] = useState(true)
  const [showTabTwo,setShowTabTwo] = useState(false)
  // const totalPrice =  seat.length * allData.price
  // const totalPriceTwoWay = seat.length * allDataTwo.price
  // const fullNameList = Object.values(fullName);
  const fullNameList = firstNameList.map((fName, index) => {
    return `${fName} ${lastNameList[index]}`;
  });

  const phoneNumberList = Object.values(phoneNumber);
  const ageList = Object.values(age);

  // const gList = []
  // const y = Object.values(gender)
  //  const x = y.map((val)=>{
  // if (val == 'Male'){
  //   gList.push("0")
  // }
  // else{
  //   gList.push("1")
  // }
  //  })
  const passengersgenderList = Object.values(gender);
  const passengerOnboardingList = onboarding;
  const passengerOffBoardingPlace = offboarding;
  const passengerOnboardingListReturn = onboardingReturn;
  const passengerOffBoardingPlaceReturn = offboardingReturn;
  useEffect(() => {
    setFirstName('')
    setLastName('')
    setAge('')
    setGender('')
    setPhoneNumber('')
    setOnBoarding('')
    setOffBoarding('')
    setShowOption('')
    setPhoneNumberForQuick('')
  
  }, [isFocused]);
  const ageChecker = () => {
    const ageChecked = ageList.every((age) => {
      if (age < 115 && age > 0) {
        return true;
      } else {
        return false;
      }
    });
    return ageChecked;
  };
  const adultChecker = () => {
    const adultFound = ageList.some((age) => {
      if (age >= 18) {
        return true;
      } else {
        return false;
      }
    });

    return adultFound;
  };

  const phoneNumberChecker = () => {
    const allCorrect = phoneNumberList.every((phonenum) => {
      if (phonenum.length == 10 || (phonenum.length == 13 && !undefined)) {
        return true;
      } else {
        return false;
      }
    });

    return allCorrect;
  };

  const firstNameChecker = () => {
    const isFirstNameValid = firstNameList.every((firstNamee) => {
      if (
        firstNamee.length >= 3 &&
        firstNamee.length <= 15 &&
        /\d/.test(firstNamee) == false
      ) {
        return true;
      } else if (/\d/.test(firstNamee) == false) {
        // return true
        console.log("---------checked");
      } else {
        return false;
      }
    });
    return isFirstNameValid;
  };
  const lastNameChecker = () => {
    const isLastNameValid = lastNameList.every((lastNamee) => {
      if (
        lastNamee.length >= 3 &&
        lastNamee.length <= 15 &&
        /\d/.test(lastNamee) == false
      ) {
        return true;
      } else {
        return false;
      }
    });
    return isLastNameValid;
  };
  const test = () => {
    //  phoneNumberChecker()
    //  checkForm()
    //  console.log( passengerOnboardingList )
    //  console.log( passengerOffBoardingPlace )
    //  console.log( passengerOnboardingListReturn )
    console.log(loginD);
  };

  const checkForm = () => {
    if (
      fullNameList.length == seat.length &&
      phoneNumberList.length == seat.length &&
      ageList.length == seat.length &&
      passengersgenderList.length == seat.length &&
      passengerOnboardingList.item != undefined &&
      passengerOffBoardingPlace.item != undefined &&
      firstNameList.length == seat.length &&
      lastNameList.length == seat.length
    ) {
      return true;
    } else {
      return false;
    }
  };
  const checkFormTwo = () => {
    if (
      fullNameList.length == seat.length &&
      phoneNumberList.length == seat.length &&
      ageList.length == seat.length &&
      passengersgenderList.length == seat.length &&
      passengerOnboardingList.item != undefined &&
      passengerOffBoardingPlace.item != undefined &&
      firstNameList.length == seat.length &&
      lastNameList.length == seat.length &&
      passengerOnboardingListReturn.item != undefined &&
      passengerOffBoardingPlaceReturn.item != undefined
    ) {
      return true;
    } else {
      return false;
    }
  };
  // useEffect(() => {
  //   navigation.getParent()?.setOptions({
  //     tabBarStyle: {
  //       display: "none",
  //     },
  //   });
  //   return () =>
  //     navigation.getParent()?.setOptions({
  //       tabBarStyle: undefined,
  //     });
  // }, [navigation]);
  const nextBtn = () => {
    console.log("One trip");

    setLoading(true);

    if (!checkForm()) {
      Alert.alert("LIYU BUS", "Please Fill The Required Information", [
        { text: "OK", onPress: () => {} },
      ]);
      setLoading(false);
      return;
    }

    if (!phoneNumberChecker()) {
      Alert.alert("LIYU BUS", " Please enter a valid phone number", [
        { text: "OK", onPress: () => {} },
      ]);
      setLoading(false);
      return;
    }
    if (!ageChecker()) {
      Alert.alert("LIYU BUS", "Please enter a valid  Age", [
        { text: "OK", onPress: () => {} },
      ]);
      setLoading(false);
      return;
    }
    if (!adultChecker()) {
      Alert.alert("LIYU BUS", "No Adult ", [{ text: "OK", onPress: () => {} }]);
      setLoading(false);
      return;
    }
    if (!firstNameChecker()) {
      Alert.alert("LIYU BUS", "Invalid Please enter a valid first name ", [
        { text: "OK", onPress: () => {} },
      ]);
      setLoading(false);
      return;
    }
    if (!lastNameChecker()) {
      Alert.alert("LIYU BUS", "Please enter a valid last name", [
        { text: "OK", onPress: () => {} },
      ]);
      setLoading(false);
      return;
    }
    setShowOption(false)
    navigation.navigate("paymentOption", {
      allData,
      phoneNumberList,
      ageList,
      passengerOffBoardingPlace,

      passengerOnboardingList,
      passengersgenderList,
      seat,
      returnTicket,
      isEnabledTwoWay,
      fullNameList,
      loginD,
      index,
      indexR,
    });

    // }
    setLoading(false);
  };

  const returnNextBtn = () => {
    console.log("round trip");

    setLoading(true);
    if (!checkFormTwo()) {
      Alert.alert("LIYU BUS", "Please Fill The Required Information ", [
        { text: "OK", onPress: () => {} },
      ]);
      setLoading(false);
      return;
    }

    if (!phoneNumberChecker()) {
      Alert.alert("LIYU BUS", "Invalid Phone Number ", [
        { text: "OK", onPress: () => {} },
      ]);
      setLoading(false);
      return;
    }
    if (!ageChecker()) {
      Alert.alert("LIYU BUS", "Invalid Age", [
        { text: "OK", onPress: () => {} },
      ]);
      setLoading(false);
      return;
    }
    if (!adultChecker()) {
      Alert.alert("LIYU BUS", "No Adult ", [{ text: "OK", onPress: () => {} }]);
      setLoading(false);
      return;
    }
    if (!firstNameChecker()) {
      Alert.alert("LIYU BUS", "Please enter a valid first name", [
        { text: "OK", onPress: () => {} },
      ]);
      setLoading(false);
      return;
    }
    if (!lastNameChecker()) {
      Alert.alert("LIYU BUS", "Please enter a valid last name", [
        { text: "OK", onPress: () => {} },
      ]);
      setLoading(false);
      return;
    }

    navigation.navigate("paymentOption", {
      allDataTwo,
      returnSeat,
      returnTicket,
      isEnabledTwoWay,
      phoneNumberList,
      ageList,
      passengerOffBoardingPlace,
      passengerOffBoardingPlaceReturn,
      allDataSecondTrip,
      allData,
      passengerOnboardingList,
      passengerOnboardingListReturn,
      passengersgenderList,
      seat,
      fullNameList,
      loginD,
      index,
      indexR,
    });
    setLoading(false);
  };
  const getInfoFromPhone= async()=>{
    console.log("phone--------",phoneNumberForQuuick)
    setLoading(true);
    if(phoneNumberForQuuick == ''){
      setLoading(false);
      Alert.alert(
        "LIYU BUS",
        `Please enter your phone number `,
        [{ text: "OK", onPress: () => {} }]
      );
    }
  else{  try {
      const response = await fetch(
        `https://liyu-bus-api.dev.kifiya.et/liyu-bus-api/agent/v1/api/customer/get-customer-by-phone-number/${phoneNumberForQuuick}`,
        {
          headers: { "Content-Type": "application/json",
          Authorization: `Bearer ${loginD.access_token}`,}
        }
      );
      if (!response.ok) {
        throw new Error('Network request failed');
      }
      const data = await response.json();
      if (data.errorCode ==  "404" || data.status === 0) {
        Alert.alert(
          "LIYU BUS",
          `Sorry, customer not found for phone no.- ${phoneNumberForQuuick} `,
          [{ text: "OK", onPress: () => {} }]
        );
      } else {
        const passInfo = data;
        const fn = passInfo.fullName.split(' ')[0]
        const ln = passInfo.fullName.split(' ')[1]
        const ag = 24
        const gen = data.gender
   
        setFirstName({fn})
        setLastName({ln})
        setAge({ag})
        setGender({gen})
        setPhoneNumber({phoneNumberForQuuick})
        
      setShowOption(true)
        // navigation.navigate("paymentOption", {
        //   allData,
        //   phoneNumberList,
        //   ageList,
        //   passengerOffBoardingPlace,
    
        //   passengerOnboardingList,
        //   passengersgenderList,
        //   seat,
        //   returnTicket,
        //   isEnabledTwoWay,
        //   fullNameList,
        //   loginD,
        //   index,
        //   indexR,
          
        // })
        console.log("tickets Data--------------", passInfo);
        console.log('this----------',firstName)
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
  }}
  const genderList = [
    { key: "0", value: "Male" },
    { key: "1", value: "Female" },
  ];
  const drop = isEnabledTwoWay
    ? allData.dropOffPointsFirst
    : allData.dropOffPoints;
  const boarding = isEnabledTwoWay
    ? allData.boardingPointsFirst
    : allData.boardingPoints;

  const dropReturn = allDataSecondTrip && allDataSecondTrip.dropOffPointsSecond;
  const boardingReturn =
    allDataSecondTrip && allDataSecondTrip.boardingPointsSecond;

  const onBoardingListReturn =
    boardingReturn != null
      ? boardingReturn.map((item) => {
          return { key: item.scheduleLocationUUId, value: item.terminalName };
        })
      : [{ key: "1", value: "Menahria1" }];

  const offBoardingListReturn =
    dropReturn != null
      ? dropReturn.map((item) => {
          return { key: item.scheduleLocationUUId, value: item.terminalName };
        })
      : [{ key: "1", value: "Menahria2" }];

  const onBoardingList =
    boarding != null
      ? boarding.map((item) => {
          return { key: item.scheduleLocationUUId, value: item.terminalName };
        })
      : [{ key: "1", value: "Menahria1" }];

  const offBoardingList =
    drop != null
      ? drop.map((item) => {
          return { key: item.scheduleLocationUUId, value: item.terminalName };
        })
      : [{ key: "1", value: "Menahria2" }];

  const personalInfo = () => {
    return seat.map((data, index) => {
      if (data.length == 0) {
        return (
          <View>
            <Text style={{ fontSize: 100, fontWeight: "bold" }}>
              NO SEAT SELECTED
            </Text>
          </View>
        );
      } else {
        return (
          <View style={{ alignItems: "center", marginBottom:60,flex:1,marginTop:10}}>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                width: screenWidth / 1.1,
                borderWidth: 0,
                borderTopWidth: 0,
              }}
            >
              <DropShadow
                style={{
                  shadowColor: "#171717",
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.1,
                  shadowRadius: 2,
                }}
              >
                <View
                  style={{
                    
                    width: screenWidth / 1.1,
                    backgroundColor: "#EBEBEB",
                    flexDirection: "row",
                    height: 30,
                    elevation: 10,
                  }}
                  key={index}
                >
                  <Text
                    style={{
                      flex: 1,
                      fontWeight: "bold",
                      color: "#006ED5",
                      textAlign: "left",
                      fontSize: 14,
                      textAlignVertical: "center",
                      marginLeft: 20,
                    }}
                  >
                    {/* Passenger {index + 1} */}
                    {index == 0 ? "Main Passenger" : `Passenger ${index + 1}`}
                  </Text>

                  <Text
                    style={{
                      flex: 1,
                      fontSize: 14,
                      textAlign: "right",
                      color: "#006ED5",
                      textAlignVertical: "center",
                      marginRight: 20,
                    }}
                  >
                    Seat No.{" "}
                    {isEnabledTwoWay
                      ? `${seat[index]}, ${returnSeat[index]}`
                      : seat[index]}{" "}
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={styles.firstName}>
                    <TextInput
                      placeholder="First name"
                      style={{
                        fontSize: 15,
                        marginLeft: 15,
                        width: "50%",
                        borderEndWidth: 10,
                      }}
                      // onChangeText={(e) => setFullName({ ...fullName, [index]: e })}
                      onChangeText={(e) =>
                        setFirstName({ ...firstName, [index]: e })
                      }
                    ></TextInput>
                  </View>
                  <View style={styles.lastName}>
                    <TextInput
                      placeholder="Last name"
                      style={{ fontSize: 15, marginLeft: 15 }}
                      onChangeText={(e) =>
                        setLastName({ ...lastName, [index]: e })
                      }
                    ></TextInput>
                  </View>
                </View>
                <View style={styles.phoneNumber}>
                  <Pressable
                    onPress={() => {
                      settextinputPhone(true);
                    }}
                  >
                    <TextInput
                      placeholder="Phone Number"
                      editable={textInputPhone}
                      style={{ fontSize: 15, marginLeft: 15 }}
                      keyboardType="numeric"
                      onChangeText={(e) => {
                        setPhoneNumber({ ...phoneNumber, [index]: e });
                        e.length > 12 && settextinputPhone(false);
                      }}
                    ></TextInput>
                  </Pressable>
                </View>
                <View style={styles.age}>
                  <TextInput
                    placeholder="Age"
                    style={{ fontSize: 15, marginLeft: 15 }}
                    keyboardType="numeric"
                    onChangeText={(e) => setAge({ ...age, [index]: e })}
                  ></TextInput>
                </View>

                <SelectList
                  setSelected={(val) => setGender({ ...gender, [index]: val })}
                  data={genderList}
                  save="key"
                  placeholder="Gender"
                  search={false}
                  style={styles.genderStyle}
                  boxStyles={{
                    borderRadius: 0,
                    borderBottomWidth: 0,
                    borderEndWidth: 0,
                    borderStartWidth: 0,
                    backgroundColor: "#EBEBEB",
                    elevation: 10,
                    borderTopWidth:0,
                    marginBottom: 10,
                  }}
                  dropdownStyles={{
                    backgroundColor: "#EBEBEB",
                  }}
                  dropdownTextStyles={{ color: "grey" }}
                  // dropdownStyles ={{borderRadius:1}}
                />
                {index == 0 && (
                  <View>
                    <SelectList
                      setSelected={(key) => {
                        const item = onBoardingList.find(
                          (val) => val.key === key
                        );

                        setOnBoarding({ ...onboarding, item });
                        console.log(item);
                      }}
                      data={onBoardingList}
                      save="key"
                      placeholder="Onboarding place"
                      borderRadius="40%"
                      search={false}
                      boxStyles={{
                        borderRadius: 0,
                        borderBottomWidth: 0,
                        borderEndWidth: 0,
                        borderStartWidth: 0,
                        backgroundColor: "#EBEBEB",
                        elevation: 10,
                        marginBottom: 10,
                        borderTopWidth:0,
                      }}
                      dropdownStyles={{
                        backgroundColor: "#EBEBEB",
                      }}
                      dropdownTextStyles={{ color: "grey" }}
                    />
                    <SelectList
                      setSelected={(key) => {
                        const item = offBoardingList.find(
                          (val) => val.key === key
                        );
                        setOffBoarding({ ...offboarding, item });
                        console.log(item);
                      }}
                      data={offBoardingList}
                      save="key"
                      placeholder="Offboarding place"
                      search={false}
                      style={styles.offBoardingStyle}
                      boxStyles={{
                        borderRadius: 0,
                        borderBottomWidth: 0.5,
                        borderEndWidth: 0,
                        borderStartWidth: 0,
                        backgroundColor: "#EBEBEB",
                        borderTopWidth:0,

                        elevation: 10,
                        marginBottom: 10,
                      }}
                      dropdownStyles={{
                        backgroundColor: "#EBEBEB",
                      }}
                      dropdownTextStyles={{ color: "grey" }}
                    />
                  </View>
                )}

                {isEnabledTwoWay && index == 0 && (
                  <View>
                    <SelectList
                      setSelected={(key) => {
                        const item = onBoardingListReturn.find(
                          (val) => val.key === key
                        );
                        setOnBoardingReturn({ ...onboardingReturn, item });
                        console.log(allDataSecondTrip.boardingPointsSecond);
                      }}
                      data={onBoardingListReturn}
                      save="key"
                      placeholder="Onboarding place(Return)"
                      borderRadius="40%"
                      search={false}
                      boxStyles={{
                        borderRadius: 0,
                        borderBottomWidth: 0,
                        borderEndWidth: 0,
                        borderStartWidth: 0,
                        backgroundColor: "#EBEBEB",
                        elevation: 10,
                      }}
                      dropdownStyles={{
                        backgroundColor: "#EBEBEB",
                      }}
                      dropdownTextStyles={{ color: "grey" }}
                    />
                    <SelectList
                      setSelected={(key) => {
                        const item = offBoardingListReturn.find(
                          (val) => val.key === key
                        );
                        setOffBoardingReturn({ ...offboardingReturn, item });
                        console.log(allDataSecondTrip.boardingPointsSecond);
                      }}
                      data={offBoardingListReturn}
                      save="key"
                      placeholder="Offboarding place(Return)"
                      style={styles.offBoardingStyle}
                      search={false}
                      boxStyles={{
                        borderRadius: 0,
                        borderBottomWidth: 0.5,
                        borderEndWidth: 0,
                        borderStartWidth: 0,
                        backgroundColor: "#EBEBEB",
                        borderBottomEndRadius: 10,
                        borderBottomStartRadius: 10,
                        elevation: 10,
                      }}
                      dropdownStyles={{
                        backgroundColor: "#EBEBEB",
                      }}
                      dropdownTextStyles={{ color: "grey" }}
                    />
                  </View>
                )}
              </DropShadow>
            </View>
          </View>
        );
      }
    });
  };
const getInfoPhoneNumber=()=>{

if(seat.length == 1){
  return(
    <View style={{flex:1}}>
             <Input
                value={phoneNumberForQuuick}
                placeholder="Phone Number"
               
                keyboardType="numeric"
                onChangeText={(nextValue) => setPhoneNumberForQuick(nextValue)}
                style={{
                  width: screenWidth / 1.3,
                  marginTop:20,
                  marginBottom:10,
                  borderWidth: 1,
                  borderRadius: 10,
                  backgroundColor: "#EBEBEB",
                  elevation: 10,
                  alignSelf:'center'
                }}
              />
              <TouchableOpacity 
               onPress={()=>{getInfoFromPhone()}}
              style={{backgroundColor:"#006ED5",height:50,width:100,alignSelf:'center',
              marginTop:10,borderWidth:1,borderRadius:10,borderColor:"#006ED5",marginBottom:10
              }}
              >
                <Text style={{color:'white',fontWeight:'bold',fontSize:18,alignSelf:'center',flex:1,textAlignVertical:"center"}}>Next</Text></TouchableOpacity>
              
           { showOption && (<View>
                <SelectList
                  setSelected={(key) => {
                    const item = onBoardingList.find(
                      (val) => val.key === key
                    );

                    setOnBoarding({ ...onboarding, item });
                    console.log(item);
                  }}
                  data={onBoardingList}
                  save="key"
                  placeholder="Onboarding place"
                  borderRadius="40%"
                  search={false}
                  boxStyles={{
                    borderRadius: 0,
                    borderBottomWidth: 0,
                    borderEndWidth: 0,
                    borderTopWidth:0,
                    borderStartWidth: 0,
                    backgroundColor: "#EBEBEB",
                    elevation: 10,
                    marginBottom: 10,
                    width:screenWidth/1.2,
                    alignSelf:"center"
                  }}
                  dropdownStyles={{
                    backgroundColor: "#EBEBEB",
                    width:screenWidth/1.2,
                    alignSelf:"center",
                    marginBottom:5
                  }}
                  dropdownTextStyles={{ color: "grey" }}
                />
                <SelectList
                  setSelected={(key) => {
                    const item = offBoardingList.find(
                      (val) => val.key === key
                    );
                    setOffBoarding({ ...offboarding, item });
                    console.log(item);
                  }}
                  data={offBoardingList}
                  save="key"
                  placeholder="Offboarding place"
                  search={false}
                  style={styles.offBoardingStyle}
                  boxStyles={{
                    borderRadius: 0,
                    borderBottomWidth: 0.5,
                    borderEndWidth: 0,
                    borderStartWidth: 0,
                    backgroundColor: "#EBEBEB",
                    borderTopWidth:0,
                    elevation: 10,
                    marginBottom: 10,
                    width:screenWidth/1.2,
                    alignSelf:"center"
                  }}
                  dropdownStyles={{
                    backgroundColor: "#EBEBEB",
                    width:screenWidth/1.2,
                    alignSelf:"center",
                  }}
                  dropdownTextStyles={{ color: "grey" }}
                />
              
             
              </View>)}
    </View>
  )
}
else{
  Alert.alert("LIYU BUS", "This Feature Only Works For a Single Passenger", [
    { text: "OK", onPress: () => {} },
  ]);
}
}
// const renderScene = SceneMap({
//   first: personalInfo,
//   second: getInfoPhoneNumber,
 
// });
// const [index, setIndex] = useState(0);
// const [routes] = useState([
//   { key: 'first', title: 'New' },
//   { key: 'second', title: 'Returning' },
 
// ]);

// const renderTabBar = (props) => (
//   <TabBar
//     {...props}
//     indicatorStyle={{ backgroundColor: "#006ED5" }}
//     style={{ backgroundColor:"#EBEBEB" ,marginBottom:10}}
//     labelStyle={{ color: "#006ED5" }}
//   />

// );

  return (
    <ScrollView
      style={{ backgroundColor: "#EBEBEB" }}
      contentContainerStyle={{ flexGrow: 1 }}
    >
    
<View style={{flex:1,flexDirection:'row',alignSelf:'center',maxHeight:30,marginVertical:10}}>
 <Pressable style={
  showTabOne ?
  {backgroundColor:"#EBEBEB",height:50,width:screenWidth/2
,borderColor:"#006ED5",borderBottomWidth:4
}
:
{backgroundColor:"#EBEBEB",height:50,width:screenWidth/2

}
} onPress={()=>{setShowTabOne(true);setShowTabTwo(false);setShowOption(false)}}>
<Text style={{flex:1,textAlignVertical:"center",alignSelf:"center",color:"#006ED5"}}>New</Text>
 </Pressable>


 <Pressable style={showTabTwo ?{backgroundColor:"#EBEBEB",height:50,width:screenWidth/2
,borderColor:"#006ED5",borderBottomWidth:4}:
{backgroundColor:"#EBEBEB",height:50,width:screenWidth/2
,borderColor:"#006ED5"}
} onPress={()=>{
  if(seat.length==1){ setShowTabOne(false);setShowTabTwo(true)}
  else{
    Alert.alert("LIYU BUS", "This Feature Only Works For a Single Passenger", [
      { text: "OK", onPress: () => {} },
    ]);
  }
  
 }}>
  <Text style={{flex:1,textAlignVertical:"center",alignSelf:"center",color:"#006ED5"}} >Returning</Text>
  </Pressable>

</View> 
<Text
        style={{
          color: "#006ED5",
          fontSize: 14,
          marginLeft: 20,
          marginTop:20
          
        }}
      >
        The ticket details will be sent to the main passenger mobile number
      </Text>
     <View style={{ marginBottom: 5 }}>{showTabOne ? personalInfo(): showTabTwo ? getInfoPhoneNumber() :''}</View>

     
      {loading && (
        <View>
          <ActivityIndicator size={"large"} color="#3c6791" />
        </View>
      )}
 

      <Pressable
        onPress={isEnabledTwoWay && returnTicket ? returnNextBtn : nextBtn}
        style={{
          backgroundColor: "#006ED5",
          width: screenWidth / 1.1,
          height: 55,
          borderRadius: 15,
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
       
          marginBottom: 10,
          position: "absolute",
          bottom: 0,
         
          
        }}
      >
        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
          Proceed to Checkout
        </Text>
      </Pressable>
     
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  offBoardingStyle: {
    borderWidth: 0,
  },
  firstName: {
    padding: 5,
    paddingVertical: 10,
    backgroundColor: "#EBEBEB",
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: 0,
    borderBottomColor: "grey",
    elevation: 10,
    width: "50%",
    marginVertical: 10,
  },
  lastName: {
    padding: 5,
    paddingVertical: 10,
    backgroundColor: "#EBEBEB",
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: 0,
    borderBottomColor: "grey",
    elevation: 10,
    width: "50%",
    marginVertical: 10,
  },
  phoneNumber: {
    padding: 5,
    paddingVertical: 10,
    backgroundColor: "#EBEBEB",
    borderWidth: 0,
    borderBottomWidth:0,
    borderBottomColor: "grey",
    elevation: 10,
    marginBottom: 10,
  },
  age: {
    padding: 5,
    paddingVertical: 10,
    borderWidth: 0,
    backgroundColor: "#EBEBEB",
    fontSize: 15,
    elevation: 10,
    marginBottom: 10,
  },
  genderStyle: {
    borderEndColor: "tomato",
  },
});
