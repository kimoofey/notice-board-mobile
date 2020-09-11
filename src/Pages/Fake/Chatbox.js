import React from 'react';
import axios from 'axios';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
});

export default class FakeChatBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,

        };
        this.currentPeerUser = this.props.route.params.currentPeerUser;
        this.listMessage = [];
    }

    componentDidMount() {
        this.getPosts();
    }

    getPosts = async () => {
        this.setState({isLoading: true});
        const response = await axios.get(this.props.route.params.currentPeerUser.api);
        const data = await response.data.data.children.map(post => post.data);
        const posts = await data.map((item, index) => ({
            _id: index,
            text: item.title,
            createdAt: new Date(),
            image: item.url,
            user: {
                _id: 0,
                name: this.props.route.params.currentPeerUser.name,
                avatar: this.props.route.params.currentPeerUser.URL,
            }
        }));
        this.listMessage = posts;
        this.setState({isLoading: false});
    };

    render() {
        return (
            <View style={[styles.container, styles.horizontal]}>
                {
                    this.state.isLoading
                        ? <ActivityIndicator size="large"/>
                        : (
                            <GiftedChat
                                messages={this.listMessage}
                                user={{_id: 1, name: '', avatar: ''}}
                                renderInputToolbar={() => null}
                            />
                        )
                }
            </View>
        )
    }
}
