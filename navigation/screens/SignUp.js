import React,{useState,useEffect} from 'react';
import { View, ScrollView,Text, StyleSheet,
    ImageBackground,Dimensions,Switch,TextInput, Button, Pressable , Date } from 'react-native';
    import Icon from 'react-native-vector-icons/Ionicons';
    
    export default function Login(){

        return(
            <   ScrollView>
            <View>
                <TextInput placeholder='Usename'></TextInput>
                <TextInput placeholder='Password'></TextInput>
                
                <Pressable>
                    <Text>Sign Up</Text>
                </Pressable>
            </View>
            
            
            </ScrollView>
        );
    }