import React, {Component} from "react";
import {createStackNavigator} from '@react-navigation/stack';
// import {createDrawerNavigator} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-community/async-storage';
import HomePage from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/Signup/Signup";
import Chat from "../Pages/Chat/Chat";

const Stack = createStackNavigator();

// const Drawer = createDrawerNavigator();

class MyStack extends Component {
    isSigned = async () => await AsyncStorage.getItem('email');

    generateStack = () => {
        const result = this.isSigned();
        return (
            result ? (
                <>
                    {/*<Stack.Screen name="ChatBox" component={ChatBox}/>*/}
                    <Stack.Screen name="ChatRoom" component={Chat}/>
                </>
            ) : (
                <>
                    <Stack.Screen name="Home" component={HomePage}/>
                    <Stack.Screen name="Log In" component={Login}/>
                    <Stack.Screen name="Sign Up" component={SignUp}/>
                </>
            )
        )
    };

    render() {
        return (
            <Stack.Navigator>
                {this.generateStack()}
            </Stack.Navigator>
        )
    }
}

export default MyStack;

