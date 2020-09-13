import React, {useState} from "react";
import {StyleSheet, View} from "react-native";
import {Input} from 'react-native-elements';
import AsyncStorage from "@react-native-community/async-storage";
import LoginString from "../../CONSTS/LoginStrings";

const Security = ({navigation}) => {
    const [password, setPassword] = useState('');

    const checkCredentials = async () => {
        const passCode = await AsyncStorage.getItem(LoginString.passCode);
        const safeCode = await AsyncStorage.getItem(LoginString.safeCode);
        switch (password) {
            case passCode: {
                setPassword('');
                navigation.navigate('Chat');
                break;
            }
            case safeCode: {
                setPassword('');
                navigation.navigate('Fake');
                break;
            }
            default: {
                console.log('incorrect password!')
            }
        }
    };

    return (
        <View style={styles.container}>
            <View>
                <Input
                    autoFocus
                    placeholder="Passcode"
                    textAlign="center"
                    maxLength={4}
                    secureTextEntry={true}
                    keyboardType="number-pad"
                    multiline={false}
                    onChangeText={setPassword}
                    value={password}
                    onSumbitEditing={checkCredentials()}
                    label={'Enter passcode'}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default Security;