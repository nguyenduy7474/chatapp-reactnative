import React, {Component} from 'react';
import {View, Text, FlatList} from "react-native";
import {useRoute} from '@react-navigation/native';
import chatRoomData from '../data/Chats';
import ChatMessage from '../components/ChatMessage';
import InputBox from "../components/InputBox";
import io from "socket.io-client";
const serverip = require('../serverip.json');


class ChatRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chatMessage: "",
            chatMessages: {},
            socket: "",
            userid: this.props.route.params.userid,
            chatroomid: this.props.route.params.chatroomid,
            username: this.props.route.params.username,

        };
        this.socket = io(serverip.ip);
    }

    componentDidMount() {
        this.socket.emit("chat message", {chatroomid: this.state.chatroomid});
        this.socket.on("chat message respone", msg => {
            this.setState({ chatMessages: msg});
        });
    }

    sendMessage = (msg) =>{
        console.log(this.state.username)
        var obj = {
            username: this.state.username,
            chatroomid: this.state.chatroomid,
            message: msg
        }
        this.socket.emit("send message", obj);
    }

    render = () => {

        return(
            <View style={{width: "100%", height: "100%"}}>
                {this.state.chatMessages ?
                    <FlatList
                        data={this.state.chatMessages.messages}
                        renderItem={({item}) => <ChatMessage message={item} userid={this.state.userid} username={this.state.username}/>}
                    />
                    : ""
                }

                <InputBox
                    sendMessage={this.sendMessage}
                />
            </View>
        )
    }

}


export default ChatRoom