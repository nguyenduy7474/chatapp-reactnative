import React from 'react';
import {TouchableOpacity, View} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./styles";
import { useNavigation } from '@react-navigation/native';

const NewMessageButton = (props) => {

    const navigation = useNavigation();

    const onPress = () => {
        navigation.navigate('Contacts', {"username": props.username});
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress}>
                <MaterialCommunityIcons
                    name="message-reply-text"
                    size={28}
                    color="white"
                />
            </TouchableOpacity>
        </View>
    )
}

export default NewMessageButton;