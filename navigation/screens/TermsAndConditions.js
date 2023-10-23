import * as React from 'react';
import{useState,useEffect} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import axios from 'axios'
import { View, ScrollView,Text, StyleSheet,
    ImageBackground,Dimensions,ActivityIndicator,Switch,TextInput, Button, TouchableOpacity,Pressable, Alert } from 'react-native';
    // import {CheckBox} from 'react-native-elements'
    import Icon from 'react-native-vector-icons/Ionicons';
    import CheckBox from '@react-native-community/checkbox'

   
    const screenWidth = Dimensions.get('window').width
var searchData


export default function TermsAndConditions({navigation}){
  const [location,setLocation] = useState()
  const [loading, setLoading] = useState(false)
   async function continueBtn(){
    setLoading(true)
     await axios('http://liyu-bus-api.dev.kifiya.et/liyu-bus-api/v1/api/location', {
        method: 'GET'
     })
     .then(res => {
      
      var locationData = res.data
      navigation.navigate('home',{locationData})

      //  console.log(Respons)
        // setLocation(res.data)
        //  console.log(location[0].name) 
        // console.log(location[10].name)
        // var locationData = location
        // console.log(locationData)
      // navigation.navigate('home',{locationData})

         
     })
     .catch((error) => {
        console.error(error);
     }).finally(() => setLoading(false));

   
        //  console.log(location[0].name) 
        // console.log(location[10].name)
      
      // navigation.navigate('home',{locationData})
     
    //  fetch("http://liyu-bus-api.dev.kifiya.et/liyu-bus-api/v1/api/location")
    //  .then((res) => res.json())
    //  .then((jsoon) => {
    //    setLocation(jsoon.data);
    //    console.log(location[10].name)
    //    var locationData = location
    //  console.log(locationData)
    //  });
    }


    // async function continueBtn() {

     
    //   let response = await fetch('http://liyu-bus-api.dev.kifiya.et/liyu-bus-api/v1/api/location');
    
    //   if (!response.ok) {
    //     throw 'Something went wrong.';
    //   }
    
      
    //   let data = await response.json();
    //   setLocation(data)
    //   console.log(location)
    // //  navigation.navigate('home',{locationData})

     
    // }
  const [isSelected, setSelection] = useState(false);
  const [isSelectedtwo, setSelectiontwo] = useState(false);

//   const getLocation =  () => {
//     axios('http://liyu-bus-api.dev.kifiya.et/liyu-bus-api/v1/api/location', {
//        method: 'GET'
//     })
//     .then(res => {
//         // console.log(res.data)
//         setLocation(res.data);
//         console.log(location[0])
        
//     })

//     .catch((error) => {
//        console.error(error);
//     });
//  }


    return(
        <ScrollView style={{backgroundColor:'#EBEBEB'}}>
            <View style={{flex:1,flexDirection:'row',alignSelf:'center',marginVertical:20}}>
            <Text style = {{fontWeight:'bold',color:'#3c6791',fontSize:20}}> LIYU</Text>
            <Text style = {{fontWeight:'bold',color:'#f27f22',fontSize:20}}> BUS</Text>
            </View>
<View style={{marginHorizontal:10}}>
<Text style={{fontWeight:'bold',fontSize:15,padding:10}}>
    To Use Our App Please Agree To Our Terms and Conditions
</Text>
<Text style={{marginVertical:10 ,padding:10,bottom:10}}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Fusce dignissim semper mollis. In volutpat elit quam, ac porta ex accumsan quis.
    Interdum et malesuada fames ac ante ipsum primis in faucibus.
    Pellentesque sed est congue, molestie arcu tempor, elementum mi.{"\n"}
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Fusce dignissim semper mollis. In volutpat elit quam, ac porta ex accumsan quis.
    Interdum et malesuada fames ac ante ipsum primis in faucibus.
    Pellentesque sed est congue, molestie arcu tempor, elementum mi.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Fusce dignissim semper mollis.{"\n"}{"\n"}In volutpat elit quam, ac porta ex accumsan quis.
    Interdum et malesuada fames ac ante ipsum primis in faucibus.
    Pellentesque sed est congue, molestie arcu tempor, elementum mi.
    Fusce dignissim semper mollis. In volutpat elit quam, ac porta ex accumsan quis.
    Interdum et malesuada fames ac ante ipsum primis in faucibus.
    Pellentesque sed est congue, molestie arcu tempor, elementum mi.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Fusce dignissim semper mollis.{"\n"}{"\n"} In volutpat elit quam, ac porta ex accumsan quis.
    Interdum et malesuada fames ac ante ipsum primis in faucibus.
    Pellentesque sed est congue, molestie arcu tempor, elementum mi.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    
</Text>
{loading && 
   ( <View>
<ActivityIndicator size={'large'} color='#3c6791'/>
    </View>)
    }
<View style={{flexDirection:'row',left:10}}>
<CheckBox
          value={isSelected}
          onValueChange={setSelection}
          style={styles.checkbox}
          label='reading'
          tintColors={{ true: '#f27f22', false: '#3c6791' }}
       
        />
         <Text style={styles.label}>I Agree With Terms and Conditions</Text>
         </View>
<View style={{flexDirection:'row',left:10}}>
<CheckBox
          value={isSelectedtwo}
          onValueChange={setSelectiontwo}
          style={styles.checkbox}
          tintColors={{ true: '#f27f22', false: '#3c6791' }}
     
        />
         <Text style={styles.label}>I Agree With Liyu Bus Privacy Policy</Text>
        </View>
<Pressable  onPress={continueBtn} style={isSelected && isSelectedtwo ? {backgroundColor:'#f27f22',width:screenWidth/1.1,height:50,borderRadius:15,alignSelf:'center',alignItems:'center',
justifyContent:'center',marginVertical:20
        }:{backgroundColor:'grey',width:screenWidth/1.1,height:50,borderRadius:15,alignSelf:'center',alignItems:'center',
        justifyContent:'center',marginVertical:20}} disabled={isSelected && isSelectedtwo ? false : true} >
  <Text style={{color:'white',fontSize:20}}>Continue</Text>
</Pressable>


</View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
  
    checkboxContainer: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    checkbox: {
      alignSelf: 'flex-start',
    
      
    },
    label: {
      margin: 5,
     
    },
  });
  