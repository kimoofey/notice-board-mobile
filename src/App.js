import React, {Component} from 'react';
import {toast, ToastContainer} from "react-toastify";
import {NavigationContainer} from "@react-navigation/native";
import MyStack from "./Utils/Navigation";

class App extends Component {
    showToast = (type, message) => {
        switch (type) {
            case 0:
                toast.warning(message);
                break;
            case 1:
                toast.success(message);
                break;
            case 2:
                toast.error(message);
                break;
            default:
                break;
        }
    };

    render() {
        return (
            <NavigationContainer>
                <MyStack/>
            </NavigationContainer>
        );
    }
}

export default App;