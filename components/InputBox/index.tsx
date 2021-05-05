import React, {useState} from "react";
import {Text, View, TextInput, TouchableOpacity, Keyboard} from "react-native";
import styles from "./style";
import {FontAwesome5, MaterialCommunityIcons, Entypo, Fontisto, MaterialIcons} from "@expo/vector-icons";
import {Message, Userid} from "../../types";

const InputBox = (props) => {
    const [message, setMessage] = useState('');
    const onMicroPhonePress = () => {
        console.warn('micro')
    }
    const onSendPress = () => {
        //console.warn(message)
        //sendmessage to backend
        props.sendMessage(message)
        Keyboard.dismiss()
        setMessage("")
    }
    const onPress = () => {
        if(!message){
            onMicroPhonePress();
        }else{
            onSendPress();
        }
    }
    return(
        <View style={styles.container}>
            <View style={styles.mainContainer}>
                <FontAwesome5 name="laugh-beam" size={24} color="grey"/>
                <TextInput
                    placeholder="Gõ tin nhắn"
                    style={styles.textInput}
                    multiline
                    value={message}
                    onChangeText={setMessage}
                />
                <Entypo name="attachment" size={24} color="grey" style={styles.icon}/>
                {!message && <Fontisto name="camera" size={24} color="grey" style={styles.icon}/>}
            </View>
            <TouchableOpacity onPress={onPress}>
                <View style={styles.buttonContainer}>
                    {
                        !message? <MaterialCommunityIcons name="microphone" size={28} color="white" />
                            : <MaterialIcons name="send" size={28} color="white"/>
                    }
                </View>
            </TouchableOpacity>

        </View>
    )
}

export default InputBox