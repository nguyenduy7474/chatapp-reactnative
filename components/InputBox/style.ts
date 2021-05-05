import {StyleSheet} from 'react-native';
import Color from '../../constants/Colors';

const style = StyleSheet.create({
    container:{
        flexDirection: "row",
        margin: 10
    },
    mainContainer:{
        flexDirection: "row",
        backgroundColor:"white",
        padding: 10,
        borderRadius: 25,
        marginRight: 10,
        flex: 1,
        alignItems:"center"
    },
    buttonContainer:{
        backgroundColor: Color.light.tint,
        borderRadius: 50,
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems:"center"
    },
    textInput:{
        flex: 1,
        marginHorizontal: 10
    },
    icon:{
        marginHorizontal: 5
    }
})

export default style;