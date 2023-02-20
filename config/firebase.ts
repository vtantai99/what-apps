// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBSbtON-K9fvXhK_zNULVTFwcmOspQKlQQ',
  authDomain: 'whats-app-e07cf.firebaseapp.com',
  projectId: 'whats-app-e07cf',
  storageBucket: 'whats-app-e07cf.appspot.com',
  messagingSenderId: '742101450755',
  appId: '1:742101450755:web:5401aba09fcd78f071ce36',
  measurementId: 'G-KDECKKQCD7'
}

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

const db = getFirestore(app)

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export { db, auth, provider }
