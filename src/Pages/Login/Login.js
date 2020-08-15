import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Button, Text, TextInput, View} from "react-native";

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

    async handleSubmit(event) {
        // event.preventDefault();
        // await axios.post('/api/user/auth', {
        //     email: this.state.email,
        //     password: this.state.password,
        // },)
        //     .then((currentdata) => {
        //         const {data} = currentdata;
        //         if (currentdata) {
        //             localStorage.setItem(LoginString.FirebaseDocumentId, data[0].docId);
        //             localStorage.setItem(LoginString.ID, data[0].id);
        //             localStorage.setItem(LoginString.Name, data[0].name);
        //             localStorage.setItem(LoginString.Email, data[0].email);
        //             localStorage.setItem(LoginString.Password, data[0].password);
        //             localStorage.setItem(LoginString.PhotoURL, data[0].URL);
        //             localStorage.setItem(LoginString.Description, data[0].description);
        //             this.props.history.push('/chat');
        //         }
        //     })
        //     .catch((error) => {
        //         document.getElementById('1').innerHTML = 'incorrect email/password or poor internet';
        //     });
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