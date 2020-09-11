import React from 'react';
import {FlatList, Image, ScrollView, StyleSheet, Text, TouchableHighlight, View} from "react-native";


const styles = StyleSheet.create({
    logo: {
        width: 25,
        height: 25,
    },
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
                    >
                        <View>
                            <Image
                                style={styles.logo}
                                source={item.URL}
                            />
                            <Text>{`Name: ${item.name}`}</Text>
                        </View>
                    </TouchableHighlight>
                </ScrollView>)
        }
    };

    render() {
        return (
            <View>
                <View>
                    <View>
                        <TouchableHighlight onPress={() => this.onProfileClick}>
                            <Image
                                style={styles.logo}
                                source={this.currentUserPhoto}
                            />
                        </TouchableHighlight>
                    </View>
                    <View>
                        <FlatList
                            data={this.searchUsers}
                            renderItem={this.renderListUser}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </View>
            </View>
        );
    }
}