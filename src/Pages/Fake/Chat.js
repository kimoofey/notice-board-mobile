import React from 'react';
import {FlatList, Image, ScrollView, StyleSheet, Text, TouchableHighlight, View} from "react-native";


const styles = StyleSheet.create({
    logo: {
        width: 30,
        height: 30,
        borderRadius: 40,
        borderWidth: 3,
    },
    row: {
        flexDirection: 'row'
    },
    horizontal: {
        flexDirection: 'column',
        padding: 20,
        borderBottomWidth: 1,
    },
    container: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        paddingLeft: 10
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
                api: 'https://www.reddit.com/r/memes/top/.json?count=1'
            },
            {
                name: 'Gamer News',
                key: 2,
                id: 0,
                URL: 'https://www.redditinc.com/assets/images/site/reddit-logo.png',
                api: 'https://www.reddit.com/r/gamernews/top/.json?count=1'
            },
        ];
        this.notificationMessagesErase = [];
    }

    renderListUser = ({item}) => {
        if (item.id !== this.currentUserId) {
            return (
                <ScrollView>
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
                        style={styles.horizontal}
                    >
                        <View style={styles.row}>
                            <Image
                                style={styles.logo}
                                source={{uri: item.URL}}
                            />
                            <Text style={styles.title}>{item.name}</Text>
                        </View>
                    </TouchableHighlight>
                </ScrollView>)
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.searchUsers}
                    renderItem={this.renderListUser}
                    keyExtractor={item => item.id}
                />
            </View>
        );
    }
}