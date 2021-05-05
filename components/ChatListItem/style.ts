import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
    container:{
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        padding: 10
    },
    midContainer:{
      justifyContent: "space-around"
    },
    leftContainer:{
        flexDirection: "row",
    },
    avatar: {
        width: 60,
        height: 60,
        marginRight: 10,
        borderRadius: 50
    },
    username:{
        fontWeight: 'bold',
        fontSize: 16
    },
    lastmessage:{
        fontSize: 16,
        color: 'grey',
        width: 160
    },
    time:{
        fontSize: 16,
        color: 'grey'
    }
})

export default style;