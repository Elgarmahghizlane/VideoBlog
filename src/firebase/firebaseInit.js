import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; 

const firebaseConfig = {
    apiKey: "AIzaSyB17jjvlfxPghknX953SEGLGNastGotn_M",
    authDomain: "videoblog-d9a7b.firebaseapp.com",
    databaseURL: "https://videoblog-d9a7b-default-rtdb.firebaseio.com",
    projectId: "videoblog-d9a7b",
    storageBucket: "videoblog-d9a7b.appspot.com",
    messagingSenderId: "1068841311940",
    appId: "1:1068841311940:web:abf936f803d01e14207391"

}
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage }