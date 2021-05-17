import * as React from 'react';
import {
    Keyboard,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    Alert,
    KeyboardAvoidingView,
    StyleSheet
} from 'react-native';
import {Component} from "react";
import io from "socket.io-client";
const serverip = require('../serverip.json');
import * as SecureStore from 'expo-secure-store';
import {View} from "../components/Themed";

export default class headerScreen extends Component{
    constructor(props) {
        super(props);
        this.state = {
            chatRoom: [],
            socket: ""
        };
        this.socket = io(serverip.ip);
    }

    render = () => {
        return (
            <View style={styles.mainView}>
                <Text>test</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainView:{
        flex: 1
    }
})