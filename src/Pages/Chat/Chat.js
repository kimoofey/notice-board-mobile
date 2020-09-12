import React from 'react';
import axios from 'axios';
import LoginString from '../../CONSTS/LoginStrings';
import AsyncStorage from '@react-native-community/async-storage';
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

    getUserData = async () => {
        this.currentUserDocumentId = await AsyncStorage.getItem(LoginString.FirebaseDocumentId);
        this.currentUserId = await AsyncStorage.getItem(LoginString.ID);
        this.currentUserPhoto = await AsyncStorage.getItem(LoginString.PhotoURL);
        this.currentUserName = await AsyncStorage.getItem(LoginString.Name);
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

    renderListUser = ({item}) => {
        if (item.id !== this.currentUserId) {
            return (
                <ScrollView>
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
                        style={styles.horizontal}
                    >
                        <View style={styles.row}>
                            <Image
                                style={styles.logo}
                                source={{uri: item.URL}}
                            />
                            <Text style={styles.title}>{item.name}</Text>
                        </View>
                        {/*{classname === 'viewWrapItemNotification' ?*/}
                        {/*    <div className='notificationpragraph'>*/}
                        {/*        <p id={item.key} className="newmessages">New</p>*/}
                        {/*    </div> : null}*/}
                    </TouchableHighlight>
                </ScrollView>)
        }
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
                <FlatList
                    data={this.searchUsers}
                    renderItem={this.renderListUser}
                    keyExtractor={item => item.id}
                />
                {/*<div className="viewBoard">*/}
                {/*    {this.state.currentPeerUser ? (*/}
                {/*        <ChatBox currentPeerUser={this.state.currentPeerUser}*/}
                {/*                 showToast={this.props.showToast}*/}
                {/*        />) : (<WelcomeBoard*/}
                {/*            currentUserName={this.currentUserName}*/}
                {/*            currentUserPhoto={this.currentUserPhoto}/>*/}
                {/*    )}*/}
                {/*</div>*/}
            </View>
        );
    }
}