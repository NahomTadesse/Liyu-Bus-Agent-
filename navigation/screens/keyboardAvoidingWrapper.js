import React, { Children } from 'react'

import {ScrollView,KeyboardAvoidingView,TouchableWithoutFeedback,Keyboard } from 'react-native'

 const KeyboardAvoidingWrapper =({children})=>{
return(
    <KeyboardAvoidingView behavior="padding" style={{flex:1}}>

        <ScrollView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                {children}
            </TouchableWithoutFeedback>
        </ScrollView>
    </KeyboardAvoidingView>
)
}
export default KeyboardAvoidingWrapper ;