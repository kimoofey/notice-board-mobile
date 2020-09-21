import React from 'react';
import LoginString from "../../CONSTS/LoginStrings";
import axios from 'axios';
import {Text, View} from "react-native";
import {Button, Card, Input} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            email: '',
            password: '',
            error: false,
        };
    }

    componentWillUnmount() {
        this.setState({email: '', password: '', error: false})
    }

    handleChangeEmail = (email) => this.setState({email: email});

    handleChangePassword = (password) => this.setState({password: password});

    async handleSubmit() {
        try {
            await axios.post('https://web-notice-board-server-dev.herokuapp.com/api/user/auth', {
                email: this.state.email,
                password: this.state.password,
            },)
                .then(async (currentdata) => {
                    this.setState({error: false});
                    const {data} = currentdata;
                    if (currentdata) {
                        await AsyncStorage.setItem(LoginString.FirebaseDocumentId, data[0].docId);
                        await AsyncStorage.setItem(LoginString.ID, data[0].id);
                        await AsyncStorage.setItem(LoginString.Name, data[0].name);
                        await AsyncStorage.setItem(LoginString.Email, data[0].email);
                        await AsyncStorage.setItem(LoginString.Password, data[0].password);
                        await AsyncStorage.setItem(LoginString.PhotoURL, data[0].URL);
                        await AsyncStorage.setItem(LoginString.Description, data[0].description);
                        await AsyncStorage.setItem(LoginString.passCode, data[0].passCode);
                        await AsyncStorage.setItem(LoginString.safeCode, data[0].safeCode);
                    }
                })
                .catch((error) => {
                    // document.getElementById('1').innerHTML = 'incorrect email/password or poor internet';
                });
        } catch (e) {
            // save error
            this.setState({error: true})
        }

    }

    render() {
        return (
            <View>
                <Card>
                    <Input
                        autoFocus
                        autoCompleteType="email"
                        keyboardType="email-address"
                        placeholder='email@address.com'
                        leftIcon={{type: 'font-awesome', name: 'envelope'}}
                        onChangeText={this.handleChangeEmail}
                        value={this.state.email}
                        label={'Your Email Address'}
                    />
                    <Input
                        secureTextEntry={true}
                        placeholder='Password'
                        leftIcon={{type: 'font-awesome', name: 'lock'}}
                        onChangeText={this.handleChangePassword}
                        value={this.state.password}
                        label={'Password'}
                    />
                    {this.state.error ? (
                        <Text className="text-danger">{'Wrong email or password'}</Text>
                    ) : null}

                    <Button title="Log In" onPress={() => this.handleSubmit()}/>
                    <Card.Divider/>
                    <Card.FeaturedSubtitle style={{color: 'gray', textAlign: 'center'}}>Don't have
                        account?</Card.FeaturedSubtitle>
                    <Button
                        title="Sign Up"
                        onPress={() => this.props.navigation.navigate('SignUp')}
                    />
                </Card>
            </View>
        );
    }
}