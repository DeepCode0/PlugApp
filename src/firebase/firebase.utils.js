// firebase.utils.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getDatabase } from "firebase/database";
const config = {
  apiKey: "AIzaSyBVqB6Mla9lYHprqwQ_xiSU2ndi2mLviwo",
  authDomain: "plug-app-3c7b3.firebaseapp.com",
  databaseURL: "https://plug-app-3c7b3-default-rtdb.firebaseio.com",
  projectId: "plug-app-3c7b3",
  storageBucket: "plug-app-3c7b3.appspot.com",
  messagingSenderId: "614840343161",
  appId: "1:614840343161:web:50327a8dea59126b9412a8"
};

const app = firebase.initializeApp(config);
export const database = getDatabase(app);
export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;