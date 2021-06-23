import * as React from 'react';
import {FlatList, StyleSheet, Modal, Image} from 'react-native';

import { Text, View } from '../components/Themed';
import {Component} from "react";
import io from "socket.io-client";
const serverip = require('../serverip.json');
import Profile from '../components/Profile';
import * as SecureStore from "expo-secure-store";
import * as ImagePicker from "expo-image-picker";

class PersonsScreen extends Component{
    constructor(props) {
        super(props);
        this.state = {
            chatRoom: [],
            socket: "",
            username: ""
        };
        this.socket = io(serverip.ip);
    }

    getValueFor = async (key) => {
        let result = await SecureStore.getItemAsync(key);
        if (result) {
            return result
        }else{
            return false
        }
    }

    changeAvatar = async () => {
        this.socket.on("update avatar respone", async (msg) => {
            this.setState({
                avatar: msg.avatar
            })
        })
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
                this.socket.emit("update avatar", {avatar: data.secure_url, username: this.state.username});

            }).catch(err => console.log(err))

        }
    }

    async componentDidMount() {
        this.socket.on("get data user respone", (msg) => {
            this.setState({
                username: msg.username,
                avatar: msg.avatar
            })
        })
        let token = await this.getValueFor("accesstoken")
        this.socket.emit("get data user", {token: token});


    }

    render = () => {
        return (
            <Profile username={this.state.username} avatar={this.state.avatar} changeAvatar={this.changeAvatar}/>
        );
    }

}
export default PersonsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
