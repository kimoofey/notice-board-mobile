import React from 'react';
import axios from 'axios';
import LoginString from '../../CONSTS/LoginStrings';
import AsyncStorage from '@react-native-community/async-storage';
import {StyleSheet, TouchableHighlight, View, ScrollView} from "react-native";
import {Avatar, ListItem} from 'react-native-elements';


const styles = StyleSheet.create({
    logo: {
        backgroundColor: 'grey',
    },
    container: {
        flex: 1,
    }
});

export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isOpenDialogConfirmLogout: false,
            currentPeerUser: null,
            displayedContacts: [],
            displayedContactswithNotification: [],
        };
        this.getUserData();
        this.currentUserMessages = [];
        this.searchUsers = [];
        this.displayedContacts = [];
        this.currentUserMessages = [];
        this.notificationMessagesErase = [];
    }

    getUserData = () => {
        AsyncStorage.getItem(LoginString.FirebaseDocumentId)
            .then(result => this.currentUserDocumentId = result);
        AsyncStorage.getItem(LoginString.ID)
            .then(result => this.currentUserId = result);
        // this.currentUserPhoto = AsyncStorage.getItem(LoginString.PhotoURL);
        // this.currentUserName = AsyncStorage.getItem(LoginString.Name);
    };

    onProfileClick = () => {
        // this.props.history.push('/profile');
    };

    //
    componentDidMount() {
        // let notificationMessages = [];
        axios.get('api/user/messages', {
            params: {
                docId: this.currentUserDocumentId,
            },
        })
            .then((response) => {
                this.setState({
                    displayedContactswithNotification: response.data,
                });
            });
        this.getListUsers();
    }

    getListUsers = async () => {
        const result = await axios.get('https://web-notice-board-server-dev.herokuapp.com/api/user');
        if (result.data.length > 0) {
            let listUsers = [];
            listUsers = [...result.data];
            listUsers.forEach((item, index) => {
                this.searchUsers.push(
                    {
                        key: index,
                        documentkey: item.docId,
                        id: item.id,
                        name: item.name,
                        messages: item.messages,
                        URL: item.URL,
                        description: item.description,
                    },
                );
            });
            this.setState({
                isLoading: false,
            });
        }
    };
    //
    // getClassnameforUserandNotification = (itemId) => {
    //     // let number = 0;
    //     let className = '';
    //     let check = false;
    //     if (this.state.currentPeerUser &&
    //         this.state.currentPeerUser.id === itemId) {
    //
    //         className = 'viewWrapItemFocused';
    //
    //     } else {
    //         this.state.displayedContactswithNotification.forEach((item) => {
    //             if (item.notificationId.length > 0) {
    //                 if (item.notificationId === itemId) {
    //                     check = true;
    //                     // number = item.number;
    //                 }
    //             }
    //         });
    //         if (check === true) {
    //             className = 'viewWrapItemNotification';
    //         } else {
    //             className = 'viewWrapItem';
    //         }
    //     }
    //     return className;
    //
    // };
    //
    notificationErase = (itemId) => {
        this.state.displayedContactswithNotification.forEach((el) => {
            if (el.notificationId.length > 0) {
                if (el.notificationId !== itemId) {
                    this.notificationMessagesErase.push(
                        {
                            notificationId: el.notificationId,
                            number: el.number,
                        },
                    );
                }
            }

        });
        this.updaterenderlist();
    };

    updaterenderlist = () => {
        axios.put('https://web-notice-board-server-dev.herokuapp.com/api/user/messages', {
            docId: this.currentUserDocumentId,
            messages: this.notificationMessagesErase,
        })
            .then((response) => {
                this.setState({
                    displayedContactswithNotification: this.notificationMessagesErase,
                });
            });
    };

    renderListUser = () => {
        return (this.searchUsers.filter(item => item.id !== this.currentUserId).map((item, index) => (
            <TouchableHighlight
                onPress={() => {
                    this.notificationErase(item.id);
                    this.setState({
                        currentPeerUser: item,
                        displayedContactswithNotification: this.notificationMessagesErase,
                    });
                    this.props.navigation.navigate('ChatBox', {
                        currentPeerUser: item
                    });
                    // document.getElementById(item.key).style.backgroundColor = '#fff';
                    // if (document.getElementById(item.key)) {
                    //     document.getElementById(item.key).style.color = '#fff';
                    // }
                }}
                // style={styles.horizontal}
            >
                <ListItem key={index} bottomDivider>
                    {item.URL
                        ? <Avatar
                            rounded
                            source={{
                                uri: item.URL,
                            }}
                        />
                        : <Avatar
                            rounded
                            title={item.name.slice(0, 1)}
                            containerStyle={styles.logo}
                        />}
                    <ListItem.Content>
                        <ListItem.Title>{item.name}</ListItem.Title>
                        <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            </TouchableHighlight>
        )));
    };
    //
    // searchHandler = (event) => {
    //     let searchQuery = event.target.value.toLowerCase(),
    //         displayedContacts = this.searchUsers.filter((el) => {
    //             let SearchValue = el.name.toLowerCase();
    //             return SearchValue.indexOf(searchQuery) !== -1;
    //         });
    //     this.displayedContacts = displayedContacts;
    //     this.displaySearchedContacts();
    // };
    //
    // displaySearchedContacts = () => {
    //     if (this.searchUsers.length > 0) {
    //         let viewListUser = [];
    //         let classname = '';
    //         this.displayedContacts.forEach((item) => {
    //             if (item.id !== this.currentUserId) {
    //                 classname = this.getClassnameforUserandNotification(item.id);
    //                 viewListUser.push(
    //                     <button
    //
    //                         id={item.key}
    //
    //                         className={classname}
    //
    //                         onClick={() => {
    //                             this.notificationErase(item.id);
    //                             this.setState({
    //                                 currentPeerUser: item,
    //                                 displayedContactswithNotification: this.notificationMessagesErase,
    //                             });
    //                             document.getElementById(item.key).style.backgroundColor = '#fff';
    //                             if (document.getElementById(item.key)) {
    //                                 document.getElementById(item.key).style.color = '#fff';
    //                             }
    //                         }}
    //                     >
    //                         <img
    //                             className="viewAvatarItem"
    //                             src={item.URL}
    //                             alt=""
    //                             placeholder={images.emptyphoto}
    //                         />
    //
    //                         <div className="viewWrapContentItem">
    //               <span className="textItem">{`Name: ${
    //                   item.name
    //               }`}</span>
    //                         </div>
    //                         {classname === 'viewWrapItemNotification' ?
    //                             <div className='notificationpragraph'>
    //                                 <p id={item.key} className="newmessages">New messages</p>
    //                             </div> : null}
    //                     </button>,
    //                 );
    //             }
    //
    //         });
    //         this.setState({
    //             displayedContacts: viewListUser,
    //         });
    //
    //     } else {
    //         console.log('No user is present');
    //     }
    // };

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