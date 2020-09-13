import {Text} from "react-native";
import React from "react";
import {Card} from "react-native-elements";

const FAQ = ({navigator}) => {
    return (
        <Card>
            <Card.Title>FAQ</Card.Title>
            <Card.Image
                source={{uri: 'https://sun9-70.userapi.com/l7Z27fthlAJsDXF1Cg7tlcVeZibSAR748nuw-g/F3jUPO2o1sc.jpg'}}
                style={{resizeMode: 'contain'}}/>
            <Text style={{marginBottom: 10, marginTop: 10, textAlign: 'center'}}>
                Special for ISCS in SPBSTU
            </Text>
            <Card.Divider/>
            <Text style={{marginBottom: 10, marginTop: 10, textAlign: 'center'}}>
                Created by Andrei Kim and Alena Krauhina
            </Text>
        </Card>
    );
};

export default FAQ;