import React, {Component} from "react";
import {Text} from "react-native";
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-community/async-storage';
import HomePage from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/Signup/Signup";
import Chat from "../Pages/Chat/Chat";
import ChatBox from "../Pages/Chatbox/Chatbox";
import Sidebar from '../Components/Sidebar';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const Settings = ({navigator}) => {
    return (<Text>Settings</Text>);
};

const FAQ = ({navigator}) => {
    return (<Text>FAQ</Text>);
};

const ChatNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ChatRoom" component={Chat}/>
            <Stack.Screen name="ChatBox" component={ChatBox} options={{gestureDirection: "horizontal"}}/>
        </Stack.Navigator>
    )
};

class MyStack extends Component {
    isSigned = async () => await AsyncStorage.getItem('email');

    generateStack = () => {
        const result = this.isSigned();
        return (
            result ? (
                <Drawer.Navigator drawerContent={props => <Sidebar {...props}/>} backBehavior="history">
                    <Drawer.Screen name="Chat" component={ChatNavigator}/>
                    <Drawer.Screen name="Settings" component={Settings}/>
                    <Drawer.Screen name="FAQ" component={FAQ}/>
                </Drawer.Navigator>
            ) : (
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={HomePage}/>
                    <Stack.Screen name="LogIn" component={Login}/>
                    <Stack.Screen name="SignUp" component={SignUp}/>
                </Stack.Navigator>
            )
        )
    };

    render() {
        return (
            this.generateStack()
        )
    }
}

export default MyStack;

