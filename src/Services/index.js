import * as firebase from 'firebase';
import Config from 'react-native-config'

var firebaseConfig = {
    apiKey: Config.APIKEY,
    authDomain: Config.AUTHDOMAIN,
    databaseURL: Config.DATABASEURL,
    projectId: Config.PROJECTID,
    storageBucket: Config.STORAGEBUCKET,
    messagingSenderId: Config.MESSAGINGSENDERID,
    appId: Config.APPID
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;


