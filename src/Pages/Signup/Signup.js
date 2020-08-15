import React, {Component} from 'react';
import {Button, Text, TextInput, View} from "react-native";

export default class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            name: '',
            error: null,
        };
    }

    handleChangeEmail = (email) => this.setState({email: email});

    handleChangeName = (name) => this.setState({name: name});

    handleChangePassword = (password) => this.setState({password: password});

    async handleSubmit(event) {

        // const { password, email, name } = this.state;
        // event.preventDefault();
        // this.setState({ error: '' });
        // await axios.post('/api/user', {
        //     email: email,
        //     password: password,
        //     nickname: name,
        // })
        //     .then((response) => {
        //         localStorage.setItem(LoginString.FirebaseDocumentId, response.data.docId);
        //         localStorage.setItem(LoginString.ID, response.data.id);
        //         localStorage.setItem(LoginString.Name, response.data.name);
        //         localStorage.setItem(LoginString.Email, response.data.email);
        //         localStorage.setItem(LoginString.Password, response.data.password);
        //         localStorage.setItem(LoginString.PhotoURL, response.data.URL);
        //         localStorage.setItem(LoginString.Description, response.data.description);
        //
        //         this.setState({
        //             name: '',
        //             password: '',
        //             url: '',
        //         });
        //
        //         this.props.history.push('/chat');
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
    }

    render() {
        return (
            <View>
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
                <Text style={{color: 'grey'}}>Password :length Greater
                    than 6 (alphabet,number,special character)</Text>

                <TextInput
                    placeholder="Name"
                    onChangeText={this.handleChangeName}
                    value={this.state.name}
                />
                <Text style={{color: 'grey'}}>Please fill all fields and password should be
                    greater than 6</Text>
                <Button
                    title="Sign Up"
                    onPress={() => alert('hello')}
                />
                <View>
                    <Text style={{color: 'grey'}}>Already have and account?</Text>
                    <Button
                        title="Login In"
                        onPress={() => this.props.navigation.navigate('LogIn')}
                    />
                </View>
            </View>
        );
    }
}