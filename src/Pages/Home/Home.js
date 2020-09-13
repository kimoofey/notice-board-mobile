import React, {Component} from 'react';
import {Text} from "react-native";
import {Button, Card} from 'react-native-elements';

export default class HomePage extends Component {
    static navigationOptions = {
        title: 'Chatter',
    };

    render() {
        return (
            <Card>
                <Card.Title>Welcome to WEB CHAT APP!</Card.Title>
                <Card.Divider/>
                <Card.Image source={{uri: 'https://source.unsplash.com/random'}}/>
                <Text style={{marginBottom: 10}}>
                    Let's talk with our loved ones
                </Text>
                <Button
                    title="Click to log in"
                    onPress={() => this.props.navigation.navigate('LogIn')}
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                />
            </Card>
        );
    }
}
