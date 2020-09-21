import React, {Component} from "react";
import {View, ScrollView} from "react-native";
import {Button, Card, Input} from 'react-native-elements';
import AsyncStorage from "@react-native-community/async-storage";
import LoginString from "../../CONSTS/LoginStrings";
import axios from "axios";

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            userId: '',
            docId: '',
            URL: '',
            passCode: '',
            safeCode: '',
        }
    }

    componentDidMount() {
        AsyncStorage.getItem(LoginString.Name)
            .then(result => this.setState({name: result}));

        AsyncStorage.getItem(LoginString.Description)
            .then(result => this.setState({description: result}));

        AsyncStorage.getItem(LoginString.ID)
            .then(result => this.setState({userId: result}));

        AsyncStorage.getItem(LoginString.FirebaseDocumentId)
            .then(result => this.setState({docId: result}));

        AsyncStorage.getItem(LoginString.PhotoURL)
            .then(result => this.setState({URL: result}));
    }

    componentWillUnmount() {
        this.setState({
            name: '',
            description: '',
            URL: '',
            passCode: '',
            safeCode: '',
        })
    }

    handleSave = async () => {
        try {
            await axios.put('https://web-notice-board-server-dev.herokuapp.com/api/user', {
                name: this.state.name,
                description: this.state.description,
                userId: this.state.userId,
                docId: this.state.docId,
                passCode: this.state.passCode,
                safeCode: this.state.safeCode
            },)
                .then((response) => {
                    AsyncStorage.setItem(LoginString.Name, response.data.name);
                    return response;
                })
                .then(response => {
                    AsyncStorage.setItem(LoginString.Description, response.data.description);
                })
                .then(response => {
                    this.props.navigation.navigate('Chat');
                })
                .catch((error) => {
                    // document.getElementById('1').innerHTML = 'incorrect email/password or poor internet';
                });
        } catch (e) {
            // save error
        }
    };

    render() {
        return (
            <ScrollView>
                <Card>
                    <Card.Title>Settings</Card.Title>
                    {/*<Badge*/}
                    {/*    overlap="circle"*/}
                    {/*    anchorOrigin={{*/}
                    {/*        vertical: 'bottom',*/}
                    {/*        horizontal: 'right',*/}
                    {/*    }}*/}
                    {/*    badgeContent={<EditIcon/>}*/}
                    {/*>*/}
                    {/*    {this.state.URL*/}
                    {/*        ? <Avatar*/}
                    {/*            rounded*/}
                    {/*            source={{*/}
                    {/*                uri: this.state.URL,*/}
                    {/*            }}*/}
                    {/*        />*/}
                    {/*        : <Avatar*/}
                    {/*            rounded*/}
                    {/*            title={this.state.name.slice(0, 1)}*/}
                    {/*        />}*/}
                    {/*</Badge>*/}
                    <Input
                        leftIcon={{type: 'font-awesome', name: 'user'}}
                        onChangeText={text => this.setState({name: text})}
                        defaultValue={this.state.name}
                        label={'Name'}
                    />
                    <Input
                        leftIcon={{type: 'font-awesome', name: 'id-badge'}}
                        onChangeText={text => this.setState({description: text})}
                        defaultValue={this.state.description}
                        label={'About me'}
                    />
                    <Input
                        leftIcon={{type: 'font-awesome', name: 'comments'}}
                        onChangeText={text => this.setState({passCode: text})}
                        defaultValue={this.state.passCode}
                        secureTextEntry={true}
                        label={'Password for chat access'}
                    />
                    <Input
                        leftIcon={{type: 'font-awesome', name: 'user-secret'}}
                        onChangeText={text => this.setState({safeCode: text})}
                        defaultValue={this.state.safeCode}
                        secureTextEntry={true}
                        label={'Password for fake chat access'}
                    />
                    <View>
                        <Button
                            title="Save"
                            onPress={() => this.handleSave()}
                        />
                    </View>
                </Card>
            </ScrollView>
        );
    }
}

export default Settings;