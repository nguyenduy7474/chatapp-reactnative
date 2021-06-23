import React, {useState} from "react";
import {Text, View, TextInput, TouchableOpacity, Keyboard} from "react-native";
import styles from "./style";
import {FontAwesome5, MaterialCommunityIcons, Entypo, Fontisto, MaterialIcons} from "@expo/vector-icons";
import {Message, Userid} from "../../types";
import * as ImagePicker from 'expo-image-picker';


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

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            base64: true
        });

        if (!result.cancelled) {
            let base64Img = `data:image/jpg;base64,${result.base64}`;
            let data = {
                "file": base64Img,
                "upload_preset": "lbnoxszn",
            }
            let CLOUDINARY_URL='https://api.cloudinary.com/v1_1/dffn6kcmr/upload'
            fetch(CLOUDINARY_URL, {
                    body: JSON.stringify(data),
                    headers: {
                        'content-type': 'application/json'
                    },
                    method: 'POST',
                }).then(async r => {
                    let data = await r.json()
                    console.log(data.secure_url)
                    props.sendMessage(data.secure_url)
                }).catch(err => console.log(err))

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
                {!message && <TouchableOpacity
                    onPress={() => pickImage()}>
                    <Fontisto name="camera" size={24} color="grey" style={styles.icon}/>
                </TouchableOpacity>}
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