import * as React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { View } from '../components/Themed';
import ContactListItem from '../components/ContactListItem';

import { listUsers }  from '../src/graphql/queries';
import {Component, useEffect, useState} from "react";
import io from "socket.io-client";
const serverip = require('../serverip.json');

export default class ContactsScreen extends Component{

    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
        this.socket = io(serverip.ip);
    }

    componentDidMount() {
        this.socket.emit("get user", {username: this.props.route.params.username});
        this.socket.on("get user respone", msg => {
            this.setState({ users: msg.userExist});
        });
    }

    render(){
        return (
            <View style={styles.container}>
                <FlatList
                    style={{width: '100%'}}
                    data={this.state.users}
                    renderItem={({ item }) => <ContactListItem user={item} currentusername={this.props.route.params.username} navigation={this.props.navigation} />}
                    keyExtractor={(item) => item._id}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});