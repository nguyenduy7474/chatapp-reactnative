import React, {useState } from 'react'
import PropTypes from 'prop-types'

import contactData from './contact.json'

import Profile from './Profile'
import * as ImagePicker from "expo-image-picker";


const ProfileScreen = (props) => {
    var {avatar, username, changeAvatar} = props;

    return(
        <Profile {...contactData} name={username} avatar={avatar} changeAvatar={changeAvatar}/>
    )
}

ProfileScreen.navigationOptions = () => ({
    header: null,
})

ProfileScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
}

export default ProfileScreen