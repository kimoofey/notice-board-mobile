import React from 'react';
import LoginString from "../../CONSTS/LoginStrings";
import axios from 'axios';
import {Button, Text, TextInput, View} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            email: '',
            password: '',
        };
    }

    handleChangeEmail = (email) => this.setState({email: email});

    handleChangePassword = (password) => this.setState({password: password});

    componentDidMount() {
        // if (localStorage.getItem(LoginString.ID)) {
        //     this.setState({ isLoading: false }, () => {
        //         this.setState({ isLoading: false });
        //         this.props.showToast(1, 'Login succes');
        //         this.props.history.push('./chat');
        //     });
        // } else {
        //     this.setState({ isLoading: false });
        // }
    }

    async handleSubmit() {
        try {
            // await AsyncStorage.setItem('test', this.state.email);
            // console.log(await AsyncStorage.getItem('test'));
            // await AsyncStorage.clear()

            await axios.post('https://web-notice-board-server-dev.herokuapp.com/api/user/auth', {
                email: this.state.email,
                password: this.state.password,
            },)
                .then((currentdata) => {
                    const {data} = currentdata;
                    if (currentdata) {
                        AsyncStorage.setItem(LoginString.FirebaseDocumentId, data[0].docId);
                        AsyncStorage.setItem(LoginString.ID, data[0].id);
                        AsyncStorage.setItem(LoginString.Name, data[0].name);
                        AsyncStorage.setItem(LoginString.Email, data[0].email);
                        AsyncStorage.setItem(LoginString.Password, data[0].password);
                        AsyncStorage.setItem(LoginString.PhotoURL, data[0].URL);
                        AsyncStorage.setItem(LoginString.Description, data[0].description);
                        AsyncStorage.setItem(LoginString.passCode, data[0].passCode);
                        AsyncStorage.setItem(LoginString.safeCode, data[0].safeCode);
                    }
                })
                .catch((error) => {
                    // document.getElementById('1').innerHTML = 'incorrect email/password or poor internet';
                });
        } catch(e) {
            // save error
        }

    }

    render() {
        return (
            <View>
                {/*<form style={form} noValidate onSubmit={this.handleSubmit}>*/}
                <TextInput
                    placeholder="Email"
                    autoCompleteType="email"
                    keyboardType="email-address"
                    autoFocus
                    onChangeText={this.handleChangeEmail}
                    value={this.state.email}
                />
                <TextInput
                    placeholder="Password"
                    onChangeText={this.handleChangePassword}
                    secureTextEntry={true}
                    value={this.state.password}
                />
                {/*<FormControlLabel*/}
                {/*    control={<Checkbox value="remember" color="primary"/>}*/}
                {/*    label="Remember me"*/}
                {/*/>*/}
                {this.state.error ? (
                    <Text className="text-danger">{this.state.error}</Text>
                ) : null}

                <Button title="Log In" onPress={() => this.handleSubmit()}/>

                <View className="CenterAliningItems">
                    <Text>Don't have and account?</Text>
                    <Button
                        title="Sign Up"
                        // onPress={() => navigation.navigate('SignUp')}
                        onPress={() => this.props.navigation.navigate('SignUp')}
                    />
                </View>
                {/*<div className="error">*/}
                {/*    <p id='1' style={{color: 'red'}}></p>*/}
                {/*</div>*/}
                {/*</form>*/}
            </View>
        );
    }
}