import React from 'react';
import {ScrollView, StyleSheet, TouchableHighlight, View} from "react-native";
import {Avatar, ListItem} from 'react-native-elements';


const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default class FakeChat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isOpenDialogConfirmLogout: false,
            currentPeerUser: null,
            displayedContacts: [],
            displayedContactswithNotification: [],
        };
        this.searchUsers = [
            {
                name: 'Memes',
                key: 1,
                id: 0,
                URL: 'https://www.redditinc.com/assets/images/site/reddit-logo.png',
                api: 'https://www.reddit.com/r/memes/top/.json?count=1',
                description: 'Best memes for you',
            },
            {
                name: 'Gamer News',
                key: 2,
                id: 0,
                URL: 'https://www.redditinc.com/assets/images/site/reddit-logo.png',
                api: 'https://www.reddit.com/r/gamernews/top/.json?count=1',
                description: 'Gamers news 24/7',
            },
        ];
        this.notificationMessagesErase = [];
    }

    renderListUser = () => {
        return (this.searchUsers.filter(item => item.id !== this.currentUserId).map((item, index) => (
            <TouchableHighlight
                onPress={() => {
                    this.setState({
                        currentPeerUser: item,
                        displayedContactswithNotification: this.notificationMessagesErase,
                    });
                    this.props.navigation.navigate('ChatBox', {
                        currentPeerUser: item
                    });
                }}
            >
                <ListItem key={index} bottomDivider>
                    <Avatar
                        rounded
                        source={{
                            uri: item.URL,
                        }}
                    />
                    <ListItem.Content>
                        <ListItem.Title>{item.name}</ListItem.Title>
                        <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            </TouchableHighlight>
        )));
    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    {this.renderListUser()}
                </ScrollView>
            </View>
        );
    }
}