import * as React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import ChatListItem from '../components/ChatListItem';
import {ChatRoom} from "../types";
import ChatRooms from '../data/ChatRooms';
import {Component} from "react";
import io from "socket.io-client";

class PersonsScreen extends Component{
  constructor(props) {
    super(props);
    this.state = {
      chatRoom: [],
      socket: ""
    };
    this.socket = io("http://192.168.1.7:3000");
  }

  componentDidMount() {
    this.socket.emit("chat person", "getperson");
    this.socket.on("chat person respone", msg => {
      this.setState({ chatRoom: msg});
    });
  }

  render = () => {
    return (
        <View style={styles.container}>
          <FlatList
              style={{width: '100%'}}
              data={this.state.chatRoom}
              renderItem={({item}) => <ChatListItem chatroom={item}/>}
              keyExtractor={(item) => item.id}
          />
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
