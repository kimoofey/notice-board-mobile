import * as firebase from 'firebase';
import config from '../../config';

const firebaseConfig = {
    apiKey: config.APIKEY,
    authDomain: config.AUTHDOMAIN,
    databaseURL: config.DATABASEURL,
    projectId: config.PROJECTID,
    storageBucket: config.STORAGEBUCKET,
    messagingSenderId: config.MESSAGINGSENDERID,
    appId: config.APPID
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;


