import React,{useState,useEffect} from 'react';
import { View, ScrollView,Text, StyleSheet,
ImageBackground,Dimensions,Switch,TextInput, Button, Pressable , Date } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';  
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCouch } from '@fortawesome/free-solid-svg-icons/faCouch'
import { useRoute } from "@react-navigation/native"


  

export default function SearchResult({navigation}){
    const toPassengerInfo=()=>{
        navigation.navigate('Passenger Information')
    }
    const chooseSeat=()=>{
        isEnabledTwoWay ?
        navigation.navigate('busseat',{allData,returnTicket,availableSchedule,isEnabledTwoWay})   
    :
    navigation.navigate('busseat',{allData,isEnabledTwoWay,returnTicket})
    }

const route = useRoute()
// const depaLocat = route.params.depaLocat
// const destinlocat = route.params.destinlocat
// const arrivalT = route.params.arrivalT
// const departTime = route.params.departTime
// const price = route.params.price
// const reservedSeatList = route.params.reservedSeatList
// const busUuid = route.params.busUuid
// const travelDate = route.params.travelDate
// const busName =route.params.busName
// const scheduleUUId =route.params.scheduleUUId
const allData = route.params.allData
const returnTicket = route.params.returnTicket
const isEnabledTwoWay = route.params.isEnabledTwoWay
const availableSchedule = route.params.availableSchedule




const test = ()=>{
  
    console.log(isEnabledTwoWay)
    console.log(returnTicket)
   
}

const oneWay =()=>{

    return(
        <View style = {styles.cards}>


    
    <Text style = {{width : screenWidth/1.1 , backgroundColor: '#3c6791' , textAlign:'left',color:'white',fontSize : 16, fontWeight: 'bold', height : 30, textAlignVertical:'center'}}> {allData.busName}</Text>
    <View style = {styles.topCalendar}>
      <Icon name="calendar"  style = {styles.calanderIcon}/>
<Text style = {{ marginHorizontal:1,marginVertical:6,color:'#3c6791',left:10}}>{allData.travelDate}</Text>

</View>
<View style = {styles.cityStyle}>
<Text style ={{fontSize:15,fontWeight:'bold',textAlign:'left',marginHorizontal:3,left:10,color:'#3c6791'}}>{allData.depaLocat} </Text>
<View style={{flexDirection:'row',top:10,marginHorizontal:20}}>
    <View style={{width:8,height:8,borderRadius:50,backgroundColor:'#3c6791'}}></View>
    <View style={{height:0,width:120,borderWidth:1,borderColor:'#3c6791',top:2,borderStyle:'dashed',borderRadius: 1,}}></View>
    <View style={{width:8,height:8,borderRadius:50,borderWidth:1,borderColor:'#3c6791'}}></View>
  </View>
  <Text style ={{fontSize:15,fontWeight:'bold',textAlign:'right',flex : 1,right:10,color:'#3c6791'}}> {allData.destinlocat} </Text>
  </View>
  <View style = {styles.timeStyle}>
  <Text style ={{fontSize:15,textAlign:'left',left:-30,color:'#3c6791'}}> {allData.departTime}</Text>
  <Text style ={{fontSize:15,textAlign:'right',right:-30,color:'#3c6791'}}> {allData.arrivalT} </Text>
  </View>
  <View style = {styles.timeCashStyle}>
 <Icon name = 'time' style={styles.timeIcon}/>
  <Text style={{textAlign : 'left',marginVertical:4,left:10,color:'#3c6791'}}>5 hrs 50 min</Text>


  </View>

  <View style = {styles.boardingTitleStyle}>
  <Text style ={{fontSize:15,textAlign:'left',flex:1,left:10,color:'#3c6791'}}> Onboarding</Text>
  <Text style ={{fontSize:15,textAlign:'right',flex : 1,right:10,color:'#3c6791'}}> Off-boarding </Text>
  </View>

  <View style = {styles.boardingPlaceStyle}>
  <Text style ={{fontSize:15,textAlign:'left',flex : 1,left:10,color:'#3c6791',fontWeight:'bold'}}> Not Selected</Text>
  <Text style ={{fontSize:15,textAlign:'right',flex : 1,right:10,color:'#3c6791',fontWeight:'bold'}}> Not Selected </Text>
  </View>
  
  <View style = {{flexDirection:'row',marginVertical:10}}>
  <Text style ={{fontSize:15,textAlign:'left',flex : 1,left:10,color:'#3c6791'}}> Seats</Text>
  <Text style ={{fontSize:15,marginEnd:70,flex : 1,right:10,color:'#3c6791'}}> Passengers</Text>
  </View>

  <View style = {{flexDirection:'row',marginVertical:7}}>
  <Text style ={{fontSize:15,textAlign:'left',flex : 1,left:10,color:'#3c6791',fontWeight:'bold'}}> Not Selected</Text>
  <Text style ={{fontSize:15,marginEnd:100,flex : 1,color:'#3c6791',fontWeight:'bold'}}> Not Selected </Text>
  </View>

  <View style = {{marginVertical:3 ,flex:1,marginHorizontal:3}}>
  <Text style ={{fontSize:15,textAlign:'left',flex : 1,left:10,color:'#3c6791'}}>Price per passenger</Text>
  <Text style ={{fontSize:15,textAlign:'left',flex : 1,left:10,color:'#3c6791',marginVertical:10,fontWeight:'bold'}}>{allData.price} ETB</Text>
  {/* <Text style ={{fontSize:15,textAlign:'left',flex : 1}}> = 500 ETB</Text> */}
  </View>


  <Text style = {{width : screenWidth/1.1 ,
   backgroundColor: '#f27f22' ,
    textAlign:'right',
    color:'white',
    fontSize : 15,
     fontWeight: 'bold', height : 30,
    
     borderBottomEndRadius:7,
     borderBottomStartRadius:7}}>Total Price : {allData.price} ETB</Text>
  

  {/* </Pressable> */}

</View>


    )
}


const twoWayFromOne=()=>{

    return(
        <View style = {styles.cards}>
    {/* <Pressable onPress={toPassengerInfo}> */}

    
    <Text style = {{width : screenWidth/1.1 , backgroundColor: '#3c6791' , textAlign:'left',color:'white',fontSize : 16, fontWeight: 'bold', height : 30, textAlignVertical:'center'}}> {allData.busName}</Text>
    <View style = {styles.topCalendar}>
      <Icon name="calendar"  style = {styles.calanderIcon}/>
<Text style = {{ marginHorizontal:1,marginVertical:6,color:'#3c6791',left:10}}>{allData.travelDate}</Text>

</View>
<View style = {styles.cityStyle}>
<Text style ={{fontSize:15,fontWeight:'bold',textAlign:'left',marginHorizontal:3,left:10,color:'#3c6791'}}>{allData.depaLocat} </Text>
<View style={{flexDirection:'row',top:10,marginHorizontal:20}}>
    <View style={{width:8,height:8,borderRadius:50,backgroundColor:'#3c6791'}}></View>
    <View style={{height:0,width:120,borderWidth:1,borderColor:'#3c6791',top:2,borderStyle:'dashed',borderRadius: 1,}}></View>
    <View style={{width:8,height:8,borderRadius:50,borderWidth:1,borderColor:'#3c6791'}}></View>
  </View>
  <Text style ={{fontSize:15,fontWeight:'bold',textAlign:'right',flex : 1,right:10,color:'#3c6791'}}> {allData.destinlocat} </Text>
  </View>
  <View style = {styles.timeStyle}>
  <Text style ={{fontSize:15,textAlign:'left',flex : 1,left:20,color:'#3c6791'}}> {allData.departTime}</Text>
  <Text style ={{fontSize:15,textAlign:'right',flex : 1,right:20,color:'#3c6791'}}> {allData.arrivalT} </Text>
  </View>
  <View style = {styles.timeCashStyle}>
 <Icon name = 'time' style={styles.timeIcon}/>
  <Text style={{textAlign : 'left',marginVertical:4,left:10,color:'#3c6791'}}>5 hrs 50 min</Text>


  </View>

  
  <View style = {styles.boardingTitleStyle}>
  <Text style ={{fontSize:15,textAlign:'left',flex:1,left:10,color:'#3c6791'}}> Onboarding</Text>
  <Text style ={{fontSize:15,textAlign:'right',flex : 1,right:10,color:'#3c6791'}}> Off-boarding </Text>
  </View>

  <View style = {styles.boardingPlaceStyle}>
  <Text style ={{fontSize:15,textAlign:'left',flex : 1,left:10,color:'#3c6791',fontWeight:'bold'}}> Not Selected</Text>
  <Text style ={{fontSize:15,textAlign:'right',flex : 1,right:10,color:'#3c6791',fontWeight:'bold'}}> Not Selected </Text>
  </View>
  
  <View style = {{flexDirection:'row',marginVertical:10}}>
  <Text style ={{fontSize:15,textAlign:'left',flex : 1,left:10,color:'#3c6791'}}> Seats</Text>
  <Text style ={{fontSize:15,marginEnd:70,flex : 1,right:10,color:'#3c6791'}}> Passengers</Text>
  </View>

  <View style = {{flexDirection:'row',marginVertical:7}}>
  <Text style ={{fontSize:15,textAlign:'left',flex : 1,left:10,color:'#3c6791',fontWeight:'bold'}}> Not Selected</Text>
  <Text style ={{fontSize:15,marginEnd:100,flex : 1,color:'#3c6791',fontWeight:'bold'}}> Not Selected </Text>
  </View>

  <View style = {{marginVertical:3 ,flex:1,marginHorizontal:3}}>
  <Text style ={{fontSize:15,textAlign:'left',flex : 1,left:10,color:'#3c6791'}}>Price per passenger</Text>
  <Text style ={{fontSize:15,textAlign:'left',flex : 1,left:10,color:'#3c6791',marginVertical:10,fontWeight:'bold'}}>{allData.price} ETB </Text>
  {/* <Text style ={{fontSize:15,textAlign:'left',flex : 1}}> = 500 ETB</Text> */}
  </View>


  <Text style = {{width : screenWidth/1.1 ,
   backgroundColor: '#f27f22' ,
    textAlign:'right',
    color:'white',
    fontSize : 15,
     fontWeight: 'bold', height : 30,
    
     borderBottomEndRadius:7,
     borderBottomStartRadius:7}}>Total Price : {allData.price} ETB</Text>
  

  {/* </Pressable> */}

</View>

    )
}

    return(
        <ScrollView style={{backgroundColor:'#EBEBEB'}}>
    

   {/* { oneWay()} */}
   {/* {twoWayFromOne()} */}
   {returnTicket ? twoWayFromOne() : oneWay()}

<View style = {styles.cardTwo}>

<Text style = {{width : screenWidth/1.1 ,
   backgroundColor: '#3c6791' ,
    textAlign:'left',
    color:'white',
    fontSize : 15,
     fontWeight: 'bold', height : 30,
     borderBottomEndRadius:50,
     textAlignVertical:'center'}}> Additional Information</Text>
<View style = {styles.seat}> 
<FontAwesomeIcon icon={faCouch}  size ='20' style={{color:'#3c6791',fontSize:20,marginRight:5}}/>
<Text style ={{color : '#3c6791' }}>Seat</Text>
<Pressable onPress={chooseSeat} style={{textAlign:'right',flex : 1,}}><Text  style ={{fontSize:15,color:'#f27f22',textAlign:'right'}}>No selected Seat </Text></Pressable>
<Icon name = 'ios-arrow-forward-outline' style={{color:'#f27f22',fontSize:20}}/>
</View>


<View style = {styles.passengerName}> 
<Icon name="person" style={{color:'#3c6791',fontSize:20,marginRight:5}}/>
<Text style ={{color : '#3c6791' }}>passengerName</Text>
<Text style ={{fontSize:15,textAlign:'right',flex : 1,color:'#f27f22'}}>None</Text>
<Icon name = 'ios-arrow-forward-outline' style={{color:'#f27f22',fontSize:20}}/>
</View>

<View style = {styles.payment}> 
<Icon name="card" style={{color:'#3c6791',fontSize:20,marginRight:5}}/>
<Text style ={{color : '#3c6791' }}>Payment</Text>
<Text style ={{fontSize:15,textAlign:'right',flex : 1,color:'#f27f22'}}>None</Text>
<Icon name = 'ios-arrow-forward-outline' style={{color:'#f27f22',fontSize:20}}/>
</View>


</View>

<View style = {styles.cardThree}>

<Text style = {{width : screenWidth/1.1 ,
    backgroundColor: '#3c6791' ,
    textAlign:'left',
    color:'white',
    fontSize : 15,
    fontWeight: 'bold',
    height : 30,
    textAlignVertical:'center',
    borderBottomEndRadius:50}}> Note</Text>
    <Text style={{marginLeft:7,marginVertical:5}}>
     Lorem ipsum dolor sit amet, consectetur adipiscing elit.
     Fusce dignissim semper mollis. In volutpat elit quam, ac porta ex accumsan quis.
     Interdum et malesuada fames ac ante ipsum primis in faucibus.
     Pellentesque sed est congue, molestie arcu tempor, elementum mi.

    </Text>

</View>
<Pressable  onPress={test} style={{backgroundColor:'#f27f22',width:screenWidth/1.3,height:50,borderRadius:15,alignSelf:'center',alignItems:'center',
justifyContent:'center',marginVertical:20
        }}>
  <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>Next</Text>
</Pressable> 
   </ScrollView>
    )
}

