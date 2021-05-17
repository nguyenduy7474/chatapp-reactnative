import React, { Component } from "react";

import {Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView} from 'react-native';
import { Button } from 'react-native-elements';
import { FlatList, StyleSheet } from 'react-native';
import io from "socket.io-client";
const serverip = require('../serverip.json');


export default class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password:"",
            confirmpassword:"",
            err: ""
        }
        this.socket = io(serverip.ip);
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.containerView} behavior="padding">

                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.loginScreenContainer}>
                        <View style={styles.loginFormView}>
                            <Text style={styles.logoText}>Đăng ký</Text>
                            <TextInput placeholder="Username" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} value={this.state.username} onChangeText={(text) => this.setState({username: text})}/>
                            <TextInput placeholder="Password" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} value={this.state.password} onChangeText={(text) => this.setState({password: text})} secureTextEntry={true}/>
                            <TextInput placeholder="Confirm Password" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} value={this.state.confirmpassword} onChangeText={(text) => this.setState({confirmpassword: text})} secureTextEntry={true}/>

                            <Button
                                buttonStyle={styles.registernButton}
                                onPress={() => this.onRegisterPress()}
                                title="Đăng ký"
                            />
                            <Text style={styles.errorTextInput}>{this.state.err}</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        );
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    onRegisterPress = () => {
        let data = {
            username: this.state.username,
            password: this.state.password,
            confirmpassword: this.state.confirmpassword
        }
        this.socket.emit("register user", data);
        this.socket.on("register user respone", msg => {
            if(msg.err){
                this.setState({err: msg.err})
            }else{
                this.setState({err: msg.success})
            }
        });
    }

}

const styles = StyleSheet.create({
    containerView: {
        flex: 1,
    },
    loginScreenContainer: {
        flex: 1,
    },
    logoText: {
        fontSize: 40,
        fontWeight: "800",
        marginTop: 150,
        marginBottom: 30,
        textAlign: 'center',
    },
    loginFormView: {
        flex: 1
    },
    errorTextInput:{
        textAlign: 'center',
        marginTop: 50,
        fontSize: 16,
    },
    loginFormTextInput: {
        height: 43,
        fontSize: 14,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#eaeaea',
        backgroundColor: '#fafafa',
        paddingLeft: 10,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 5,
        marginBottom: 5,

    },
    loginButton: {
        backgroundColor: '#0C6157',
        borderRadius: 5,
        height: 45,
        marginTop: 10,
        paddingLeft: 10,
        marginLeft: 15,
        marginRight: 15,
    },
    registernButton: {
        backgroundColor: '#2452ff',
        borderRadius: 5,
        height: 45,
        marginTop: 10,
        paddingLeft: 10,
        marginLeft: 15,
        marginRight: 15,
    },
    fbLoginButton: {
        height: 45,
        marginTop: 10,
        backgroundColor: 'transparent',
    },
});