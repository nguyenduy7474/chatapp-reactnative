import React, { Component } from "react";

import {Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView} from 'react-native';
import { Button } from 'react-native-elements';
import { FlatList, StyleSheet } from 'react-native';
import {useNavigation} from "@react-navigation/native";
import io from "socket.io-client";
const serverip = require('../serverip.json');
import * as SecureStore from 'expo-secure-store';

export default class LoginScreen extends Component {

    constructor(props){
        super(props)
        this.state = {
            username: "",
            password:"",
        }
        this.socket = io(serverip.ip);
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.containerView} behavior="padding">

                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.loginScreenContainer}>
                        <View style={styles.loginFormView}>
                            <Text style={styles.logoText}>Đăng nhập</Text>
                            <TextInput placeholder="Username" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} onChangeText={(text) => this.setState({username: text})}/>
                            <TextInput placeholder="Password" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} onChangeText={(text) => this.setState({password: text})}/>
                            <Button
                                buttonStyle={styles.loginButton}
                                onPress={this.onLoginPress}
                                title="Đăng nhập"
                            />
                            <Button
                                buttonStyle={styles.registernButton}
                                onPress={this.onRegisterPress}
                                title="Đăng ký"
                            />
                            <Text style={styles.errorTextInput}>{this.state.err}</Text>

                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        );
    }

    async componentDidMount() {

        let token = await this.getValueFor("accesstoken")
        if(token){
            this.socket.emit("check accesstoken", {accesstoken: token});
            this.socket.on("check accesstoken respone", async (msg) => {
                if(msg.success){
                    this.props.navigation.replace('Root', {username: msg.username})
                    return
                }else{
                    this.setState({err: "Phiên đã hết hạn"})
                }
            })
        }
    }

    componentWillUnmount() {
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

    onLoginPress = () => {
        let data = {
            username: this.state.username,
            password: this.state.password,
        }
        console.log(data)
        this.socket.emit("login user", data);
        this.socket.on("login user respone", async (msg) => {
            if(msg.err){
                this.setState({err: msg.err})
            }else{
                this.setState({err: msg.success})
                await this.save("accesstoken", msg.token)
                this.props.navigation.replace('Root', {username: this.state.username})
                return
            }
        });
    }

    onRegisterPress = () => {
        //const navigation = useNavigation();
        console.log(this.props.navigation.navigate('Register'))
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
    errorTextInput:{
        textAlign: 'center',
        marginTop: 50,
        fontSize: 16,
    },
    loginFormView: {
        flex: 1
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