import {StyleSheet} from 'react-native';
import Color from '../../constants/Colors';

const style = StyleSheet.create({
    container:{
        padding: 10
    },
    messageBox: {
        borderRadius: 5,
        padding: 10
    },
    name:{
        color: Color.light.tint,
        fontWeight:"bold"
    },
    message:{
        color: Color.light.text,
    },
    time:{
        color: 'grey',
        alignSelf: "flex-end"
    }
})

export default style;