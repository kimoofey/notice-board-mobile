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
                    this.setState({error: false});
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