import * as React from 'react';
import { FlatList, StyleSheet, Modal } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import ChatListItem from '../components/ChatListItem';
import {ChatRoom} from "../types";
import ChatRooms from '../data/ChatRooms';
import {Component} from "react";
import io from "socket.io-client";
const serverip = require('../serverip.json');
import * as SecureStore from 'expo-secure-store';
import NewMessageButton from "../components/NewMessageButton";


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

  async componentDidMount() {
/*    let pvk = await this.getValueFor("privatekey1")
    console.log(pvk)
    await SecureStore.deleteItemAsync("privatekey1")*/

    this.setState({ username: this.props.route.params.username});
    this.socket.emit("chat person", {username: this.props.route.params.username});
    this.socket.on("chat person respone", (msg) => {
      this.setState({ chatRoom: this.state.chatRoom.concat(msg)})
    });
  }

  getValueFor = async (key) => {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      return result
    }
  }

  render = () => {
    return (
        <View style={styles.container}>
          <FlatList
              style={{width: '100%'}}
              data={this.state.chatRoom}
              renderItem={({item}) => <ChatListItem chatroom={item} username={this.props.route.params.username}/>}
              keyExtractor={(item) => item.id}
          />
          <NewMessageButton username={this.state.username}/>
        </View>
    );
  }

}
export default PersonsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
