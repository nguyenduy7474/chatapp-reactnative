import React from "react";
import {View, Text, Image, Modal, TouchableOpacity} from "react-native";
import {Message, Userid} from "../../types";
import moment from "moment";
import styles from "./style";
import * as SecureStore from 'expo-secure-store';
import { Crypt, RSA } from 'hybrid-crypto-js';
var crypt = new Crypt({rsaStandard: 'RSAES-PKCS1-V1_5'});


export type ChatMessageProps = {
    message: Message,
    userid: Userid,
    username: string,
    privatekey: any
}

const getValueFor = async (key) => {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
        return result
    }else{
        return false
    }
}

const ChatMessage = (props: ChatMessageProps) => {
    const {message, userid, username, privatekey, toogleImage} = props;
    const isMyMessage = () => {
        return message.user.name == username;
    }
    var decrypted = crypt.decrypt(JSON.parse(privatekey), message.content);




    const images = [{
        url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',
    }]
    return(
        <View style={styles.container}>
            <View style={[
                styles.messageBox,
                {
                    backgroundColor: isMyMessage() ? "#DCF8C5" : "white",
                    marginLeft: isMyMessage() ? 50 : 0,
                    marginRight: isMyMessage() ? 0 : 50
                }
            ]}>
                {decrypted.message.includes("https://res.cloudinary.com/dffn6kcmr/image/upload")
                    ? <TouchableOpacity onPress={() => {toogleImage(decrypted.message)}}><Image source={{ uri: decrypted.message }} style={{width: 200, height: 200}} /></TouchableOpacity>
                    : <Text style={styles.message}>{decrypted.message}</Text>
                }
                <Text style={styles.time}>{moment(message.createdAt).fromNow()}</Text>
            </View>
        </View>
    )
}

export default ChatMessage