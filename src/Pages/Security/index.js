import {StyleSheet, Text, TextInput, View} from "react-native";
import React, {useState} from "react";
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
                console.log('safeCode correct!');
                break;
            }
            default: {
                console.log('incorrect password!')
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text>Enter passcode</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Auth password"
                    autoFocus
                    textAlign="center"
                    maxLength={4}
                    secureTextEntry={true}
                    keyboardType="number-pad"
                    multiline={false}
                    onChangeText={setPassword}
                    value={password}
                    onSumbitEditing={checkCredentials()}
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
    },
    inputContainer: {
        borderWidth: 1,
    }
});

export default Security;