import React, {useState} from "react";
import {Image, ImageBackground, ScrollView, StyleSheet, Text, View} from 'react-native';
import {DrawerItem, DrawerItemList} from "@react-navigation/drawer";
import AsyncStorage from "@react-native-community/async-storage";
import LoginString from "../../CONSTS/LoginStrings";

const Sidebar = props => {
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');

    const getUserInfo = () => {
        AsyncStorage.getItem(LoginString.Name).then((result) => setName(result));
        AsyncStorage.getItem(LoginString.PhotoURL).then((result) => setAvatar(result));
    };

    const logout = async () => {
        try {
            await AsyncStorage.clear();
        } catch (error) {

        }
    };

    const userInfo = getUserInfo();

    return (
        <ScrollView>
            <ImageBackground
                source={{
                    uri: "https://source.unsplash.com/random",
                }}
                style={{width: undefined, padding: 16, paddingTop: 48}}
            >
                <Image
                    source={{
                        uri: avatar,
                    }}
                    style={styles.profile}
                />
                <Text styes={styles.name}>{name}</Text>
            </ImageBackground>

            <View style={styles.container}>
                <DrawerItemList {...props}/>
            </View>
            <DrawerItem
                label="Logout"
                onPress={() => alert('Logout')}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    profile: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: "#FFFFFF",
    },
    name: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "800",
        marginVertical: 8,
    },
});

export default Sidebar;