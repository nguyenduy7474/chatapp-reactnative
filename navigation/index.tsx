/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {ColorSchemeName, Image, Text, TouchableOpacity, View} from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import { RootStackParamList} from '../types';
import MainTabNavigator from './MainTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import Colors from "../constants/Colors";
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { Button } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import ContactsScreen from "../screens/ContactsScreen";
import UserProfileScreen from '../screens/UserProfileScreen';


export default function Navigation({colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator({navigation}) {
    return (
    <Stack.Navigator screenOptions={{
        headerStyle:{
            backgroundColor: Colors.light.tint,
            shadowOpacity: 0,
            elevation: 0
        },
        headerTintColor: Colors.light.background,
        headerTitleAlign: 'left',
        headerTitleStyle:{
            fontWeight:"bold"
        },
        gestureEnabled: true,
        gestureDirection: "horizontal",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }}>

        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login Chat App' }}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Register Chat App' }} />
        <Stack.Screen name="User Profile" component={UserProfileScreen}/>
        <Stack.Screen
            name="Root"
            component={MainTabNavigator}
            options={({ navigation }) => ({
            title:"Chat app",
            headerRight: () => (
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <TouchableOpacity style={{marginRight: 10}} onPress={() => navigation.navigate('User Profile')}>
                        <Image source={{ uri: "https://res.cloudinary.com/dffn6kcmr/image/upload/v1624467939/user_tgnd6p.png" }} style={{width: 24, height: 24}} />
                    </TouchableOpacity>
                    <Button
                        onPress={async () => {
                            //console.log(navigation)
                            await SecureStore.deleteItemAsync("accesstoken")
                            navigation.replace("Login")
                        }}
                        title="Log out"
                        buttonStyle={{
                            backgroundColor: Colors.light.tint,
                            marginRight: 10
                        }}
                        titleStyle={{
                            color: Colors.light.background,
                            fontSize: 20,
                        }}
                    />
                </View>
                )
            })}

        />
        <Stack.Screen
            name="ChatRoomScreen"
            component={ChatRoomScreen}
            options={({route}) => ({
                title: route.params.desusername
            })}
        />
        <Stack.Screen
            name="Contacts"
            component={ContactsScreen}
            navigation={navigation}
        />
        <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}

async function logOut() {
    console.warn("ss")

}