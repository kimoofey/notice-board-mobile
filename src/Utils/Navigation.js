import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from '@react-navigation/stack';
// import {createDrawerNavigator} from '@react-navigation/drawer';
import HomePage from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";

const Stack = createStackNavigator();
// const Drawer = createDrawerNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            {/*Need to implement token check*/}
            {1 === 1 ? (
                <>
                    <Stack.Screen name="Home" component={HomePage}/>
                    <Stack.Screen name="LogIn" component={Login}/>
                </>
            ) : (
                <>
                    {/*<Stack.Screen name="ChatBox" component={ChatBox}/>*/}
                    {/*<Stack.Screen name="ChatRoom" component={ChatRoom}/>*/}
                    null
                </>
            )}
        </Stack.Navigator>
    )
}

export default MyStack;

