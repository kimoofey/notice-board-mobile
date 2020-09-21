import React, {Component} from 'react';
import {ScrollView} from "react-native";
import {Button, Card, Input} from 'react-native-elements';
import axios from "axios";
import LoginString from "../../CONSTS/LoginStrings";
import AsyncStorage from "@react-native-community/async-storage";

export default class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            name: '',
            error: false,
            safeCode: '',
            passCode: '',
        };
    }

    componentWillUnmount() {
        this.setState({
            name: '',
            password: '',
            url: '',
            safeCode: '',
            passCode: '',
        });
    }

    handleChangeEmail = (email) => this.setState({email: email});

    handleChangeName = (name) => this.setState({name: name});

    handleChangePassword = (password) => this.setState({password: password});

    handleChangePassCode = (password) => this.setState({passCode: password});

    handleChangeSafeCode = (password) => this.setState({safeCode: password});

    async handleSubmit() {
        try {
            const {password, email, name, safeCode, passCode} = this.state;
            await axios.post('https://web-notice-board-server-dev.herokuapp.com/api/user', {
                email: email,
                password: password,
                nickname: name,
                safeCode: safeCode,
                passCode: passCode,
            })
                .then(async (response) => {
                    const {data} = response;
                    if (response) {
                        await AsyncStorage.setItem(LoginString.FirebaseDocumentId, data.docId);
                        await AsyncStorage.setItem(LoginString.ID, data.id);
                        await AsyncStorage.setItem(LoginString.Name, data.name);
                        await AsyncStorage.setItem(LoginString.PhotoURL, data.URL);
                        await AsyncStorage.setItem(LoginString.Description, data.description);
                        await AsyncStorage.setItem(LoginString.passCode, data.passCode);
                        await AsyncStorage.setItem(LoginString.safeCode, data.safeCode);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <ScrollView>
                <Card>
                    <Card.Title>Registration Form</Card.Title>
                    <Card.Divider/>
                    <Input
                        autoFocus
                        autoCompleteType="email"
                        keyboardType="email-address"
                        placeholder="email@address.com"
                        leftIcon={{type: 'font-awesome', name: 'envelope'}}
                        onChangeText={this.handleChangeEmail}
                        value={this.state.email}
                        label={'Your Email Address'}
                    />

                    <Input
                        secureTextEntry={true}
                        placeholder="Password"
                        leftIcon={{type: 'font-awesome', name: 'lock'}}
                        onChangeText={this.handleChangePassword}
                        value={this.state.password}
                        label={'Password'}
                    />
                    <Card.FeaturedSubtitle style={{color: 'gray', textAlign: 'center'}}>Password
                        should be
                        greater than 6</Card.FeaturedSubtitle>
                    <Input
                        placeholder="Name"
                        leftIcon={{type: 'font-awesome', name: 'user'}}
                        onChangeText={this.handleChangeName}
                        value={this.state.name}
                        label={'Your Name'}
                    />
                    <Input
                        leftIcon={{type: 'font-awesome', name: 'comments'}}
                        placeholder="Password"
                        maxLength={4}
                        secureTextEntry={true}
                        keyboardType="number-pad"
                        multiline={false}
                        onChangeText={this.handleChangePassCode}
                        value={this.state.passCode}
                        label={'Password for chat access'}
                    />
                    <Input
                        leftIcon={{type: 'font-awesome', name: 'user-secret'}}
                        placeholder="password"
                        maxLength={4}
                        secureTextEntry={true}
                        keyboardType="number-pad"
                        multiline={false}
                        onChangeText={this.handleChangeSafeCode}
                        value={this.state.safeCode}
                        label={'Password for fake chat access'}
                    />
                    <Button
                        title="Sign Up"
                        onPress={() => this.handleSubmit()}
                    />
                    <Card.Divider/>
                    <Card.FeaturedSubtitle style={{color: 'gray', textAlign: 'center'}}>Already have and
                        account?</Card.FeaturedSubtitle>
                    <Button
                        title="Login In"
                        onPress={() => this.props.navigation.navigate('LogIn')}
                    />
                </Card>
            </ScrollView>
        );
    }
}