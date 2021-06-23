import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    TouchableWithoutFeedback
} from "react-native";
import { User } from "../../types";
import styles from "./styles";
import { useNavigation } from '@react-navigation/native';
import io from "socket.io-client";
const serverip = require('../../serverip.json');
import * as SecureStore from 'expo-secure-store';
import { RSA } from 'react-native-rsa-native';

/*import {
    API,
    graphqlOperation,
    Auth,
} from "aws-amplify";
import {
    createChatRoom,
    createChatRoomUser
} from '../../src/graphql/mutations';*/

export type ContactListItemProps = {
    user: User;
}

class ContactListItem extends Component{

    constructor(props) {
        super(props);
        this.state = {
            username: ''
        };
        this.socket = io(serverip.ip);
    }

    componentDidMount() {

    }

    save = async (key, value) => {
        await SecureStore.setItemAsync(key, value);
    }

    getValueFor = async (key) => {
        let result = await SecureStore.getItemAsync(key);
        if (result) {
            return result
        }else{
            return false
        }
    }

    onClick = () => {
        //console.log(this.props)
        this.socket.emit("create new room chat", {
            username: this.props.user.username,
            currentusername: this.props.currentusername,
            desavatar: this.props.user.avatar
        });
        this.socket.on("create new room chat respone", async msg => {
            await this.save("privatekey"+msg.success.id, JSON.stringify(msg.success.privatekey))

            this.props.navigation.navigate('ChatRoomScreen', {
                chatroomid: msg.success.id,
                username: msg.success.users[0].name,
                desusername: msg.success.users[1].name,
            })
        });
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={this.onClick}>
                <View style={styles.container}>
                    <View style={styles.lefContainer}>
                        <Image source={{ uri: this.props.user.avatar }} style={styles.avatar}/>

                        <View style={styles.midContainer}>
                            <Text style={styles.username}>{this.props.user.username}</Text>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
};

export default ContactListItem;

/*const onClick = async () => {
        try {

            //  1. Create a new Chat Room
            const newChatRoomData = await API.graphql(
                graphqlOperation(
                    createChatRoom, {
                        input: {
                            lastMessageID: "zz753fca-e8c3-473b-8e85-b14196e84e16"
                        }
                    }
                )
            )

            if (!newChatRoomData.data) {
                console.log(" Failed to create a chat room");
                return;
            }

            const newChatRoom = newChatRoomData.data.createChatRoom;

            // 2. Add `user` to the Chat Room
            await API.graphql(
                graphqlOperation(
                    createChatRoomUser, {
                        input: {
                            userID: user.id,
                            chatRoomID: newChatRoom.id,
                        }
                    }
                )
            )

            //  3. Add authenticated user to the Chat Room
            const userInfo = await Auth.currentAuthenticatedUser();
            await API.graphql(
                graphqlOperation(
                    createChatRoomUser, {
                        input: {
                            userID: userInfo.attributes.sub,
                            chatRoomID: newChatRoom.id,
                        }
                    }
                )
            )

            navigation.navigate('ChatRoom', {
                id: newChatRoom.id,
                name: "Hardcoded name",
            })

        } catch (e) {
            console.log(e);
        }
    }*/

