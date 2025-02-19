import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDJ_PG0lhrSeeP-o4Nxrv7rqVziVFxr_8Y",
    authDomain: "controle-de-acesso-44270.firebaseapp.com",
    projectId: "controle-de-acesso-44270",
    storageBucket: "controle-de-acesso-44270.firebasestorage.app",
    messagingSenderId: "438209979323",
    appId: "1:438209979323:web:4d600b9ceea374b71a9a9e"
  };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const firestore = getFirestore(app);

export { auth, database, firestore };
