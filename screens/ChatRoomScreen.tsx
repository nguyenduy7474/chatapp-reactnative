import React, {Component} from 'react';
import {View, Text, FlatList, Modal} from "react-native";
import {useRoute} from '@react-navigation/native';
import chatRoomData from '../data/Chats';
import ChatMessage from '../components/ChatMessage';
import InputBox from "../components/InputBox";
import io from "socket.io-client";
const serverip = require('../serverip.json');
import * as SecureStore from 'expo-secure-store';
import { Crypt, RSA } from 'hybrid-crypto-js';
import ImageViewer from "react-native-image-zoom-viewer";
var crypt = new Crypt({rsaStandard: 'RSAES-PKCS1-V1_5'});



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
            viewimage: false,
            imageurl: ""
        };
        this.socket = io(serverip.ip);
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

    toogleImage = (url) => {
        if(url){
            this.setState({viewimage: !this.state.viewimage, imageurl: url})
        }else{
            this.setState({viewimage: !this.state.viewimage})
        }
/*        const images = [{
            url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',
        }]
        console.log("aa")
        return(
            <Modal visible={true} transparent={true} style={{zIndex: 1}}>
                <ImageViewer imageUrls={images}/>
            </Modal>
        )*/
    }

    async componentDidMount() {
        let privatekey = await this.getValueFor("privatekey"+this.state.chatroomid)

        if(privatekey){
            this.setState({privatekey: privatekey}, () => {
                this.socket.emit("chat message", {chatroomid: this.state.chatroomid, privatekey:true});
            })
        }else{
            this.socket.emit("chat message", {chatroomid: this.state.chatroomid, privatekey:false});
        }
        this.socket.on("chat message respone", async msg => {
            if(privatekey == false){
                await this.save("privatekey"+msg.id, JSON.stringify(msg.privatekey))
                this.setState({chatMessages: msg, publickey: msg.publickey, privatekey: JSON.stringify(msg.privatekey)})
            }else{
                this.setState({ chatMessages: msg, publickey: msg.publickey});
            }
        });
    }

    sendMessage = (msg) =>{
        var encrypted = crypt.encrypt(this.state.publickey, msg);
        var obj = {
            username: this.state.username,
            chatroomid: this.state.chatroomid,
            message: encrypted
        }
        this.socket.emit("send message", obj);

    }

    render = () => {
        if(this.state.viewimage){
            const images = [{
                url: this.state.imageurl,
            }]
            return(
                <Modal visible={true} transparent={true} style={{zIndex: 1}} onRequestClose={this.toogleImage}>
                    <ImageViewer imageUrls={images}/>
                </Modal>
            )
        }else{
            return(
                <View style={{width: "100%", height: "100%"}}>
                    {this.state.chatMessages ?
                        <FlatList
                            data={this.state.chatMessages.messages}
                            renderItem={({item}) => <ChatMessage toogleImage={this.toogleImage} privatekey={this.state.privatekey} message={item} userid={this.state.userid} username={this.state.username}/>}
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

}


export default ChatRoom