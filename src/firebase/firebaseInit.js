import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import "firebase/compat/database";
import "firebase/compat/storage";
import "firebase/compat/auth"

var firebaseConfig = {
    apiKey: "AIzaSyB17jjvlfxPghknX953SEGLGNastGotn_M",
    authDomain: "videoblog-d9a7b.firebaseapp.com",
    databaseURL: "https://videoblog-d9a7b-default-rtdb.firebaseio.com",
    projectId: "videoblog-d9a7b",
    storageBucket: "videoblog-d9a7b.appspot.com",
    messagingSenderId: "1068841311940",
    appId: "1:1068841311940:web:abf936f803d01e14207391"

    

}
const firebaseApp = firebase.initializeApp(firebaseConfig)
const timestamp = firebase.firestore.FieldValue.serverTimestamp

const db = firebase.firestore();


export { db, timestamp}
export default firebaseApp.firestore()