const screenWidth = Dimensions.get('window').width
const styles = StyleSheet.create({
    calanderIcon : {
        fontSize : 20,
        color : "#3c6791",
        marginHorizontal:3,
        // marginHorizontal:10,
        marginVertical: 4,
        left:10
    },
    topCalendar:{
        flex:1,
        flexDirection:'row'
    },
    editIcon:{
       fontSize : 40,
       color : "tomato",
       marginHorizontal  : 120,
       marginVertical : 30

    },
    cards : {
       
        width : screenWidth/1.1,
        borderWidth : 0,
       
        marginHorizontal:10,
        marginVertical : 30,
        alignSelf:'center',
        borderBottomWidth:0,
        backgroundColor:'white',
        shadowColor:'black',
        elevation:20
      
       
        
        
    },
    cashStyle : {width : 80 ,
        height : 40 ,
        backgroundColor : '#3c6791' ,
        color : 'white' ,
        textAlign : 'center',
        textAlignVertical: "center",
        borderBottomEndRadius: 10},
   
    cityStyle : {
        flexDirection: 'row',
        marginVertical:5
    },
    timeStyle : {
        flexDirection: 'row',
        justifyContent : 'space-around',
        marginVertical: 10
    },
    timeCashStyle :{
        flexDirection: 'row',
        // justifyContent : 'space-around'
    },
    timeIcon : {
        fontSize:30,
        color :"#3c6791",
        left:10
    },
    boardingTitleStyle:{
        flexDirection: 'row',
    },
    boardingPlaceStyle :{
        flexDirection: 'row',
        marginVertical:10
    },
    cardTwo :{
        width : screenWidth/1.1,
      
        shadowOffset: 10,
        shadowColor : 'black',
        marginHorizontal:10,
        borderBottomStartRadius:10,
        borderBottomEndRadius:10,
        marginVertical : 1,
        alignSelf:'center',
       backgroundColor:"white",
       shadowColor:"black",
       elevation:20
    },
seat:{
    flexDirection:'row',
    borderBottomWidth:0,
    
    height : 40,
    alignItems:'center',
    margin:3
},
passengerName:{
    flexDirection:'row',
    borderWidth:1,
    borderColor:'grey',
    height : 40,
    alignItems:'center',
    borderRightWidth:0,
    borderLeftWidth:0,
    margin:3
},
payment:{
    flexDirection:'row',
    
    borderBottomEndRadius:7,
    borderBottomStartRadius:7,
    height : 40,
    alignItems:'center',
    borderBottomWidth : 0,
    margin:3
},
cardThree:{
    width : screenWidth/1.1,
   
    shadowOffset: 10,
    shadowColor : 'black',
    marginHorizontal:10,
    borderBottomStartRadius:10,
    borderBottomEndRadius:10,
    marginVertical : 10,
    alignSelf:'center',
    backgroundColor:"white",
    shadowColor:"black",
    elevation:20
}

})