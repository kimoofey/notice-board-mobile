import React, {Component} from 'react';
import {ScrollView} from "react-native";
import {Button, Card, Input} from 'react-native-elements';

export default class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            name: '',
            error: false,
        };
    }

    componentWillUnmount() {
        this.setState({email: '', password: '', name: '', error: false})
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
                    <Button
                        title="Sign Up"
                        onPress={() => alert('hello')}
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