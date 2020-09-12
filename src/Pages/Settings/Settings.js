import {Button, Dimensions, StyleSheet, Text, TextInput, TouchableHighlight, View} from "react-native";
import React, {Component} from "react";
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
    }

    componentWillUnmount() {
        this.setState({
            name: '',
            description: '',
        })
    }

    handleSave = async () => {
        try {
            await axios.put('https://web-notice-board-server-dev.herokuapp.com/api/user', {
                name: this.state.name,
                description: this.state.description,
                userId: this.state.userId,
                docId: this.state.docId,
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
            <View style={styles.container}>
                <View>
                    <Text>Name</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            onChangeText={text => this.setState({name: text})}
                            defaultValue={this.state.name}
                        />
                    </View>
                </View>
                <View>
                    <Text>About me</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            onChangeText={text => this.setState({description: text})}
                            defaultValue={this.state.description}
                        />
                    </View>
                </View>
                <View>
                    <Button
                        title="Save"
                        onPress={() => this.handleSave()}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        width: Dimensions.get('window').width / 2
    },
});

export default Settings;