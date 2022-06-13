import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCnicXXfhhsPd5ql5ifFlyfj58MAPj91wo",
    authDomain: "rhumatchme.firebaseapp.com",
    projectId: "rhumatchme",
    storageBucket: "rhumatchme.appspot.com",
    messagingSenderId: "401733330666",
    appId: "1:401733330666:web:ed45dc4ea6b701eec61993"
};

let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
db.settings({ experimentalForceLongPolling: true, merge: true });


export { auth, db, storage, firebase };