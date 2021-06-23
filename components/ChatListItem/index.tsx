import React from 'react';
import {View, Text, Image, TouchableWithoutFeedback, Modal} from "react-native";
import {ChatRoom} from'../../types';
import styles from './style';
import moment from "moment";
import {useNavigation} from '@react-navigation/native';


export type ChatListItemProps = {
    chatroom: ChatRoom;
    username: string
}

const ChatListItem = (props: ChatListItemProps) => {
    const {chatroom, username} = props;
    var user = "";
    for(var i=0 ;i<chatroom.users.length; i++){
        if(chatroom.users[i].name != username){
            user = chatroom.users[i]
            break;
        }
    }
    const navigation = useNavigation()
    const onClick = () =>{
        navigation.navigate('ChatRoomScreen', {
            chatroomid: chatroom.id,
            username: username,
            desusername: user.name,
        })
    }



    return(
        <TouchableWithoutFeedback onPress={onClick}>
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <Image source={{uri: user.imageUri}} style={styles.avatar}/>
                    <View style={styles.midContainer}>
                        <Text style={styles.username}>{user.name}</Text>
                        <Text numberOfLines={1} style={styles.lastmessage}>{chatroom.lastMessage.content}</Text>
                    </View>
                </View>
                <Text style={styles.time}>{moment(chatroom.lastMessage.createdAt).format("DD/MM/YYYY")}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default ChatListItem;