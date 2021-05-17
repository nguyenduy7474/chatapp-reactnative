import React from "react";
import {View, Text} from "react-native";
import {Message, Userid} from "../../types";
import moment from "moment";
import styles from "./style";

export type ChatMessageProps = {
    message: Message,
    userid: Userid,
    username: string
}

const ChatMessage = (props: ChatMessageProps) => {
    const {message, userid, username} = props;
    const isMyMessage = () => {
        return message.user.name == username;
    }

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
                <Text style={styles.message}>{message.content}</Text>
                <Text style={styles.time}>{moment(message.createdAt).fromNow()}</Text>
            </View>
        </View>
    )
}

export default ChatMessage